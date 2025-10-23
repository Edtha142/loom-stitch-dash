import { Alert, AlertType } from '@/types/machine';
import { useState } from 'react';
import { Button } from './ui/button';

interface AlertsListProps {
  alerts: Alert[];
  onResolveAlert?: (alertId: string | number) => void;
}

const eventConfig = {
  thread_break: {
    emoji: '🔴',
    label: 'Rotura de hilo',
    color: 'bg-red-50 dark:bg-red-950/20 border-red-400 dark:border-red-800',
    textColor: 'text-red-800 dark:text-red-300',
    priority: 'HIGH'
  },
  frame_change: {
    emoji: '🔄',
    label: 'Cambio de bastidor',
    color: 'bg-blue-50 dark:bg-blue-950/20 border-blue-400 dark:border-blue-800',
    textColor: 'text-blue-800 dark:text-blue-300',
    priority: 'LOW'
  },
  design_change: {
    emoji: '🎨',
    label: 'Cambio de diseño',
    color: 'bg-purple-50 dark:bg-purple-950/20 border-purple-400 dark:border-purple-800',
    textColor: 'text-purple-800 dark:text-purple-300',
    priority: 'LOW'
  },
  thread_change: {
    emoji: '🧵',
    label: 'Cambio de hilo',
    color: 'bg-amber-50 dark:bg-amber-950/20 border-amber-400 dark:border-amber-800',
    textColor: 'text-amber-800 dark:text-amber-300',
    priority: 'LOW'
  },
  fluctuation: {
    emoji: '⚡',
    label: 'Fluctuación',
    color: 'bg-gray-50 dark:bg-gray-950/20 border-gray-400 dark:border-gray-800',
    textColor: 'text-gray-800 dark:text-gray-300',
    priority: 'IGNORE'
  },
  stopped: {
    emoji: '🚨',
    label: 'Máquina detenida',
    color: 'bg-red-50 dark:bg-red-950/20 border-red-400 dark:border-red-800',
    textColor: 'text-red-800 dark:text-red-300',
    priority: 'HIGH'
  },
  anomaly: {
    emoji: '⚡',
    label: 'Corriente anómala',
    color: 'bg-orange-50 dark:bg-orange-950/20 border-orange-400 dark:border-orange-800',
    textColor: 'text-orange-800 dark:text-orange-300',
    priority: 'MEDIUM'
  },
  info: {
    emoji: 'ℹ️',
    label: 'Información',
    color: 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-400 dark:border-cyan-800',
    textColor: 'text-cyan-800 dark:text-cyan-300',
    priority: 'LOW'
  },
  unknown: {
    emoji: '❓',
    label: 'Sin clasificar',
    color: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-400 dark:border-yellow-800',
    textColor: 'text-yellow-800 dark:text-yellow-300',
    priority: 'MEDIUM'
  }
};

export function AlertsList({ alerts, onResolveAlert }: AlertsListProps) {
  const [filter, setFilter] = useState<AlertType | 'all'>('all');

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-md">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-lg font-bold text-foreground">
          📋 Eventos Recientes
        </h3>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as AlertType | 'all')}
          className="px-4 py-2 text-sm border-2 border-border rounded-lg bg-background text-foreground font-medium hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
        >
          <option value="all">📋 Todos los eventos</option>
          <option value="thread_break">🔴 Solo roturas</option>
          <option value="frame_change">🔄 Cambio bastidor</option>
          <option value="design_change">🎨 Cambio diseño</option>
          <option value="thread_change">🧵 Cambio hilo</option>
          <option value="stopped">🚨 Detenida</option>
          <option value="anomaly">⚡ Anomalía</option>
          <option value="unknown">❓ Sin clasificar</option>
        </select>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3">✅</div>
            <p className="font-medium">No hay eventos de este tipo</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = eventConfig[alert.type];
            
            return (
              <div 
                key={alert.id}
                className={`p-4 rounded-lg border-2 ${config.color} transition-all hover:shadow-md`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{config.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className={`font-semibold ${config.textColor}`}>
                          {config.label}
                        </p>
                        {config.priority === 'HIGH' && (
                          <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded-full font-medium">
                            URGENTE
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground/70">
                        {alert.machine} • {formatDuration(alert.duration)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.timestamp}</p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
                    alert.status === 'active' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {alert.status === 'active' ? 'Activa' : 'Resuelta'}
                  </span>
                </div>
                
                {alert.type === 'thread_break' && alert.status === 'active' && onResolveAlert && (
                  <Button 
                    onClick={() => onResolveAlert(alert.id)}
                    className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-medium"
                    size="sm"
                  >
                    🔧 Marcar como resuelta
                  </Button>
                )}
              </div>
            );
          })
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Mostrando <span className="font-bold text-foreground">{filteredAlerts.length}</span> de{' '}
          <span className="font-bold text-foreground">{alerts.length}</span> eventos
        </p>
      </div>
    </div>
  );
}
