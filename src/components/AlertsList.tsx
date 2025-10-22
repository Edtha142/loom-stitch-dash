import { Alert, AlertType } from '@/types/machine';
import { AlertCircle, AlertTriangle, Zap, Info } from 'lucide-react';
import { useState } from 'react';

interface AlertsListProps {
  alerts: Alert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  const [filter, setFilter] = useState<AlertType | 'all'>('all');

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'thread_break':
        return <AlertTriangle className="w-4 h-4" />;
      case 'stopped':
        return <AlertCircle className="w-4 h-4" />;
      case 'anomaly':
        return <Zap className="w-4 h-4" />;
      case 'info':
        return <Info className="w-4 h-4" />;
    }
  };

  const getAlertLabel = (type: AlertType) => {
    switch (type) {
      case 'thread_break':
        return 'Rotura de hilo';
      case 'stopped':
        return 'Máquina detenida';
      case 'anomaly':
        return 'Corriente anómala';
      case 'info':
        return 'Inicio de turno';
    }
  };

  const getAlertColor = (type: AlertType) => {
    switch (type) {
      case 'thread_break':
        return 'text-warning bg-warning/10';
      case 'stopped':
        return 'text-destructive bg-destructive/10';
      case 'anomaly':
        return 'text-info bg-info/10';
      case 'info':
        return 'text-primary bg-primary/10';
    }
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alertas Recientes</h3>
          <p className="text-sm text-muted-foreground">Últimas {alerts.length} alertas</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as AlertType | 'all')}
          className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Todas</option>
          <option value="thread_break">Roturas</option>
          <option value="stopped">Detenidas</option>
          <option value="anomaly">Anomalías</option>
          <option value="info">Info</option>
        </select>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {filteredAlerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${getAlertColor(alert.type)}`}>
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">{getAlertLabel(alert.type)}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground">{alert.machine}</p>
              {alert.duration > 0 && (
                <p className="text-xs text-muted-foreground mt-1">Duración: {alert.duration} min</p>
              )}
            </div>
            <div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                alert.status === 'active' 
                  ? 'bg-destructive/10 text-destructive' 
                  : 'bg-success/10 text-success'
              }`}>
                {alert.status === 'active' ? 'Activa' : 'Resuelta'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
