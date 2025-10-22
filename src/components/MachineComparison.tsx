import { Machine } from '@/types/machine';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';

interface MachineComparisonProps {
  machines: Machine[];
}

export function MachineComparison({ machines }: MachineComparisonProps) {
  const [sortBy, setSortBy] = useState<'name' | 'productivity'>('name');

  const data = [...machines]
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return b.productivity - a.productivity;
    })
    .map(m => ({
      name: `${m.name} (${m.heads} cab)`,
      productivity: m.productivity,
      color: m.productivity >= 85 ? 'hsl(142, 71%, 45%)' : m.productivity >= 70 ? 'hsl(38, 92%, 50%)' : 'hsl(0, 84%, 60%)'
    }));

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Comparación entre Máquinas</h3>
          <p className="text-sm text-muted-foreground">% Tiempo productivo hoy</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortBy(sortBy === 'name' ? 'productivity' : 'name')}
          className="gap-2"
        >
          <ArrowUpDown className="w-4 h-4" />
          {sortBy === 'name' ? 'Por Nombre' : 'Por Eficiencia'}
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 100 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            type="number" 
            domain={[0, 100]}
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis 
            type="category"
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`${value}%`, 'Productividad']}
          />
          <Bar dataKey="productivity" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
