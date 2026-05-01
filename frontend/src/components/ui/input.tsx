import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-white/30 bg-white/50 backdrop-blur-md px-4 py-2 text-sm text-dark placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:border-transparent transition-all shadow-sm",
          error && "border-red focus-visible:ring-red",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
