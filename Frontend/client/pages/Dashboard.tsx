import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Calendar, Clock } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import StatusBadge from '@/components/dashboard/Statusbadge';
import axios from 'axios';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import RecentSubmissions from '@/components/dashboard/RecentSubmissions';
import {
  CircleCheckBig,
  FileCode2,
  Target,
  Code2,
} from "lucide-react";
import StatCard from '@/components/dashboard/StatCard';
import api from '@/api/axios';
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

  const dummy = {
    sub: [],
    user: {
      email: "dasdsadsa@gmail.com",
      name: "paras07asda",
      role: "user",
      username: "paras07asda"
    }
  }
  const [userDetails, setUserDetails] = useState(dummy);
  useEffect(() => {
    getDetails()
  }, [])

  async function getDetails() {
    try {
      const details = await api.get("/user/details", {
        withCredentials: true
      })
      console.log("details of user: ", details.data)
      setUserDetails(details.data)
    }
    catch (e) {
      console.log(e);
    }

  }
  console.log(userDetails.user.name)
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
        {/* Header */}

        <DashboardHeader
          name={userDetails.user.name}
          solved={c}
          acceptanceRate={
            userDetails.sub.length > 0
              ? (c / userDetails.sub.length) * 100
              : 0
          }
        />

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* <Card className="p-6">
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
          </Card> */}
          <StatCard
            title="Problems Solved"
            value={c}
            subtitle="Keep it up!"
            icon={CircleCheckBig}
          />

          <StatCard
            title="Submissions"
            value={userDetails.sub.length}
            icon={FileCode2}
          />

          <StatCard
            title="Acceptance"
            value={userDetails.sub.length > 0
              ? ((c / userDetails.sub.length) * 100).toFixed(1) + "%"
              : "0.0%"}
            icon={Target}
          />
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Activity Chart */}

          <div className="flex-1">
            <RecentSubmissions submissions={userDetails.sub} />
          </div>
          {/* <Card className="col-span-full lg:col-span-2 p-6">
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
          </Card> */}
          <div className="w-80">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent h-20" />

              <div className="-mt-10 flex flex-col items-center px-6 pb-6">
                <img
                  src={mockUser.avatar}
                  alt={userDetails.user.name}
                  className="h-20 w-20 rounded-full border-4 border-background object-cover shadow-lg"
                />

                <h2 className="mt-4 text-xl font-bold">
                  {userDetails.user.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                  @{userDetails.user.username}
                </p>

                <span className="mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                  {userDetails.user.role}
                </span>

                <div className="mt-6 grid w-full grid-cols-2 gap-4 rounded-lg border bg-muted/30 p-4">
                  <div className="text-center">
                    <p className="text-xl font-bold">{c}</p>
                    <p className="text-xs text-muted-foreground">
                      Solved
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xl font-bold">
                      {userDetails.sub.length}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submissions
                    </p>
                  </div>
                </div>

                <Button className="mt-6 w-full" asChild>
                  <Link to="/profile">
                    View Profile
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity and Upcoming */}
        {/* <div className="grid gap-6 "> */}
          {/* Recent Submissions */}
          {/* <Card className="p-6">
            <h2 className="mb-4 font-semibold">Recent Submissions</h2>
            <div className="space-y-4">
              {userDetails.sub.slice(0, 3).map((submission) => (
                <div
                  key={submission._id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{submission.problemName}</p>
                    <p className="text-sm text-muted-foreground">
                      {submission.language} • {new Date(submission.updatedAt).toLocaleDateString()}
                    </p>
                  </div> */}
          {/* <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${submission.status === 'Accepted'
                        ? 'bg-success/20 text-success'
                        : 'bg-error/20 text-error'
                      }`}
                  >
                    {submission.status}
                  </div> */}
          {/* <StatusBadge
                    status={submission.status}
                  />
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" variant="outline" asChild>
              <Link to="/profile">View All</Link>
            </Button>
          </Card> */}
          {/* <RecentSubmissions
            submissions={userDetails.sub}
          /> */}
          {/* Upcoming Contests
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
          </Card> */}
        {/* </div> */}

        {/* Leaderboard Preview
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
        </Card> */}
      </div>
    </MainLayout>
  );
}
