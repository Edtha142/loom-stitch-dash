import { useState, useEffect } from 'react';
import { Factory, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

interface DashboardHeaderProps {
  isConnected: boolean;
}

export function DashboardHeader({ isConnected }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Factory className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Monitor IoT Producción</h1>
              <p className="text-xs text-muted-foreground">Empresa de Bordados</p>
            </div>
          </div>

          {/* Center - Shift and Time Info */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mr-2">
                  Turno Día
                </span>
                <span className="font-mono text-foreground">{format(currentTime, 'HH:mm:ss')}</span>
                <span className="text-muted-foreground ml-2">{format(currentTime, 'dd MMM yyyy')}</span>
              </div>
            </div>
          </div>

          {/* Right - Connection Status and User */}
          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success pulse-success' : 'bg-destructive'}`} />
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {isConnected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>

            {/* User Avatar */}
            <button className="flex items-center gap-2 hover:bg-muted/50 rounded-lg px-3 py-2 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">GA</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
