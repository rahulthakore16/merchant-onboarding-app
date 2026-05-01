import { cn } from "@/lib/utils";
import { Briefcase, UserCheck, ClipboardCheck } from "lucide-react";

const steps = [
  { label: "Business Info", icon: Briefcase },
  { label: "Contact Details", icon: UserCheck },
  { label: "Review", icon: ClipboardCheck },
];

export default function OnboardStepper({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, i) => {
        const stepNum = (i + 1) as 1 | 2 | 3;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        const Icon = step.icon;

        return (
          <div key={step.label} className={cn("flex items-center", i === steps.length - 1 ? "flex-none" : "flex-1")}>
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  isCompleted && "border-green bg-green text-page",
                  isActive && "border-dark bg-dark text-page",
                  !isActive && !isCompleted && "border-white/40 text-muted",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <span
                className={cn(
                  "hidden text-[10px] uppercase tracking-widest sm:block font-semibold",
                  isActive ? "text-dark" : "text-muted",
                )}
              >
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-3 h-px flex-1",
                  isCompleted ? "bg-green" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
