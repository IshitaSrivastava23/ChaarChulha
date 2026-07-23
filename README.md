# Chaar Chulha

Production-ready Next.js frontend and FastAPI backend for Chaar Chulha's cloud kitchen. Features a premium UI, UPI payments, and Telegram notifications.

## Quick Start

### 1. Start Backend (FastAPI)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Create .env file with DATABASE_URL and TELEGRAM settings
uvicorn app.main:app --reload
```
API runs on `http://localhost:8000`.

### 2. Start Frontend (Next.js)
```bash
npm install
npm run dev
```
Storefront runs on `http://localhost:3000`.

## Features
- **Modern UI**: Fully responsive, premium design with Next.js (App Router) and Tailwind CSS.
- **Cart & History**: Context-driven cart management and localized `localStorage` order history.
- **Checkout Flow**: Supports both direct WhatsApp ordering and seamless UPI payments via Intent URI/QR.
- **Telegram Notifications**: Asynchronous background tasks instantly notify owners of new orders.

## Architecture

### Frontend (`/`)
- `app/` - Next.js App Router (pages, layout, globals)
- `components/` - Reusable UI elements (Navbar, MenuCard, CartDrawer, HistoryDrawer)
- `context/` - Global state (`CartContext`)
- `lib/` - Logic (pricing, order-history, payment, whatsapp)
- `types/` - Shared TypeScript interfaces

### Backend (`/backend/`)
- `app/api/` - API Routes & Endpoints
- `app/core/` - Configuration and Dependencies
- `app/db/` - SQLAlchemy models, repositories, and database setup
- `app/schemas/` - Pydantic validation models
- `app/services/` - Business logic (Notifications, Formatting)

## Configuration
Update these files to customize the application:
1. `lib/pricing.ts` - Delivery fees and free-delivery thresholds.
2. `lib/whatsapp.ts` - Business phone number.
3. `backend/.env` - Database URL, Telegram Bot Token, and Chat ID.
4. `tailwind.config.ts` - Brand colors and typography.
