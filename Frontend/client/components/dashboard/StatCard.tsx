import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    subtitle?: string;
    iconColor?: string;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    subtitle,
    iconColor = "text-primary",
}: StatCardProps) {
    return (
        <Card className="group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h2 className="mt-2 text-4xl font-bold">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                    <Icon
                        className={`h-6 w-6 ${iconColor}`}
                    />
                </div>
            </div>
        </Card>
    );
}