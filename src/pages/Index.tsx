import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { mockData } from "@/data/mockData";
import { DashboardData, AlertType } from "@/types/machine";
import { useAuth } from "@/hooks/useAuth";
import { MachineCard } from '@/components/MachineCard';
import { CurrentChart } from '@/components/CurrentChart';
import { KPIPanel } from '@/components/KPIPanel';
import { MachineComparison } from '@/components/MachineComparison';
import { AlertsList } from '@/components/AlertsList';
import { DailySummary } from '@/components/DailySummary';
import DashboardHeader from "@/components/DashboardHeader";
import { EventClassification } from '@/components/EventClassification';
import { RegisterEventModal } from "@/components/machines/RegisterEventModal";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData>(mockData);
  const [selectedMachine, setSelectedMachine] = useState('m1');
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(true);
  const [registerEventOpen, setRegisterEventOpen] = useState(false);
  const [selectedMachineForEvent, setSelectedMachineForEvent] = useState<string>("");

  const handleRegisterEvent = (machineName: string) => {
    setSelectedMachineForEvent(machineName);
    setRegisterEventOpen(true);
  };

  const handleEventRegistered = (eventType: AlertType, comment: string) => {
    const newAlert = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('es-ES'),
      type: eventType,
      machine: selectedMachineForEvent,
      duration: 0,
      status: 'active' as const,
      priority: (eventType === 'thread_break' || eventType === 'anomaly') ? 'HIGH' as const : 'LOW' as const,
      needsAlert: eventType === 'thread_break' || eventType === 'anomaly',
    };

    setData(prev => ({
      ...prev,
      alerts: [newAlert, ...prev.alerts],
    }));

    toast({
      title: "Evento registrado",
      description: `${selectedMachineForEvent} - ${getEventLabel(eventType)}`,
    });
  };

  const getEventLabel = (type: AlertType): string => {
    const labels: Record<AlertType, string> = {
      thread_break: 'Rotura de hilo',
      frame_change: 'Cambio de bastidor',
      design_change: 'Cambio de diseño',
      thread_change: 'Cambio de hilo',
      fluctuation: 'Fluctuación',
      stopped: 'Mantenimiento',
      anomaly: 'Falla mecánica',
      info: 'Información',
      unknown: 'Sin clasificar',
    };
    return labels[type] || type;
  };

  const handleClassifyEvent = (eventId: string | number, type: AlertType) => {
    setData(prev => ({
      ...prev,
      alerts: prev.alerts.map(alert =>
        alert.id === eventId
          ? { ...alert, type, status: 'resolved' as const }
          : alert
      ),
    }));
  };

  const handleResolveAlert = (alertId: string | number) => {
    setData(prev => ({
      ...prev,
      alerts: prev.alerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: 'resolved' as const }
          : alert
      ),
    }));

    toast({
      title: "Alerta resuelta",
      description: "La alerta ha sido marcada como resuelta",
    });
  };

  const pendingEvents = data.alerts.filter(a => a.type === 'unknown' && a.status === 'active');

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time data updates (without auto-alerts)
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newMachines = prevData.machines.map(machine => {
          // Random variations in current and power
          const currentVariation = (Math.random() - 0.5) * 2;
          const newCurrent = Math.max(0, machine.current + currentVariation);
          const newPower = Math.round(newCurrent * 220);

          // Occasionally change status
          let newStatus = machine.status;
          if (Math.random() < 0.02) {
            const statuses = ['RUNNING', 'IDLE', 'OFF'] as const;
            newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          }

          return {
            ...machine,
            current: parseFloat(newCurrent.toFixed(1)),
            power: newPower,
            status: newStatus,
            timeInState: machine.timeInState + 2
          };
        });

        // Add new data point to current chart
        const newDataPoint = {
          timestamp: new Date().toLocaleTimeString(),
          current: newMachines[0].current,
        };

        const newCurrentData = [...prevData.currentData.slice(1), newDataPoint];

        return {
          ...prevData,
          machines: newMachines,
          currentData: newCurrentData
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardHeader isConnected={isConnected} />
        
        <main className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Panel 1: Machine Status Cards - Full width */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-semibold text-foreground mb-4">Estado Actual de Máquinas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.machines.map(machine => (
                  <MachineCard 
                    key={machine.id} 
                    machine={machine}
                    onRegisterEvent={() => handleRegisterEvent(machine.name)}
                  />
                ))}
              </div>
            </div>

            {/* Panel 2: Current Chart - 2 columns */}
            <div className="lg:col-span-2">
              <CurrentChart
                data={data.currentData}
                selectedMachine={selectedMachine}
                onMachineChange={setSelectedMachine}
              />
            </div>

            {/* Panel 3: KPI Panel - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">KPIs del Turno Actual</h3>
                <KPIPanel kpis={data.kpis} eventStats={data.eventStats} />
              </div>
            </div>

            {/* Panel 4: Machine Comparison - 2 columns */}
            <div className="lg:col-span-2">
              <MachineComparison machines={data.machines} />
            </div>

            {/* Panel 5: Alerts List - 1 column */}
            <div className="lg:col-span-1">
              <AlertsList alerts={data.alerts} onResolveAlert={handleResolveAlert} />
            </div>

            {/* Panel 6: Event Classification - 2 columns */}
            {pendingEvents.length > 0 && (
              <div className="lg:col-span-2">
                <EventClassification 
                  pendingEvents={pendingEvents} 
                  onClassify={handleClassifyEvent}
                />
              </div>
            )}

            {/* Panel 7: Daily Summary - Full width or adjust as needed */}
            <div className="lg:col-span-3">
              <DailySummary summary={data.dailySummary} />
            </div>
          </div>
        </main>
      </div>

      <RegisterEventModal
        open={registerEventOpen}
        onOpenChange={setRegisterEventOpen}
        machineName={selectedMachineForEvent}
        onRegister={handleEventRegistered}
      />
    </div>
  );
};

export default Index;
