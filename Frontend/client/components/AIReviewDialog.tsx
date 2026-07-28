
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  Clock3,
  Database,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

export interface AIReview {
  correctness: string;
  rating: number;
  timeComplexity: string;
  spaceComplexity: string;
  strengths: string[];
  issues: string[];
  suggestions: string[];
  overallFeedback: string;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  review: AIReview | null;
}

function Section({
  icon,
  title,
  color,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
      <div className={`flex items-center gap-2 font-semibold ${color}`}>
        {icon}
        {title}
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg bg-zinc-950/70 p-3 text-sm text-zinc-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AIReviewDialog({
  open,
  setOpen,
  review,
}: Props) {
  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 p-0">

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-blue-500/20 to-cyan-500/20" />

          <div className="relative p-8">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-violet-500/15 p-4">
                  <Sparkles className="h-8 w-8 text-violet-400" />
                </div>

                <div>
                  <DialogTitle className="text-3xl font-bold">
                    AI Code Review
                  </DialogTitle>

                  <p className="mt-1 text-sm text-zinc-400">
                    AI-powered analysis of your solution
                  </p>
                </div>
              </div>
            </DialogHeader>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .35 }}
          className="p-8"
        >

          <div className="flex flex-col items-center">

            <div className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-8 py-5">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                <span className="text-5xl font-bold">{review.rating}</span>
                <span className="text-2xl text-zinc-400">/10</span>
              </div>
            </div>

            <Badge className="mt-5 bg-green-500/15 text-green-400 hover:bg-green-500/15">
              {review.correctness}
            </Badge>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-cyan-400" />
                <span className="font-semibold">Time Complexity</span>
              </div>

              <p className="mt-3 text-3xl font-bold">
                {review.timeComplexity}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-400" />
                <span className="font-semibold">Space Complexity</span>
              </div>

              <p className="mt-3 text-3xl font-bold">
                {review.spaceComplexity}
              </p>
            </div>

          </div>

          <div className="mt-10 grid gap-6">

            <Section
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Strengths"
              color="text-green-400"
              items={review.strengths}
            />

            <Section
              icon={<AlertTriangle className="h-5 w-5" />}
              title="Issues"
              color="text-red-400"
              items={review.issues}
            />

            <Section
              icon={<Lightbulb className="h-5 w-5" />}
              title="Suggestions"
              color="text-blue-400"
              items={review.suggestions}
            />

          </div>

          <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-6">

            <h3 className="text-lg font-semibold">
              📝 Overall Feedback
            </h3>

            <p className="mt-4 leading-7 text-zinc-300">
              {review.overallFeedback}
            </p>

          </div>

        </motion.div>

      </DialogContent>
    </Dialog>
  );
}
