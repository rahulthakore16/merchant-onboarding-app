import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { MerchantFormData } from "@/lib/validators";

export default function StepContactInfo({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<MerchantFormData>();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          placeholder="John Doe"
          error={!!errors.full_name}
          {...register("full_name")}
        />
        {errors.full_name && (
          <p className="text-xs text-red">{errors.full_name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          error={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1-555-0123"
          error={!!errors.phone}
          {...register("phone")}
        />
        <p className="text-xs text-muted">7-15 digits, optionally prefixed with +</p>
        {errors.phone && (
          <p className="text-xs text-red">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="ghost"
          className="rounded-xl px-6 py-6 text-sm font-semibold text-dark hover:bg-white/40 transition-all"
        >
          BACK
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-xl bg-dark py-6 text-base font-semibold tracking-wide text-page hover:bg-dark/90 hover:scale-[1.02] transition-all"
        >
          NEXT
        </Button>
      </div>
    </div>
  );
}
