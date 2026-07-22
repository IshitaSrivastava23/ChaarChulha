from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.order import OrderCreate
from app.db.models import Order
from app.db.repositories.order_repository import OrderRepository
from app.core.exceptions import NotFoundError

class OrderService:
    def __init__(self, session: AsyncSession):
        self.repo = OrderRepository(session)

    async def create_order(self, order_in: OrderCreate) -> Order:
        # Business logic can go here (e.g., calculate totals, validate stock if we had it)
        # For now, it's mostly a pass-through
        return await self.repo.create(order_in)

    async def get_order(self, order_id: int) -> Order:
        order = await self.repo.get_by_id(order_id)
        if not order:
            raise NotFoundError(f"Order with ID {order_id} not found")
        return order

    async def list_orders(self, skip: int = 0, limit: int = 100) -> List[Order]:
        return await self.repo.get_all(skip=skip, limit=limit)
