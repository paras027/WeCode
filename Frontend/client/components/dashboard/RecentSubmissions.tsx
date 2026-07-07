import { Link } from "react-router-dom";
import { Clock3, MemoryStick } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import StatusBadge from "./Statusbadge";

interface Submission {
    _id: string;
    problemName: string;
    language: string;
    verdict: string;
    runtime?: number;
    memory?: number;
    updatedAt: string;
}

interface RecentSubmissionsProps {
    submissions: Submission[];
}

export default function RecentSubmissions({
    submissions,
}: RecentSubmissionsProps) {

    return (
        <Card className="h-full p-6">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                    Recent Submissions
                </h2>

                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                >
                    <Link to="/profile">
                        View All
                    </Link>
                </Button>

            </div>

            <div className="space-y-4">

                {submissions.length === 0 ? (

                    <p className="text-center text-muted-foreground py-10">
                        No submissions yet 🚀
                    </p>

                ) : (

                    submissions.slice(0, 5).map((submission) => (

                        <div
                            key={submission._id}
                            className="rounded-xl border p-4 transition-all duration-200 hover:bg-muted/40"
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <h3 className="font-semibold">
                                        {submission.problemName}
                                    </h3>

                                    <p className="mt-1 text-sm text-muted-foreground">

                                        {submission.language}

                                        {" • "}

                                        {new Date(
                                            submission.updatedAt
                                        ).toLocaleDateString()}

                                    </p>

                                </div>

                                <StatusBadge
                                    status={submission.verdict}
                                />

                            </div>

                            <div className="mt-4 flex gap-6 text-sm text-muted-foreground">

                                {submission.runtime && (

                                    <div className="flex items-center gap-2">

                                        <Clock3 className="h-4 w-4" />

                                        {submission.runtime} ms

                                    </div>

                                )}

                                {submission.memory && (

                                    <div className="flex items-center gap-2">

                                        <MemoryStick className="h-4 w-4" />

                                        {submission.memory} kb

                                    </div>

                                )}

                            </div>

                        </div>

                    ))

                )}

            </div>

        </Card>
    );
}