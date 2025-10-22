import { KPIs } from '@/types/machine';
import { TrendingUp, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface KPIPanelProps {
  kpis: KPIs;
}

export function KPIPanel({ kpis }: KPIPanelProps) {
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

      {/* Thread Breaks */}
      <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg border border-warning/20 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Roturas Detectadas</p>
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>
        <p className="text-3xl font-bold text-warning mb-1">{kpis.threadBreaks}</p>
        <p className="text-xs text-muted-foreground">4 en M1, 2 en M2</p>
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
