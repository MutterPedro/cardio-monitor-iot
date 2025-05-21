'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWebSocketHeartRate } from '@/hooks/use-websocket-heart-rate';

interface RealTimeHeartRateProps {
  className?: string;
  initialHeartRate?: number;
}

export function RealTimeHeartRate({
  className,
  initialHeartRate = 72,
}: RealTimeHeartRateProps) {
  const [heartRateStatus, setHeartRateStatus] = useState<string>('normal');

  const wsUrl =
    process.env.NEXT_PUBLIC_WS_HEART_RATE_URL || 'ws://localhost:4000';

  const { heartRate, connected, lastUpdated } = useWebSocketHeartRate(
    wsUrl,
    initialHeartRate,
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'normal':
        return {
          label: 'Normal',
          className: 'border-green-500 text-green-600',
        };
      case 'alto':
        return { label: 'Alto', className: 'border-red-500 text-red-600' };
      case 'medio':
        return {
          label: 'Médio',
          className: 'border-yellow-500 text-yellow-600',
        };
      case 'relaxado':
        return {
          label: 'Relaxado',
          className: 'border-blue-500 text-blue-600',
        };
      default:
        return { label: 'Desconhecido', className: '' };
    }
  };

  const statusConfig = getStatusConfig(heartRateStatus);

  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Batimento em Tempo Real
        </CardTitle>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              connected ? 'bg-green-500' : 'bg-gray-300'
            } ${connected ? 'animate-pulse' : ''}`}
          />
          <span className="text-xs text-muted-foreground">
            {connected ? 'Conectado' : 'Conectando...'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-2 sm:py-4">
          <div className="relative mb-2 sm:mb-4">
            <Heart
              className={`h-12 w-12 sm:h-16 sm:w-16 ${
                heartRateStatus === 'alto'
                  ? 'text-red-500'
                  : heartRateStatus === 'normal'
                  ? 'text-green-500'
                  : heartRateStatus === 'medio'
                  ? 'text-yellow-500'
                  : 'text-blue-500'
              } ${connected ? 'animate-pulse' : ''}`}
              style={{ animationDuration: `${60000 / (heartRate || 60)}ms` }}
            />
          </div>
          <div className="text-3xl sm:text-4xl font-bold tabular-nums">
            {heartRate} bpm
          </div>
          <div className="flex items-center mt-2">
            <Badge variant="outline" className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          </div>
          <div className="mt-2 sm:mt-4 text-xs text-muted-foreground">
            Última atualização: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
