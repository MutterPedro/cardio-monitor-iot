import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ApiProvider } from "@/components/api-simulator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CardioMonitor - Monitoramento de Batimentos Cardíacos",
  description: "Sistema de monitoramento de batimentos cardíacos para usuários e profissionais de saúde",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ApiProvider>{children}</ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
