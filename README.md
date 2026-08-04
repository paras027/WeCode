# 🚀 WeCode

> **An AI-Powered Distributed Online Coding Platform Inspired by LeetCode**

Build • Submit • Execute • Learn

Secure Docker Execution • AI Chat • AI Hint Generation • AI Code Review • RAG • BullMQ • Redis Pub/Sub • Socket.IO • AWS

---

## 🚀 Highlights

- ✅ Distributed Judge System
- ✅ Docker Sandboxed Code Execution
- ✅ BullMQ Background Processing
- ✅ Redis Pub/Sub Communication
- ✅ Real-Time Verdict Updates
- ✅ AI Chat
- ✅ AI Hint Generation
- ✅ AI Code Review
- ✅ Retrieval-Augmented Generation (RAG)
- ✅ LangChain + Google Gemini + Pinecone
- ✅ AWS Deployment

# 📖 Table of Contents

1. Introduction
2. Why WeCode?
3. Demo
4. Features
5. AI Features
6. High Level Architecture
7. AI Request Flow
8. Submission Lifecycle
9. Distributed Judge Architecture
10. Docker Execution Engine
11. BullMQ Job Queue
12. Redis Pub/Sub
13. Real-Time Communication
14. Folder Structure
15. Engineering Challenges
16. Tech Stack
17. Local Setup
18. Environment Variables
19. Deployment
20. Future Improvements

---

# 🎯 Introduction

WeCode is a production-inspired online coding platform designed to explore how modern coding platforms combine **distributed systems** with **Generative AI**.

Unlike traditional LeetCode clones that stop at CRUD operations, WeCode focuses on the engineering challenges behind secure code execution, scalable architecture, and intelligent coding assistance.

The platform provides:

- Secure Docker-based code execution
- Distributed judging using BullMQ & Redis
- Real-time verdict updates
- AI-powered coding assistant
- Retrieval-Augmented Generation (RAG)
- Context-aware coding guidance

---

# 💡 Why I Built WeCode

Most coding platform clones demonstrate CRUD operations.

I wanted to understand how platforms like LeetCode actually work behind the scenes.

Questions I wanted to answer:

- How is untrusted code executed securely?
- How do coding platforms remain responsive during long-running submissions?
- How are verdicts delivered in real time?
- How can AI provide problem-specific guidance instead of generic responses?
- How can distributed systems and LLMs work together?

This project is my attempt to answer those questions.

---

# ✨ Features

## Authentication

- JWT Authentication
- Login / Registration
- Protected Routes
- Role-based Authorization

---

## Problems

- CRUD Operations
- Difficulty Levels
- Tags
- Hidden Test Cases

---

## Judge

- Docker Sandboxed Execution
- Multiple Test Cases
- Runtime Measurement
- Wrong Answer Detection
- Time Limit Exceeded
- Runtime Errors
- Compilation Errors

---

## Real-Time

- Socket.IO
- Redis Pub/Sub
- Live Submission Status
- Instant Verdict Updates

---

# 🤖 AI Features

- AI Chat for coding discussions
- AI Hint Generation
- AI Code Review
- Retrieval-Augmented Generation (RAG)
- Semantic Search using Embeddings
- Prompt Engineering
- Tool Calling
- Structured Outputs
- Conversational Memory

---

# 🏗 High Level Architecture

```text
                 React Frontend
                        │
                        ▼
                Express Backend API
                 ┌──────────────┐
                 │              │
                 ▼              ▼
          MongoDB Database   AI Services
                 │              │
                 ▼              ▼
          BullMQ Job Queue   LangChain
                 │              │
                 ▼              ▼
          Judge Worker      Pinecone
                 │              │
                 ▼              ▼
        Docker Sandbox     Google Gemini
                 │              │
                 └──────┬───────┘
                        ▼
                 Socket.IO Updates
                        │
                        ▼
                  React Frontend
```

---

# 🤖 AI Request Flow

```text
User Question
      │
      ▼
LangChain
      │
      ▼
Generate Embedding
      │
      ▼
Pinecone Vector Search
      │
      ▼
Retrieve Relevant Chunks
      │
      ▼
Prompt Template
      │
      ▼
Google Gemini
      │
      ▼
AI Response
```

---

# 🔄 Submission Lifecycle

(Keep your existing lifecycle. It's already excellent.)

---

# 🧠 Engineering Challenges

## Secure Code Execution

**Problem**

Executing untrusted user code safely.

**Solution**

Docker sandbox with isolated containers.

---

## Blocking API Requests

**Problem**

Compilation blocks HTTP requests.

**Solution**

BullMQ background workers.

---

## Real-Time Verdicts

**Problem**

Users should receive verdicts instantly.

**Solution**

Redis Pub/Sub + Socket.IO.

---

## AI Hallucinations

**Problem**

LLMs generate generic or incorrect coding advice.

**Solution**

Retrieval-Augmented Generation (RAG) with Pinecone.

---

## Context Awareness

**Problem**

The AI must answer only using the current coding problem.

**Solution**

Semantic search using embeddings and prompt engineering.

---

# 📂 Folder Structure

```text
frontend/

backend/
 ├── ai/
 │    ├── config/
 │    ├── prompts/
 │    ├── rag/
 │    ├── services/
 │    └── controllers/
 │
 ├── routes/
 ├── middleware/
 ├── models/
 ├── socket/

judge-service/
```

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express.js
- JWT Authentication

## AI

- Google Gemini
- LangChain
- Pinecone
- Prompt Engineering
- Retrieval-Augmented Generation
- Tool Calling
- Structured Outputs

## Infrastructure

- Docker
- Redis
- BullMQ
- Socket.IO

## Database

- MongoDB

## Deployment

- AWS EC2
- GitHub Actions
- Nginx

---

# 🚀 Future Improvements

- Contest Mode
- Leaderboards
- Custom Test Cases
- Multi-Agent Workflows
- Model Context Protocol (MCP)
- LangGraph Integration
- Horizontal Judge Scaling
- Metrics & Observability

---

# 👨‍💻 Author

**Paras Sharma**

**Full Stack Developer | AI Engineer**

If you found this project useful, consider giving it a ⭐