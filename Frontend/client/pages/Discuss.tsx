import { useState } from 'react';
import { Search, MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const discussions = [
  {
    id: 1,
    title: 'Two Sum - Optimal Solution using Hash Map',
    author: 'AlgorithmMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=algo',
    category: 'Solutions',
    problemId: '1',
    replies: 12,
    views: 234,
    likes: 48,
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: 2,
    title: 'Anyone else finding these problems too easy?',
    author: 'CodeNinja99',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja',
    category: 'General',
    replies: 28,
    views: 512,
    likes: 73,
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: 3,
    title: 'Bug in Test Case #5 for Problem 42',
    author: 'BugHunter',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bug',
    category: 'Bug Report',
    problemId: '42',
    replies: 5,
    views: 89,
    likes: 12,
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: 4,
    title: 'Best way to approach graph problems?',
    author: 'GraphGuru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=graph',
    category: 'Discussion',
    replies: 34,
    views: 678,
    likes: 92,
    timestamp: new Date(Date.now() - 172800000),
  },
];

export default function Discuss() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const filteredDiscussions = discussions.filter((d) => {
    const matchesSearch = d.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || d.category === category;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Solutions':
        return 'bg-success/20 text-success';
      case 'Bug Report':
        return 'bg-error/20 text-error';
      case 'Discussion':
        return 'bg-primary/20 text-primary';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Community Discuss</h1>
            <p className="text-muted-foreground">
              Share solutions, ask questions, and learn from the community.
            </p>
          </div>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Solutions">Solutions</SelectItem>
                <SelectItem value="Discussion">Discussion</SelectItem>
                <SelectItem value="Bug Report">Bug Report</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Discussions List */}
        <div className="space-y-3">
          {filteredDiscussions.map((discussion) => (
            <Card
              key={discussion.id}
              className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {discussion.problemId && (
                        <span className="text-xs rounded bg-secondary px-2 py-1 text-muted-foreground">
                          Problem {discussion.problemId}
                        </span>
                      )}
                      <span
                        className={`text-xs rounded px-2 py-1 font-semibold ${getCategoryColor(
                          discussion.category
                        )}`}
                      >
                        {discussion.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by <span className="font-medium">{discussion.author}</span>{' '}
                      • {formatTimeAgo(discussion.timestamp)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    {discussion.replies} replies
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {discussion.views} views
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    {discussion.likes} likes
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDiscussions.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              No discussions found matching your criteria.
            </p>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
