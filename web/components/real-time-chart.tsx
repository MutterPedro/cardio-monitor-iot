"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface RealTimeChartProps {
  className?: string
}

export function RealTimeChart({ className }: RealTimeChartProps) {
  const [data, setData] = useState<Array<{ time: string; bpm: number }>>([])
  const [connected, setConnected] = useState(false)

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

    // Função para adicionar um novo ponto de dados
    const addDataPoint = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

      // Gera um valor aleatório entre 60 e 100 bpm
      const bpm = Math.floor(Math.random() * 40) + 60

      setData((prevData) => {
        // Mantém apenas os últimos 20 pontos de dados
        const newData = [...prevData, { time: timeString, bpm }]
        if (newData.length > 20) {
          return newData.slice(newData.length - 20)
        }
        return newData
      })
    }

    // Adiciona um ponto de dados inicial
    addDataPoint()

    // Configura um intervalo para adicionar novos pontos a cada 2 segundos
    const interval = setInterval(addDataPoint, 2000)

    // Limpa o intervalo se o componente for desmontado
    return () => clearInterval(interval)
  }, [connected])

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
        <div>
          <CardTitle>Monitoramento em Tempo Real</CardTitle>
          <CardDescription>Batimentos cardíacos nos últimos minutos</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${connected ? "bg-green-500" : "bg-gray-300"} ${connected ? "animate-pulse" : ""}`}
          />
          <span className="text-xs text-muted-foreground">{connected ? "Conectado" : "Conectando..."}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis domain={[50, 120]} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="bpm"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
                isAnimationActive={true}
                animationDuration={500}
                name="BPM"
              />
              {/* Linhas de referência para os diferentes estados */}
              <Line
                type="monotone"
                dataKey={() => 100}
                stroke="#ef4444"
                strokeDasharray="3 3"
                name="Alto"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey={() => 60}
                stroke="#3b82f6"
                strokeDasharray="3 3"
                name="Relaxado"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
