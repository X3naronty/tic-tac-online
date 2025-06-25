
interface Props {
  title: string
  description: string
}

export function FormHeader({ title, description }: Props) {
  return (
    <header className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </header>
  )
}
