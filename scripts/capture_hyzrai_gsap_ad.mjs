import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'output', 'ads')
const framesDir = path.join(outDir, 'hyzrai_gsap_frames')
const toolDir = process.env.HYZRAI_CAPTURE_TOOLS || path.join(process.env.TEMP || process.env.TMP || '', 'hyzrai-capture-tools')
const require = createRequire(import.meta.url)
const { chromium } = require(path.join(toolDir, 'node_modules', 'playwright-core'))

const fps = Number(process.env.HYZRAI_AD_FPS || 30)
const seconds = Number(process.env.HYZRAI_AD_SECONDS || 15)
const totalFrames = fps * seconds
const url = process.env.HYZRAI_AD_URL || 'http://localhost:3000/ad/hyzrai'
const chrome = process.env.CHROME_EXE || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

function assertInside(parent, child) {
  const rel = path.relative(parent, child)
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error(`Refusing to write outside ${parent}: ${child}`)
  }
}

await fs.mkdir(outDir, { recursive: true })
assertInside(outDir, framesDir)
await fs.rm(framesDir, { recursive: true, force: true })
await fs.mkdir(framesDir, { recursive: true })

const browser = await chromium.launch({
  executablePath: chrome,
  headless: true,
  args: [
    '--hide-scrollbars',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--font-render-hinting=none',
  ],
})

try {
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
  })
  page.setDefaultTimeout(90000)
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle', { timeout: 90000 }).catch(() => {})
  await page.waitForFunction(() => window.hyzrAdReady === true && typeof window.hyzrAdSeek === 'function', null, { timeout: 90000 })

  for (let frame = 0; frame < totalFrames; frame += 1) {
    const time = frame / fps
    await page.evaluate(async (nextTime) => {
      await window.hyzrAdSeek?.(nextTime)
    }, time)
    const name = `frame_${String(frame).padStart(5, '0')}.jpg`
    await page.screenshot({
      path: path.join(framesDir, name),
      type: 'jpeg',
      quality: 96,
      fullPage: false,
      animations: 'allow',
    })
    if (frame % fps === 0) {
      console.log(`captured ${String(frame / fps).padStart(2, '0')}s / ${seconds}s`)
    }
  }
  console.log(`frames=${framesDir}`)
} finally {
  await browser.close()
}
