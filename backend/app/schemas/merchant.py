import re
import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, field_validator


class MerchantCreate(BaseModel):
    business_name: str = Field(
        ...,
        min_length=1,
        max_length=255,
        examples=["Acme Corp"],
    )
    business_type: str = Field(
        ...,
        min_length=1,
        max_length=100,
        examples=["Retail"],
    )
    mcc_code: int = Field(
        ...,
        ge=100,
        le=9999,
        description="Merchant Category Code (4-digit number)",
        examples=[5411],
    )
    full_name: str = Field(
        ...,
        min_length=1,
        max_length=255,
        examples=["John Doe"],
    )
    email: EmailStr = Field(
        ...,
        examples=["john@example.com"],
    )
    phone: str = Field(
        ...,
        min_length=7,
        max_length=20,
        examples=["+1-555-0123"],
    )

    @field_validator("business_name", "full_name", mode="before")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        if isinstance(v, str):
            return v.strip()
        return v

    @field_validator("email", mode="after")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        return v.lower()

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-\(\)]", "", v)
        if not re.match(r"^\+?\d{7,15}$", cleaned):
            raise ValueError("Phone must contain 7-15 digits, optionally prefixed with +")
        return v


class MerchantResponse(BaseModel):
    model_config = {"from_attributes": True}

    id: uuid.UUID
    business_name: str
    business_type: str
    mcc_code: int
    full_name: str
    email: str
    phone: str
    status: str
    created_at: datetime
    updated_at: datetime
