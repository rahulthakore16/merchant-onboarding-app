import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        pending: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
        active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
        rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
        default: "bg-tag text-muted ring-1 ring-inset ring-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
