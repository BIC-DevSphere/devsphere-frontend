import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: "blue" | "purple" | "green" | "red" | "gray";
  className?: string;
}

const variantStyles = {
  blue: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300",
  purple:
    "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300",
  green:
    "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
  red: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
  gray: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300",
};

const buttonVariantStyles = {
  blue: "hover:bg-blue-300 dark:hover:bg-blue-800",
  purple: "hover:bg-purple-300 dark:hover:bg-purple-800",
  green: "hover:bg-green-300 dark:hover:bg-green-800",
  red: "hover:bg-red-300 dark:hover:bg-red-800",
  gray: "hover:bg-gray-300 dark:hover:bg-gray-800",
};

export const Chip = ({
  label,
  onRemove,
  variant = "blue",
  className,
}: ChipProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors",
        variantStyles[variant],
        className
      )}
    >
      <span className="text-sm font-medium">{label}</span>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-4 w-4 p-0 rounded-full transition-colors",
            buttonVariantStyles[variant]
          )}
          onClick={onRemove}
        >
          <XIcon className="h-3 w-3" />
        </Button>
      )}
    </Badge>
  );
};

interface ChipListProps {
  items: string[];
  onRemove?: (item: string) => void;
  variant?: "blue" | "purple" | "green" | "red" | "gray";
  className?: string;
}

export const ChipList = ({
  items,
  onRemove,
  variant = "blue",
  className,
}: ChipListProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2 mt-3", className)}>
      {items.map((item) => (
        <Chip
          key={item}
          label={item}
          variant={variant}
          onRemove={onRemove ? () => onRemove(item) : undefined}
        />
      ))}
    </div>
  );
};
