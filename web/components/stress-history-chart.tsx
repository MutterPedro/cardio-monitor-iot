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

interface StressHistoryChartProps {
  className?: string
}

export function StressHistoryChart({ className }: StressHistoryChartProps) {
  const [data, setData] = useState<Array<{ time: string; stress: number; hrv: number }>>([])
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

      // Gera um valor aleatório para o estresse entre 0 e 100
      const stress = Math.floor(Math.random() * 100)

      // Gera um valor para HRV (variabilidade da frequência cardíaca)
      // HRV é inversamente proporcional ao estresse
      const hrv = Math.max(10, 100 - stress * 0.7 + (Math.random() * 20 - 10))

      setData((prevData) => {
        // Mantém apenas os últimos 20 pontos de dados
        const newData = [...prevData, { time: timeString, stress, hrv }]
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
          <p className="text-red-500">{`Estresse: ${payload[0].value}%`}</p>
          <p className="text-blue-500">{`HRV: ${payload[1].value.toFixed(1)} ms`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
        <div>
          <CardTitle>Histórico de Estresse</CardTitle>
          <CardDescription>Níveis de estresse e variabilidade cardíaca</CardDescription>
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
              <YAxis yAxisId="left" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <ReferenceLine
                y={30}
                yAxisId="left"
                stroke="#10b981"
                strokeDasharray="3 3"
                label={{ value: "Baixo", position: "insideLeft", fontSize: 10 }}
              />
              <ReferenceLine
                y={70}
                yAxisId="left"
                stroke="#ef4444"
                strokeDasharray="3 3"
                label={{ value: "Alto", position: "insideLeft", fontSize: 10 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="stress"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
                name="Estresse (%)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="hrv"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
                name="HRV (ms)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
