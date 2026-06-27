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
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
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

      {/* Features Section */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          >
            Everything You Need to Succeed
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Code2,
                title: 'Quality Problems',
                description: 'Carefully curated problems from interviews to real-world scenarios',
              },
              {
                icon: Zap,
                title: 'Instant Feedback',
                description: 'Test your code and get immediate results with detailed explanations',
              },
              {
                icon: Trophy,
                title: 'Contests & Rankings',
                description: 'Compete globally and track your progress with our ranking system',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Learn from others, discuss solutions, and grow together',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <feature.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="border-t border-border bg-card px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '2.5M+', label: 'Users Worldwide' },
              { value: '1000+', label: 'Unique Problems' },
              { value: '150+', label: 'Companies Partner' },
              { value: '50+', label: 'Contests Monthly' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Ready to Level Up Your Skills?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join our community of dedicated developers and start solving problems today.
            </p>
            <Button size="lg" asChild>
              <Link to="/signup">
                Start for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold">
                <Code2 className="h-5 w-5" />
                WeCode
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                The platform for serious developers.
              </p>
            </div>
            {[
              {
                title: 'Product',
                links: ['Problems', 'Contests', 'Discuss', 'Leaderboard'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact'],
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Cookies', 'License'],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold">{section.title}</h3>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

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
        </div>
      </footer>
    </div>
  );
}
