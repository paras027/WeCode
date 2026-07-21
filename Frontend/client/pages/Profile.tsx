import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Mail, MapPin, Trophy, Zap, Calendar } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockUser, mockSubmissions } from '@/data/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import api from '@/api/axios';

const achievements = [
  { id: 1, name: 'First Submission', description: 'Submitted your first solution', icon: '🎯' },
  { id: 2, name: 'Week Warrior', description: 'Solved 5 problems in a week', icon: '⚡' },
  { id: 3, name: 'Month Master', description: 'Solved 20 problems in a month', icon: '👑' },
  { id: 4, name: 'Consistency', description: '14-day solving streak', icon: '🔥' },
];
interface User {
  email: string;
  name: string;
  role: string;
  username: string;
}

interface DashboardData {
  sub: any[]; // Replace `any` with your Submission interface later
  user: User;
}

export default function Profile() {
  const [userDetails, setUserDetails] = useState<DashboardData | null>(null);
  useEffect(() => {
    getDetails()
  }, [])

  async function getDetails() {
    try {
      const details = await api.get("/user/details", {
        withCredentials: true
      })
      setUserDetails(details.data)
    }
    catch (e) {

    }

  }
if (!userDetails) {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-52 w-full rounded-xl" />
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  );
}
  let c = 0;
  let c1 = 0;
  for (let subm of userDetails.sub) {
    if (subm.verdict === "Passed") {
      c++;
    }
    else {
      c1++;
    }
  }
  return (
    <MainLayout>
      <div className="space-y-8 p-6">
        {/* Profile Header */}
        <Card className="overflow-hidden bg-gradient-to-r from-primary/10 via-card to-card">
          <div className="p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <img
                src={mockUser.avatar}
                alt={userDetails.user.name}
                className="h-32 w-32 rounded-lg border-4 border-primary"
              />
              <div >
                <h1 className="mb-2">{userDetails.user.name}</h1>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Problems Solved</p>
            <p className="mt-2 text-3xl font-bold">{c}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Total Submissions</p>
            <p className="mt-2 text-3xl font-bold">{userDetails.sub.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Acceptance Rate</p>
            <p className="mt-2 text-3xl font-bold">
              {userDetails.sub.length > 0
                ? ((c / userDetails.sub.length) * 100).toFixed(1)
                : "0.0"}
              %
            </p>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Recent Submissions</h2>
          <Card className="overflow-hidden">
            <div className="divide-y divide-border">
              {userDetails.sub.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                  <div>
                    <p className="font-medium">{submission.problemName}</p>
                    <p className="text-sm text-muted-foreground">
                      {submission.language} • {new Date(submission.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {submission.memory && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Memory</p>
                        <p className="font-semibold">{submission.memory} kb</p>
                      </div>
                    )}
                    {submission.runtime && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Runtime</p>
                        <p className="font-semibold">{submission.runtime} ms</p>
                      </div>
                    )}
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${submission.status === 'Accepted'
                        ? 'bg-success/20 text-success'
                        : 'bg-error/20 text-error'
                        }`}
                    >
                      {submission.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
      </div>
    </MainLayout>
  );
}
