export type ProductCategory =
  | 'all'
  | 'smartphones'
  | 'laptops'
  | 'headphones'
  | 'tvs'
  | 'smartwatches'
  | 'gaming';

export type BuyVerdictType = 'Strong Buy' | 'Buy Now' | 'Average' | 'Wait' | 'Overpriced';

export interface RetailerOffer {
  id: string;
  name: string;
  shortCode: string;
  logoColor: string;
  price: number;
  delivery: string;
  inStock: boolean;
  url: string;
  badge?: string;
  couponCode?: string;
  couponDiscount?: number;
}

export interface PricePoint {
  date: string;
  price: number;
  label?: string;
}

export interface PriceHistory {
  period30d: PricePoint[];
  period90d: PricePoint[];
  period1y: PricePoint[];
  lowest90d: number;
  average90d: number;
  highest90d: number;
  priceTrend: 'dropping' | 'stable' | 'rising';
}

export interface ReviewHighlight {
  topic: string;
  text: string;
}

export interface AIReviewSummary {
  sentimentScore: number;
  totalAnalyzed: number;
  highlights: ReviewHighlight[];
  considerations: ReviewHighlight[];
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  category: ProductCategory;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  currency: string;
  buyScore: number; // 0-100
  buyVerdict: BuyVerdictType;
  buyAdvice: string;
  rating: number;
  reviewCount: number;
  images: string[];
  whyThis: string[];
  retailers: RetailerOffer[];
  priceHistory: PriceHistory;
  aiReviewSummary: AIReviewSummary;
  specs: { label: string; value: string }[];
  badge?: string;
  storageOptions?: string[];
  colorOptions?: string[];
  trendingDrop?: number; // e.g. -24%
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  statusVerdict?: 'BUY' | 'WAIT' | 'STRONG BUY' | 'RESEARCH';
  confidenceScore?: number;
  recommendedProducts?: Product[];
  suggestedQuestions?: string[];
  isThinking?: boolean;
}

export interface PriceAlert {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  currentPrice: number;
  targetPrice: number;
  originalPrice: number;
  createdAt: string;
  status: 'active' | 'triggered' | 'paused';
  retailerPreference?: string;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'price_drop' | 'target_hit' | 'deal_alert';
  productId?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  selectedRetailer?: RetailerOffer;
}

export interface BankOffer {
  id: string;
  bankName: string;
  cardType: 'Credit Card' | 'Debit Card' | 'EMI';
  discountPercent: number;
  maxDiscount: number;
  minOrderValue: number;
  code: string;
}

export interface CouponItem {
  code: string;
  title: string;
  discountText: string;
  discountValue: number;
  retailer: string;
  minOrder: number;
  category: string;
  expiresText: string;
  verified: boolean;
}

export interface FlashDeal {
  id: string;
  productId: string;
  flashPrice: number;
  originalPrice: number;
  discountPercent: number;
  claimedPercent: number;
  endsAt: number; // timestamp
}

export interface OrderRecord {
  orderId: string;
  date: string;
  items: {
    productTitle: string;
    productImage: string;
    price: number;
    quantity: number;
    retailerName: string;
  }[];
  totalAmount: number;
  discountAmount: number;
  bankDiscount: number;
  promoCode?: string;
  status: 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  shippingAddress: string;
  estimatedDelivery: string;
  paymentMethod: string;
}

export interface SearchFilterState {
  query: string;
  category: ProductCategory;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minBuyScore: number;
  retailer: string;
  sortBy: 'best-deal' | 'lowest-price' | 'highest-score' | 'biggest-discount';
}
