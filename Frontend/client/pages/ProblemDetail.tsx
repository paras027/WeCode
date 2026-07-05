// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Play, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
// import MainLayout from '@/components/layouts/MainLayout';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import axios from 'axios';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import Editor from "@monaco-editor/react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import socket from '@/utils/socket';

// const testCases = [
//   { _id: 1, input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
// ];

// const STATUS_STYLES = {
//   "Passed": { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
//   'Wrong Answer': { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
//   'Time Limit Exceeded': { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
//   Error: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
//   'Compilation Error': { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
//   Pending: { icon: Loader2, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
// };

// function StatusBadge({ status }) {
//   const cfg = STATUS_STYLES[status] || STATUS_STYLES['Pending'];
//   const Icon = cfg.icon;
//   return (
//     <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
//       <Icon className={`h-3 w-3 ${status === 'Pending' ? 'animate-spin' : ''}`} />
//       {status}
//     </span>
//   );
// }

// function SubmissionRow({ sub, onClick, isActive }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full text-left rounded-lg border p-3 transition-colors hover:bg-secondary/40 ${isActive ? 'border-primary/50 bg-secondary/60' : 'border-border bg-card'
//         }`}
//     >
//       <div className="flex items-center justify-between gap-2">
//         <StatusBadge status={sub.status} />
//         <span className="text-xs text-muted-foreground">{sub.language}</span>
//         <span className="ml-auto text-xs text-muted-foreground">{sub.submittedAt}</span>
//       </div>
//       {sub.runtime && (
//         <div className="mt-1.5 flex gap-4 text-xs text-muted-foreground">
//           <span>Runtime: <span className="text-foreground font-medium">{sub.runtime}</span></span>
//           {sub.memory && <span>Memory: <span className="text-foreground font-medium">{sub.memory}</span></span>}
//         </div>
//       )}
//     </button>
//   );
// }

// function SubmissionDetail({ sub, onBack }) {
//   console.log("sub status: ",sub)
//   return (
//     <div className="flex flex-col gap-3">
//       <button onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 w-fit">
//         ← Back to all submissions
//       </button>
//       <div className={`rounded-lg border p-4 ${STATUS_STYLES[sub.verdict]?.bg || ''} ${STATUS_STYLES[sub.verdict]?.border || 'border-border'}`}>
//         <div className="flex items-center justify-between mb-1">
//           <StatusBadge status={sub.verdict} />
//           <span className="text-xs text-muted-foreground">{sub.submittedAt}</span>
//         </div>
//         {sub.verdict === 'Passed' && (
//           <div className="mt-2 flex gap-6 text-sm">
//             <div><span className="text-muted-foreground">Runtime</span><p className="font-semibold text-foreground">{sub.runtime}</p></div>
//             <div><span className="text-muted-foreground">Memory</span><p className="font-semibold text-foreground">{sub.memory}</p></div>
//             <div><span className="text-muted-foreground">Language</span><p className="font-semibold text-foreground">{sub.language}</p></div>
//           </div>
//         )}
//         {sub.verdict !== "Time Limit Exceeded" && sub.error && (
//           <pre className="mt-2 text-xs text-red-400 whitespace-pre-wrap font-mono">{sub.error}</pre>
//         )}
//       <div className="mt-2 flex flex-col gap-6 text-sm">

//         {sub.result.map((res,index)=>{
//           return <div key={index} className='flex space-x-2'>
//             <div><span className="text-muted-foreground">Input</span><p className="font-semibold text-foreground">{JSON.stringify(res.input)}</p></div>
//             <div><span className="text-muted-foreground">Expected</span><p className="font-semibold text-foreground">{res.expected}</p></div>
//             <div><span className="text-muted-foreground">Your Output</span><p className="font-semibold text-foreground">{res.output}</p></div>
//           </div>
//         })}
        
//      </div>
//       </div>
//       <div className="rounded-lg border border-border overflow-hidden">
//         <div className="bg-card px-3 py-2 text-xs text-muted-foreground border-b border-border">Submitted Code · {sub.language}</div>
//         <Editor
//           height="260px"
//           language={sub.language?.toLowerCase()}
//           theme="vs-dark"
//           value={sub.code}
//           options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
//         />
//       </div>
//     </div>
//   );
// }

// export default function ProblemDetail() {
//   const dummy = {
//     id: '1',
//     title: 'Two Sum',
//     difficulty: 'Easy',
//     status: 'Solved',
//     description: 'asdasdsa',
//     tags: ['Array', 'Hash Table'],
//     testCases,
//     constraints: '',
//     starterCode: "",
//     timeLimit:200,
//     memoryLimit:256
//   };

//   const id = useParams();
//   const [problem, setProblem] = useState(dummy);
//   const [language, setLanguage] = useState('javascript');
//   const [code, setCode] = useState(dummy.starterCode);
//   const [output, setOutput] = useState('');
//   const [submissions, setSubmissions] = useState({});
//   const [loadingSubmissions, setLoadingSubmissions] = useState(false);
//   const [activeSubmission, setActiveSubmission] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isRunning,setIsRunning] = useState(false)
//   const [activeTab, setActiveTab] = useState('output');

//   useEffect(() => {
//     socket.connect();
//     getProblem();
//     fetchSubmissions();
//     socket.on("submission-update", (data) => {
//       console.log("Received:", data);
//       setSubmissions(data.newdata);
//       setActiveTab('submissions');
//       setActiveSubmission(data.newdata);
//       setLoadingSubmissions(false);
//     });

//     socket.on("run-update", (data) => {
//       console.log("run Received:", data);
//       setSubmissions(data.newdata);
//       setActiveTab('submissions');
//       setActiveSubmission(data.newdata);
//       setLoadingSubmissions(false);
//     });

//     return () => {
//       socket.disconnect();
//     }
//   }, [id.id]);

//   async function getProblem() {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/v1/problems/problem/${id.id}`);
//       setProblem(res.data.problems);
//       setCode(res.data.problems.starterCode?.[language] || '');
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   async function fetchSubmissions() {
//     setLoadingSubmissions(true);
//     // try {
//     //   const res = await axios.get(`http://localhost:5000/api/v1/problems/submissions/${id.id}`);
//     //   setSubmissions(res.data.submissions || []);
//     // } catch (e) {
//     //   // If endpoint not ready yet, fallback to empty
//     //   setSubmissions([]);
//     // } finally {
//     //   setLoadingSubmissions(false);
//     // }
//   }

//   const handleRun = () => {
//     console.log(code);
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       const res = await axios.post('http://localhost:5000/api/v1/problems/submit', {
//         code,
//         problemId: id.id,
//         language,
//       },
//         {
//           withCredentials: true,
//         });
//       // Optimistically add the new submission to the top
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="flex h-full flex-col overflow-hidden">
//         {/* Top Bar */}
//         <div className="border-b border-border bg-card px-6 py-4">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h1 className="mb-1">{problem.title}</h1>
//               <div className="flex gap-3">
//                 <span
//                   className={`rounded-full px-2 py-1 text-xs font-semibold ${problem.difficulty === 'Easy'
//                     ? 'bg-success/20 text-success'
//                     : problem.difficulty === 'Medium'
//                       ? 'bg-warning/20 text-warning'
//                       : 'bg-error/20 text-error'
//                     }`}
//                 >
//                   {problem.difficulty}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* Problem Description */}
//           <div className="hidden w-1/2 overflow-auto border-r border-border bg-card/50 p-6 lg:block">
//             <div className="space-y-6">
//               <div>
//                 <h2 className="mb-3 text-lg font-semibold">Description</h2>
//                 <p className="text-muted-foreground">{problem.description}</p>
//               </div>

//               <div>
//                 <h3 className="mb-3 font-semibold">Examples</h3>
//                 <div className="space-y-3">
//                   {problem.testCases.map((tc) => (
//                     <div key={tc._id} className="rounded-lg border border-border bg-card p-3">
//                       <p className="text-sm font-mono text-muted-foreground">Input: {JSON.stringify(tc.input)}</p>
//                       <p className="mt-2 text-sm font-mono text-success">Output: {JSON.stringify(tc.output)}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="mb-3 font-semibold">Constraints</h3>
//                 <ul className="space-y-2 text-sm text-muted-foreground">{problem.constraints}</ul>
//               </div>

//               <div>
//                 <h3 className="mb-3 font-semibold">Topics</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {problem.tags.map((topic) => (
//                     <span key={topic} className="rounded-full bg-secondary/50 px-3 py-1 text-xs">{topic}</span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="mb-3 font-semibold">Hints</h3>
//                 <div className="space-y-2 text-sm">
//                   <p className="text-muted-foreground">💡 A really brute force way would be to search for complements of every number in the array. That would take O(n²) time.</p>
//                   <p className="text-muted-foreground">💡 Better approach would be to use a hash table. We trade space for speed.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Editor Section */}
//           <div className="flex w-full flex-col lg:w-1/2">
//             {/* Code Editor */}
//             <div className="flex-1 overflow-hidden border-b border-border">
//               <div className="flex h-12 items-center border-b border-border bg-card px-4">
//                 <Select value={language} onValueChange={setLanguage}>
//                   <SelectTrigger className="w-40">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="javascript">JavaScript</SelectItem>
//                     <SelectItem value="python">Python</SelectItem>
//                     <SelectItem value="java">Java</SelectItem>
//                     <SelectItem value="cpp">C++</SelectItem>
//                     <SelectItem value="go">Go</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="h-full overflow-auto bg-card p-4">
//                 <Editor
//                   height="100%"
//                   language={language}
//                   theme="vs-dark"
//                   value={code}
//                   onChange={(value) => setCode(value || '')}
//                 />
//               </div>
//             </div>

//             {/* Output / Test Cases / Submissions Console */}
//             <div className="flex flex-col border-t border-border">
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
//                 <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
//                   <TabsList className="h-auto bg-transparent p-0">
//                     <TabsTrigger
//                       value="output"
//                       className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//                     >
//                       Output
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="testcases"
//                       className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//                     >
//                       Test Cases
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="submissions"
//                       className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//                     >
//                       Submissions

//                     </TabsTrigger>
//                   </TabsList>

//                   <div className="flex gap-2">
//                     <Button size="sm" variant="outline" onClick={handleRun}>
//                       <Play className="mr-2 h-4 w-4" />
//                       {isRunning ? (
//                         <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Running...</>
//                       ) : (
//                         'Run'
//                       )}
//                     </Button>
//                     <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
//                       {isSubmitting ? (
//                         <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting…</>
//                       ) : (
//                         'Submit'
//                       )}
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Output Tab */}
//                 <TabsContent value="output" className="p-4">
//                   <pre className="font-mono text-sm text-muted-foreground">
//                     {output || 'Click "Run" to execute code'}
//                   </pre>
//                 </TabsContent>

//                 {/* Test Cases Tab */}
//                 <TabsContent value="testcases" className="space-y-3 p-4">
//                   {problem.testCases.map((tc, i) => (
//                     <Card key={tc._id} className="p-3">
//                       <p className="text-sm font-semibold">Test Case {i + 1}</p>
//                       <p className="mt-2 text-xs text-muted-foreground font-mono">Input: {JSON.stringify(tc.input)}</p>
//                       <p className="text-xs text-success font-mono">Expected: {JSON.stringify(tc.output)}</p>
//                     </Card>
//                   ))}
//                 </TabsContent>

//                 {/* Submissions Tab */}
//                 <TabsContent value="submissions" className="p-4 overflow-auto max-h-72">
//                   {loadingSubmissions ? (
//                     <div className="flex items-center justify-center py-8 text-muted-foreground gap-2 text-sm">
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Loading submissions…
//                     </div>
//                   ) : activeSubmission ? (
//                     <SubmissionDetail
//                       sub={activeSubmission}
//                       onBack={() => setActiveSubmission(null)}
//                     />
//                   ) : submissions ? (
//                     <div className="flex flex-col gap-2">
//                       <SubmissionRow
//                         sub={submissions}
//                         isActive={false}
//                         onClick={() => setActiveSubmission(submissions)}
//                       />
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
//                       <p className="text-sm text-muted-foreground">No submissions yet.</p>
//                       <p className="text-xs text-muted-foreground">
//                         Write your solution and hit Submit.
//                       </p>
//                     </div>
//                   )}
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Play, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
// import MainLayout from '@/components/layouts/MainLayout';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import axios from 'axios';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import Editor from "@monaco-editor/react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import socket from '@/utils/socket';

// const testCases = [
//   { _id: 1, input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
// ];

// const examples = [
//   { _id: 1, input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
// ];

// const STATUS_STYLES = {
//   "Passed": { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
//   'Wrong Answer': { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
//   'Time Limit Exceeded': { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
//   Error: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
//   'Compilation Error': { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
//   Pending: { icon: Loader2, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
// };

// function StatusBadge({ status }) {
//   const cfg = STATUS_STYLES[status] || STATUS_STYLES['Pending'];
//   const Icon = cfg.icon;
//   return (
//     <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
//       <Icon className={`h-3 w-3 ${status === 'Pending' ? 'animate-spin' : ''}`} />
//       {status}
//     </span>
//   );
// }

// function SubmissionRow({ sub, onClick, isActive }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full text-left rounded-lg border p-3 transition-colors hover:bg-secondary/40 ${isActive ? 'border-primary/50 bg-secondary/60' : 'border-border bg-card'
//         }`}
//     >
//       <div className="flex items-center justify-between gap-2">
//         <StatusBadge status={sub.status} />
//         <span className="text-xs text-muted-foreground">{sub.language}</span>
//         <span className="ml-auto text-xs text-muted-foreground">{sub.submittedAt}</span>
//       </div>
//       {sub.runtime && (
//         <div className="mt-1.5 flex gap-4 text-xs text-muted-foreground">
//           <span>Runtime: <span className="text-foreground font-medium">{sub.runtime}</span></span>
//           {sub.memory && <span>Memory: <span className="text-foreground font-medium">{sub.memory}</span></span>}
//         </div>
//       )}
//     </button>
//   );
// }

// function SubmissionDetail({ sub, onBack }) {
//   console.log("sub status: ",sub)
//   return (
//     <div className="flex flex-col gap-3">
//       <button onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 w-fit">
//         ← Back to all submissions
//       </button>
//       <div className={`rounded-lg border p-4 ${STATUS_STYLES[sub.verdict]?.bg || ''} ${STATUS_STYLES[sub.verdict]?.border || 'border-border'}`}>
//         <div className="flex items-center justify-between mb-1">
//           <StatusBadge status={sub.verdict} />
//           <span className="text-xs text-muted-foreground">{sub.submittedAt}</span>
//         </div>
//         {sub.verdict === 'Passed' && (
//           <div className="mt-2 flex gap-6 text-sm">
//             <div><span className="text-muted-foreground">Runtime</span><p className="font-semibold text-foreground">{sub.runtime}</p></div>
//             <div><span className="text-muted-foreground">Memory</span><p className="font-semibold text-foreground">{sub.memory}</p></div>
//             <div><span className="text-muted-foreground">Language</span><p className="font-semibold text-foreground">{sub.language}</p></div>
//           </div>
//         )}
//         {sub.verdict !== "Time Limit Exceeded" && sub.error && (
//           <pre className="mt-2 text-xs text-red-400 whitespace-pre-wrap font-mono">{sub.error}</pre>
//         )}
//       <div className="mt-2 flex flex-col gap-6 text-sm">

//         {sub.result.map((res,index)=>{
//           return <div key={index} className='flex space-x-2'>
//             <div><span className="text-muted-foreground">Input</span><p className="font-semibold text-foreground">{JSON.stringify(res.input)}</p></div>
//             <div><span className="text-muted-foreground">Expected</span><p className="font-semibold text-foreground">{res.expected}</p></div>
//             <div><span className="text-muted-foreground">Your Output</span><p className="font-semibold text-foreground">{res.output}</p></div>
//           </div>
//         })}
        
//      </div>
//       </div>
//       <div className="rounded-lg border border-border overflow-hidden">
//         <div className="bg-card px-3 py-2 text-xs text-muted-foreground border-b border-border">Submitted Code · {sub.language}</div>
//         <Editor
//           height="260px"
//           language={sub.language?.toLowerCase()}
//           theme="vs-dark"
//           value={sub.code}
//           options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
//         />
//       </div>
//     </div>
//   );
// }

// export default function ProblemDetail() {
//   const dummy = {
//     id: '1',
//     title: 'Two Sum',
//     difficulty: 'Easy',
//     status: 'Solved',
//     description: 'asdasdsa',
//     tags: ['Array', 'Hash Table'],
//     testCases,
//     examples,
//     constraints: '',
//     starterCode: "",
//     timeLimit:200,
//     memoryLimit:256
//   };

//   const id = useParams();
//   const [problem, setProblem] = useState(dummy);
//   const [language, setLanguage] = useState('javascript');
//   const [code, setCode] = useState(dummy.starterCode);
//   const [output, setOutput] = useState('');
//   const [submissions, setSubmissions] = useState({});
//   const [loadingSubmissions, setLoadingSubmissions] = useState(false);
//   const [loadingRun, setLoadingRun] = useState(false);
//   const [activeSubmission, setActiveSubmission] = useState(null);
//   const [activeRun, setActiveRun] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isRunning,setIsRunning] = useState(false)
//   const [activeTab, setActiveTab] = useState('output');

//   useEffect(() => {
//     socket.connect();
//     getProblem();
//     fetchSubmissions();
//     socket.on("submission-update", (data) => {
//       console.log("Received:", data);
//       setSubmissions(data.newdata);
//       setActiveTab('submissions');
//       setActiveSubmission(data.newdata);
//       setLoadingSubmissions(false);
//     });

//     socket.on("run-update", (data) => {
//       console.log("run Received:", data);
//       setActiveTab('output');
//       setActiveRun(data.newdata);
//       setLoadingRun(false);
//     });

//     return () => {
//       socket.disconnect();
//     }
//   }, [id.id]);

//   async function getProblem() {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/v1/problems/problem/${id.id}`);
//       setProblem(res.data.problems);
//       console.log("problems check: ",res.data.problems)
//       setCode(res.data.problems.starterCode?.[language] || '');
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   async function fetchSubmissions() {
//     setLoadingSubmissions(true);
//     // try {
//     //   const res = await axios.get(`http://localhost:5000/api/v1/problems/submissions/${id.id}`);
//     //   setSubmissions(res.data.submissions || []);
//     // } catch (e) {
//     //   // If endpoint not ready yet, fallback to empty
//     //   setSubmissions([]);
//     // } finally {
//     //   setLoadingSubmissions(false);
//     // }
//   }

//   const handleRun = async() => {
//     setIsRunning(true);
//     try {
//       const res = await axios.post('http://localhost:5000/api/v1/problems/run', {
//         code,
//         problemId: id.id,
//         language,
//       },
//         {
//           withCredentials: true,
//         });
//       // Optimistically add the new submission to the top
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       const res = await axios.post('http://localhost:5000/api/v1/problems/submit', {
//         code,
//         problemId: id.id,
//         language,
//       },
//         {
//           withCredentials: true,
//         });
//       // Optimistically add the new submission to the top
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="flex h-full flex-col overflow-hidden">
//         {/* Top Bar */}
//         <div className="border-b border-border bg-card px-6 py-4">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h1 className="mb-1">{problem.title}</h1>
//               <div className="flex gap-3">
//                 <span
//                   className={`rounded-full px-2 py-1 text-xs font-semibold ${problem.difficulty === 'Easy'
//                     ? 'bg-success/20 text-success'
//                     : problem.difficulty === 'Medium'
//                       ? 'bg-warning/20 text-warning'
//                       : 'bg-error/20 text-error'
//                     }`}
//                 >
//                   {problem.difficulty}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* Problem Description */}
//           <div className="hidden w-1/2 overflow-auto border-r border-border bg-card/50 p-6 lg:block">
//             <div className="space-y-6">
//               <div>
//                 <h2 className="mb-3 text-lg font-semibold">Description</h2>
//                 <p className="text-muted-foreground">{problem.description}</p>
//               </div>

//               <div>
//                 <h3 className="mb-3 font-semibold">Examples</h3>
//                 <div className="space-y-3">
//                   {problem.examples.map((tc) => (
//                     <div key={tc._id} className="rounded-lg border border-border bg-card p-3">
//                       <p className="text-sm font-mono text-muted-foreground">Input: {JSON.stringify(tc.input)}</p>
//                       <p className="mt-2 text-sm font-mono text-success">Output: {JSON.stringify(tc.output)}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="mb-3 font-semibold">Constraints</h3>
//                 <ul className="space-y-2 text-sm text-muted-foreground">{problem.constraints}</ul>
//               </div>

//               <div>
//                 <h3 className="mb-3 font-semibold">Topics</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {problem.tags.map((topic) => (
//                     <span key={topic} className="rounded-full bg-secondary/50 px-3 py-1 text-xs">{topic}</span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="mb-3 font-semibold">Hints</h3>
//                 <div className="space-y-2 text-sm">
//                   <p className="text-muted-foreground">💡 A really brute force way would be to search for complements of every number in the array. That would take O(n²) time.</p>
//                   <p className="text-muted-foreground">💡 Better approach would be to use a hash table. We trade space for speed.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Editor Section */}
//           <div className="flex w-full flex-col lg:w-1/2">
//             {/* Code Editor */}
//             <div className="flex-1 overflow-hidden border-b border-border">
//               <div className="flex h-12 items-center border-b border-border bg-card px-4">
//                 <Select value={language} onValueChange={setLanguage}>
//                   <SelectTrigger className="w-40">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="javascript">JavaScript</SelectItem>
//                     <SelectItem value="python">Python</SelectItem>
//                     <SelectItem value="java">Java</SelectItem>
//                     <SelectItem value="cpp">C++</SelectItem>
//                     <SelectItem value="go">Go</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="h-full overflow-auto bg-card p-4">
//                 <Editor
//                   height="100%"
//                   language={language}
//                   theme="vs-dark"
//                   value={code}
//                   onChange={(value) => setCode(value || '')}
//                 />
//               </div>
//             </div>

//             {/* Output / Test Cases / Submissions Console */}
//             <div className="flex flex-col border-t border-border">
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
//                 <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
//                   <TabsList className="h-auto bg-transparent p-0">
//                     <TabsTrigger
//                       value="output"
//                       className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//                     >
//                       Output
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="testcases"
//                       className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//                     >
//                       Test Cases
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="submissions"
//                       className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
//                     >
//                       Submissions

//                     </TabsTrigger>
//                   </TabsList>

//                   <div className="flex gap-2">
//                     <Button size="sm" variant="outline" onClick={handleRun}>
//                       <Play className="mr-2 h-4 w-4" />
//                       {isRunning ? (
//                         <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Running...</>
//                       ) : (
//                         'Run'
//                       )}
//                     </Button>
//                     <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
//                       {isSubmitting ? (
//                         <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting…</>
//                       ) : (
//                         'Submit'
//                       )}
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Output Tab */}
//                 <TabsContent value="output" className="p-4">
//                   <pre className="font-mono text-sm text-muted-foreground">
//                     {loadingRun ? (
//                     <div className="flex items-center justify-center py-8 text-muted-foreground gap-2 text-sm">
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Loading Run submissions…
//                     </div>
//                   ) : activeRun ? (
//                     <SubmissionDetail
//                       sub={activeRun}
//                       onBack={() => setActiveRun(null)}
//                     />
//                   ) : submissions ? (
//                     <div className="flex flex-col gap-2">
//                       <SubmissionRow
//                         sub={submissions}
//                         isActive={false}
//                         onClick={() => setActiveRun(submissions)}
//                       />
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
//                       <p className="text-sm text-muted-foreground">No Run submissions yet.</p>
//                       <p className="text-xs text-muted-foreground">
//                         Write your solution and hit Submit.
//                       </p>
//                     </div>
//                   )}
//                   </pre>
//                 </TabsContent>

//                 {/* Test Cases Tab */}
//                 <TabsContent value="testcases" className="space-y-3 p-4">
//                   {problem.examples.map((tc, i) => (
//                     <Card key={tc._id} className="p-3">
//                       <p className="text-sm font-semibold">Test Case {i + 1}</p>
//                       <p className="mt-2 text-xs text-muted-foreground font-mono">Input: {JSON.stringify(tc.input)}</p>
//                       <p className="text-xs text-success font-mono">Expected: {JSON.stringify(tc.output)}</p>
//                     </Card>
//                   ))}
//                 </TabsContent>

//                 {/* Submissions Tab */}
//                 <TabsContent value="submissions" className="p-4 overflow-auto max-h-72">
//                   {loadingSubmissions ? (
//                     <div className="flex items-center justify-center py-8 text-muted-foreground gap-2 text-sm">
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Loading submissions…
//                     </div>
//                   ) : activeSubmission ? (
//                     <SubmissionDetail
//                       sub={activeSubmission}
//                       onBack={() => setActiveSubmission(null)}
//                     />
//                   ) : submissions ? (
//                     <div className="flex flex-col gap-2">
//                       <SubmissionRow
//                         sub={submissions}
//                         isActive={false}
//                         onClick={() => setActiveSubmission(submissions)}
//                       />
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
//                       <p className="text-sm text-muted-foreground">No submissions yet.</p>
//                       <p className="text-xs text-muted-foreground">
//                         Write your solution and hit Submit.
//                       </p>
//                     </div>
//                   )}
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }





import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Play, CheckCircle2, XCircle, Clock, Loader2,
  ChevronLeft, Timer, Database, Tag, Lightbulb,
  Send, Circle
} from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
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
import socket from '@/utils/socket';

// ─── Constants ───────────────────────────────────────────────────────────────

const testCases = [
  { _id: 1, input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
];

const examples = [
  { _id: 1, input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
];

const VERDICT = {
  Passed:               { icon: CheckCircle2, color: 'text-green-500',  bg: 'bg-green-500/10',  border: 'border-green-500/30',  label: 'Accepted' },
  'Wrong Answer':       { icon: XCircle,      color: 'text-red-500',    bg: 'bg-red-500/10',    border: 'border-red-500/30',    label: 'Wrong Answer' },
  'TLE':{ icon: Clock,        color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', label: 'Time Limit Exceeded' },
  'Runtime Error':                { icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/30',    label: 'Runtime Error' },
  'Compilation Error':  { icon: XCircle,      color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', label: 'Compilation Error' },
  'Memory Limit Exceeded':  { icon: XCircle,      color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', label: 'Memory Limit Exceeded' },
  Pending:              { icon: Loader2,      color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/30',   label: 'Pending' },
};

const DIFFICULTY = {
  Easy:   'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30',
  Medium: 'bg-amber-500/15   text-amber-400   ring-1 ring-amber-500/30',
  Hard:   'bg-red-500/15     text-red-400     ring-1 ring-red-500/30',
};

// ─── Small reusable components ───────────────────────────────────────────────

function VerdictBadge({ status }) {
  const v = VERDICT[status] || VERDICT['Pending'];
  const Icon = v.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${v.color} ${v.bg} ${v.border}`}>
      <Icon className={`h-3.5 w-3.5 ${status === 'Pending' ? 'animate-spin' : ''}`} />
      {v.label}
    </span>
  );
}

// Single test-case result card (used in both Run and Submission detail)
function CaseCard({ res, index, passed }) {
  return (
    <div className={`rounded-lg border p-3 text-xs ${passed ? 'border-green-500/25 bg-green-500/5' : 'border-red-500/25 bg-red-500/5'}`}>
      <div className="flex items-center gap-2 mb-2">
        {passed
          ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
          : <XCircle className="h-3.5 w-3.5 text-red-500" />}
        <span className={`font-semibold ${passed ? 'text-green-500' : 'text-red-500'}`}>
          Case {index + 1} — {passed ? 'Passed' : 'Failed'}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 font-mono">
        <div>
          <p className="text-muted-foreground mb-1">Input</p>
          <p className="text-foreground break-all">{JSON.stringify(res.input)}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Expected</p>
          <p className="text-green-400 break-all">{res.expected}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Your Output</p>
          <p className={`break-all ${passed ? 'text-green-400' : 'text-red-400'}`}>{res.output}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Run Output panel ─────────────────────────────────────────────────────────

function RunOutput({ activeRun, isRunning, onClear }) {
  if (isRunning) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm">Running your code…</p>
      </div>
    );
  }

  if (!activeRun) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
        <Play className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">Click <span className="font-semibold text-foreground">Run</span> to test your code</p>
        <p className="text-xs text-muted-foreground/60">Results will appear here</p>
      </div>
    );
  }

  const v = VERDICT[activeRun.verdict] || VERDICT['Pending'];
  const passedCount = activeRun.result?.filter(r => r.output === r.expected).length ?? 0;
  const totalCount  = activeRun.result?.length ?? 0;

  return (
    <div className="flex flex-col gap-3 p-4 overflow-auto h-full">
      {/* Verdict banner */}
      <div className={`rounded-xl border p-3.5 ${v.bg} ${v.border}`}>
        <div className="flex items-center justify-between">
          <VerdictBadge status={activeRun.verdict} />
          <button onClick={onClear} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Clear</button>
        </div>
        {activeRun.verdict === 'Passed' && (
          <div className="flex gap-5 mt-2.5 text-sm">
            <div><p className="text-xs text-muted-foreground">Runtime</p><p className="font-semibold text-foreground">{activeRun.runtime}</p></div>
            <div><p className="text-xs text-muted-foreground">Memory</p><p className="font-semibold text-foreground">{activeRun.memory}</p></div>
          </div>
        )}
        {activeRun.verdict !== 'Time Limit Exceeded' && activeRun.error && (
          <pre className="mt-2.5 text-xs text-red-400 font-mono whitespace-pre-wrap bg-black/20 rounded p-2">{activeRun.error}</pre>
        )}
        {totalCount > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            {passedCount} / {totalCount} test cases passed
          </p>
        )}
      </div>

      {/* Per-case cards */}
      <div className="flex flex-col gap-2">
        {activeRun.result?.map((res, i) => (
          <CaseCard key={i} res={res} index={i} passed={res.output === res.expected} />
        ))}
      </div>
    </div>
  );
}

// ─── Submission verdict panel (right side, shown after submit) ─────────────

function SubmitResult({ sub, onClear }) {
  if (!sub) return null;
  const v = VERDICT[sub.verdict] || VERDICT['Pending'];
  const passedCount = sub.result?.filter(r => r.output === r.expected).length ?? 0;
  const totalCount  = sub.result?.length ?? 0;

  return (
    <div className="flex flex-col gap-3 p-4 overflow-auto h-full">
      <div className={`rounded-xl border p-4 ${v.bg} ${v.border}`}>
        <div className="flex items-center justify-between">
          <VerdictBadge status={sub.verdict} />
          <button onClick={onClear} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Clear</button>
        </div>
        {sub.verdict === 'Passed' && (
          <div className="flex gap-6 mt-3 text-sm">
            <div><p className="text-xs text-muted-foreground">Runtime</p><p className="font-semibold text-foreground">{sub.runtime}</p></div>
            <div><p className="text-xs text-muted-foreground">Memory</p><p className="font-semibold text-foreground">{sub.memory} kb</p></div>
            <div><p className="text-xs text-muted-foreground">Language</p><p className="font-semibold text-foreground">{sub.language}</p></div>
          </div>
        )}
        { sub.error && (
          <pre className="mt-3 text-xs text-red-400 font-mono whitespace-pre-wrap bg-black/20 rounded p-2">{sub.error}</pre>
        )}
        {totalCount > 0 && (
          <p className="mt-2.5 text-xs text-muted-foreground">{passedCount} / {totalCount} test cases passed</p>
        )}
      </div>
      {<div className="flex flex-col gap-2">
        { sub.result?.map((res, i) => (
          <CaseCard key={i} res={res} index={i} passed={res.output === res.expected} />
        ))}
      </div>}  
    </div>
  );
}

// ─── Submissions history (left panel) ────────────────────────────────────────

function SubmissionHistoryList({ history, onSelect }) {
  console.log("Sub history: ",history)
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
        <Send className="h-8 w-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">No submissions yet</p>
        <p className="text-xs text-muted-foreground/60">Submit your solution to see history</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {history.map((sub, i) => {
        const v = VERDICT[sub.verdict] || VERDICT['Pending'];
        const Icon = v.icon;
        return (
          <button
            key={i}
            onClick={() => onSelect(sub)}
            className="w-full text-left rounded-xl border border-border bg-card p-3.5 hover:border-primary/40 hover:bg-secondary/30 transition-all duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <VerdictBadge status={sub.verdict} />
              <span className="text-xs text-muted-foreground">{sub.submittedAt || 'Just now'}</span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="rounded bg-secondary/60 px-1.5 py-0.5 font-medium">{sub.language}</span>
              {sub.runtime && <span>Runtime: <span className="text-foreground font-medium">{sub.runtime}</span></span>}
              {sub.memory  && <span>Memory: <span className="text-foreground font-medium">{sub.memory}</span></span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function SubmissionHistoryDetail({ sub, onBack }) {
  const v = VERDICT[sub.verdict] || VERDICT['Pending'];
  return (
    <div className="flex flex-col gap-3">
      <button onClick={onBack} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
        <ChevronLeft className="h-3.5 w-3.5" /> Back to submissions
      </button>
      <div className={`rounded-xl border p-4 ${v.bg} ${v.border}`}>
        <div className="flex items-center justify-between mb-1">
          <VerdictBadge status={sub.verdict} />
          <span className="text-xs text-muted-foreground">{sub.submittedAt || 'Just now'}</span>
        </div>
        {sub.verdict === 'Passed' && (
          <div className="flex gap-5 mt-2.5 text-sm">
            <div><p className="text-xs text-muted-foreground">Runtime</p><p className="font-semibold text-foreground">{sub.runtime}</p></div>
            <div><p className="text-xs text-muted-foreground">Memory</p><p className="font-semibold text-foreground">{sub.memory}</p></div>
            <div><p className="text-xs text-muted-foreground">Language</p><p className="font-semibold text-foreground">{sub.language}</p></div>
          </div>
        )}
        {sub.verdict !== 'Time Limit Exceeded' && sub.error && (
          <pre className="mt-2.5 text-xs text-red-400 font-mono whitespace-pre-wrap bg-black/20 rounded p-2">{sub.error}</pre>
        )}
      </div>

      {/* Test case results */}
      {sub.result?.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Test Cases</p>
          {sub.result.map((res, i) => (
            <CaseCard key={i} res={res} index={i} passed={res.output === res.expected} />
          ))}
        </div>
      )}

      {/* Submitted code */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Submitted Code</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="bg-card px-3 py-2 text-xs text-muted-foreground border-b border-border flex items-center gap-2">
            <Circle className="h-2.5 w-2.5 text-red-400 fill-red-400" />
            <Circle className="h-2.5 w-2.5 text-yellow-400 fill-yellow-400" />
            <Circle className="h-2.5 w-2.5 text-green-400 fill-green-400" />
            <span className="ml-1">{sub.language}</span>
          </div>
          <Editor
            height="240px"
            language={sub.language?.toLowerCase()}
            theme="vs-dark"
            value={sub.code}
            options={{ readOnly: true, minimap: { enabled: false }, fontSize: 12, scrollBeyondLastLine: false, padding: { top: 8 } }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProblemDetail() {
  const dummy = {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    status: 'Solved',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    tags: ['Array', 'Hash Table'],
    testCases,
    examples,
    constraints: '',
    starterCode: '',
    timeLimit: 200,
    memoryLimit: 256,
  };

  const id = useParams();
  const [problem, setProblem]                   = useState(dummy);
  const [language, setLanguage]                 = useState('javascript');
  const [code, setCode]                         = useState(dummy.starterCode);
  const [submissionHistory, setSubmissionHistory] = useState([]);   // array for history
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [loadingRun, setLoadingRun]             = useState(false);
  const [activeSubmission, setActiveSubmission] = useState(null);   // detail drill-down (left)
  const [latestSubmitResult, setLatestSubmitResult] = useState(null); // shown in right console
  const [activeRun, setActiveRun]               = useState(null);
  const [isSubmitting, setIsSubmitting]         = useState(false);
  const [isRunning, setIsRunning]               = useState(false);

  // left panel: 'problem' | 'submissions'
  const [leftTab, setLeftTab] = useState('problem');
  // right console: 'testcases' | 'output'
  const [consoleTab, setConsoleTab] = useState('testcases');

  useEffect(() => {
    socket.connect();
    getProblem();
    fetchSubmissions();

    socket.on('submission-update', (data) => {
      console.log('Received:', data);
      const sub = data.newdata;
      setSubmissionHistory((prev) => [sub, ...prev]);
      setLatestSubmitResult(sub);
      setConsoleTab('output');
      setLoadingSubmissions(false);
    });

    socket.on('run-update', (data) => {
      console.log('run Received:', data);
      setActiveRun(data.newdata);
      setConsoleTab('output');
      setLoadingRun(false);
      setIsRunning(false);
    });

    return () => { socket.disconnect(); };
  }, [id.id]);

  async function getProblem() {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/problems/problem/${id.id}`);
      setProblem(res.data.problems);
      console.log('problems check:', res.data.problems);
      setCode(res.data.problems.starterCode?.[language] || '');
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchSubmissions() {
    setLoadingSubmissions(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/problems/submissions/${id.id}`);
      console.log("fetched: ",res.data)
      setSubmissionHistory(res.data.submissions || []);
    } catch (e) {
      console.log(e);
      setSubmissionHistory([]);
    } finally {
      setLoadingSubmissions(false);
    }
  }

  const handleRun = async () => {
    setIsRunning(true);
    setActiveRun(null);
    setLatestSubmitResult(null);
    setConsoleTab('output');
    try {
      await axios.post('http://localhost:5000/api/v1/problems/run', { code, problemId: id.id, language }, { withCredentials: true });
    } catch (e) {
      console.error(e);
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setLatestSubmitResult(null);
    setActiveRun(null);
    setConsoleTab('output');
    try {
      await axios.post('http://localhost:5000/api/v1/problems/submit', { code, problemId: id.id, language }, { withCredentials: true });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex h-full flex-col overflow-hidden bg-background">

        {/* ── Top Bar ── */}
        <div className="flex-shrink-0 border-b border-border bg-card px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold tracking-tight">{problem.title}</h1>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${DIFFICULTY[problem.difficulty] || 'bg-secondary text-foreground'}`}>
              {problem.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5" /> {problem.timeLimit ?? '—'} ms
            </span>
            <span className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5" /> {problem.memoryLimit ?? '—'} MB
            </span>
          </div>
        </div>

        {/* ── Main body ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ══ LEFT PANEL ══ */}
          <div className="hidden lg:flex flex-col w-[42%] border-r border-border overflow-hidden">
            {/* Left tab bar */}
            <div className="flex-shrink-0 flex border-b border-border bg-card">
              {['problem', 'submissions'].map((t) => (
                <button
                  key={t}
                  onClick={() => { setLeftTab(t); setActiveSubmission(null); }}
                  className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 ${
                    leftTab === t
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t}
                  {t === 'submissions' && submissionHistory.length > 0 && (
                    <span className="ml-1.5 rounded-full bg-primary/20 text-primary px-1.5 py-0.5 text-xs font-semibold">
                      {submissionHistory.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Left content */}
            <div className="flex-1 overflow-auto p-5 bg-card/40">

              {/* ── Problem tab ── */}
              {leftTab === 'problem' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Examples</h3>
                    <div className="space-y-3">
                      {(problem.examples || problem.testCases || []).map((tc, i) => (
                        <div key={tc._id} className="rounded-xl border border-border bg-card p-3.5">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Example {i + 1}</p>
                          <p className="text-xs font-mono text-muted-foreground">
                            Input: <span className="text-foreground">{JSON.stringify(tc.input)}</span>
                          </p>
                          <p className="mt-1.5 text-xs font-mono">
                            Output: <span className="text-green-400">{JSON.stringify(tc.output)}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {problem.constraints && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Constraints</h3>
                      <div className="rounded-xl border border-border bg-card p-3.5 text-sm text-muted-foreground">
                        {problem.constraints}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" /> Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(problem.tags || []).map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium hover:bg-secondary transition-colors cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5" /> Hints
                    </h3>
                    <div className="space-y-2">
                      <div className="rounded-xl border border-border/60 bg-secondary/20 p-3 text-sm text-muted-foreground leading-relaxed">
                        A brute-force approach searches for complements of every number — O(n²) time.
                      </div>
                      <div className="rounded-xl border border-border/60 bg-secondary/20 p-3 text-sm text-muted-foreground leading-relaxed">
                        Use a hash table to trade memory for speed, reducing to O(n).
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Submissions tab ── */}
              {leftTab === 'submissions' && (
                loadingSubmissions ? (
                  <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                  </div>
                ) : (
                  <SubmissionHistoryList history={submissionHistory} onSelect={setActiveSubmission} />
                )
              )}
            </div>
          </div>

          {/* ══ RIGHT PANEL ══ */}
          <div className="flex flex-1 flex-col overflow-hidden">

            {/* Editor toolbar */}
            <div className="flex-shrink-0 flex items-center justify-between border-b border-border bg-card px-4 h-11">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-36 h-8 text-xs">
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

            {/* Monaco Editor */}
            <div className="flex-1 overflow-hidden min-h-0">
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{ minimap: { enabled: false }, fontSize: 14, scrollBeyondLastLine: false, padding: { top: 12 } }}
              />
            </div>

            {/* ── Console ── */}
            <div className="flex-shrink-0 h-64 border-t border-border flex flex-col bg-card">
              {/* Console tab bar + action buttons */}
              <div className="flex-shrink-0 flex items-center justify-between border-b border-border px-3 py-1.5 bg-card">
                <div className="flex">
                  {['testcases', 'output'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setConsoleTab(t)}
                      className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors border-b-2 ${
                        consoleTab === t
                          ? 'border-primary text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t === 'testcases' ? 'Test Cases' : 'Output'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRun}
                    disabled={isRunning}
                    className="h-7 text-xs px-3 gap-1.5"
                  >
                    {isRunning
                      ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Running…</>
                      : <><Play className="h-3.5 w-3.5" /> Run</>
                    }
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="h-7 text-xs px-3 gap-1.5"
                  >
                    {isSubmitting
                      ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Submitting…</>
                      : <><Send className="h-3.5 w-3.5" /> Submit</>
                    }
                  </Button>
                </div>
              </div>

              {/* Console body */}
              <div className="flex-1 overflow-auto">

                {/* Test Cases tab */}
                {consoleTab === 'testcases' && (
                  <div className="p-3 flex flex-col gap-2">
                    {(problem.examples || problem.testCases || []).map((tc, i) => (
                      <div key={tc._id} className="rounded-xl border border-border bg-card/60 p-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Case {i + 1}</p>
                        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                          <div>
                            <p className="text-muted-foreground mb-1">Input</p>
                            <p className="text-foreground">{JSON.stringify(tc.input)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Expected</p>
                            <p className="text-green-400">{JSON.stringify(tc.output)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Output tab — shows run OR submit result */}
                {consoleTab === 'output' && (
                  activeRun ? (
                    <RunOutput activeRun={activeRun} isRunning={false} onClear={() => setActiveRun(null)} />
                  ) : latestSubmitResult ? (
                    <SubmitResult sub={latestSubmitResult} onClear={() => setLatestSubmitResult(null)} />
                  ) : (isRunning || isSubmitting) ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <p className="text-sm">{isRunning ? 'Running your code…' : 'Evaluating submission…'}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
                      <Play className="h-7 w-7 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">Run your code or submit to see results</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
 