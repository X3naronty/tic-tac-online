import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { FieldError } from './field_error'
import { useId } from 'react'

interface Props {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  required?: boolean
  errors?: string[]
  defaultValue?: string
}

export function FormField({ errors, defaultValue, id, name, type, label, placeholder, required = false }: Props) {
    const errorId = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} aria-describedby={errorId}/>
      <FieldError errors={errors} id={errorId}/>
    </div>
  )
}
