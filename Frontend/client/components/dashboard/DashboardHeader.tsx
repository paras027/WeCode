import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
    name: string;
    solved: number;
    acceptanceRate: number;
}

export default function DashboardHeader({
    name,
    solved,
    acceptanceRate,
}: DashboardHeaderProps) {
    return (
        <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 lg:flex-row lg:items-center lg:justify-between">

            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back, {name} 👋
                </h1>

                <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
                    You've solved{" "}
                    <span className="font-semibold text-foreground">
                        {solved}
                    </span>{" "}
                    {solved>1?"problems with an acceptance rate of":"problem with an acceptance rate of"}{" "}
                    <span className="font-semibold text-primary">
                        {acceptanceRate.toFixed(1)}%
                    </span>.
                    Keep pushing your limits and climb the leaderboard.
                </p>
            </div>

            <Button asChild>
                <Link to="/profile">
                    View Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>

        </div>
    );
}