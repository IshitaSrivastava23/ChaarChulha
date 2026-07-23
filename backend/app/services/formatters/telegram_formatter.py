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
        # Time formatting (IST with Date)
        if order.created_at:
            try:
                from datetime import timedelta
                # Add 5 hours and 30 minutes to UTC to get IST
                dt_ist = order.created_at + timedelta(hours=5, minutes=30)
                time_str = dt_ist.strftime("%d %b %Y, %I:%M %p")
            except Exception:
                # Fallback just in case
                time_str = order.created_at.strftime("%d %b %Y, %I:%M %p")
        else:
            time_str = "Now"

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

        # Items formatting for WhatsApp
        wa_items = "\n".join([f"• {item.quantity} × {item.name}" for item in order.items])

        # WhatsApp Message
        wa_message = (
            f"Hi {order.customer_name},\n\n"
            f"Thank you for choosing ChaarChulha! ✨\n\n"
            f"We have received your order (CC{order.id}) and started preparing your meal with care. "
            f"We will update you as soon as it's ready for delivery.\n\n"
            f"Your order details:\n{wa_items}\n\n"
            f"If you have any special requests or instructions, please let us know here. "
            f"We are more than happy to accommodate them!\n\n"
            f"Warm regards,\nChaarChulha 💖"
        )
        wa_text = urllib.parse.quote(wa_message)
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
