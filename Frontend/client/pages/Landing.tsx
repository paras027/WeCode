import { Link } from 'react-router-dom';
import { Code2, Zap, Users, Trophy, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-2">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">WeCode</span>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1 variants={itemVariants} className="mb-6 text-5xl font-bold sm:text-6xl">
            Master Coding Through
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Intelligent Practice
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-8 text-lg text-muted-foreground sm:text-xl"
          >
            Join thousands of developers solving challenging problems, competing in contests, and growing their skills on WeCode. Built for professionals who take their craft seriously.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link to="/signup">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/problems">Explore Problems</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 rounded-lg border border-border bg-card p-8 sm:p-12"
          >
            <pre className="overflow-x-auto text-left text-sm text-muted-foreground">
              <code>{`function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`}</code>
            </pre>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-border bg-card px-6 py-12">
          <div className="mt-8 border-t border-border pt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 WeCode. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
      
        </div>
      </footer>
    </div>
  );
}
