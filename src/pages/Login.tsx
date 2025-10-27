import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { user, error: loginError } = await login(email, password);
    
    if (loginError) {
      setError(loginError);
      setLoading(false);
    } else if (user) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">🏭</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Sistema de Monitoreo</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Usuarios de prueba:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>👤 Operador: operador@test.com</p>
              <p>👨‍💼 Supervisor: supervisor@test.com</p>
              <p>👨‍💻 Admin: admin@test.com</p>
              <p className="mt-2 font-medium">Contraseña: Test123456</p>
            </div>
          </div>

          <Alert className="mt-4 border-amber-500/50 bg-amber-500/10">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-xs text-amber-600">
              ⚠️ Sistema de desarrollo - Conectar backend real para producción
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
