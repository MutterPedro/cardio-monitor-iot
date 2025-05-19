"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const hourlyData = [
  { time: "00:00", bpm: 65 },
  { time: "01:00", bpm: 63 },
  { time: "02:00", bpm: 62 },
  { time: "03:00", bpm: 60 },
  { time: "04:00", bpm: 61 },
  { time: "05:00", bpm: 63 },
  { time: "06:00", bpm: 68 },
  { time: "07:00", bpm: 75 },
  { time: "08:00", bpm: 82 },
  { time: "09:00", bpm: 85 },
  { time: "10:00", bpm: 80 },
  { time: "11:00", bpm: 78 },
  { time: "12:00", bpm: 82 },
  { time: "13:00", bpm: 85 },
  { time: "14:00", bpm: 80 },
  { time: "15:00", bpm: 78 },
  { time: "16:00", bpm: 75 },
  { time: "17:00", bpm: 72 },
  { time: "18:00", bpm: 70 },
  { time: "19:00", bpm: 68 },
  { time: "20:00", bpm: 65 },
  { time: "21:00", bpm: 63 },
  { time: "22:00", bpm: 62 },
  { time: "23:00", bpm: 60 },
]

const dailyData = [
  { day: "Seg", min: 58, max: 95, avg: 72 },
  { day: "Ter", min: 60, max: 100, avg: 75 },
  { day: "Qua", min: 55, max: 90, avg: 70 },
  { day: "Qui", min: 62, max: 105, avg: 78 },
  { day: "Sex", min: 60, max: 98, avg: 74 },
  { day: "Sáb", min: 55, max: 85, avg: 68 },
  { day: "Dom", min: 52, max: 80, avg: 65 },
]

const monthlyData = [
  { month: "Jan", avg: 72 },
  { month: "Fev", avg: 74 },
  { month: "Mar", avg: 73 },
  { month: "Abr", avg: 75 },
  { month: "Mai", avg: 72 },
  { month: "Jun", avg: 70 },
  { month: "Jul", avg: 68 },
  { month: "Ago", avg: 69 },
  { month: "Set", avg: 71 },
  { month: "Out", avg: 73 },
  { month: "Nov", avg: 74 },
  { month: "Dez", avg: 75 },
]

export default function MonitoringPage() {
  const [selectedUser, setSelectedUser] = useState("todos")

  return (
    <DashboardShell>
      <DashboardHeader heading="Monitoramento Cardíaco" text="Visualize e analise os dados de batimentos cardíacos." />

      <div className="mb-6 max-w-xs">
        <Label htmlFor="user-select" className="mb-2 block">
          Selecionar Usuário
        </Label>
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger id="user-select">
            <SelectValue placeholder="Selecione um usuário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Usuários</SelectItem>
            <SelectItem value="1">João Silva</SelectItem>
            <SelectItem value="2">Maria Oliveira</SelectItem>
            <SelectItem value="3">Pedro Santos</SelectItem>
            <SelectItem value="4">Ana Costa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="diario">
        <TabsList className="mb-4">
          <TabsTrigger value="diario">Diário</TabsTrigger>
          <TabsTrigger value="semanal">Semanal</TabsTrigger>
          <TabsTrigger value="mensal">Mensal</TabsTrigger>
        </TabsList>

        <TabsContent value="diario">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento Diário</CardTitle>
              <CardDescription>Batimentos cardíacos nas últimas 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[50, 120]} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="bpm"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorBpm)"
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
                      dataKey={() => 90}
                      stroke="#f59e0b"
                      strokeDasharray="3 3"
                      name="Médio"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey={() => 70}
                      stroke="#10b981"
                      strokeDasharray="3 3"
                      name="Normal"
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
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Normal</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xl font-bold">60-100 bpm</p>
                    <p className="text-xs text-muted-foreground">Estado de repouso normal</p>
                  </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Alto</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xl font-bold">&gt;100 bpm</p>
                    <p className="text-xs text-muted-foreground">Taquicardia ou exercício</p>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200 dark:border-yellow-800">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Médio</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xl font-bold">70-90 bpm</p>
                    <p className="text-xs text-muted-foreground">Atividade leve</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Relaxado</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xl font-bold">50-70 bpm</p>
                    <p className="text-xs text-muted-foreground">Descanso profundo</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semanal">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento Semanal</CardTitle>
              <CardDescription>Batimentos cardíacos nos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[50, 120]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="min" stroke="#3b82f6" name="Mínimo" />
                    <Line type="monotone" dataKey="avg" stroke="#10b981" name="Média" />
                    <Line type="monotone" dataKey="max" stroke="#ef4444" name="Máximo" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mensal">
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento Mensal</CardTitle>
              <CardDescription>Média de batimentos cardíacos nos últimos 12 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[60, 80]} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="avg"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorAvg)"
                      name="Média BPM"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
