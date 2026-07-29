'use client'
import type { FieldSchema } from '@/sections/registry'
import { TextField } from './text'
import { TextareaField } from './textarea'
import { NumberField } from './number'
import { RangeField } from './range'
import { CheckboxField } from './checkbox'
import { SelectField } from './select'
import { RadioField } from './radio'
import { ColorField } from './color'
import { ColorSchemeField } from './color-scheme'
import { ImageField } from './image'
import { LinkField } from './link'
import { FontField } from './font'

interface Props { field: FieldSchema; value: unknown; onChange: (v: unknown) => void }

export function FieldDispatcher({ field, value, onChange }: Props) {
  switch (field.type) {
    case 'header':    return <div className="border-t pt-3 text-xs font-medium uppercase tracking-wider text-neutral-500">{field.label}</div>
    case 'paragraph': return <p className="text-xs text-neutral-500">{field.label}</p>
    case 'text':      return <TextField {...{ field, value, onChange }} />
    case 'textarea':  return <TextareaField {...{ field, value, onChange }} />
    case 'number':    return <NumberField {...{ field, value, onChange }} />
    case 'range':     return <RangeField {...{ field, value, onChange }} />
    case 'checkbox':  return <CheckboxField {...{ field, value, onChange }} />
    case 'select':    return <SelectField {...{ field, value, onChange }} />
    case 'radio':     return <RadioField {...{ field, value, onChange }} />
    case 'color':     return <ColorField {...{ field, value, onChange }} />
    case 'color_scheme': return <ColorSchemeField {...{ field, value, onChange }} />
    case 'image':     return <ImageField {...{ field, value, onChange }} />
    case 'link':      return <LinkField {...{ field, value, onChange }} />
    case 'font':      return <FontField {...{ field, value, onChange }} />
    default: return null
  }
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-medium text-neutral-600">{children}</label>
}
export { Label }
