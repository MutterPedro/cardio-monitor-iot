"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Heart } from "lucide-react"

interface UserHeartRateInputProps {
  onSubmit: (value: number) => void
  onCancel: () => void
}

export function UserHeartRateInput({ onSubmit, onCancel }: UserHeartRateInputProps) {
  const [value, setValue] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = () => {
    // Validar o valor
    const numValue = Number.parseInt(value, 10)
    if (isNaN(numValue)) {
      setError("Por favor, insira um número válido")
      return
    }

    if (numValue < 30 || numValue > 220) {
      setError("O valor deve estar entre 30 e 220 bpm")
      return
    }

    onSubmit(numValue)
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Registrar Batimento Cardíaco
          </DialogTitle>
          <DialogDescription>Insira seu batimento cardíaco atual em batimentos por minuto (bpm).</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bpm">Batimentos por minuto (BPM)</Label>
            <Input
              id="bpm"
              type="number"
              placeholder="Ex: 72"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setError("")
              }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="rounded-lg border p-2 sm:p-3 text-center">
              <div className="text-xs sm:text-sm font-medium">Normal</div>
              <div className="text-xs text-muted-foreground">60-100 bpm</div>
            </div>
            <div className="rounded-lg border p-2 sm:p-3 text-center">
              <div className="text-xs sm:text-sm font-medium">Alto</div>
              <div className="text-xs text-muted-foreground">&gt;100 bpm</div>
            </div>
            <div className="rounded-lg border p-2 sm:p-3 text-center">
              <div className="text-xs sm:text-sm font-medium">Médio</div>
              <div className="text-xs text-muted-foreground">70-90 bpm</div>
            </div>
            <div className="rounded-lg border p-2 sm:p-3 text-center">
              <div className="text-xs sm:text-sm font-medium">Relaxado</div>
              <div className="text-xs text-muted-foreground">&lt;60 bpm</div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onCancel} className="sm:w-auto w-full">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="sm:w-auto w-full">
            Registrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
