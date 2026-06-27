import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <MainLayout>
      <div className="flex h-full items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="mb-3 text-2xl font-bold">{title}</h1>
          <p className="mb-6 text-muted-foreground">{description}</p>
          <p className="mb-6 rounded-lg bg-card p-4 text-sm">
            This page is a placeholder. Continue building this section by providing more details about what you'd like to see here.
          </p>
          <Button variant="outline" asChild>
            <Link to="/dashboard" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </Card>
      </div>
    </MainLayout>
  );
}
