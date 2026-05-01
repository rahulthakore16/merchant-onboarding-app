export interface Merchant {
  id: string;
  business_name: string;
  business_type: string;
  mcc_code: number;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MerchantListResponse {
  items: Merchant[];
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

export interface ApiError {
  error: {
    code: "CONFLICT" | "VALIDATION_ERROR" | "NOT_FOUND" | "INTERNAL_ERROR";
    message: string;
    details?: { field: string; message: string }[];
  };
}
