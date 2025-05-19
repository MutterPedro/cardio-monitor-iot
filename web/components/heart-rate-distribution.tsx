"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

interface HeartRateDistributionProps {
  className?: string
}

// Cores para os diferentes estados
const COLORS = ["#10b981", "#ef4444", "#f59e0b", "#3b82f6"]

export function HeartRateDistribution({ className }: HeartRateDistributionProps) {
  const [data, setData] = useState([
    { name: "Normal", value: 60, color: "#10b981" },
    { name: "Alto", value: 15, color: "#ef4444" },
    { name: "Médio", value: 20, color: "#f59e0b" },
    { name: "Relaxado", value: 5, color: "#3b82f6" },
  ])

  // Simula a atualização de dados em tempo real
  useEffect(() => {
    // Função para atualizar os dados do gráfico
    const updateData = () => {
      // Gera novos valores aleatórios, mantendo o total em 100%
      const normalValue = Math.floor(Math.random() * 40) + 40 // 40-80%
      const altoValue = Math.floor(Math.random() * 20) // 0-20%
      const medioValue = Math.floor(Math.random() * 20) // 0-20%

      // Calcula o valor relaxado para que o total seja 100%
      const relaxadoValue = 100 - normalValue - altoValue - medioValue

      setData([
        { name: "Normal", value: normalValue, color: "#10b981" },
        { name: "Alto", value: altoValue, color: "#ef4444" },
        { name: "Médio", value: medioValue, color: "#f59e0b" },
        { name: "Relaxado", value: relaxadoValue, color: "#3b82f6" },
      ])
    }

    // Atualiza os dados a cada 10 segundos
    const interval = setInterval(updateData, 10000)

    // Limpa o intervalo se o componente for desmontado
    return () => clearInterval(interval)
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm text-xs sm:text-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Distribuição de Batimentos</CardTitle>
        <CardDescription>Porcentagem de tempo em cada estado cardíaco</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={({ width }) => Math.min(100, width ? width / 4 : 100)}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
