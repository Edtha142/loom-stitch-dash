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
      <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Eventos del Turno</p>
          <span className="text-2xl">📊</span>
        </div>
        
        {/* ROTURAS - Destacado en rojo */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-950/20 p-4 rounded-lg mb-4 border-l-4 border-red-500 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-3xl font-bold text-red-700 dark:text-red-400">{eventStats?.threadBreaks ?? kpis.threadBreaks}</span>
            <div className="text-right">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Roturas
              </p>
              <p className="text-xs text-red-500 dark:text-red-400 font-medium">REQUIERE ATENCIÓN</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-red-200 dark:border-red-800">
            <p className="text-xs text-red-600 dark:text-red-400">4 en M1, 2 en M2</p>
          </div>
        </div>
        
        {/* Eventos operativos - Solo información */}
        {eventStats && (
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-foreground/70 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                Cambios bastidor
              </span>
              <span className="font-bold text-foreground">{eventStats.frameChanges}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-foreground/70 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                Cambios diseño
              </span>
              <span className="font-bold text-foreground">{eventStats.designChanges}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-foreground/70 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                Cambios hilo
              </span>
              <span className="font-bold text-foreground">{eventStats.threadChanges}</span>
            </div>
            
            {/* Eventos sin clasificar - alerta media */}
            {eventStats.unknown > 0 && (
              <div className="flex justify-between items-center py-2 bg-yellow-50 dark:bg-yellow-950/20 px-3 rounded border border-yellow-300 dark:border-yellow-800 mt-2">
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">❓ Sin clasificar</span>
                <span className="font-bold text-yellow-800 dark:text-yellow-300">{eventStats.unknown}</span>
              </div>
            )}
            
            {/* Total */}
            <div className="mt-4 pt-4 border-t-2 border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">TOTAL EVENTOS</span>
                <span className="text-2xl font-bold text-foreground">
                  {eventStats.threadBreaks + eventStats.frameChanges + eventStats.designChanges + eventStats.threadChanges + eventStats.unknown}
                </span>
              </div>
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
