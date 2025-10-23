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
    <div className="bg-card rounded-lg border border-border p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">
          ❓ Eventos sin clasificar
        </h3>
        <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-bold">
          {pendingEvents.length}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Ayuda a clasificar estos eventos para mejorar las alertas
      </p>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {pendingEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-sm font-medium text-foreground">Todos los eventos clasificados</p>
            <p className="text-xs text-muted-foreground mt-1">
              ¡Excelente trabajo! El sistema aprende de tus clasificaciones
            </p>
          </div>
        ) : (
          pendingEvents.map((event) => (
            <div key={event.id} className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-2 border-yellow-400 dark:border-yellow-800">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm text-foreground">{event.machine}</p>
                  <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                </div>
                <p className="text-sm text-foreground/70">
                  Duración: <span className="font-medium text-foreground">{formatDuration(event.duration)}</span>
                </p>
              </div>
              
              <p className="text-sm font-medium text-foreground/80 mb-3">¿Qué tipo de evento fue?</p>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => onClassify(event.id, 'thread_break')}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white gap-2 font-medium"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Rotura
                </Button>
                <Button
                  onClick={() => onClassify(event.id, 'frame_change')}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white gap-2 font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Bastidor
                </Button>
                <Button
                  onClick={() => onClassify(event.id, 'design_change')}
                  size="sm"
                  className="bg-purple-500 hover:bg-purple-600 text-white gap-2 font-medium"
                >
                  <Palette className="w-4 h-4" />
                  Diseño
                </Button>
                <Button
                  onClick={() => onClassify(event.id, 'thread_change')}
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-white gap-2 font-medium"
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
