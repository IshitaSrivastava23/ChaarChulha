from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.database import get_db
from app.schemas.order import OrderCreate, OrderResponse
from app.services.order import OrderService

router = APIRouter()

def get_order_service(db: AsyncSession = Depends(get_db)) -> OrderService:
    return OrderService(db)

@router.post("/", response_model=OrderResponse, status_code=201)
async def create_order(
    order_in: OrderCreate,
    service: OrderService = Depends(get_order_service)
):
    return await service.create_order(order_in)

@router.get("/{order_id}", response_model=OrderResponse, status_code=200)
async def get_order(
    order_id: int,
    service: OrderService = Depends(get_order_service)
):
    return await service.get_order(order_id)

@router.get("/", response_model=List[OrderResponse], status_code=200)
async def list_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    service: OrderService = Depends(get_order_service)
):
    return await service.list_orders(skip=skip, limit=limit)
