import type React from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 mb-6">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button asChild>
          <a href="/usuarios/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Usuário
          </a>
        </Button>
      </div>
    </div>
  )
}
