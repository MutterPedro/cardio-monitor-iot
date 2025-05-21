import { useEffect, useRef, useState } from 'react';

export function useWebSocketHeartRate(url: string, initialHeartRate = 72) {
  const [heartRate, setHeartRate] = useState(initialHeartRate);
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setConnected(true);
    ws.current.onclose = () => setConnected(false);
    ws.current.onerror = () => setConnected(false);

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (typeof data.heartRate === 'number') {
          setHeartRate(data.heartRate);
          setLastUpdated(new Date());
        }
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };
  }, [url]);

  return { heartRate, connected, lastUpdated };
}
