import { DashboardData } from '@/types/machine';

export const mockData: DashboardData = {
  machines: [
    {
      id: 'm1',
      name: 'Máquina 1',
      heads: 12,
      status: 'RUNNING',
      current: 18.5,
      power: 4070,
      timeInState: 9300,
      hasAlert: true,
      alertType: 'thread_break',
      productivity: 78
    },
    {
      id: 'm2',
      name: 'Máquina 2',
      heads: 8,
      status: 'IDLE',
      current: 2.3,
      power: 506,
      timeInState: 1800,
      hasAlert: false,
      productivity: 65
    },
    {
      id: 'm3',
      name: 'Máquina 3',
      heads: 6,
      status: 'RUNNING',
      current: 15.2,
      power: 3344,
      timeInState: 7200,
      hasAlert: false,
      productivity: 89
    },
    {
      id: 'm4',
      name: 'Máquina 4',
      heads: 6,
      status: 'OFF',
      current: 0,
      power: 0,
      timeInState: 3600,
      hasAlert: false,
      productivity: 72
    }
  ],
  currentData: Array.from({ length: 100 }, (_, i) => ({
    timestamp: new Date(Date.now() - (100 - i) * 1000).toLocaleTimeString(),
    current: 15 + Math.random() * 8 + (i > 50 && i < 55 ? -10 : 0),
    isAlert: i > 50 && i < 55
  })),
  kpis: {
    productivity: 78.5,
    totalMinutes: 565,
    threadBreaks: 6,
    mtbf: 94,
    availability: 85.3
  },
  alerts: [
    {
      timestamp: '14:35:22',
      type: 'thread_break',
      machine: 'Máquina 1',
      duration: 3,
      status: 'resolved'
    },
    {
      timestamp: '13:20:15',
      type: 'stopped',
      machine: 'Máquina 2',
      duration: 18,
      status: 'resolved'
    },
    {
      timestamp: '12:45:00',
      type: 'thread_break',
      machine: 'Máquina 1',
      duration: 2,
      status: 'resolved'
    },
    {
      timestamp: '11:30:44',
      type: 'anomaly',
      machine: 'Máquina 3',
      duration: 1,
      status: 'resolved'
    },
    {
      timestamp: '10:15:30',
      type: 'thread_break',
      machine: 'Máquina 1',
      duration: 4,
      status: 'resolved'
    },
    {
      timestamp: '09:45:12',
      type: 'thread_break',
      machine: 'Máquina 2',
      duration: 2,
      status: 'resolved'
    },
    {
      timestamp: '08:20:00',
      type: 'info',
      machine: 'Sistema',
      duration: 0,
      status: 'resolved'
    },
  ],
  dailySummary: {
    running: 78,
    idle: 12,
    off: 5,
    threadBreak: 3,
    maintenance: 2
  }
};
