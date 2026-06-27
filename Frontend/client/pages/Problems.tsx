import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockProblems } from '@/data/mockData';

const ITEMS_PER_PAGE = 10;

export default function Problems() {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [status, setStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProblems = useMemo(() => {
    return mockProblems.filter((problem) => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficulty === 'All' || problem.difficulty === difficulty;
      const matchesStatus = status === 'All' || problem.status === status;

      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }, [searchTerm, difficulty, status]);

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProblems = filteredProblems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-success bg-success/10';
      case 'Medium':
        return 'text-warning bg-warning/10';
      case 'Hard':
        return 'text-error bg-error/10';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Solved':
        return '✓';
      case 'Attempted':
        return '◐';
      default:
        return '';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="mb-2">Problems</h1>
          <p className="text-muted-foreground">
            Practice and improve your coding skills with curated problems.
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <Select value={difficulty} onValueChange={(value) => {
              setDifficulty(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={status} onValueChange={(value) => {
              setStatus(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Todo">Todo</SelectItem>
                <SelectItem value="Attempted">Attempted</SelectItem>
                <SelectItem value="Solved">Solved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Summary */}
        <p className="text-sm text-muted-foreground">
          Showing {paginatedProblems.length > 0 ? startIndex + 1 : 0}–
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredProblems.length)} of{' '}
          {filteredProblems.length} problems
        </p>

        {/* Problems Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">Status</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Difficulty</TableHead>
                <TableHead className="hidden md:table-cell">Acceptance</TableHead>
                <TableHead className="hidden lg:table-cell">Topics</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem) => (
                  <TableRow key={problem.id}>
                    <TableCell className="font-semibold">
                      {getStatusIcon(problem.status)}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{problem.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {problem.submissions} submissions
                      </p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${getDifficultyColor(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {problem.acceptance.toFixed(1)}%
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {problem.topics.slice(0, 2).map((topic) => (
                          <span
                            key={topic}
                            className="inline-block rounded bg-secondary/50 px-2 py-1 text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                        {problem.topics.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{problem.topics.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/problems/${problem.id}`}>Solve</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center">
                    <p className="text-muted-foreground">No problems found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
