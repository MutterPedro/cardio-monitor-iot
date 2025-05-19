import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Pencil, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    status: "normal",
    bpm: 72,
    avatar: "/placeholder-user.jpg",
    idade: 35,
    sexo: "Masculino",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria@example.com",
    status: "alto",
    bpm: 110,
    avatar: "/placeholder-user.jpg",
    idade: 42,
    sexo: "Feminino",
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro@example.com",
    status: "medio",
    bpm: 85,
    avatar: "/placeholder-user.jpg",
    idade: 28,
    sexo: "Masculino",
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana@example.com",
    status: "relaxado",
    bpm: 58,
    avatar: "/placeholder-user.jpg",
    idade: 31,
    sexo: "Feminino",
  },
  {
    id: 5,
    name: "Carlos Mendes",
    email: "carlos@example.com",
    status: "normal",
    bpm: 68,
    avatar: "/placeholder-user.jpg",
    idade: 45,
    sexo: "Masculino",
  },
  {
    id: 6,
    name: "Lúcia Ferreira",
    email: "lucia@example.com",
    status: "alto",
    bpm: 115,
    avatar: "/placeholder-user.jpg",
    idade: 39,
    sexo: "Feminino",
  },
]

function getStatusConfig(status: string) {
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

export default function UsersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Usuários" text="Gerencie os usuários cadastrados no sistema." />

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Buscar usuários..." className="max-w-sm" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>Total de {users.length} usuários cadastrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {users.map((user) => {
              const statusConfig = getStatusConfig(user.status)

              return (
                <div
                  key={user.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Idade:</span> {user.idade}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Sexo:</span> {user.sexo}
                    </div>
                    <Badge variant="outline" className={statusConfig.className}>
                      {statusConfig.label} ({user.bpm} bpm)
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/usuarios/${user.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/usuarios/${user.id}/editar`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Excluir
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
