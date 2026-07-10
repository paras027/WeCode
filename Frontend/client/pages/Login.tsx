import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Code2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import { Alert, AlertDescription } from "@/components/ui/alert";
export default function Login() {
  const {setUser} = useAuth();
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    await login();
  };
  const data = {
    email: email, password: password
  }

  async function login() {
    try {
      const userData = await api.post("/auth/login", {
        email,
        password,
      });
      setUser(userData.data.user);
      Navigate("/dashboard");

    } catch (err: any) {
setUser(null);
      if (!err.response) {
        setError("Unable to connect to the server.");
        return;
      }

      setError(
        err.response.data.message ??
        "Something went wrong."
      );

    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-card px-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="rounded-lg bg-primary p-2">
            <Code2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">WeCode</span>
        </div>

        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue learning
          </p>
        </div>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />

            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (error) setError("");
              }}
              className={`mt-1 ${error
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
                }`}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (error) setError("");
                }}
                required
                className={
                  error
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border border-border"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Sign in with Google
          </Button>
          <Button variant="outline" className="w-full">
            Sign in with GitHub
          </Button>
        </div> */}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-medium">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
}
