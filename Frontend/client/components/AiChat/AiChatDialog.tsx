import { useState } from "react";
import { Loader2, Send, X } from "lucide-react";
import api from "../../api/axios"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface Props {
    open: boolean;
    onClose: () => void;
    problemId: string;
}

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AIChatDialog({
    open,
    onClose, problemId
}: Props) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "👋 Hi! Ask me anything about this problem.",
        },
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userMessage,
            },
        ]);

        setInput("");
        setLoading(true);

        try {
            const res = await api.post(
                "/ai/chat",
                {
                    message: userMessage,
                    problemId,
                },
                {
                    withCredentials: true,
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: res.data.answer,
                },
            ]);
        } catch (err) {
            console.error(err);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">

            {/* Background */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Chat Window */}
            <div className="absolute bottom-6 right-6 flex h-[600px] w-[420px] flex-col overflow-hidden rounded-xl border bg-background shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <div>
                        <h2 className="font-semibold">🤖 WeCode AI</h2>
                        <p className="text-xs text-muted-foreground">
                            Ask anything about this problem
                        </p>
                    </div>

                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto p-4">

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${msg.role === "user"
                                    ? "ml-auto bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                        >
                            {msg.role === "assistant" ? (
                                <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <span>{msg.content}</span>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Thinking...
                        </div>
                    )}

                </div>

                {/* Input */}
                <div className="border-t p-3">

                    <div className="flex gap-2">

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            placeholder="Ask anything..."
                            className="flex-1 rounded-md border px-3 py-2 outline-none"
                        />

                        <button
                            onClick={sendMessage}
                            className="rounded-md bg-primary px-4 text-primary-foreground"
                        >
                            <Send size={18} />
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}