"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface RealTimeHeartRateProps {
  className?: string
  initialHeartRate?: number
}

export function RealTimeHeartRate({ className, initialHeartRate = 72 }: RealTimeHeartRateProps) {
  const [heartRate, setHeartRate] = useState(initialHeartRate)
  const [heartRateStatus, setHeartRateStatus] = useState<string>("normal")
  const [connected, setConnected] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Simula uma conexão WebSocket para dados em tempo real
  useEffect(() => {
    // Simula o tempo de conexão
    const connectionTimeout = setTimeout(() => {
      setConnected(true)
    }, 1500)

    // Limpa o timeout se o componente for desmontado
    return () => clearTimeout(connectionTimeout)
  }, [])

  // Simula a atualização de dados em tempo real
  useEffect(() => {
    if (!connected) return

    // Função para gerar um novo batimento cardíaco simulado
    const generateHeartRate = () => {
      // Gera uma variação aleatória entre -5 e +5 bpm
      const variation = Math.floor(Math.random() * 11) - 5

      // Adiciona a variação ao valor atual, mantendo entre 50 e 120 bpm
      let newRate = heartRate + variation
      newRate = Math.max(50, Math.min(120, newRate))

      setHeartRate(newRate)
      setLastUpdated(new Date())

      // Atualiza o status com base no novo valor
      if (newRate > 100) {
        setHeartRateStatus("alto")
      } else if (newRate >= 70 && newRate <= 90) {
        setHeartRateStatus("medio")
      } else if (newRate >= 60 && newRate <= 100) {
        setHeartRateStatus("normal")
      } else if (newRate < 60) {
        setHeartRateStatus("relaxado")
      }
    }

    // Configura um intervalo para atualizar os dados a cada 3 segundos
    const interval = setInterval(generateHeartRate, 3000)

    // Limpa o intervalo se o componente for desmontado
    return () => clearInterval(interval)
  }, [connected, heartRate])

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

  const statusConfig = getStatusConfig(heartRateStatus)

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Batimento em Tempo Real</CardTitle>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${connected ? "bg-green-500" : "bg-gray-300"} ${connected ? "animate-pulse" : ""}`}
          />
          <span className="text-xs text-muted-foreground">{connected ? "Conectado" : "Conectando..."}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-2 sm:py-4">
          <div className="relative mb-2 sm:mb-4">
            <Heart
              className={`h-12 w-12 sm:h-16 sm:w-16 ${
                heartRateStatus === "alto"
                  ? "text-red-500"
                  : heartRateStatus === "normal"
                    ? "text-green-500"
                    : heartRateStatus === "medio"
                      ? "text-yellow-500"
                      : "text-blue-500"
              } ${connected ? "animate-pulse" : ""}`}
              style={{ animationDuration: `${60000 / (heartRate || 60)}ms` }}
            />
          </div>
          <div className="text-3xl sm:text-4xl font-bold tabular-nums">{heartRate} bpm</div>
          <div className="flex items-center mt-2">
            <Badge variant="outline" className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          </div>
          <div className="mt-2 sm:mt-4 text-xs text-muted-foreground">
            Última atualização: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
