import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.merchant import Merchant


class MerchantRepository:
    async def create(self, session: AsyncSession, merchant: Merchant) -> Merchant:
        session.add(merchant)
        await session.flush()
        await session.refresh(merchant)
        return merchant

    async def get_by_id(self, session: AsyncSession, merchant_id: uuid.UUID) -> Merchant | None:
        result = await session.execute(
            select(Merchant).where(Merchant.id == merchant_id)
        )
        return result.scalar_one_or_none()

    async def get_by_email(self, session: AsyncSession, email: str) -> Merchant | None:
        result = await session.execute(
            select(Merchant).where(Merchant.email == email)
        )
        return result.scalar_one_or_none()

    async def get_all(
        self, session: AsyncSession, limit: int, offset: int
    ) -> tuple[list[Merchant], int]:
        count_result = await session.execute(select(func.count(Merchant.id)))
        total = count_result.scalar_one()

        result = await session.execute(
            select(Merchant)
            .order_by(Merchant.created_at.desc())
            .limit(limit)
            .offset(offset)
        )
        merchants = list(result.scalars().all())
        return merchants, total


merchant_repository = MerchantRepository()
