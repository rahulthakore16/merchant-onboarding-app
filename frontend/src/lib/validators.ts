import { z } from "zod";

export const businessInfoSchema = z.object({
  business_name: z.string().min(1, "Business name is required").max(255),
  business_type: z.string().min(1, "Business type is required").max(100),
  mcc_code: z
    .number({ error: "MCC code must be a number" })
    .int({ error: "MCC code must be a whole number" })
    .min(100, { error: "MCC code must be at least 100" })
    .max(9999, { error: "MCC code must be at most 9999" }),
});

export const contactInfoSchema = z.object({
  full_name: z.string().min(1, "Full name is required").max(255),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone must be at least 7 characters")
    .max(20, "Phone must be at most 20 characters")
    .refine((val) => {
      const cleaned = val.replace(/[\s\-()]/g, "");
      return /^\+?\d{7,15}$/.test(cleaned);
    }, "Phone must contain 7-15 digits, optionally prefixed with +"),
});

export const merchantFormSchema = businessInfoSchema.merge(contactInfoSchema);

export type BusinessInfoData = z.infer<typeof businessInfoSchema>;
export type ContactInfoData = z.infer<typeof contactInfoSchema>;
export type MerchantFormData = z.infer<typeof merchantFormSchema>;
