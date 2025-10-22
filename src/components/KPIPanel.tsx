import { KPIs, EventStats } from '@/types/machine';
import { TrendingUp, AlertTriangle, Clock, CheckCircle, RefreshCw, Palette, Scissors } from 'lucide-react';

interface KPIPanelProps {
  kpis: KPIs;
  eventStats?: EventStats;
}

export function KPIPanel({ kpis, eventStats }: KPIPanelProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Productivity */}
      <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Tiempo Productivo</p>
          <TrendingUp className="w-5 h-5 text-success" />
        </div>
        <p className="text-3xl font-bold text-success mb-1">{kpis.productivity}%</p>
        <p className="text-xs text-muted-foreground">{formatTime(kpis.totalMinutes)} de 12h</p>
      </div>

      {/* Thread Breaks - Solo roturas reales */}
      <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-lg border border-destructive/20 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Roturas de Hilo</p>
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <p className="text-3xl font-bold text-destructive mb-1">{eventStats?.threadBreaks ?? kpis.threadBreaks}</p>
        <p className="text-xs text-muted-foreground">Eventos críticos</p>
        
        {/* Desglose de eventos operativos */}
        {eventStats && (
          <div className="mt-3 pt-3 border-t border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <RefreshCw className="w-3 h-3" />
                Cambios bastidor
              </span>
              <span className="font-medium text-foreground">{eventStats.frameChanges}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Palette className="w-3 h-3" />
                Cambios diseño
              </span>
              <span className="font-medium text-foreground">{eventStats.designChanges}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Scissors className="w-3 h-3" />
                Cambios hilo
              </span>
              <span className="font-medium text-foreground">{eventStats.threadChanges}</span>
            </div>
          </div>
        )}
      </div>

      {/* MTBF */}
      <div className="bg-gradient-to-br from-info/10 to-info/5 rounded-lg border border-info/20 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">MTBF</p>
          <Clock className="w-5 h-5 text-info" />
        </div>
        <p className="text-3xl font-bold text-info mb-1">{kpis.mtbf} min</p>
        <p className="text-xs text-success">↑ 12% vs ayer</p>
      </div>

      {/* Availability */}
      <div className={`bg-gradient-to-br ${kpis.availability >= 80 ? 'from-success/10 to-success/5 border-success/20' : 'from-destructive/10 to-destructive/5 border-destructive/20'} rounded-lg border p-4`}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Disponibilidad</p>
          <CheckCircle className={`w-5 h-5 ${kpis.availability >= 80 ? 'text-success' : 'text-destructive'}`} />
        </div>
        <p className={`text-3xl font-bold ${kpis.availability >= 80 ? 'text-success' : 'text-destructive'} mb-1`}>{kpis.availability}%</p>
        <p className="text-xs text-muted-foreground">Meta: &gt;80%</p>
      </div>
    </div>
  );
}
