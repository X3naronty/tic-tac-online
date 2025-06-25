import Link from "next/link"

interface Props {
  text: string
  linkText: string
  linkHref: string
}

export function FormFooter({ text, linkText, linkHref }: Props) {
  return (
    <footer className="text-center text-sm">
      {text}&nbsp;&nbsp;&nbsp;
      <Link href={linkHref} className="font-medium underline underline-offset-4 hover:text-primary">
        {linkText}
      </Link>
    </footer>
  )
}