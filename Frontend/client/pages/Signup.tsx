import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Code2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import api from '@/api/axios';

export default function Signup() {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    await signup();
  };

  const data = {
    name: name, username: username, email: email, password: password
  }

  async function signup() {
    try {
      await api.post("/auth/register", {
        name,
        username,
        email,
        password,
        role,
      });

      Navigate("/dashboard");
    } catch (err: any) {
      if (!err.response) {
        setError("Unable to connect to the server.");
      } else {
        switch (err.response.status) {
          case 400:
            setError(err.response.data.message);
            break;

          case 401:
            setError("Unauthorized.");
            break;

          case 409:
            setError("User already exists.");
            break;

          case 422:
            setError(err.response.data.message);
            break;

          case 500:
            setError("Internal server error.");
            break;

          default:
            setError(err.response.data.message || "Something went wrong.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const passwordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = passwordStrength();

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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground">
            Join thousands of developers improving their skills
          </p>
        </div>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="username"
              placeholder="johndoe"
              value={name}
              onChange={(e) => {setName(e.target.value);; if (error) setError("");}}
              className={`mt-1 ${error ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              placeholder="johndoe"
              value={username}
              onChange={(e) => {setUsername(e.target.value); if (error) setError("");}}
              className={`mt-1 ${error ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {setEmail(e.target.value);if (error) setError("");}}
              className={`mt-1 ${error ? "border-red-500 focus-visible:ring-red-500" : ""
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
                onChange={(e) => {setPassword(e.target.value);; if (error) setError("");}}
                required
                className={`mt-1 ${error ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
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

            {password && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 w-8 rounded-full ${i <= strength ? 'bg-success' : 'bg-muted'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
                  </span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    {password.length >= 8 ? (
                      <Check className="h-3 w-3 text-success" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border border-muted-foreground" />
                    )}
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    {/[A-Z]/.test(password) ? (
                      <Check className="h-3 w-3 text-success" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border border-muted-foreground" />
                    )}
                    One uppercase letter
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded border border-border"
              required
            />
            <label htmlFor="terms" className="text-muted-foreground">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
