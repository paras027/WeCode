import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Editor from "@monaco-editor/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const testCases = [
  { _id: 1, input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
];

const STATUS_STYLES = {
  Accepted:        { icon: CheckCircle2, color: 'text-green-500',  bg: 'bg-green-500/10',  border: 'border-green-500/20' },
  'Wrong Answer':  { icon: XCircle,      color: 'text-red-500',    bg: 'bg-red-500/10',    border: 'border-red-500/20'   },
  'Time Limit':    { icon: Clock,        color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20'},
  Error:           { icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/20'   },
  Pending:         { icon: Loader2,      color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/20'  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_STYLES[status] || STATUS_STYLES['Pending'];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <Icon className={`h-3 w-3 ${status === 'Pending' ? 'animate-spin' : ''}`} />
      {status}
    </span>
  );
}

function SubmissionRow({ sub, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border p-3 transition-colors hover:bg-secondary/40 ${
        isActive ? 'border-primary/50 bg-secondary/60' : 'border-border bg-card'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <StatusBadge status={sub.status} />
        <span className="text-xs text-muted-foreground">{sub.language}</span>
        <span className="ml-auto text-xs text-muted-foreground">{sub.submittedAt}</span>
      </div>
      {sub.runtime && (
        <div className="mt-1.5 flex gap-4 text-xs text-muted-foreground">
          <span>Runtime: <span className="text-foreground font-medium">{sub.runtime}</span></span>
          {sub.memory && <span>Memory: <span className="text-foreground font-medium">{sub.memory}</span></span>}
        </div>
      )}
    </button>
  );
}

function SubmissionDetail({ sub, onBack }) {
  return (
    <div className="flex flex-col gap-3">
      <button onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 w-fit">
        ← Back to all submissions
      </button>
      <div className={`rounded-lg border p-4 ${STATUS_STYLES[sub.status]?.bg || ''} ${STATUS_STYLES[sub.status]?.border || 'border-border'}`}>
        <div className="flex items-center justify-between mb-1">
          <StatusBadge status={sub.status} />
          <span className="text-xs text-muted-foreground">{sub.submittedAt}</span>
        </div>
        {sub.status === 'Accepted' && (
          <div className="mt-2 flex gap-6 text-sm">
            <div><span className="text-muted-foreground">Runtime</span><p className="font-semibold text-foreground">{sub.runtime}</p></div>
            <div><span className="text-muted-foreground">Memory</span><p className="font-semibold text-foreground">{sub.memory}</p></div>
            <div><span className="text-muted-foreground">Language</span><p className="font-semibold text-foreground">{sub.language}</p></div>
          </div>
        )}
        {sub.errorMessage && (
          <pre className="mt-2 text-xs text-red-400 whitespace-pre-wrap font-mono">{sub.errorMessage}</pre>
        )}
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="bg-card px-3 py-2 text-xs text-muted-foreground border-b border-border">Submitted Code · {sub.language}</div>
        <Editor
          height="260px"
          language={sub.language?.toLowerCase()}
          theme="vs-dark"
          value={sub.code}
          options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
        />
      </div>
    </div>
  );
}

export default function ProblemDetail() {
  const dummy = {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    status: 'Solved',
    description: 'asdasdsa',
    tags: ['Array', 'Hash Table'],
    testCases,
    constraints: '',
    starterCode: '',
  };

  const id = useParams();
  const [problem, setProblem] = useState(dummy);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(dummy.starterCode);
  const [output, setOutput] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [activeSubmission, setActiveSubmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('output');

  useEffect(() => {
    getProblem();
    fetchSubmissions();
  }, [id.id]);

  async function getProblem() {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/problems/problem/${id.id}`);
      setProblem(res.data.problems);
      setCode(res.data.problems.starterCode || '');
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchSubmissions() {
    setLoadingSubmissions(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/problems/submissions/${id.id}`);
      setSubmissions(res.data.submissions || []);
    } catch (e) {
      // If endpoint not ready yet, fallback to empty
      setSubmissions([]);
    } finally {
      setLoadingSubmissions(false);
    }
  }

  const handleRun = () => {
    console.log(code);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/v1/problems/submit/', {
        code,
        problemId: id.id,
        language,
      });
      // Optimistically add the new submission to the top
      const newSub = res.data.submission || {
        _id: Date.now(),
        status: res.data.status || 'Pending',
        language,
        code,
        runtime: res.data.runtime || null,
        memory: res.data.memory || null,
        errorMessage: res.data.errorMessage || null,
        submittedAt: new Date().toLocaleString(),
      };
      setSubmissions((prev) => [newSub, ...prev]);
      setActiveTab('submissions');
      setActiveSubmission(newSub);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-1">{problem.title}</h1>
              <div className="flex gap-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    problem.difficulty === 'Easy'
                      ? 'bg-success/20 text-success'
                      : problem.difficulty === 'Medium'
                      ? 'bg-warning/20 text-warning'
                      : 'bg-error/20 text-error'
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Problem Description */}
          <div className="hidden w-1/2 overflow-auto border-r border-border bg-card/50 p-6 lg:block">
            <div className="space-y-6">
              <div>
                <h2 className="mb-3 text-lg font-semibold">Description</h2>
                <p className="text-muted-foreground">{problem.description}</p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Examples</h3>
                <div className="space-y-3">
                  {problem.testCases.map((tc) => (
                    <div key={tc._id} className="rounded-lg border border-border bg-card p-3">
                      <p className="text-sm font-mono text-muted-foreground">Input: {JSON.stringify(tc.input)}</p>
                      <p className="mt-2 text-sm font-mono text-success">Output: {JSON.stringify(tc.output)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Constraints</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">{problem.constraints}</ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((topic) => (
                    <span key={topic} className="rounded-full bg-secondary/50 px-3 py-1 text-xs">{topic}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Hints</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">💡 A really brute force way would be to search for complements of every number in the array. That would take O(n²) time.</p>
                  <p className="text-muted-foreground">💡 Better approach would be to use a hash table. We trade space for speed.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Section */}
          <div className="flex w-full flex-col lg:w-1/2">
            {/* Code Editor */}
            <div className="flex-1 overflow-hidden border-b border-border">
              <div className="flex h-12 items-center border-b border-border bg-card px-4">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="h-full overflow-auto bg-card p-4">
                <Editor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                />
              </div>
            </div>

            {/* Output / Test Cases / Submissions Console */}
            <div className="flex flex-col border-t border-border">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
                  <TabsList className="h-auto bg-transparent p-0">
                    <TabsTrigger
                      value="output"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Output
                    </TabsTrigger>
                    <TabsTrigger
                      value="testcases"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Test Cases
                    </TabsTrigger>
                    <TabsTrigger
                      value="submissions"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      Submissions
                      {submissions.length > 0 && (
                        <span className="ml-1.5 rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                          {submissions.length}
                        </span>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleRun}>
                      <Play className="mr-2 h-4 w-4" />
                      Run
                    </Button>
                    <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting…</>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </div>
                </div>

                {/* Output Tab */}
                <TabsContent value="output" className="p-4">
                  <pre className="font-mono text-sm text-muted-foreground">
                    {output || 'Click "Run" to execute code'}
                  </pre>
                </TabsContent>

                {/* Test Cases Tab */}
                <TabsContent value="testcases" className="space-y-3 p-4">
                  {problem.testCases.map((tc, i) => (
                    <Card key={tc._id} className="p-3">
                      <p className="text-sm font-semibold">Test Case {i + 1}</p>
                      <p className="mt-2 text-xs text-muted-foreground font-mono">Input: {JSON.stringify(tc.input)}</p>
                      <p className="text-xs text-success font-mono">Expected: {JSON.stringify(tc.output)}</p>
                    </Card>
                  ))}
                </TabsContent>

                {/* Submissions Tab */}
                <TabsContent value="submissions" className="p-4 overflow-auto max-h-72">
                  {loadingSubmissions ? (
                    <div className="flex items-center justify-center py-8 text-muted-foreground gap-2 text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading submissions…
                    </div>
                  ) : submissions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                      <p className="text-sm text-muted-foreground">No submissions yet.</p>
                      <p className="text-xs text-muted-foreground">Write your solution and hit Submit.</p>
                    </div>
                  ) : activeSubmission ? (
                    <SubmissionDetail
                      sub={activeSubmission}
                      onBack={() => setActiveSubmission(null)}
                    />
                  ) : (
                    <div className="flex flex-col gap-2">
                      {submissions.map((sub) => (
                        <SubmissionRow
                          key={sub._id}
                          sub={sub}
                          isActive={false}
                          onClick={() => setActiveSubmission(sub)}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
