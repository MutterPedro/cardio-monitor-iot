"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface CardioComparisonProps {
  className?: string
}

const data = [
  { time: "00:00", normal: 65, alto: 110, medio: 80, relaxado: 55 },
  { time: "03:00", normal: 68, alto: 115, medio: 82, relaxado: 58 },
  { time: "06:00", normal: 72, alto: 120, medio: 85, relaxado: 60 },
  { time: "09:00", normal: 75, alto: 125, medio: 88, relaxado: 62 },
  { time: "12:00", normal: 70, alto: 118, medio: 84, relaxado: 59 },
  { time: "15:00", normal: 68, alto: 115, medio: 82, relaxado: 58 },
  { time: "18:00", normal: 72, alto: 120, medio: 85, relaxado: 60 },
  { time: "21:00", normal: 67, alto: 112, medio: 81, relaxado: 56 },
]

export function CardioComparison({ className }: CardioComparisonProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Comparação de Batimentos</CardTitle>
        <CardDescription>Compare os diferentes estados de batimentos cardíacos</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="todos">
          <TabsList className="mb-4">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="normal">Normal</TabsTrigger>
            <TabsTrigger value="alto">Alto</TabsTrigger>
            <TabsTrigger value="medio">Médio</TabsTrigger>
            <TabsTrigger value="relaxado">Relaxado</TabsTrigger>
          </TabsList>
          <TabsContent value="todos">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="normal" stroke="#10b981" name="Normal" />
                <Line type="monotone" dataKey="alto" stroke="#ef4444" name="Alto" />
                <Line type="monotone" dataKey="medio" stroke="#f59e0b" name="Médio" />
                <Line type="monotone" dataKey="relaxado" stroke="#3b82f6" name="Relaxado" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="normal">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="normal" stroke="#10b981" name="Normal" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="alto">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="alto" stroke="#ef4444" name="Alto" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="medio">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="medio" stroke="#f59e0b" name="Médio" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="relaxado">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="relaxado" stroke="#3b82f6" name="Relaxado" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
