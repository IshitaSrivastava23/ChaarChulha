from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from app.db.models import Order
from app.schemas.order import OrderCreate
from datetime import datetime

class OrderRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, order_in: OrderCreate) -> Order:
        # Convert Pydantic items list to dicts for JSONB storage
        # Use mode='json' so that Decimal fields (like price) are properly serialized
        items_data = [item.model_dump(mode="json") for item in order_in.items]
        
        db_order = Order(
            customer_name=order_in.customer_name,
            phone=order_in.phone,
            address=order_in.address,
            instructions=order_in.instructions,
            items=items_data,
            subtotal=order_in.subtotal,
            delivery_charge=order_in.delivery_charge,
            total_amount=order_in.total_amount
        )
        self.session.add(db_order)
        await self.session.commit()
        await self.session.refresh(db_order)
        return db_order

    async def get_by_id(self, order_id: int) -> Optional[Order]:
        result = await self.session.execute(select(Order).filter(Order.id == order_id))
        return result.scalars().first()

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Order]:
        result = await self.session.execute(
            select(Order).order_by(Order.created_at.desc()).offset(skip).limit(limit)
        )
        return list(result.scalars().all())
