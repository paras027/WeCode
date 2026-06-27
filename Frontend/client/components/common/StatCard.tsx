import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  variant?: 'default' | 'success' | 'error';
}

export default function StatCard({
  label,
  value,
  change,
  icon,
  variant = 'default',
}: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold sm:text-3xl">{value}</p>
          {change !== undefined && (
            <div className={`mt-2 flex items-center gap-1 text-sm ${
              change > 0 ? 'text-success' : change < 0 ? 'text-error' : 'text-muted-foreground'
            }`}>
              {change > 0 && <ArrowUpRight className="h-4 w-4" />}
              {change < 0 && <ArrowDownRight className="h-4 w-4" />}
              {Math.abs(change)}
            </div>
          )}
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
    </Card>
  );
}
