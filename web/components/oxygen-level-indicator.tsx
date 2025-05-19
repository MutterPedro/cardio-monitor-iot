"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { TreesIcon as Lungs } from "lucide-react"

interface OxygenLevelIndicatorProps {
  className?: string
  initialOxygenLevel?: number
}

export function OxygenLevelIndicator({ className, initialOxygenLevel = 98 }: OxygenLevelIndicatorProps) {
  const [oxygenLevel, setOxygenLevel] = useState(initialOxygenLevel)
  const [oxygenStatus, setOxygenStatus] = useState("")
  const [statusColor, setStatusColor] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Simula atualizações de dados em tempo real
  useEffect(() => {
    // Função para gerar um novo nível de oxigênio simulado
    const generateOxygenLevel = () => {
      // Gera uma variação aleatória entre -2 e +2
      const variation = Math.floor(Math.random() * 5) - 2

      // Adiciona a variação ao valor atual, mantendo entre 85 e 100
      let newLevel = oxygenLevel + variation
      newLevel = Math.max(85, Math.min(100, newLevel))

      setOxygenLevel(newLevel)
      setLastUpdated(new Date())

      // Atualiza o status com base no novo valor
      if (newLevel >= 95) {
        setOxygenStatus("Normal")
        setStatusColor("bg-green-500")
      } else if (newLevel >= 90) {
        setOxygenStatus("Atenção")
        setStatusColor("bg-yellow-500")
      } else {
        setOxygenStatus("Baixo")
        setStatusColor("bg-red-500")
      }
    }

    // Configura um intervalo para atualizar os dados a cada 5 segundos
    const interval = setInterval(generateOxygenLevel, 5000)

    // Executa uma vez inicialmente para definir o status
    generateOxygenLevel()

    // Limpa o intervalo se o componente for desmontado
    return () => clearInterval(interval)
  }, [oxygenLevel])

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Oxigenação (SpO2)</CardTitle>
        <Lungs className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-2 sm:py-4">
          <div className="w-full mb-4">
            <Progress value={oxygenLevel} max={100} className="h-2" indicatorClassName={statusColor} />
          </div>
          <div className="flex justify-between w-full text-xs text-muted-foreground mb-4">
            <span>85%</span>
            <span>90%</span>
            <span>95%</span>
            <span>100%</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`h-3 w-3 rounded-full ${statusColor}`}></div>
            <span className="text-xl font-bold">{oxygenStatus}</span>
          </div>
          <div className="text-3xl font-bold tabular-nums">{oxygenLevel}%</div>
          <div className="mt-4 text-xs text-muted-foreground">
            Última atualização: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
