import httpx
from app.core.config import settings
from app.core.logger import logger
from app.schemas.order import OrderResponse

class TelegramNotificationService:
    def __init__(self):
        self.bot_token = settings.TELEGRAM_BOT_TOKEN
        self.chat_id = settings.TELEGRAM_CHAT_ID
        self.api_url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage" if self.bot_token else None

    async def send_new_order_alert(self, order: OrderResponse):
        if not self.bot_token or not self.chat_id:
            logger.info("Telegram notification skipped: Credentials not configured.")
            return

        message = self._format_message(order)
        payload = {
            "chat_id": self.chat_id,
            "text": message,
            "parse_mode": "MarkdownV2"
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(self.api_url, json=payload, timeout=10.0)
                response.raise_for_status()
                logger.info(f"Successfully sent Telegram notification for order {order.id}")
        except Exception as e:
            # We log the error but NEVER raise it, ensuring the order flow remains unaffected
            logger.error(f"Failed to send Telegram notification for order {order.id}: {str(e)}", exc_info=True)

    def _format_message(self, order: OrderResponse) -> str:
        # MarkdownV2 requires escaping specific characters: _ * [ ] ( ) ~ ` > # + - = | { } . !
        def escape_md(text: str) -> str:
            chars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
            for c in chars:
                text = str(text).replace(c, f"\\{c}")
            return text

        items_str = "\n".join([f"\\- {escape_md(item.quantity)}x {escape_md(item.name)}" for item in order.items])
        
        return (
            f"*New Order Received\\!* 🍔\n\n"
            f"*Order ID:* CC{order.id}\n"
            f"*Customer:* {escape_md(order.customer_name)}\n"
            f"*Phone:* {escape_md(order.phone)}\n\n"
            f"*Items:*\n{items_str}\n\n"
            f"*Total Amount:* ₹{escape_md(str(order.total_amount))}\n"
            f"*Address:* {escape_md(order.address)}\n"
        )
