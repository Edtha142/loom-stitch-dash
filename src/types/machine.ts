export type MachineStatus = 'RUNNING' | 'IDLE' | 'OFF';

export type AlertType = 
  | 'thread_break'    // 🔴 Rotura de hilo (problema real)
  | 'frame_change'    // 🔄 Cambio de bastidor (normal)
  | 'design_change'   // 🎨 Cambio de diseño (normal)
  | 'thread_change'   // 🧵 Cambio de hilo/bobina (normal)
  | 'fluctuation'     // ⚡ Fluctuación (ignorar)
  | 'stopped'         // 🚨 Máquina detenida
  | 'anomaly'         // ⚡ Corriente anómala
  | 'info'            // ℹ️ Información
  | 'unknown';        // ❓ Sin clasificar

export type AlertPriority = 'HIGH' | 'MEDIUM' | 'LOW' | 'IGNORE';

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

export interface EventStats {
  threadBreaks: number;
  frameChanges: number;
  designChanges: number;
  threadChanges: number;
  unknown: number;
}

export interface Alert {
  id: string | number;
  timestamp: string;
  type: AlertType;
  machine: string;
  duration: number;
  status: AlertStatus;
  priority: AlertPriority;
  needsAlert: boolean;
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
  eventStats: EventStats;
}
