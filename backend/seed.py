import asyncio

from sqlalchemy import select, func

from app.core.database import async_session_factory
from app.models.merchant import Merchant

SAMPLE_MERCHANTS = [
    {
        "business_name": "Bean & Brew Coffee",
        "business_type": "Restaurant",
        "mcc_code": 5812,
        "full_name": "Alice Johnson",
        "email": "alice@beanandbrew.com",
        "phone": "+1-555-0101",
        "status": "active",
    },
    {
        "business_name": "PixelMart Online",
        "business_type": "E-commerce",
        "mcc_code": 5999,
        "full_name": "Bob Chen",
        "email": "bob@pixelmart.io",
        "phone": "+1-555-0102",
        "status": "active",
    },
    {
        "business_name": "Sakura Sushi Bar",
        "business_type": "Restaurant",
        "mcc_code": 5813,
        "full_name": "Yuki Tanaka",
        "email": "yuki@sakurasushi.com",
        "phone": "+81-90-1234-5678",
        "status": "pending",
    },
    {
        "business_name": "Green Leaf Boutique",
        "business_type": "Retail",
        "mcc_code": 5691,
        "full_name": "Maria Garcia",
        "email": "maria@greenleaf.shop",
        "phone": "+1-555-0104",
        "status": "active",
    },
    {
        "business_name": "FitZone Gym",
        "business_type": "Services",
        "mcc_code": 7941,
        "full_name": "David Park",
        "email": "david@fitzonegym.com",
        "phone": "+1-555-0105",
        "status": "pending",
    },
]


async def seed():
    async with async_session_factory() as session:
        count = await session.scalar(select(func.count()).select_from(Merchant))
        if count and count > 0:
            print(f"Database already has {count} merchants — skipping seed.")
            return

        for data in SAMPLE_MERCHANTS:
            session.add(Merchant(**data))
        await session.commit()
        print(f"Seeded {len(SAMPLE_MERCHANTS)} sample merchants.")


if __name__ == "__main__":
    asyncio.run(seed())
