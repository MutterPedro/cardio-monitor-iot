"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Definir o tipo de dados para os batimentos cardíacos
interface HeartRateData {
  userId: string
  timestamp: Date
  bpm: number
  status: "normal" | "alto" | "medio" | "relaxado"
}

// Definir o contexto da API
interface ApiContextType {
  connected: boolean
  heartRateData: HeartRateData | null
  heartRateHistory: HeartRateData[]
  userDistribution: {
    normal: number
    alto: number
    medio: number
    relaxado: number
  }
}

// Criar o contexto
const ApiContext = createContext<ApiContextType | undefined>(undefined)

// Hook personalizado para usar o contexto da API
export function useApi() {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error("useApi deve ser usado dentro de um ApiProvider")
  }
  return context
}

// Componente provedor da API
export function ApiProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [heartRateData, setHeartRateData] = useState<HeartRateData | null>(null)
  const [heartRateHistory, setHeartRateHistory] = useState<HeartRateData[]>([])
  const [userDistribution, setUserDistribution] = useState({
    normal: 60,
    alto: 15,
    medio: 20,
    relaxado: 5,
  })

  // Simular conexão com a API
  useEffect(() => {
    console.log("Conectando à API...")

    // Simular tempo de conexão
    const connectionTimeout = setTimeout(() => {
      console.log("Conectado à API")
      setConnected(true)
    }, 2000)

    return () => {
      clearTimeout(connectionTimeout)
      console.log("Desconectado da API")
    }
  }, [])

  // Simular recebimento de dados em tempo real
  useEffect(() => {
    if (!connected) return

    // Função para gerar dados simulados
    const generateData = () => {
      // Gerar um valor aleatório entre 50 e 120 bpm
      const bpm = Math.floor(Math.random() * 70) + 50

      // Determinar o status com base no valor
      let status: "normal" | "alto" | "medio" | "relaxado"
      if (bpm > 100) {
        status = "alto"
      } else if (bpm >= 70 && bpm <= 90) {
        status = "medio"
      } else if (bpm >= 60 && bpm <= 100) {
        status = "normal"
      } else {
        status = "relaxado"
      }

      // Criar o objeto de dados
      const data: HeartRateData = {
        userId: "user-1",
        timestamp: new Date(),
        bpm,
        status,
      }

      // Atualizar o estado
      setHeartRateData(data)

      // Adicionar ao histórico, mantendo apenas os últimos 100 registros
      setHeartRateHistory((prev) => {
        const newHistory = [...prev, data]
        if (newHistory.length > 100) {
          return newHistory.slice(newHistory.length - 100)
        }
        return newHistory
      })
    }

    // Gerar dados iniciais
    generateData()

    // Configurar intervalo para gerar novos dados a cada 2 segundos
    const interval = setInterval(generateData, 2000)

    // Configurar intervalo para atualizar a distribuição a cada 10 segundos
    const distributionInterval = setInterval(() => {
      // Gerar novos valores aleatórios, mantendo o total em 100%
      const normalValue = Math.floor(Math.random() * 40) + 40 // 40-80%
      const altoValue = Math.floor(Math.random() * 20) // 0-20%
      const medioValue = Math.floor(Math.random() * 20) // 0-20%

      // Calcular o valor relaxado para que o total seja 100%
      const relaxadoValue = 100 - normalValue - altoValue - medioValue

      setUserDistribution({
        normal: normalValue,
        alto: altoValue,
        medio: medioValue,
        relaxado: relaxadoValue,
      })
    }, 10000)

    return () => {
      clearInterval(interval)
      clearInterval(distributionInterval)
    }
  }, [connected])

  // Valor do contexto
  const value = {
    connected,
    heartRateData,
    heartRateHistory,
    userDistribution,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}
