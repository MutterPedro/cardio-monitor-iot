"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Brain } from "lucide-react"

interface StressLevelIndicatorProps {
  className?: string
  heartRate?: number
  heartRateVariability?: number
  oxygenLevel?: number
}

export function StressLevelIndicator({
  className,
  heartRate = 72,
  heartRateVariability = 50,
  oxygenLevel = 98,
}: StressLevelIndicatorProps) {
  const [stressLevel, setStressLevel] = useState(0)
  const [stressCategory, setStressCategory] = useState("")
  const [stressColor, setStressColor] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Calcula o nível de estresse com base na frequência cardíaca, variabilidade e oxigenação
  useEffect(() => {
    // Função para calcular o nível de estresse (0-100)
    const calculateStressLevel = () => {
      // Fatores que aumentam o estresse:
      // 1. Frequência cardíaca elevada
      // 2. Baixa variabilidade da frequência cardíaca (HRV)
      // 3. Baixa oxigenação do sangue
      // 4. Componente aleatório para simular outros fatores

      // Fator baseado na frequência cardíaca (0-40)
      // Frequência cardíaca normal: 60-100, quanto mais alto, maior o estresse
      let hrFactor = 0
      if (heartRate > 60) {
        hrFactor = Math.min(40, ((heartRate - 60) / 40) * 40)
      }

      // Fator baseado na variabilidade da frequência cardíaca (0-30)
      // HRV normal: 20-70ms, quanto menor, maior o estresse
      const hrvFactor = Math.max(0, 30 - (heartRateVariability / 70) * 30)

      // Fator baseado na oxigenação (0-20)
      // SpO2 normal: 95-100%, quanto menor, maior o estresse
      let oxygenFactor = 0
      if (oxygenLevel < 100) {
        oxygenFactor = Math.min(20, ((100 - oxygenLevel) / 10) * 20)
      }

      // Fator aleatório (0-10) para simular outros fatores
      const randomFactor = Math.random() * 10

      // Calcular o nível de estresse total (0-100)
      let calculatedStress = Math.min(100, hrFactor + hrvFactor + oxygenFactor + randomFactor)

      // Arredondar para um número inteiro
      calculatedStress = Math.round(calculatedStress)

      return calculatedStress
    }

    // Atualizar o nível de estresse
    const newStressLevel = calculateStressLevel()
    setStressLevel(newStressLevel)
    setLastUpdated(new Date())

    // Determinar a categoria de estresse
    if (newStressLevel < 30) {
      setStressCategory("Relaxado")
      setStressColor("bg-green-500")
    } else if (newStressLevel < 50) {
      setStressCategory("Normal")
      setStressColor("bg-blue-500")
    } else if (newStressLevel < 70) {
      setStressCategory("Moderado")
      setStressColor("bg-yellow-500")
    } else {
      setStressCategory("Elevado")
      setStressColor("bg-red-500")
    }

    // Simular atualizações periódicas
    const interval = setInterval(() => {
      const newLevel = calculateStressLevel()
      setStressLevel(newLevel)
      setLastUpdated(new Date())

      // Atualizar a categoria
      if (newLevel < 30) {
        setStressCategory("Relaxado")
        setStressColor("bg-green-500")
      } else if (newLevel < 50) {
        setStressCategory("Normal")
        setStressColor("bg-blue-500")
      } else if (newLevel < 70) {
        setStressCategory("Moderado")
        setStressColor("bg-yellow-500")
      } else {
        setStressCategory("Elevado")
        setStressColor("bg-red-500")
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [heartRate, heartRateVariability, oxygenLevel])

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Nível de Estresse</CardTitle>
        <Brain className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-2 sm:py-4">
          <div className="w-full mb-4">
            <Progress value={stressLevel} className="h-2" indicatorClassName={stressColor} />
          </div>
          <div className="flex justify-between w-full text-xs text-muted-foreground mb-4">
            <span>Baixo</span>
            <span>Médio</span>
            <span>Alto</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`h-3 w-3 rounded-full ${stressColor}`}></div>
            <span className="text-xl font-bold">{stressCategory}</span>
          </div>
          <div className="text-3xl font-bold tabular-nums">{stressLevel}%</div>
          <div className="mt-4 text-xs text-muted-foreground">
            Última atualização: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
