import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MachineCard } from '@/components/MachineCard';
import { CurrentChart } from '@/components/CurrentChart';
import { KPIPanel } from '@/components/KPIPanel';
import { MachineComparison } from '@/components/MachineComparison';
import { AlertsList } from '@/components/AlertsList';
import { DailySummary } from '@/components/DailySummary';
import { mockData } from '@/data/mockData';
import { DashboardData } from '@/types/machine';

const Index = () => {
  const [data, setData] = useState<DashboardData>(mockData);
  const [selectedMachine, setSelectedMachine] = useState('m1');
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time data updates
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
          isAlert: Math.random() < 0.01
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader isConnected={false} />
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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader isConnected={isConnected} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel 1: Machine Status Cards - Full width */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold text-foreground mb-4">Estado Actual de Máquinas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.machines.map(machine => (
                <MachineCard key={machine.id} machine={machine} />
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
              <KPIPanel kpis={data.kpis} />
            </div>
          </div>

          {/* Panel 4: Machine Comparison - 2 columns */}
          <div className="lg:col-span-2">
            <MachineComparison machines={data.machines} />
          </div>

          {/* Panel 5: Alerts List - 1 column */}
          <div className="lg:col-span-1">
            <AlertsList alerts={data.alerts} />
          </div>

          {/* Panel 6: Daily Summary - Full width or adjust as needed */}
          <div className="lg:col-span-3">
            <DailySummary summary={data.dailySummary} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
