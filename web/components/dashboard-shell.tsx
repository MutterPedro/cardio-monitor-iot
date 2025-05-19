"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Activity, Heart, Home, LogOut, Settings, User, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)

    // Verificar se o usuário está logado
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!isMounted) {
    return null
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="font-bold">CardioMonitor</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {user?.role === "admin" ? (
                // Menu para administradores
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={typeof window !== "undefined" && window.location.pathname === "/"}
                    >
                      <a href="/">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={typeof window !== "undefined" && window.location.pathname.startsWith("/usuarios")}
                    >
                      <a href="/usuarios">
                        <Users className="h-4 w-4" />
                        <span>Usuários</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={typeof window !== "undefined" && window.location.pathname.startsWith("/monitoramento")}
                    >
                      <a href="/monitoramento">
                        <Activity className="h-4 w-4" />
                        <span>Monitoramento</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                // Menu para usuários comuns
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={typeof window !== "undefined" && window.location.pathname.startsWith("/meu-perfil")}
                    >
                      <a href="/meu-perfil">
                        <User className="h-4 w-4" />
                        <span>Meu Perfil</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={typeof window !== "undefined" && window.location.pathname.startsWith("/meu-historico")}
                    >
                      <a href="/meu-perfil">
                        <Activity className="h-4 w-4" />
                        <span>Meu Histórico</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={typeof window !== "undefined" && window.location.pathname.startsWith("/configuracoes")}
                >
                  <a href="/configuracoes">
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>{user?.name?.substring(0, 2) || "US"}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium">{user?.name || "Usuário"}</div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user?.role === "user" && (
                    <DropdownMenuItem asChild>
                      <a href="/meu-perfil">Meu Perfil</a>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <a href="/configuracoes">Configurações</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
