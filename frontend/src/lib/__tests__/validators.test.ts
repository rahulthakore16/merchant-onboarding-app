import { describe, it, expect } from "vitest";
import {
  businessInfoSchema,
  contactInfoSchema,
  merchantFormSchema,
} from "../validators";

describe("businessInfoSchema", () => {
  const valid = { business_name: "Test Corp", business_type: "Retail", mcc_code: 5411 };

  it("accepts valid data", () => {
    expect(businessInfoSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects empty business_name", () => {
    expect(businessInfoSchema.safeParse({ ...valid, business_name: "" }).success).toBe(false);
  });

  it("rejects mcc_code below 100", () => {
    expect(businessInfoSchema.safeParse({ ...valid, mcc_code: 99 }).success).toBe(false);
  });

  it("rejects mcc_code above 9999", () => {
    expect(businessInfoSchema.safeParse({ ...valid, mcc_code: 10000 }).success).toBe(false);
  });
});

describe("contactInfoSchema", () => {
  const valid = { full_name: "Jane Doe", email: "jane@example.com", phone: "+1-555-0100" };

  it("accepts valid data", () => {
    expect(contactInfoSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(contactInfoSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects phone too short", () => {
    expect(contactInfoSchema.safeParse({ ...valid, phone: "123" }).success).toBe(false);
  });
});

describe("merchantFormSchema", () => {
  it("accepts full valid merchant data", () => {
    const data = {
      business_name: "Test Corp",
      business_type: "Retail",
      mcc_code: 5411,
      full_name: "Jane Doe",
      email: "jane@example.com",
      phone: "+1-555-0100",
    };
    expect(merchantFormSchema.safeParse(data).success).toBe(true);
  });
});
