import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, Play, Send, Settings } from 'lucide-react';
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
import { mockProblems } from '@/data/mockData';



const testCases = [
  { _id: 1, input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
];

export default function ProblemDetail() {
  const dummy = {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    status: 'Solved',
    description:"asdasdsa",
    tags: ['Array', 'Hash Table'],
    testCases:testCases,
    constraints:"",
    starterCode:""
  }
  const id = useParams();
  const [problem,setProblem] = useState(dummy)
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(problem.starterCode);
  const [output, setOutput] = useState('');
  const handleRun = () => {
    console.log(typeof(code));
  };
  useEffect(()=>{
    console.log("id: ",id.id)
    getProblem();
  },[id.id])

  async function getProblem(){
    const problem = await axios.get(`http://localhost:5000/api/v1/problems/problem/${id.id}`)
    console.log("problemone: ",problem.data.problems)
    setProblem(problem.data.problems)
  }
  console.log(problem.title);
  const handleSubmit = () => {
    
  }
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
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${problem.difficulty === 'Easy'
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
                <p className="text-muted-foreground">
                  {problem.description}
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Examples</h3>
                <div className="space-y-3">
                  {problem.testCases.map((tc) => (
                    <div
                      key={tc._id}
                      className="rounded-lg border border-border bg-card p-3"
                    >
                      <p className="text-sm font-mono text-muted-foreground">
                        Input: {JSON.stringify(tc.input)}
                      </p>
                      <p className="mt-2 text-sm font-mono text-success">
                        Output: {JSON.stringify(tc.output)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Constraints</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {problem.constraints}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((topic) => (
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
                <Editor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                />
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
                  {problem.testCases.map((tc, i) => (
                    <Card key={tc._id} className="p-3">
                      <p className="text-sm font-semibold">Test Case {i + 1}</p>
                      <p className="mt-2 text-xs text-muted-foreground font-mono">
                        Input: {JSON.stringify(tc.input)}
                      </p>
                      <p className="text-xs text-success font-mono">
                        Expected: {JSON.stringify(tc.output)}
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
