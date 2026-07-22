from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional
from datetime import datetime
from decimal import Decimal
from app.db.models import OrderStatusEnum, PaymentStatusEnum

class OrderItemSchema(BaseModel):
    item_id: str
    name: str
    quantity: int = Field(ge=1)
    price: Decimal = Field(ge=0)

class OrderBase(BaseModel):
    customer_name: str = Field(min_length=2)
    phone: str = Field(min_length=10, max_length=15, pattern=r"^\+?[1-9]\d{9,14}$")
    address: str = Field(min_length=5)
    instructions: Optional[str] = None
    items: List[OrderItemSchema] = Field(min_length=1)
    subtotal: Decimal = Field(ge=0)
    delivery_charge: Decimal = Field(ge=0)
    total_amount: Decimal = Field(gt=0)

class OrderCreate(OrderBase):
    pass

class OrderInDB(OrderBase):
    id: int
    created_at: datetime
    updated_at: datetime
    payment_status: PaymentStatusEnum
    order_status: OrderStatusEnum

    model_config = ConfigDict(from_attributes=True)

class OrderResponse(OrderInDB):
    pass
