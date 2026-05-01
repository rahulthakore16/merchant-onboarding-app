import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { MerchantFormData } from "@/lib/validators";

const fields: { label: string; key: keyof MerchantFormData; step: 1 | 2 }[] = [
  { label: "Business Name", key: "business_name", step: 1 },
  { label: "Business Type", key: "business_type", step: 1 },
  { label: "MCC Code", key: "mcc_code", step: 1 },
  { label: "Full Name", key: "full_name", step: 2 },
  { label: "Email", key: "email", step: 2 },
  { label: "Phone", key: "phone", step: 2 },
];

export default function StepReview({
  onBack,
  onEdit,
  isSubmitting,
}: {
  onBack: () => void;
  onEdit: (step: 1 | 2) => void;
  isSubmitting: boolean;
}) {
  const { getValues } = useFormContext<MerchantFormData>();
  const values = getValues();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        {fields.map((f, i) => (
          <div
            key={f.key}
            className={`flex items-baseline justify-between py-4 ${
              i < fields.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-muted">
                {f.label}
              </span>
              <span className="text-sm font-heading font-light text-dark">
                {String(values[f.key])}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onEdit(f.step)}
              className="text-xs uppercase tracking-widest text-muted hover:text-dark transition-colors"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="ghost"
          className="rounded-xl px-6 py-6 text-sm font-semibold text-dark hover:bg-white/40 transition-all"
          disabled={isSubmitting}
        >
          BACK
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-xl bg-dark py-6 text-base font-semibold tracking-wide text-page hover:bg-dark/90 hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              SUBMITTING...
            </>
          ) : (
            "SUBMIT"
          )}
        </Button>
      </div>
    </div>
  );
}
