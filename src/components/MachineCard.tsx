import { Machine } from '@/types/machine';
import { Activity, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MachineCardProps {
  machine: Machine;
  onRegisterEvent: () => void;
}

export function MachineCard({ machine, onRegisterEvent }: MachineCardProps) {
  const getStatusColor = (status: Machine['status']) => {
    switch (status) {
      case 'RUNNING':
        return 'bg-success/10 text-success border-success/20';
      case 'IDLE':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'OFF':
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: Machine['status']) => {
    switch (status) {
      case 'RUNNING':
        return 'Bordando';
      case 'IDLE':
        return 'En Espera';
      case 'OFF':
        return 'Apagada';
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{machine.name}</h3>
          <p className="text-xs text-muted-foreground">{machine.heads} cabezales</p>
        </div>
        <Activity className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-3">
        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor(machine.status)}`}>
          <div className={`w-2 h-2 rounded-full ${machine.status === 'RUNNING' ? 'bg-success pulse-success' : machine.status === 'IDLE' ? 'bg-warning pulse-warning' : 'bg-muted-foreground'}`} />
          {getStatusLabel(machine.status)}
        </div>

        {/* Current and Power */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Corriente</p>
            <p className="text-lg font-bold text-foreground">{machine.current.toFixed(1)} A</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Potencia</p>
            <p className="text-lg font-bold text-foreground">{machine.power} W</p>
          </div>
        </div>

        {/* Time in State */}
        <div className="text-xs text-muted-foreground">
          Tiempo en estado: <span className="font-medium text-foreground">{formatTime(machine.timeInState)}</span>
        </div>

        {/* Register Event Button */}
        <Button
          variant="outline"
          className="w-full mt-2 gap-2 border-amber-500 text-amber-700 hover:bg-amber-50"
          onClick={(e) => {
            e.stopPropagation();
            onRegisterEvent();
          }}
        >
          <AlertTriangle className="h-4 w-4" />
          Registrar Evento
        </Button>
      </div>
    </div>
  );
}
