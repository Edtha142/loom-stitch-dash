import { Alert, AlertType } from '@/types/machine';
import { Info, AlertTriangle, RefreshCw, Palette, Scissors } from 'lucide-react';
import { Button } from './ui/button';

interface EventClassificationProps {
  pendingEvents: Alert[];
  onClassify: (eventId: string | number, type: AlertType) => void;
}

export function EventClassification({ pendingEvents, onClassify }: EventClassificationProps) {
  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Info className="w-5 h-5 text-warning" />
          Eventos sin clasificar ({pendingEvents.length})
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Ayuda a clasificar estos eventos para mejorar las alertas
        </p>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {pendingEvents.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 bg-success/10 rounded-full flex items-center justify-center">
              <span className="text-3xl">✅</span>
            </div>
            <p className="text-sm font-medium text-foreground">Todos los eventos están clasificados</p>
            <p className="text-xs text-muted-foreground mt-1">
              El sistema aprenderá de tus clasificaciones
            </p>
          </div>
        ) : (
          pendingEvents.map((event) => (
            <div key={event.id} className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-800">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm text-foreground">{event.machine}</p>
                  <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Duración: <span className="font-medium text-foreground">{formatDuration(event.duration)}</span>
                </p>
              </div>
              
              <p className="text-sm font-medium text-foreground mb-3">¿Qué tipo de evento fue?</p>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => onClassify(event.id, 'thread_break')}
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Rotura
                </Button>
                <Button
                  onClick={() => onClassify(event.id, 'frame_change')}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Bastidor
                </Button>
                <Button
                  onClick={() => onClassify(event.id, 'design_change')}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Palette className="w-4 h-4" />
                  Diseño
                </Button>
                <Button
                  onClick={() => onClassify(event.id, 'thread_change')}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Scissors className="w-4 h-4" />
                  Hilo
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
