"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { CardioOverview } from "@/components/cardio-overview"
import { RecentUsers } from "@/components/recent-users"
import { HeartRateDistribution } from "@/components/heart-rate-distribution"
import { RealTimeChart } from "@/components/real-time-chart"
import { StressHistoryChart } from "@/components/stress-history-chart"
import { OxygenHistoryChart } from "@/components/oxygen-history-chart"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está logado
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    // Verificar se o usuário é admin
    const user = JSON.parse(userData)
    if (user.role !== "admin") {
      router.push("/meu-perfil")
    }
  }, [router])

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Monitore os batimentos cardíacos, níveis de oxigenação, estresse e gerencie usuários."
      />

      <div className="space-y-8">
        {/* Seção de Monitoramento Cardíaco */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Monitoramento Cardíaco</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <CardioOverview
              title="Média de Batimentos"
              value="75 bpm"
              description="Média geral de todos os usuários"
              className="border-blue-200 dark:border-blue-800"
            />
            <CardioOverview
              title="Usuários Monitorados"
              value="124"
              description="Total de usuários com monitoramento ativo"
              className="border-green-200 dark:border-green-800"
            />
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <RealTimeChart />
            <HeartRateDistribution />
          </div>
        </div>

        {/* Seção de Oxigenação */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-bold tracking-tight">Oxigenação Sanguínea</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <CardioOverview
              title="Média de Oxigenação"
              value="96%"
              description="Média de SpO2 de todos os usuários"
              className="border-blue-200 dark:border-blue-800"
            />
            <CardioOverview
              title="Alertas de Oxigenação"
              value="3"
              description="Usuários com níveis abaixo do normal"
              className="border-yellow-200 dark:border-yellow-800"
            />
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <OxygenHistoryChart />
            <HeartRateDistribution />
          </div>
        </div>

        {/* Seção de Nível de Estresse */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-bold tracking-tight">Níveis de Estresse</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <CardioOverview
              title="Média de Estresse"
              value="45%"
              description="Nível médio de estresse dos usuários"
              className="border-blue-200 dark:border-blue-800"
            />
            <CardioOverview
              title="Alertas de Estresse"
              value="7"
              description="Usuários com níveis elevados de estresse"
              className="border-red-200 dark:border-red-800"
            />
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <StressHistoryChart />
            <HeartRateDistribution />
          </div>
        </div>

        {/* Seção de Usuários Recentes */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-bold tracking-tight">Usuários Recentes</h2>
          <RecentUsers />
        </div>
      </div>
    </DashboardShell>
  )
}
