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
      id: 1,
      timestamp: '14:35:22',
      type: 'thread_break',
      machine: 'Máquina 1',
      duration: 180,
      status: 'resolved',
      priority: 'HIGH',
      needsAlert: true
    },
    {
      id: 2,
      timestamp: '14:20:15',
      type: 'frame_change',
      machine: 'Máquina 2',
      duration: 420,
      status: 'resolved',
      priority: 'LOW',
      needsAlert: false
    },
    {
      id: 3,
      timestamp: '13:45:00',
      type: 'design_change',
      machine: 'Máquina 3',
      duration: 900,
      status: 'resolved',
      priority: 'LOW',
      needsAlert: false
    },
    {
      id: 4,
      timestamp: '13:10:30',
      type: 'thread_change',
      machine: 'Máquina 1',
      duration: 150,
      status: 'resolved',
      priority: 'LOW',
      needsAlert: false
    },
    {
      id: 5,
      timestamp: '12:55:10',
      type: 'unknown',
      machine: 'Máquina 4',
      duration: 240,
      status: 'active',
      priority: 'MEDIUM',
      needsAlert: false
    },
    {
      id: 6,
      timestamp: '12:30:00',
      type: 'thread_break',
      machine: 'Máquina 1',
      duration: 165,
      status: 'resolved',
      priority: 'HIGH',
      needsAlert: true
    },
    {
      id: 7,
      timestamp: '11:45:00',
      type: 'frame_change',
      machine: 'Máquina 3',
      duration: 380,
      status: 'resolved',
      priority: 'LOW',
      needsAlert: false
    },
    {
      id: 8,
      timestamp: '10:30:00',
      type: 'thread_break',
      machine: 'Máquina 2',
      duration: 195,
      status: 'resolved',
      priority: 'HIGH',
      needsAlert: true
    },
    {
      id: 9,
      timestamp: '09:15:00',
      type: 'thread_change',
      machine: 'Máquina 4',
      duration: 130,
      status: 'resolved',
      priority: 'LOW',
      needsAlert: false
    },
    {
      id: 10,
      timestamp: '08:00:00',
      type: 'info',
      machine: 'Sistema',
      duration: 0,
      status: 'resolved',
      priority: 'LOW',
      needsAlert: false
    }
  ],
  eventStats: {
    threadBreaks: 6,
    frameChanges: 12,
    designChanges: 3,
    threadChanges: 8,
    unknown: 1
  },
  dailySummary: {
    running: 78,
    idle: 12,
    off: 5,
    threadBreak: 3,
    maintenance: 2
  }
};
