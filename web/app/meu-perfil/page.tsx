"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, User } from "lucide-react"
import { UserHeartRateInput } from "@/components/user-heart-rate-input"
import { RealTimeHeartRate } from "@/components/real-time-heart-rate"
import { HeartRateDistribution } from "@/components/heart-rate-distribution"
import { RealTimeChart } from "@/components/real-time-chart"
import { StressLevelIndicator } from "@/components/stress-level-indicator"
import { StressHistoryChart } from "@/components/stress-history-chart"
import { StressRecommendations } from "@/components/stress-recommendations"
import { OxygenLevelIndicator } from "@/components/oxygen-level-indicator"
import { OxygenHistoryChart } from "@/components/oxygen-history-chart"

export default function UserProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showInputModal, setShowInputModal] = useState(false)
  const [currentHeartRate, setCurrentHeartRate] = useState<number | null>(null)
  const [heartRateStatus, setHeartRateStatus] = useState<string>("")
  const [stressLevel, setStressLevel] = useState(45)
  const [oxygenLevel, setOxygenLevel] = useState(98)

  useEffect(() => {
    // Verificar se o usuário está logado
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))

    // Definir um batimento cardíaco atual simulado
    setCurrentHeartRate(72)
  }, [router])

  useEffect(() => {
    // Determinar o status do batimento cardíaco
    if (currentHeartRate === null) return

    if (currentHeartRate > 100) {
      setHeartRateStatus("alto")
    } else if (currentHeartRate >= 70 && currentHeartRate <= 90) {
      setHeartRateStatus("medio")
    } else if (currentHeartRate >= 60 && currentHeartRate <= 100) {
      setHeartRateStatus("normal")
    } else if (currentHeartRate < 60) {
      setHeartRateStatus("relaxado")
    }
  }, [currentHeartRate])

  // Simular mudanças no nível de estresse
  useEffect(() => {
    const interval = setInterval(() => {
      // Gerar um valor aleatório entre -10 e +10
      const variation = Math.floor(Math.random() * 21) - 10

      // Adicionar a variação ao valor atual, mantendo entre 0 e 100
      let newLevel = stressLevel + variation
      newLevel = Math.max(0, Math.min(100, newLevel))

      setStressLevel(newLevel)
    }, 10000)

    return () => clearInterval(interval)
  }, [stressLevel])

  // Simular mudanças no nível de oxigenação
  useEffect(() => {
    const interval = setInterval(() => {
      // Gerar um valor aleatório entre -2 e +2
      const variation = Math.floor(Math.random() * 5) - 2

      // Adicionar a variação ao valor atual, mantendo entre 85 e 100
      let newLevel = oxygenLevel + variation
      newLevel = Math.max(85, Math.min(100, newLevel))

      setOxygenLevel(newLevel)
    }, 8000)

    return () => clearInterval(interval)
  }, [oxygenLevel])

  const handleHeartRateSubmit = (value: number) => {
    setCurrentHeartRate(value)
    setShowInputModal(false)

    // Em um app real, você enviaria este valor para o servidor
    console.log("Novo batimento registrado:", value)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "normal":
        return { label: "Normal", className: "border-green-500 text-green-600" }
      case "alto":
        return { label: "Alto", className: "border-red-500 text-red-600" }
      case "medio":
        return { label: "Médio", className: "border-yellow-500 text-yellow-600" }
      case "relaxado":
        return { label: "Relaxado", className: "border-blue-500 text-blue-600" }
      default:
        return { label: "Desconhecido", className: "" }
    }
  }

  if (!user) return null

  return (
    <DashboardShell>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meu Perfil</h1>
          <p className="text-muted-foreground">Monitore seus batimentos cardíacos, oxigenação e níveis de estresse</p>
        </div>
        <Button onClick={() => setShowInputModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Registrar Batimento
        </Button>
      </div>

      <div className="space-y-8">
        {/* Indicadores principais em uma única linha */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <RealTimeHeartRate initialHeartRate={currentHeartRate || 72} />
          <OxygenLevelIndicator initialOxygenLevel={oxygenLevel} />
          <StressLevelIndicator
            heartRate={currentHeartRate || 72}
            heartRateVariability={50}
            oxygenLevel={oxygenLevel}
          />
        </div>

        {/* Seção de Monitoramento Cardíaco */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-bold tracking-tight">Monitoramento Cardíaco</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <RealTimeChart />
            <HeartRateDistribution />
          </div>
        </div>

        {/* Seção de Oxigenação */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-bold tracking-tight">Oxigenação Sanguínea</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <OxygenHistoryChart />
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Oxigenação</CardTitle>
                <CardDescription>Entenda a importância da oxigenação sanguínea</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  A saturação de oxigênio (SpO2) é uma medida da quantidade de oxigênio transportada pela hemoglobina no
                  sangue. É expressa como uma porcentagem da capacidade máxima de transporte de oxigênio.
                </p>
                <p>
                  Níveis normais de SpO2 estão entre 95% e 100%. Valores abaixo de 95% podem indicar problemas
                  respiratórios, enquanto valores abaixo de 90% são considerados baixos e podem requerer atenção médica.
                </p>
                <h4 className="font-medium mt-4">Fatores que afetam a oxigenação:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Altitude (níveis mais baixos em altitudes elevadas)</li>
                  <li>Problemas respiratórios (asma, DPOC, COVID-19)</li>
                  <li>Doenças cardíacas</li>
                  <li>Anemia</li>
                  <li>Tabagismo</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seção de Nível de Estresse */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-bold tracking-tight">Nível de Estresse</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <StressHistoryChart />
            <StressRecommendations stressLevel={stressLevel} oxygenLevel={oxygenLevel} />
          </div>
        </div>

        {/* Informações Pessoais */}
        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-bold tracking-tight">Informações Pessoais</h2>
          <Card>
            <CardHeader>
              <CardTitle>Dados do Usuário</CardTitle>
              <CardDescription>Seus dados cadastrais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mb-4">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                  <AvatarFallback>
                    <User className="h-8 w-8 sm:h-10 sm:w-10" />
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg sm:text-xl font-bold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 border-t pt-4">
                  <div className="text-sm font-medium">Idade</div>
                  <div className="text-sm">35 anos</div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t pt-4">
                  <div className="text-sm font-medium">Sexo</div>
                  <div className="text-sm">Masculino</div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t pt-4">
                  <div className="text-sm font-medium">Altura</div>
                  <div className="text-sm">175 cm</div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t pt-4">
                  <div className="text-sm font-medium">Peso</div>
                  <div className="text-sm">70 kg</div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t pt-4">
                  <div className="text-sm font-medium">IMC</div>
                  <div className="text-sm">22.9 (Normal)</div>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/meu-perfil/editar">Editar Perfil</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showInputModal && (
        <UserHeartRateInput onSubmit={handleHeartRateSubmit} onCancel={() => setShowInputModal(false)} />
      )}
    </DashboardShell>
  )
}
