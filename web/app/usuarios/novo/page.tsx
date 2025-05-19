"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"

export default function NewUserPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    idade: "",
    sexo: "",
    altura: "",
    peso: "",
    telefone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Dados do formulário:", formData)
    // Aqui você implementaria a lógica para salvar o usuário
    alert("Usuário cadastrado com sucesso!")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Novo Usuário" text="Cadastre um novo usuário no sistema." />

      <div className="grid gap-6">
        <Button variant="outline" size="sm" className="w-fit" asChild>
          <a href="/usuarios">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para lista
          </a>
        </Button>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Preencha os dados do usuário para cadastro no sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite o email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idade">Idade</Label>
                  <Input
                    id="idade"
                    name="idade"
                    type="number"
                    placeholder="Digite a idade"
                    value={formData.idade}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo</Label>
                  <Select onValueChange={(value) => handleSelectChange("sexo", value)} value={formData.sexo}>
                    <SelectTrigger id="sexo">
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="altura">Altura (cm)</Label>
                  <Input
                    id="altura"
                    name="altura"
                    type="number"
                    placeholder="Digite a altura em cm"
                    value={formData.altura}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    name="peso"
                    type="number"
                    placeholder="Digite o peso em kg"
                    value={formData.peso}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    placeholder="Digite o telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <a href="/usuarios">Cancelar</a>
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Salvar Usuário
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardShell>
  )
}
