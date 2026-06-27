import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Calendar, Clock } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockUser, dashboardStats, mockSubmissions, leaderboardData } from '@/data/mockData';

const activityData = [
  { date: 'Mon', problems: 2 },
  { date: 'Tue', problems: 3 },
  { date: 'Wed', problems: 1 },
  { date: 'Thu', problems: 4 },
  { date: 'Fri', problems: 2 },
  { date: 'Sat', problems: 5 },
  { date: 'Sun', problems: 3 },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-8 p-6">
        {/* Header */}
        <div>
          <h1 className="mb-2">Welcome back, {mockUser.username}!</h1>
          <p className="text-muted-foreground">
            Here's your coding progress and upcoming challenges.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, i) => (
            <Card key={i} className="p-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
                {stat.change !== 0 && (
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.change > 0 ? 'text-success' : 'text-error'
                    }`}
                  >
                    {stat.change > 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {Math.abs(stat.change)}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Activity Chart */}
          <Card className="col-span-full lg:col-span-2 p-6">
            <h2 className="mb-4 font-semibold">Weekly Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Bar dataKey="problems" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={mockUser.avatar}
                alt={mockUser.username}
                className="mb-4 h-16 w-16 rounded-full border-2 border-primary"
              />
              <h3 className="font-semibold">{mockUser.username}</h3>
              <p className="text-sm text-muted-foreground">Rating: {mockUser.rating}</p>
              <p className="mt-3 text-sm text-muted-foreground">{mockUser.bio}</p>
              <Button className="mt-4 w-full" variant="outline" asChild>
                <Link to="/profile">View Profile</Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity and Upcoming */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Submissions */}
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Recent Submissions</h2>
            <div className="space-y-4">
              {mockSubmissions.slice(0, 3).map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">Problem {submission.problemId}</p>
                    <p className="text-sm text-muted-foreground">
                      {submission.language} • {submission.timestamp.toLocaleDateString()}
                    </p>
                  </div>
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
              ))}
            </div>
            <Button className="mt-4 w-full" variant="outline" asChild>
              <Link to="/submissions">View All</Link>
            </Button>
          </Card>

          {/* Upcoming Contests */}
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Upcoming Contests</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Weekly Contest 423',
                  date: 'Dec 24, 2024',
                  time: '8:00 PM',
                  problems: 4,
                },
                {
                  title: 'Biweekly Contest 210',
                  date: 'Jan 07, 2025',
                  time: '8:00 PM',
                  problems: 5,
                },
              ].map((contest, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="font-medium">{contest.title}</p>
                    <div className="mt-1 flex gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {contest.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {contest.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{contest.problems} Problems</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" variant="outline" asChild>
              <Link to="/contests">View All Contests</Link>
            </Button>
          </Card>
        </div>

        {/* Leaderboard Preview */}
        <Card className="p-6">
          <h2 className="mb-4 font-semibold">Global Leaderboard (Top 5)</h2>
          <div className="space-y-3">
            {leaderboardData.slice(0, 5).map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-muted-foreground w-8">{entry.rank}</span>
                  <span className="font-medium">{entry.username}</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Solved</p>
                    <p className="font-semibold">{entry.solved}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rating</p>
                    <p className="font-semibold">{entry.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full" variant="outline" asChild>
            <Link to="/leaderboard">View Full Leaderboard</Link>
          </Button>
        </Card>
      </div>
    </MainLayout>
  );
}
