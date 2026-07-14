import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import RecentSubmissions from '@/components/dashboard/RecentSubmissions';
import {
  CircleCheckBig,
  FileCode2,
  Target,

} from "lucide-react";
import StatCard from '@/components/dashboard/StatCard';
import api from '@/api/axios';
import { mockUser } from '@/data/mockData';

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

  const [userDetails, setUserDetails] = useState<DashboardData | null>(null);
  useEffect(() => {
    getDetails()
  }, [])

  async function getDetails() {
    try {
      const details = await api.get("/user/details", {
        withCredentials: true
      })
      console.log(details)
      setUserDetails(details.data)
    }
    catch (e) {
      console.log(e)
    }
  }
    if (!userDetails) {
  return <div>Loading...</div>;
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

       
      </div>
    </MainLayout>
  );
}
