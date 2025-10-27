import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  isConnected: boolean;
}

const DashboardHeader = ({ isConnected }: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'supervisor':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'operador':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return '👨‍💻 Administrador';
      case 'supervisor':
        return '👨‍💼 Supervisor';
      case 'operador':
        return '👤 Operador';
      default:
        return role;
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 rounded-xl border border-primary/20 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard Monitoreo IoT
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-sm font-medium text-muted-foreground">
                {isConnected ? 'Sistema conectado' : 'Sistema desconectado'}
              </span>
            </div>
            {user && (
              <>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{user.fullName}</span>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getRoleBadgeColor(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
