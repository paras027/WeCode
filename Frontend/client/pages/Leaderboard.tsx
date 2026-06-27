import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { leaderboardData } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredData = useMemo(() => {
    let filtered = leaderboardData.filter((entry) =>
      entry.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'solved':
          return b.solved - a.solved;
        case 'penalty':
          return a.penalty - b.penalty;
        case 'rating':
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchTerm, sortBy]);

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  const getRankColor = (rank: number) => {
    if (rank <= 10) return 'text-primary';
    if (rank <= 100) return 'text-success';
    if (rank <= 1000) return 'text-muted-foreground';
    return 'text-muted-foreground/60';
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="mb-2">Global Leaderboard</h1>
          <p className="text-muted-foreground">
            See where you stand among millions of developers worldwide.
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="solved">Problems Solved</SelectItem>
                <SelectItem value="penalty">Penalty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredData.length} of {leaderboardData.length} users
        </p>

        {/* Leaderboard Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Problems Solved</TableHead>
                <TableHead className="hidden md:table-cell text-right">Penalty</TableHead>
                <TableHead className="text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((entry, index) => (
                <motion.tr
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-border hover:bg-secondary/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getRankColor(entry.rank)}`}>
                        {getMedalIcon(entry.rank) && (
                          <span className="mr-2">{getMedalIcon(entry.rank)}</span>
                        )}
                        {entry.rank}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{entry.username}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right">
                    <span className="font-semibold text-success">{entry.solved}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">
                    <span className="text-muted-foreground">{entry.penalty}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="rounded-full bg-primary/20 px-3 py-1 font-bold text-primary">
                      {entry.rating}
                    </span>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </Card>

        {filteredData.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No users found matching your search.</p>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
