# Dealora Shopping Site 🛍️⚡

**Dealora** is a high-performance AI shopping intelligence and e-commerce shopping web application. It combines real-time price drop tracking, predictive **AI Buy Scores**, multi-retailer price comparison, side-by-side spec comparisons, interactive coupon & sale hubs, and a complete end-to-end shopping bag and checkout experience.

---

## ✨ Key Features

### 1. 🤖 AI Shopping Assistant & Deal Intelligence
- **Powered by Google Gemini**: Get instant, factual advice on whether to buy now or wait for an upcoming sale.
- **Timing Verdicts**: Clear recommendations categorized as `STRONG BUY`, `BUY NOW`, `WAIT FOR SALE`, or `RESEARCH ALTERNATIVES`.
- **Context-Aware Queries**: Ask questions about specific products, price history, or budget recommendations (e.g., *"Best flagship phone under ₹80,000"*).

### 2. 📊 AI Buy Score & 90-Day Price History
- **Algorithmic Buy Score (0–100)**: Calculated using 90-day pricing history, current discount depth, retailer reliability, and historical all-time lows.
- **Interactive Price Graphs**: Visualize 90-day pricing trends, peak discounts, and upcoming festival forecast dips.

### 3. 🏪 Multi-Retailer Price Comparison
- Compare prices across verified Indian & global retailers:
  - **Amazon India**
  - **Flipkart SuperDeals**
  - **Croma Retail**
  - **Reliance Digital**
  - **Apple Store / Samsung Direct**
- Displays stock availability, delivery windows, bank discounts, and direct checkout offers.

### 4. 🛒 Full Shopping Bag & End-to-End Checkout Flow
- **Interactive Cart**: Select product variants (storage capacity, color options) and preferred retailer offers.
- **Promo Codes & Bank Discounts**:
  - Live coupon codes (`DEALORA500`, `MEGAFEST`, `SUMMER20`, `WELCOME10`).
  - Instant 10% bank partner discounts (HDFC, ICICI, SBI).
- **3-Step Checkout Experience**:
  1. Shipping Address details.
  2. Secure Payment methods (UPI / GPay / PhonePe, Credit & Debit Cards, No-Cost EMI, Cash on Delivery).
  3. Live Order Confirmation Invoice with tracking number and itemized savings.

### 5. ⚖️ Side-by-Side Product Comparison Matrix
- Compare up to **4 products simultaneously**.
- Detailed comparison across display specs, processor performance, camera system, battery life, warranty terms, AI Buy Scores, and lowest prices.

### 6. 🎟️ Verified Coupons & Upcoming Sale Hub
- **Coupon Directory**: Browse active promo codes with one-tap copy and direct bag application.
- **Festival Calendar**: Countdown and price drop forecasts for Amazon Great Indian Festival, Flipkart Big Billion Days, Diwali Mega Sale, and Black Friday.

### 7. 🔔 Custom Price Drop Alerts & Wishlist
- Set target price thresholds with push and email notification simulation.
- View triggered alerts and historical drops in a unified alert feed.

### 8. 👤 Shopper Profile & Live Order History
- Pre-configured shopper dashboard tracking lifetime savings.
- Real-time order tracking status (`Out for Delivery`, `Delivered`, `Shipped`) with courier tracking IDs.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons & Animations** | [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/) |
| **Backend / Server** | [Express](https://expressjs.com/), [Node.js](https://nodejs.org/) |
| **AI SDK** | [`@google/genai`](https://www.npmjs.com/package/@google/genai) (Google Gemini 2.5 / 3.7) |
| **Tooling & Build** | [Vite 6](https://vitejs.dev/), [tsx](https://github.com/privatenumber/tsx), [esbuild](https://esbuild.github.io/) |

---

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── AiAssistantView.tsx       # AI Shopping Assistant Chat & suggestions
│   │   ├── BottomNav.tsx             # Responsive mobile navigation bar
│   │   ├── BuyScoreGauge.tsx         # Circular SVG score gauge
│   │   ├── CartCheckoutModal.tsx     # Shopping bag, coupon validation & 3-step checkout
│   │   ├── CompareModal.tsx          # Side-by-side 4-device spec comparison matrix
│   │   ├── CouponHubModal.tsx        # Promo codes directory & sales calendar
│   │   ├── HomeDashboard.tsx         # Hero banner, deals of the day & category showcases
│   │   ├── Navbar.tsx                # Header with search, quick tools, cart & badges
│   │   ├── PriceAlertModal.tsx       # Set target price threshold modal
│   │   ├── PriceHistoryChart.tsx     # 90-day price trend visualization
│   │   ├── ProductCard.tsx           # Product showcase card with scores & quick actions
│   │   ├── ProductDetailModal.tsx    # Comprehensive product specs, variants & retailers
│   │   ├── ProfileView.tsx           # User profile, past orders, tracking & preferences
│   │   ├── RetailerDealModal.tsx     # Direct retailer redirect & offer details
│   │   ├── SearchResultsView.tsx     # Filtering by price, category, store & sort order
│   │   └── WishlistAlertsView.tsx    # Wishlist, active price alerts & notifications
│   ├── data/
│   │   └── mockProducts.ts           # Curated tech products, coupons, orders & alerts
│   ├── types.ts                      # TypeScript definitions & data models
│   ├── App.tsx                       # Root application component & global state orchestration
│   ├── main.tsx                      # Vite React entry point
│   └── index.css                     # Global Tailwind CSS imports
├── server.ts                         # Express server with Gemini AI API endpoints & Vite middleware
├── metadata.json                     # App metadata & capabilities
├── package.json                      # Dependencies & scripts
└── .env.example                      # Environment variables documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env
```

Add your Gemini API key (optional for local simulation, required for live model queries):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔌 API Endpoints

The Express backend (`server.ts`) exposes the following server-side routes:

### `GET /api/health`
Returns the server status and whether Gemini AI is configured.
```json
{
  "status": "ok",
  "aiConfigured": true
}
```

### `POST /api/chat`
Proxies user shopping queries to Gemini with product context and returns structured timing advice.
- **Request Body**:
  ```json
  {
    "message": "Should I buy the iPhone 17 now or wait for the sale?",
    "contextProduct": { "title": "Apple iPhone 17", "price": 79999 }
  }
  ```
- **Response**:
  ```json
  {
    "text": "Current price is 8% below the 90-day average. Strong buy recommendation...",
    "statusVerdict": "STRONG BUY",
    "confidenceScore": 92,
    "suggestedQuestions": ["What is the 90-day price trend?", "Compare with Galaxy S25"]
  }
  ```

### `POST /api/analyze-deal`
Evaluates a specific product price vs historical 90-day averages and calculates an AI deal verdict.
- **Request Body**:
  ```json
  {
    "productTitle": "Sony WH-1000XM6",
    "currentPrice": 23490,
    "originalPrice": 29990,
    "average90d": 26500
  }
  ```

---

## 💡 Example Discount Codes (Built-In)

Test the checkout system with these active promo codes:
- `DEALORA500` - Flat ₹500 off on orders above ₹5,000
- `MEGAFEST` - Flat ₹2,500 off on flagship orders above ₹40,000
- `SUMMER20` - Extra 10% off on all electronics & audio
- `WELCOME10` - Flat 10% instant discount for new users

---

## 📄 License
This project is built for demonstration and shopping intelligence workflows. All rights reserved.
