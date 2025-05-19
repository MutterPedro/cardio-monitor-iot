"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Heart, Save } from "lucide-react"

export default function RegisterHeartRatePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    bpm: "",
    atividade: "",
    observacoes: "",
  })

  useEffect(() => {
    // Verificar se o usuário está logado
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulação de envio - em um app real, você faria uma chamada à API
    setTimeout(() => {
      // Redirecionar para o perfil após o registro
      router.push("/meu-perfil")
      setLoading(false)
    }, 1000)
  }

  if (!user) return null

  return (
    <DashboardShell>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <a href="/meu-perfil">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </a>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Registrar Batimento</h1>
          <p className="text-muted-foreground">Adicione uma nova medição de batimentos cardíacos</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <CardTitle>Nova Medição</CardTitle>
            </div>
            <CardDescription>Preencha os dados da sua medição de batimentos cardíacos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bpm">Batimentos por minuto (BPM)</Label>
                <Input
                  id="bpm"
                  name="bpm"
                  type="number"
                  placeholder="Ex: 72"
                  required
                  value={formData.bpm}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Insira o valor medido pelo seu dispositivo ou contado manualmente
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="atividade">Atividade</Label>
                <Select onValueChange={(value) => handleSelectChange("atividade", value)} value={formData.atividade}>
                  <SelectTrigger id="atividade">
                    <SelectValue placeholder="Selecione a atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="repouso">Repouso</SelectItem>
                    <SelectItem value="caminhada">Caminhada</SelectItem>
                    <SelectItem value="corrida">Corrida</SelectItem>
                    <SelectItem value="exercicio">Exercício intenso</SelectItem>
                    <SelectItem value="sono">Sono</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Descreva como você está se sentindo ou qualquer informação relevante"
                  value={formData.observacoes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg border p-3 text-center">
                <div className="text-sm font-medium">Normal</div>
                <div className="text-xs text-muted-foreground">60-100 bpm</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-sm font-medium">Alto</div>
                <div className="text-xs text-muted-foreground">&gt;100 bpm</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-sm font-medium">Médio</div>
                <div className="text-xs text-muted-foreground">70-90 bpm</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-sm font-medium">Relaxado</div>
                <div className="text-xs text-muted-foreground">&lt;60 bpm</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <a href="/meu-perfil">Cancelar</a>
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Medição
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardShell>
  )
}
