import { Link } from 'react-router-dom';
import { Code2, Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <Link to="/" className="text-xl font-bold tracking-tight">
              WeCode
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/problems">Problems</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/contests">Contests</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/discuss">Discuss</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
