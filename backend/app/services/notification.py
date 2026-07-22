import httpx
from app.core.config import settings
from app.core.logger import logger
from app.schemas.order import OrderResponse

class TelegramNotificationService:
    def __init__(self):
        self.bot_token = settings.TELEGRAM_BOT_TOKEN
        self.chat_id = settings.TELEGRAM_CHAT_ID
        self.api_url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage" if self.bot_token else None

    async def send_order_created(self, order: OrderResponse):
        if not self.bot_token or not self.chat_id:
            logger.info("Telegram notification skipped: Credentials not configured.")
            return

        message = self._format_message(order)
        payload = {
            "chat_id": self.chat_id,
            "text": message
            # Removed parse_mode MarkdownV2 to ensure absolute reliability without escaping fragility
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(self.api_url, json=payload, timeout=10.0)
                response.raise_for_status()
                logger.info(f"Successfully sent notification for order {order.id}")
        except Exception as e:
            logger.error(f"Failed to send notification for order {order.id}: {str(e)}", exc_info=True)

    def _format_message(self, order: OrderResponse) -> str:
        items_str = "\n".join([f"- {item.quantity}x {item.name}" for item in order.items])
        
        return (
            f"🔔 NEW ORDER RECEIVED 🍔\n\n"
            f"Order ID: CC{order.id}\n"
            f"Customer: {order.customer_name}\n"
            f"Phone: {order.phone}\n\n"
            f"Items:\n{items_str}\n\n"
            f"Total Amount: ₹{order.total_amount}\n"
            f"Address: {order.address}\n"
        )
