export interface SchemeColors {
  background: string
  text: string
  mute: string
  accent: string
  accentSoft: string
  hair: string
}

const SCHEMES: Record<string, SchemeColors> = {
  scheme_1: {
    background: '#ffffff',
    text: '#0b0b12',
    mute: '#6a6a7b',
    accent: '#6366f1',
    accentSoft: '#eef0ff',
    hair: '#ececf1',
  },
  scheme_2: {
    background: '#0b0b12',
    text: '#ffffff',
    mute: 'rgba(255,255,255,0.65)',
    accent: '#a5b4fc',
    accentSoft: 'rgba(165,180,252,0.15)',
    hair: 'rgba(255,255,255,0.12)',
  },
}

export function getScheme(name: unknown): SchemeColors {
  return SCHEMES[(name as string) ?? 'scheme_1'] ?? SCHEMES.scheme_1
}
