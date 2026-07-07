import clsx from "clsx";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles = {
    Accepted:
      "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20",

    Passed:
      "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20",

    "Wrong Answer":
      "bg-red-500/15 text-red-500 border border-red-500/20",

    "Compilation Error":
      "bg-violet-500/15 text-violet-500 border border-violet-500/20",

    "Runtime Error":
      "bg-orange-500/15 text-orange-500 border border-orange-500/20",

    "Time Limit Exceeded":
      "bg-yellow-500/15 text-yellow-500 border border-yellow-500/20",

    Pending:
      "bg-blue-500/15 text-blue-500 border border-blue-500/20",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        styles[status as keyof typeof styles] ??
          "bg-gray-500/15 text-gray-500 border border-gray-500/20"
      )}
    >
      {status}
    </span>
  );
}