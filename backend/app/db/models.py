import enum
from sqlalchemy import Column, String, Text, Numeric, Enum, DateTime, BigInteger
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func

from app.db.database import Base

class OrderStatusEnum(str, enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"

class PaymentStatusEnum(str, enum.Enum):
    PENDING = "PENDING"
    SUBMITTED = "SUBMITTED"

class Order(Base):
    __tablename__ = "orders"

    id = Column(BigInteger, primary_key=True, autoincrement=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    customer_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(Text, nullable=False)
    instructions = Column(Text, nullable=True)
    
    # JSONB for storing list of dicts: [{"item_id": "str", "name": "str", "quantity": 1, "price": 150.00}]
    items = Column(JSONB, nullable=False)
    
    subtotal = Column(Numeric(10, 2), nullable=False)
    delivery_charge = Column(Numeric(10, 2), nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    
    payment_status = Column(Enum(PaymentStatusEnum), default=PaymentStatusEnum.PENDING, nullable=False)
    order_status = Column(Enum(OrderStatusEnum), default=OrderStatusEnum.PENDING, nullable=False)
