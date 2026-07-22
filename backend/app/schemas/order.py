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
    customer_name: str
    phone: str
    address: str
    instructions: Optional[str] = None
    items: List[OrderItemSchema]
    subtotal: Decimal = Field(ge=0)
    delivery_charge: Decimal = Field(ge=0)
    total_amount: Decimal = Field(ge=0)

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
