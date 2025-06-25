import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"

interface Props {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  required?: boolean
}

export function FormField({ id, name, type, label, placeholder, required = false }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} placeholder={placeholder} required={required} />
    </div>
  )
}
