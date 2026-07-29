'use client'

import { use } from 'react'
import { EditorShell } from '@/components/editor/shell'

export default function EditorPage({
  params,
}: {
  params: Promise<{ siteId: string }>
}) {
  const { siteId } = use(params)
  return (
    <div className="h-screen w-screen overflow-hidden">
      <EditorShell siteId={siteId} />
    </div>
  )
}
