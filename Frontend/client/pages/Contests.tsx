import { Link } from 'react-router-dom';
import { Clock, Users, Trophy } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockContests } from '@/data/mockData';

const formatTimeLeft = (endDate: Date) => {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  
  if (diff < 0) return 'Ended';
  
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
};

export default function Contests() {
  const upcomingContests = mockContests.filter(c => c.status === 'Upcoming');
  const liveContests = mockContests.filter(c => c.status === 'Live');

  return (
    <MainLayout>
      <div className="space-y-8 p-6">
        {/* Header */}
        <div>
          <h1 className="mb-2">Contests</h1>
          <p className="text-muted-foreground">
            Compete with developers worldwide and improve your rating.
          </p>
        </div>

        {/* Live Contests */}
        {liveContests.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-bold">Live Now</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {liveContests.map((contest) => (
                <Card key={contest.id} className="overflow-hidden border-primary/50 bg-gradient-to-br from-card to-card/50">
                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{contest.title}</h3>
                        <p className="text-sm text-success font-medium">● Live</p>
                      </div>
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>

                    <p className="mb-4 text-sm text-muted-foreground">
                      {contest.description}
                    </p>

                    <div className="mb-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatTimeLeft(contest.endTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.problemCount} Problems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.participants.toLocaleString()} Participants</span>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to={`/contests/${contest.id}`}>Enter Contest</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Contests */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Upcoming</h2>
          {upcomingContests.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingContests.map((contest) => (
                <Card key={contest.id} className="p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{contest.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {contest.startTime.toLocaleDateString()} at {contest.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>

                  <p className="mb-4 text-sm text-muted-foreground">
                    {contest.description}
                  </p>

                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{contest.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span>{contest.problemCount} Problems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{contest.participants.toLocaleString()} Registered</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/contests/${contest.id}`}>View Details</Link>
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No upcoming contests scheduled.</p>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
