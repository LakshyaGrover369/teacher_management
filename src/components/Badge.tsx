interface BadgeProps {
  text: string;
  color?: "indigo" | "green" | "red" | "yellow" | "gray";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Badge({
  text,
  color = "indigo",
  size = "md",
  className = "",
}: BadgeProps) {
  const colorClasses = {
    indigo: "bg-indigo-100 text-indigo-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
  }[color];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${colorClasses} ${sizeClasses} ${className}`}
    >
      {text}
    </span>
  );
}
