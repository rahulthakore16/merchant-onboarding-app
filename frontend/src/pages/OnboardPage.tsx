import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import OnboardStepper from "@/components/onboard/OnboardStepper";
import StepBusinessInfo from "@/components/onboard/StepBusinessInfo";
import StepContactInfo from "@/components/onboard/StepContactInfo";
import StepReview from "@/components/onboard/StepReview";
import { merchantFormSchema } from "@/lib/validators";
import { api } from "@/lib/api";
import type { MerchantFormData } from "@/lib/validators";
import type { ApiError } from "@/types/merchant";

const stepFields = {
  1: ["business_name", "business_type", "mcc_code"] as const,
  2: ["full_name", "email", "phone"] as const,
};

export default function OnboardPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<MerchantFormData>({
    resolver: zodResolver(merchantFormSchema),
    defaultValues: {
      business_name: "",
      business_type: "",
      mcc_code: undefined as unknown as number,
      full_name: "",
      email: "",
      phone: "",
    },
    mode: "onTouched",
  });

  const goNext = async () => {
    const fields = stepFields[step as 1 | 2];
    const valid = await form.trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, 3) as 1 | 2 | 3);
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1) as 1 | 2 | 3);

  const onSubmit = async (data: MerchantFormData) => {
    setIsSubmitting(true);
    try {
      await api.post("/merchants", data);
      toast.success("Merchant registered successfully!");
      navigate("/merchants");
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      const body = error.response?.data;

      if (error.response?.status === 409) {
        form.setError("email", {
          type: "server",
          message: "A merchant with this email already exists",
        });
        setStep(2);
      } else if (error.response?.status === 422 && body?.error?.details) {
        const step1Fields = new Set<string>(stepFields[1]);
        let jumpTo: 1 | 2 = 2;
        for (const detail of body.error.details) {
          const field = detail.field as keyof MerchantFormData;
          form.setError(field, { type: "server", message: detail.message });
          if (step1Fields.has(field)) jumpTo = 1;
        }
        setStep(jumpTo);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      layoutId="cta-card"
      layout
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-page transform-gpu will-change-transform"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.6, scale: 1 }}
        exit={{ opacity: 0 }}
        layout={false}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none mix-blend-multiply"
      >
        <MeshGradient
          speed={1}
          colors={["#f472b6", "#fdba74", "#fef08a", "#f9a8d4"]}
          distortion={0.8}
          swirl={0.1}
          grainMixer={0}
          grainOverlay={0}
          className="inset-0 sticky top-0 opacity-70"
          style={{ height: "100%", width: "100%" }}
        />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between p-6 md:px-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <div className="h-2 w-2 rounded-full bg-dark" />
            <div className="h-2 w-2 rounded-full bg-dark" />
            <span className="ml-2 text-sm font-heading font-semibold tracking-tight text-dark">
              MerchantPay
            </span>
          </button>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-8 md:px-12 md:py-12 md:flex-row md:items-center md:gap-16 lg:gap-24">
          
          <div className="flex-1 mb-12 md:mb-0">
            <div className="mb-10 md:ml-[56px]">
              <span className="text-xs uppercase tracking-widest text-muted">
                Onboarding
              </span>
              <h1 className="mt-2 font-heading text-5xl font-light leading-tight tracking-tight text-dark lg:text-6xl">
                MERCHANT
                <br />
                <span className="font-serif italic font-normal">Registration</span>
              </h1>
            </div>

            <div className="mb-12">
              <OnboardStepper currentStep={step} />
            </div>

            <div className="space-y-6 hidden md:block">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/40 text-dark shadow-sm backdrop-blur-md border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-dark">Fast Integration</h3>
                  <p className="mt-1 text-sm text-muted">Get your business verified and start accepting payments in minutes with flexible solutions.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/40 text-dark shadow-sm backdrop-blur-md border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 21.73a2 2 0 0 0 2 0c7-4 9-10.5 9-14.73A2 2 0 0 0 20 5H4a2 2 0 0 0-2 2c0 4.23 2 10.73 9 14.73z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-dark">Secure Processing</h3>
                  <p className="mt-1 text-sm text-muted">Bank-grade security ensures your data and transactions are always safe and compliant.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md mx-auto md:mx-0">
            <div className="mb-8">
              <h2 className="text-2xl font-heading font-medium text-dark">
                {step === 1 && "Business Information"}
                {step === 2 && "Contact Details"}
                {step === 3 && "Review & Submit"}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {step === 1 && "Tell us about your business"}
                {step === 2 && "How can we reach you?"}
                {step === 3 && "Confirm your details before submitting"}
              </p>
            </div>
            
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {step === 1 && <StepBusinessInfo onNext={goNext} />}
                {step === 2 && <StepContactInfo onNext={goNext} onBack={goBack} />}
                {step === 3 && (
                  <StepReview
                    onBack={goBack}
                    onEdit={(s) => setStep(s)}
                    isSubmitting={isSubmitting}
                  />
                )}
              </form>
            </FormProvider>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
