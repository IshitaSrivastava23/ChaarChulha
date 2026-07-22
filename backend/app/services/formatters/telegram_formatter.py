import urllib.parse
from app.schemas.order import OrderResponse

class TelegramFormatter:
    """
    Dedicated formatter for Telegram notifications.
    Strictly responsible for building the visual Unicode strings and URL buttons.
    """
    
    SEPARATOR = "━━━━━━━━━━━━━━━━━━"

    @staticmethod
    def format_message(order: OrderResponse) -> dict:
        """
        Returns a dictionary containing 'text' and 'reply_markup'
        suitable for the Telegram sendMessage payload.
        """
        text = TelegramFormatter._build_text(order)
        reply_markup = TelegramFormatter._build_keyboard(order)
        
        return {
            "text": text,
            "reply_markup": reply_markup
        }

    @staticmethod
    def _build_text(order: OrderResponse) -> str:
        # Time formatting
        time_str = order.created_at.strftime("%I:%M %p") if order.created_at else "Now"

        # Items formatting
        items_list = "\n".join([f"{item.quantity} × {item.name}" for item in order.items])

        # Notes formatting
        notes_section = ""
        if order.instructions and order.instructions.strip():
            notes_section = f"{TelegramFormatter.SEPARATOR}\n\n📝 NOTES\n\n{order.instructions}\n\n"

        text = (
            f"🍽️ NEW ORDER\n\n"
            f"🆔 Order: CC{order.id}\n"
            f"🕒 {time_str}\n"
            f"{TelegramFormatter.SEPARATOR}\n"
            f"👤 CUSTOMER\n\n"
            f"{order.customer_name}\n"
            f"{order.phone}\n"
            f"{TelegramFormatter.SEPARATOR}\n"
            f"🛒 ITEMS\n\n"
            f"{items_list}\n"
            f"{TelegramFormatter.SEPARATOR}\n"
            f"💰 BILL\n\n"
            f"Subtotal:         ₹{order.subtotal}\n"
            f"Delivery:         ₹{order.delivery_charge}\n"
            f"Grand Total:      ₹{order.total_amount}\n"
            f"{TelegramFormatter.SEPARATOR}\n"
            f"📍 DELIVERY ADDRESS\n\n"
            f"{order.address}\n"
            f"{notes_section}"
        )
        return text

    @staticmethod
    def _build_keyboard(order: OrderResponse) -> dict:
        # Normalize phone (ensure it has country code for wa.me)
        phone = order.phone.strip()
        if not phone.startswith("+"):
            if len(phone) == 10:
                phone = f"+91{phone}"
            else:
                phone = f"+{phone}"
                
        clean_phone_for_url = urllib.parse.quote(phone.replace("+", ""))

        # WhatsApp Message
        wa_text = urllib.parse.quote(f"Hi {order.customer_name}, we have received your order (CC{order.id}) from Chaar Chulha! It is being prepared.")
        wa_url = f"https://wa.me/{clean_phone_for_url}?text={wa_text}"
        
        # Phone call
        tel_url = f"tel:{phone}"
        
        # Maps
        maps_query = urllib.parse.quote(order.address)
        maps_url = f"https://www.google.com/maps/search/?api=1&query={maps_query}"
        
        return {
            "inline_keyboard": [
                [
                    {"text": "💬 WhatsApp Customer", "url": wa_url}
                ],
                [
                    {"text": "📍 Open Maps", "url": maps_url}
                ]
            ]
        }
