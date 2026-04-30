import uuid

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.common import ErrorResponse, PaginatedResponse
from app.schemas.merchant import MerchantCreate, MerchantResponse
from app.services.merchant_service import merchant_service

router = APIRouter(prefix="/merchants", tags=["Merchants"])


@router.post(
    "",
    response_model=MerchantResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new merchant",
    responses={
        409: {"model": ErrorResponse, "description": "Merchant with this email already exists"},
        422: {"model": ErrorResponse, "description": "Validation error"},
    },
)
async def create_merchant(
    payload: MerchantCreate,
    db: AsyncSession = Depends(get_db),
) -> MerchantResponse:
    merchant = await merchant_service.create_merchant(db, payload)
    return MerchantResponse.model_validate(merchant)


@router.get(
    "",
    response_model=PaginatedResponse[MerchantResponse],
    summary="List all merchants",
)
async def list_merchants(
    limit: int = Query(default=20, ge=1, le=100, description="Number of items per page"),
    offset: int = Query(default=0, ge=0, description="Number of items to skip"),
    db: AsyncSession = Depends(get_db),
) -> PaginatedResponse[MerchantResponse]:
    merchants, total = await merchant_service.list_merchants(db, limit, offset)
    return PaginatedResponse(
        items=[MerchantResponse.model_validate(m) for m in merchants],
        total=total,
        limit=limit,
        offset=offset,
        has_more=(offset + limit) < total,
    )


@router.get(
    "/{merchant_id}",
    response_model=MerchantResponse,
    summary="Get a merchant by ID",
    responses={
        404: {"model": ErrorResponse, "description": "Merchant not found"},
    },
)
async def get_merchant(
    merchant_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
) -> MerchantResponse:
    merchant = await merchant_service.get_merchant(db, merchant_id)
    return MerchantResponse.model_validate(merchant)
