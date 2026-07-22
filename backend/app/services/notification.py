import httpx
from app.core.config import settings
from app.core.logger import logger
from app.schemas.order import OrderResponse
from app.services.formatters.telegram_formatter import TelegramFormatter

class TelegramNotificationService:
    def __init__(self):
        self.bot_token = settings.TELEGRAM_BOT_TOKEN
        self.chat_id = settings.TELEGRAM_CHAT_ID
        self.api_url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage" if self.bot_token else None

    async def send_order_created(self, order: OrderResponse):
        if not self.bot_token or not self.chat_id:
            logger.info("Telegram notification skipped: Credentials not configured.")
            return

        payload_data = TelegramFormatter.format_message(order)
        
        payload = {
            "chat_id": self.chat_id,
            "text": payload_data["text"],
            "reply_markup": payload_data["reply_markup"]
            # No parse_mode to ensure absolute reliability without escaping fragility
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(self.api_url, json=payload, timeout=10.0)
                response.raise_for_status()
                logger.info(f"Successfully sent notification for order {order.id}")
        except Exception as e:
            logger.error(f"Failed to send notification for order {order.id}: {str(e)}", exc_info=True)
