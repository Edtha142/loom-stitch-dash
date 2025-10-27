import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertType } from '@/types/machine';
import { AlertTriangle, RefreshCw, Palette, Scissors, Wrench, AlertOctagon } from 'lucide-react';

interface RegisterEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  machineName: string;
  onRegister: (eventType: AlertType, comment: string) => void;
}

export function RegisterEventModal({ open, onOpenChange, machineName, onRegister }: RegisterEventModalProps) {
  const [selectedType, setSelectedType] = useState<AlertType | null>(null);
  const [comment, setComment] = useState('');

  const eventTypes = [
    { type: 'thread_break' as AlertType, icon: AlertTriangle, label: 'Rotura de Hilo', color: 'bg-red-500 hover:bg-red-600' },
    { type: 'frame_change' as AlertType, icon: RefreshCw, label: 'Cambio de Bastidor', color: 'bg-blue-500 hover:bg-blue-600' },
    { type: 'design_change' as AlertType, icon: Palette, label: 'Cambio de Diseño', color: 'bg-purple-500 hover:bg-purple-600' },
    { type: 'thread_change' as AlertType, icon: Scissors, label: 'Cambio de Hilo/Bobina', color: 'bg-amber-500 hover:bg-amber-600' },
    { type: 'stopped' as AlertType, icon: Wrench, label: 'Mantenimiento', color: 'bg-cyan-500 hover:bg-cyan-600' },
    { type: 'anomaly' as AlertType, icon: AlertOctagon, label: 'Falla Mecánica', color: 'bg-red-700 hover:bg-red-800' },
  ];

  const handleRegister = () => {
    if (selectedType) {
      onRegister(selectedType, comment);
      setSelectedType(null);
      setComment('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            ⚠️ Registrar Evento - {machineName}
          </DialogTitle>
          <DialogDescription>
            Hora: {new Date().toLocaleTimeString('es-ES')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">¿Qué tipo de evento ocurrió?</Label>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes.map(({ type, icon: Icon, label, color }) => (
                <Button
                  key={type}
                  type="button"
                  variant={selectedType === type ? "default" : "outline"}
                  className={`h-auto py-3 px-3 flex flex-col items-center gap-2 ${
                    selectedType === type ? color : ''
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs text-center leading-tight">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comentario (opcional)</Label>
            <Textarea
              id="comment"
              placeholder="Ej: Hilo rojo cabezal 5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="flex-1"
            onClick={handleRegister}
            disabled={!selectedType}
          >
            Registrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
