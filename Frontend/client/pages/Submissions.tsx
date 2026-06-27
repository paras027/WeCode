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
import { mockSubmissions } from '@/data/mockData';

const ITEMS_PER_PAGE = 10;

export default function Submissions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSubmissions = useMemo(() => {
    return mockSubmissions.filter((submission) => {
      const matchesSearch = `problem ${submission.problemId}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        status === 'All' || submission.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, status]);

  const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSubmissions = filteredSubmissions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-success/20 text-success';
      case 'WrongAnswer':
        return 'bg-error/20 text-error';
      case 'CompilationError':
        return 'bg-error/20 text-error';
      case 'RuntimeError':
        return 'bg-error/20 text-error';
      case 'TimeLimitExceeded':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Accepted':
        return '✓ Accepted';
      case 'WrongAnswer':
        return '✗ Wrong Answer';
      case 'CompilationError':
        return '⚠ Compilation Error';
      case 'RuntimeError':
        return '⚠ Runtime Error';
      case 'TimeLimitExceeded':
        return '⏱ Time Limit Exceeded';
      default:
        return status;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="mb-2">Submission History</h1>
          <p className="text-muted-foreground">
            View all your code submissions and their results.
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>

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
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="WrongAnswer">Wrong Answer</SelectItem>
                <SelectItem value="CompilationError">Compilation Error</SelectItem>
                <SelectItem value="RuntimeError">Runtime Error</SelectItem>
                <SelectItem value="TimeLimitExceeded">Time Limit Exceeded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Summary */}
        <p className="text-sm text-muted-foreground">
          Showing {paginatedSubmissions.length > 0 ? startIndex + 1 : 0}–
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredSubmissions.length)} of{' '}
          {filteredSubmissions.length} submissions
        </p>

        {/* Submissions Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem ID</TableHead>
                <TableHead className="hidden sm:table-cell">Language</TableHead>
                <TableHead className="hidden md:table-cell">Submitted</TableHead>
                <TableHead className="hidden lg:table-cell">Runtime</TableHead>
                <TableHead className="hidden lg:table-cell">Memory</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSubmissions.length > 0 ? (
                paginatedSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <p className="font-medium">Problem {submission.problemId}</p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="rounded bg-secondary/50 px-2 py-1 text-xs capitalize">
                        {submission.language}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm text-muted-foreground">
                        {submission.timestamp.toLocaleDateString()}{' '}
                        {submission.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {submission.time ? `${submission.time}ms` : '-'}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {submission.memory ? `${submission.memory}MB` : '-'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          submission.status
                        )}`}
                      >
                        {getStatusLabel(submission.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center">
                    <p className="text-muted-foreground">No submissions found</p>
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
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className="rounded border border-border px-3 py-1 text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded border border-border px-3 py-1 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
