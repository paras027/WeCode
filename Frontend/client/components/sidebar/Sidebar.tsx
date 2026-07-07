import { Link } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Trophy,
  MessageSquare,
  Settings,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'Problems', href: '/problems' },
  { icon: Trophy, label: 'Contests', href: '/contests' },
  { icon: BarChart3, label: 'Leaderboard', href: '/leaderboard' },
  { icon: MessageSquare, label: 'Discuss', href: '/discuss' },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-border bg-sidebar md:block">
      <nav className="flex flex-col gap-2 p-4">
        {navigation.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="justify-start gap-3"
            asChild
          >
            <Link to={item.href}>
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          </Button>
        ))}

        <div className="my-4 border-t border-sidebar-border" />

        {/* <Button
          variant="ghost"
          className="justify-start gap-3"
          asChild
        >
          <Link to="/settings">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </Button> */}
      </nav>
    </aside>
  );
}
