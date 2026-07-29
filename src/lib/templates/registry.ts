import pulse from './pulse/template.json'
import olea from './olea/template.json'
import atlas from './atlas/template.json'

export const templates: Record<string, typeof pulse> = {
  pulse: pulse as never,
  olea: olea as never,
  atlas: atlas as never,
}

export function getTemplateData(id: string) {
  return templates[id] ?? templates.pulse
}
