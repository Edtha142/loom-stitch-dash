export type MachineStatus = 'RUNNING' | 'IDLE' | 'OFF';

export type AlertType = 'thread_break' | 'stopped' | 'anomaly' | 'info';

export type AlertStatus = 'active' | 'resolved';

export interface Machine {
  id: string;
  name: string;
  heads: number;
  status: MachineStatus;
  current: number;
  power: number;
  timeInState: number;
  hasAlert: boolean;
  alertType?: AlertType;
  productivity: number;
}

export interface CurrentDataPoint {
  timestamp: string;
  current: number;
  isAlert?: boolean;
}

export interface KPIs {
  productivity: number;
  totalMinutes: number;
  threadBreaks: number;
  mtbf: number;
  availability: number;
}

export interface Alert {
  timestamp: string;
  type: AlertType;
  machine: string;
  duration: number;
  status: AlertStatus;
}

export interface DailySummary {
  running: number;
  idle: number;
  off: number;
  threadBreak: number;
  maintenance: number;
}

export interface DashboardData {
  machines: Machine[];
  currentData: CurrentDataPoint[];
  kpis: KPIs;
  alerts: Alert[];
  dailySummary: DailySummary;
}
