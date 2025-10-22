import { Alert, AlertType } from '@/types/machine';
import { AlertCircle, AlertTriangle, Zap, Info, RefreshCw, Palette, Scissors } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface AlertsListProps {
  alerts: Alert[];
  onResolveAlert?: (alertId: string | number) => void;
}

export function AlertsList({ alerts, onResolveAlert }: AlertsListProps) {
  const [filter, setFilter] = useState<AlertType | 'all'>('all');

  const eventConfig = {
    thread_break: {
      icon: <AlertTriangle className="w-4 h-4" />,
      label: 'Rotura de hilo',
      color: 'bg-destructive/10 border-destructive/30',
      textColor: 'text-destructive',
      badgeColor: 'bg-destructive text-destructive-foreground'
    },
    frame_change: {
      icon: <RefreshCw className="w-4 h-4" />,
      label: 'Cambio de bastidor',
      color: 'bg-info/10 border-info/30',
      textColor: 'text-info',
      badgeColor: 'bg-info/20 text-info'
    },
    design_change: {
      icon: <Palette className="w-4 h-4" />,
      label: 'Cambio de diseño',
      color: 'bg-purple-100 border-purple-300 dark:bg-purple-950 dark:border-purple-800',
      textColor: 'text-purple-700 dark:text-purple-400',
      badgeColor: 'bg-purple-500/20 text-purple-700 dark:text-purple-400'
    },
    thread_change: {
      icon: <Scissors className="w-4 h-4" />,
      label: 'Cambio de hilo',
      color: 'bg-warning/10 border-warning/30',
      textColor: 'text-warning',
      badgeColor: 'bg-warning/20 text-warning'
    },
    fluctuation: {
      icon: <Zap className="w-4 h-4" />,
      label: 'Fluctuación',
      color: 'bg-muted border-border',
      textColor: 'text-muted-foreground',
      badgeColor: 'bg-muted text-muted-foreground'
    },
    stopped: {
      icon: <AlertCircle className="w-4 h-4" />,
      label: 'Máquina detenida',
      color: 'bg-destructive/10 border-destructive/30',
      textColor: 'text-destructive',
      badgeColor: 'bg-destructive text-destructive-foreground'
    },
    anomaly: {
      icon: <Zap className="w-4 h-4" />,
      label: 'Corriente anómala',
      color: 'bg-info/10 border-info/30',
      textColor: 'text-info',
      badgeColor: 'bg-info/20 text-info'
    },
    info: {
      icon: <Info className="w-4 h-4" />,
      label: 'Inicio de turno',
      color: 'bg-primary/10 border-primary/30',
      textColor: 'text-primary',
      badgeColor: 'bg-primary/20 text-primary'
    },
    unknown: {
      icon: <Info className="w-4 h-4" />,
      label: 'Sin clasificar',
      color: 'bg-yellow-100 border-yellow-300 dark:bg-yellow-950 dark:border-yellow-800',
      textColor: 'text-yellow-700 dark:text-yellow-400',
      badgeColor: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
    }
  };

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alertas y Eventos</h3>
          <p className="text-sm text-muted-foreground">
            {filteredAlerts.length} {filter === 'all' ? 'eventos' : 'filtrados'}
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as AlertType | 'all')}
          className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Todos</option>
          <option value="thread_break">🔴 Roturas</option>
          <option value="frame_change">🔄 Bastidores</option>
          <option value="design_change">🎨 Diseños</option>
          <option value="thread_change">🧵 Hilos</option>
          <option value="unknown">❓ Sin clasificar</option>
        </select>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay eventos de este tipo</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = eventConfig[alert.type];
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${config.color}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${config.badgeColor} flex-shrink-0`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className={`font-semibold text-sm ${config.textColor}`}>{config.label}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.machine}</p>
                    <p className="text-xs text-muted-foreground mt-1">Duración: {formatDuration(alert.duration)}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        alert.status === 'active' 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'bg-success/10 text-success'
                      }`}>
                        {alert.status === 'active' ? 'Activa' : 'Resuelta'}
                      </span>
                      {alert.priority === 'HIGH' && alert.status === 'active' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-destructive text-destructive-foreground">
                          Urgente
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {alert.type === 'thread_break' && alert.status === 'active' && onResolveAlert && (
                  <Button
                    onClick={() => onResolveAlert(alert.id)}
                    size="sm"
                    className="w-full mt-3 bg-destructive hover:bg-destructive/90"
                  >
                    🔧 Marcar como resuelta
                  </Button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
