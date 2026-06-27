import { Link } from 'react-router-dom';
import { Mail, MapPin, Trophy, Zap, Calendar } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockUser, mockSubmissions } from '@/data/mockData';

const achievements = [
  { id: 1, name: 'First Submission', description: 'Submitted your first solution', icon: '🎯' },
  { id: 2, name: 'Week Warrior', description: 'Solved 5 problems in a week', icon: '⚡' },
  { id: 3, name: 'Month Master', description: 'Solved 20 problems in a month', icon: '👑' },
  { id: 4, name: 'Consistency', description: '14-day solving streak', icon: '🔥' },
];

export default function Profile() {
  return (
    <MainLayout>
      <div className="space-y-8 p-6">
        {/* Profile Header */}
        <Card className="overflow-hidden bg-gradient-to-r from-primary/10 via-card to-card">
          <div className="p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
              <img
                src={mockUser.avatar}
                alt={mockUser.username}
                className="h-32 w-32 rounded-lg border-4 border-primary"
              />
              <div className="flex-1">
                <h1 className="mb-2">{mockUser.username}</h1>
                <p className="mb-4 text-muted-foreground">{mockUser.bio}</p>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="text-2xl font-bold text-primary">{mockUser.rating}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold text-success">{mockUser.currentStreak} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Max Streak</p>
                    <p className="text-2xl font-bold">{mockUser.maxStreak} days</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link to="/settings">Edit Profile</Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Problems Solved</p>
            <p className="mt-2 text-3xl font-bold">{mockUser.problemsSolved}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Total Submissions</p>
            <p className="mt-2 text-3xl font-bold">{mockUser.totalSubmissions}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Acceptance Rate</p>
            <p className="mt-2 text-3xl font-bold">
              {((mockUser.problemsSolved / mockUser.totalSubmissions) * 100).toFixed(1)}%
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Global Rank</p>
            <p className="mt-2 text-3xl font-bold text-primary">#12,456</p>
          </Card>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Achievements</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="p-6 text-center">
                <div className="mb-3 text-4xl">{achievement.icon}</div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Recent Submissions</h2>
          <Card className="overflow-hidden">
            <div className="divide-y divide-border">
              {mockSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                  <div>
                    <p className="font-medium">Problem {submission.problemId}</p>
                    <p className="text-sm text-muted-foreground">
                      {submission.language} • {submission.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {submission.memory && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Memory</p>
                        <p className="font-semibold">{submission.memory}MB</p>
                      </div>
                    )}
                    {submission.time && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="font-semibold">{submission.time}ms</p>
                      </div>
                    )}
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        submission.status === 'Accepted'
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
