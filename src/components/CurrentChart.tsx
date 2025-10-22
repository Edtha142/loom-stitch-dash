import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { CurrentDataPoint } from '@/types/machine';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

interface CurrentChartProps {
  data: CurrentDataPoint[];
  selectedMachine: string;
  onMachineChange: (machine: string) => void;
}

export function CurrentChart({ data, selectedMachine, onMachineChange }: CurrentChartProps) {
  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'Current (A)'],
      ...data.map(d => [d.timestamp, d.current.toFixed(2)])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `current-data-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Corriente en Tiempo Real</h3>
          <p className="text-sm text-muted-foreground">Últimas 100 lecturas</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedMachine}
            onChange={(e) => onMachineChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="m1">Máquina 1</option>
            <option value="m2">Máquina 2</option>
            <option value="m3">Máquina 3</option>
            <option value="m4">Máquina 4</option>
            <option value="all">Todas</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="timestamp" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
            tickFormatter={(value, index) => index % 20 === 0 ? value : ''}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
            domain={[0, 30]}
            label={{ value: 'Amperes (A)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`${value.toFixed(2)} A`, 'Corriente']}
          />
          {data.filter(d => d.isAlert).map((d, i) => (
            <ReferenceLine
              key={i}
              x={d.timestamp}
              stroke="hsl(var(--destructive))"
              strokeDasharray="3 3"
              strokeWidth={2}
            />
          ))}
          <Line
            type="monotone"
            dataKey="current"
            stroke="hsl(217, 91%, 60%)"
            strokeWidth={2}
            dot={false}
            fill="url(#colorCurrent)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
