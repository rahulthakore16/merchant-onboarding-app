from fastapi import APIRouter

from app.api.v1.merchants import router as merchants_router

api_v1_router = APIRouter()
api_v1_router.include_router(merchants_router)
