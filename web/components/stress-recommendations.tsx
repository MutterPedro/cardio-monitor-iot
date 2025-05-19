"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Lightbulb } from "lucide-react"

interface StressRecommendationsProps {
  className?: string
  stressLevel?: number
  oxygenLevel?: number
}

export function StressRecommendations({ className, stressLevel = 50, oxygenLevel = 98 }: StressRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    // Atualiza as recomendações com base no nível de estresse e oxigenação
    const updateRecommendations = () => {
      const stressRecommendations = []
      const oxygenRecommendations = []

      // Recomendações baseadas no nível de estresse
      if (stressLevel < 30) {
        // Estresse baixo
        stressRecommendations.push(
          "Continue com suas práticas atuais de gerenciamento de estresse.",
          "Mantenha sua rotina de exercícios e sono regular.",
          "Pratique a gratidão diariamente para manter o bem-estar mental.",
        )
      } else if (stressLevel < 50) {
        // Estresse normal
        stressRecommendations.push(
          "Faça pausas curtas durante o dia para respirar profundamente.",
          "Mantenha uma alimentação equilibrada e hidratação adequada.",
          "Reserve tempo para atividades que você gosta.",
        )
      } else if (stressLevel < 70) {
        // Estresse moderado
        stressRecommendations.push(
          "Pratique 10 minutos de meditação ou respiração profunda.",
          "Considere reduzir a cafeína e aumentar a ingestão de água.",
          "Faça uma caminhada leve ou alongamento para relaxar o corpo.",
        )
      } else {
        // Estresse elevado
        stressRecommendations.push(
          "Pratique técnicas de respiração 4-7-8 (inspire por 4s, segure por 7s, expire por 8s).",
          "Considere tirar uma pausa das atividades estressantes se possível.",
          "Priorize o sono e o descanso nas próximas horas.",
          "Se o estresse persistir, considere falar com um profissional de saúde.",
        )
      }

      // Recomendações baseadas no nível de oxigenação
      if (oxygenLevel >= 95) {
        // Oxigenação normal
        oxygenRecommendations.push("Seus níveis de oxigênio estão bons. Continue com suas atividades normais.")
      } else if (oxygenLevel >= 90) {
        // Oxigenação de atenção
        oxygenRecommendations.push(
          "Pratique respiração profunda para melhorar a oxigenação.",
          "Considere passar algum tempo ao ar livre em um ambiente com ar limpo.",
        )
      } else {
        // Oxigenação baixa
        oxygenRecommendations.push(
          "Seus níveis de oxigênio estão baixos. Considere descansar e monitorar.",
          "Pratique respiração diafragmática para melhorar a oxigenação.",
          "Se os níveis permanecerem baixos, consulte um profissional de saúde.",
        )
      }

      // Combinar recomendações, priorizando as mais importantes
      const combinedRecommendations = []

      // Se a oxigenação estiver baixa, priorize essas recomendações
      if (oxygenLevel < 90) {
        combinedRecommendations.push(...oxygenRecommendations)
        // Adicionar apenas algumas recomendações de estresse para não sobrecarregar
        if (stressLevel >= 70) {
          combinedRecommendations.push(stressRecommendations[0])
        }
      }
      // Se o estresse estiver alto, priorize essas recomendações
      else if (stressLevel >= 70) {
        combinedRecommendations.push(...stressRecommendations)
        // Adicionar apenas algumas recomendações de oxigenação
        if (oxygenLevel < 95) {
          combinedRecommendations.push(oxygenRecommendations[0])
        }
      }
      // Caso contrário, combine as recomendações
      else {
        if (oxygenLevel < 95) {
          combinedRecommendations.push(...oxygenRecommendations)
        }
        combinedRecommendations.push(...stressRecommendations.slice(0, 3))
      }

      setRecommendations(combinedRecommendations)
    }

    updateRecommendations()

    // Atualiza as recomendações quando os níveis mudam
    const interval = setInterval(() => {
      updateRecommendations()
    }, 5000)

    return () => clearInterval(interval)
  }, [stressLevel, oxygenLevel])

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Recomendações</CardTitle>
          <CardDescription>Baseadas nos seus níveis atuais</CardDescription>
        </div>
        <Lightbulb className="h-5 w-5 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <span className="text-sm">{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
