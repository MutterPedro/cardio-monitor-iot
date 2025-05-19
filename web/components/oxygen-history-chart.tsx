"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { cn } from "@/lib/utils"

interface OxygenHistoryChartProps {
  className?: string
}

export function OxygenHistoryChart({ className }: OxygenHistoryChartProps) {
  const [data, setData] = useState<Array<{ time: string; oxygen: number }>>([])
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

      // Gera um valor aleatório para oxigenação entre 90 e 100
      const oxygen = Math.floor(Math.random() * 11) + 90

      setData((prevData) => {
        // Mantém apenas os últimos 20 pontos de dados
        const newData = [...prevData, { time: timeString, oxygen }]
        if (newData.length > 20) {
          return newData.slice(newData.length - 20)
        }
        return newData
      })
    }

    // Adiciona um ponto de dados inicial
    addDataPoint()

    // Configura um intervalo para adicionar novos pontos a cada 3 segundos
    const interval = setInterval(addDataPoint, 3000)

    // Limpa o intervalo se o componente for desmontado
    return () => clearInterval(interval)
  }, [connected])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm text-xs sm:text-sm">
          <p className="font-medium">{`Tempo: ${label}`}</p>
          <p className="text-blue-500">{`SpO2: ${payload[0].value}%`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
        <div>
          <CardTitle>Histórico de Oxigenação</CardTitle>
          <CardDescription>Níveis de SpO2 ao longo do tempo</CardDescription>
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
              <YAxis domain={[85, 100]} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <ReferenceLine
                y={95}
                stroke="#10b981"
                strokeDasharray="3 3"
                label={{ value: "Normal", position: "insideRight", fontSize: 10 }}
              />
              <ReferenceLine
                y={90}
                stroke="#f59e0b"
                strokeDasharray="3 3"
                label={{ value: "Atenção", position: "insideRight", fontSize: 10 }}
              />
              <Line
                type="monotone"
                dataKey="oxygen"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
                name="SpO2 (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
