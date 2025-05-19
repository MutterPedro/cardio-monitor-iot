"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Eye, Pencil } from "lucide-react"

interface RecentUsersProps {
  className?: string
}

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    status: "normal",
    bpm: 72,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria@example.com",
    status: "alto",
    bpm: 110,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro@example.com",
    status: "medio",
    bpm: 85,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana@example.com",
    status: "relaxado",
    bpm: 58,
    avatar: "/placeholder-user.jpg",
  },
]

export function RecentUsers({ className }: RecentUsersProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Usuários Recentes</CardTitle>
        <CardDescription>Visualize os usuários mais recentes e seus estados cardíacos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={user.status} bpm={user.bpm} />
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`/usuarios/${user.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver</span>
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`/usuarios/${user.id}/editar`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status, bpm }: { status: string; bpm: number }) {
  const getStatusConfig = () => {
    switch (status) {
      case "normal":
        return { label: "Normal", variant: "outline", className: "border-green-500 text-green-600" }
      case "alto":
        return { label: "Alto", variant: "outline", className: "border-red-500 text-red-600" }
      case "medio":
        return { label: "Médio", variant: "outline", className: "border-yellow-500 text-yellow-600" }
      case "relaxado":
        return { label: "Relaxado", variant: "outline", className: "border-blue-500 text-blue-600" }
      default:
        return { label: "Desconhecido", variant: "outline", className: "" }
    }
  }

  const config = getStatusConfig()

  return (
    <Badge variant="outline" className={cn("", config.className)}>
      {config.label} ({bpm} bpm)
    </Badge>
  )
}
