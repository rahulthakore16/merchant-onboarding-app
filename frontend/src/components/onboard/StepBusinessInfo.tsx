import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { MerchantFormData } from "@/lib/validators";

const businessTypes = [
  "Retail",
  "Restaurant",
  "E-commerce",
  "Services",
  "Healthcare",
  "Education",
  "Other",
];

export default function StepBusinessInfo({ onNext }: { onNext: () => void }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<MerchantFormData>();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="business_name">Business Name</Label>
        <Input
          id="business_name"
          placeholder="Acme Corp"
          error={!!errors.business_name}
          {...register("business_name")}
        />
        {errors.business_name && (
          <p className="text-xs text-red">{errors.business_name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="business_type">Business Type</Label>
        <Select
          id="business_type"
          error={!!errors.business_type}
          {...register("business_type")}
        >
          <option value="">Select a type</option>
          {businessTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        {errors.business_type && (
          <p className="text-xs text-red">{errors.business_type.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="mcc_code">MCC Code</Label>
        <Input
          id="mcc_code"
          type="number"
          placeholder="5411"
          error={!!errors.mcc_code}
          {...register("mcc_code", { valueAsNumber: true })}
        />
        <p className="text-xs text-muted">4-digit Merchant Category Code (100–9999)</p>
        {errors.mcc_code && (
          <p className="text-xs text-red">{errors.mcc_code.message}</p>
        )}
      </div>

      <div className="pt-4">
        <Button
          type="button"
          onClick={onNext}
          className="w-full rounded-xl bg-dark py-6 text-base font-semibold tracking-wide text-page hover:bg-dark/90 hover:scale-[1.02] transition-all"
        >
          NEXT
        </Button>
      </div>
    </div>
  );
}
