'use client'
import {
  Sparkles, Zap, Workflow, BarChart3, Shield, Sun, Bell, Boxes, GitBranch, Circle,
} from 'lucide-react'
import type { ComponentType } from 'react'

interface IconProps { size?: number; className?: string; fill?: string }

const ICON_MAP: Record<string, ComponentType<IconProps>> = {
  sparkles: Sparkles,
  zap: Zap,
  workflow: Workflow,
  'bar-chart': BarChart3,
  shield: Shield,
  sun: Sun,
  bell: Bell,
  boxes: Boxes,
  'git-branch': GitBranch,
  circle: Circle,
}

export function PulseIcon({ name, size = 14, fill }: { name?: string; size?: number; fill?: string }) {
  const Comp = ICON_MAP[name ?? 'sparkles'] ?? Sparkles
  return <Comp size={size} fill={fill} />
}
