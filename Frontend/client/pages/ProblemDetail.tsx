import { useState } from 'react';
import { ChevronDown, Play, Send, Settings } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProblems } from '@/data/mockData';

const sampleCode = `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`;

const testCases = [
  { id: 1, input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]' },
  { id: 2, input: 'nums = [3,2,4], target = 6', expected: '[1,2]' },
];

export default function ProblemDetail() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(sampleCode);
  const [output, setOutput] = useState('');
  const problem = mockProblems[0];

  const handleRun = () => {
    setOutput(`✓ Test case 1 passed
✓ Test case 2 passed

Runtime: 45ms
Memory: 45.2MB`);
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
                <span className="text-sm text-muted-foreground">
                  {problem.acceptance.toFixed(1)}% acceptance
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ChevronDown className="mr-2 h-4 w-4" />
                Discussion
              </Button>
              <Button variant="outline" size="sm">
                <ChevronDown className="mr-2 h-4 w-4" />
                Editorial
              </Button>
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
                <p className="text-muted-foreground">
                  Given an array of integers <code className="bg-secondary px-2 py-1 rounded text-foreground">nums</code> and an integer <code className="bg-secondary px-2 py-1 rounded text-foreground">target</code>, return the indices
                  of the two numbers such that they add up to <code className="bg-secondary px-2 py-1 rounded text-foreground">target</code>.
                </p>
                <p className="mt-3 text-muted-foreground">
                  You may assume that each input has exactly one solution, and you may not use the same element twice.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Examples</h3>
                <div className="space-y-3">
                  {testCases.map((tc) => (
                    <div
                      key={tc.id}
                      className="rounded-lg border border-border bg-card p-3"
                    >
                      <p className="text-sm font-mono text-muted-foreground">
                        Input: {tc.input}
                      </p>
                      <p className="mt-2 text-sm font-mono text-success">
                        Output: {tc.expected}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Constraints</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 2 ≤ nums.length ≤ 10⁴</li>
                  <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                  <li>• -10⁹ ≤ target ≤ 10⁹</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {problem.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-secondary/50 px-3 py-1 text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Hints</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    💡 A really brute force way would be to search for complements of every number in the array. That would take O(n²) time.
                  </p>
                  <p className="text-muted-foreground">
                    💡 Better approach would be to use a hash table. We trade space for speed.
                  </p>
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
                <pre className="font-mono text-sm">
                  <code className="text-foreground">
                    {code}
                  </code>
                </pre>
              </div>
            </div>

            {/* Output Console */}
            <div className="flex flex-col border-t border-border">
              <Tabs defaultValue="output" className="flex-1">
                <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
                  <TabsList className="h-auto bg-transparent p-0">
                    <TabsTrigger value="output" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                      Output
                    </TabsTrigger>
                    <TabsTrigger value="testcases" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                      Test Cases
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleRun}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run
                    </Button>
                    <Button size="sm">
                      <Send className="mr-2 h-4 w-4" />
                      Submit
                    </Button>
                  </div>
                </div>

                <TabsContent value="output" className="p-4">
                  <pre className="font-mono text-sm text-muted-foreground">
                    {output || 'Click "Run" to execute code'}
                  </pre>
                </TabsContent>

                <TabsContent value="testcases" className="space-y-3 p-4">
                  {testCases.map((tc, i) => (
                    <Card key={tc.id} className="p-3">
                      <p className="text-sm font-semibold">Test Case {i + 1}</p>
                      <p className="mt-2 text-xs text-muted-foreground font-mono">
                        Input: {tc.input}
                      </p>
                      <p className="text-xs text-success font-mono">
                        Expected: {tc.expected}
                      </p>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
