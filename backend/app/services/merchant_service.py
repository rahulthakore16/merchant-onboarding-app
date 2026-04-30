import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ConflictError, NotFoundError
from app.models.merchant import Merchant
from app.repositories.merchant_repository import merchant_repository
from app.schemas.merchant import MerchantCreate


class MerchantService:
    async def create_merchant(self, session: AsyncSession, data: MerchantCreate) -> Merchant:
        existing = await merchant_repository.get_by_email(session, data.email)
        if existing:
            raise ConflictError(f"A merchant with email '{data.email}' already exists")

        merchant = Merchant(**data.model_dump())
        return await merchant_repository.create(session, merchant)

    async def list_merchants(
        self, session: AsyncSession, limit: int, offset: int
    ) -> tuple[list[Merchant], int]:
        return await merchant_repository.get_all(session, limit, offset)

    async def get_merchant(self, session: AsyncSession, merchant_id: uuid.UUID) -> Merchant:
        merchant = await merchant_repository.get_by_id(session, merchant_id)
        if not merchant:
            raise NotFoundError(f"Merchant with id '{merchant_id}' not found")
        return merchant


merchant_service = MerchantService()
