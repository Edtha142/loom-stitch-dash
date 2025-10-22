import { DailySummary as DailySummaryType } from '@/types/machine';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DailySummaryProps {
  summary: DailySummaryType;
}

export function DailySummary({ summary }: DailySummaryProps) {
  const data = [
    { name: 'Bordando', value: summary.running, color: 'hsl(142, 71%, 45%)' },
    { name: 'Idle', value: summary.idle, color: 'hsl(38, 92%, 50%)' },
    { name: 'Apagado', value: summary.off, color: 'hsl(215, 16%, 47%)' },
    { name: 'Rotura hilo', value: summary.threadBreak, color: 'hsl(0, 84%, 60%)' },
    { name: 'Mantenimiento', value: summary.maintenance, color: 'hsl(189, 94%, 43%)' },
  ];

  const CustomLabel = ({ cx, cy }: any) => {
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="fill-foreground">
        <tspan x={cx} dy="-0.5em" fontSize="24" fontWeight="700">12h</tspan>
        <tspan x={cx} dy="1.5em" fontSize="12" className="fill-muted-foreground">turno</tspan>
      </text>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Resumen Diario</h3>
        <p className="text-sm text-muted-foreground">Distribución del tiempo total hoy</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={CustomLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`${value}%`, 'Porcentaje']}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            formatter={(value, entry: any) => (
              <span className="text-sm">
                <span className="text-foreground">{value}</span>
                <span className="text-muted-foreground ml-1">({entry.payload.value}%)</span>
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
