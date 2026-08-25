import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Share2,
  ShoppingCart,
  Bell,
  Heart,
  Store,
  CheckCircle2,
  XCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
  Truck,
  Layers,
  Flame,
  MessageSquare,
  Scale,
  ShoppingBag
} from 'lucide-react';
import { Product, RetailerOffer } from '../types';
import { BuyScoreGauge } from './BuyScoreGauge';
import { PriceHistoryChart } from './PriceHistoryChart';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onTrackAlert: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAskAiAboutProduct?: (product: Product) => void;
  onBuyDeal?: (product: Product, retailer: RetailerOffer) => void;
  onAddToCart?: (product: Product, storage?: string, color?: string, retailer?: RetailerOffer) => void;
  onAddToCompare?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onTrackAlert,
  isWishlisted,
  onToggleWishlist,
  onAskAiAboutProduct,
  onBuyDeal,
  onAddToCart,
  onAddToCompare,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(
    product?.storageOptions ? product.storageOptions[0] : null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.colorOptions ? product.colorOptions[0] : null
  );
  const [copiedToast, setCopiedToast] = useState(false);

  if (!product) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const primaryRetailer = product.retailers.find((r) => r.inStock) || product.retailers[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-2 sm:p-4 md:p-6 animate-fadeIn">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#000666] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-white/20 animate-bounce">
          <Check className="w-4 h-4 text-[#10b981]" />
          <span className="text-sm font-semibold">Deal link copied to clipboard!</span>
        </div>
      )}

      <div className="relative w-full max-w-6xl bg-[#f3faff] rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-[#c6c5d4]/30">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#f3faff] text-[#000666] rounded-full transition-colors flex items-center gap-1 font-semibold text-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Deals</span>
            </button>
            <div className="h-4 w-px bg-[#c6c5d4]/50 hidden sm:block" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#5b5f61] hidden md:inline">
              Deal Intelligence Suite
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 hover:bg-[#f3faff] text-[#000666] rounded-full transition-colors"
              title="Share deal"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="p-2.5 hover:bg-[#f3faff] text-[#5b5f61] rounded-full transition-colors"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#ba1a1a] text-[#ba1a1a]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#f3faff] text-[#5b5f61] hover:text-[#ba1a1a] rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Main Product Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-6 flex items-center justify-center border border-[#c6c5d4]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                {product.discountPercent > 0 && (
                  <div className="absolute top-4 left-4 bg-[#ba1a1a] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    {product.discountPercent}% OFF
                  </div>
                )}
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  className="object-contain w-full max-h-[340px] rounded-xl mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-18 h-18 rounded-xl overflow-hidden p-1 bg-white border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-[#000666] ring-2 ring-[#000666]/30'
                          : 'border-[#c6c5d4]/40 hover:border-[#000666]/50'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Specs pill badges */}
              <div className="bg-white p-4 rounded-2xl border border-[#c6c5d4]/30 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5b5f61] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#000666]" /> Quick Specs
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.specs.slice(0, 4).map((spec, i) => (
                    <div key={i} className="bg-[#f3faff] p-2 rounded-lg">
                      <span className="font-medium text-[#5b5f61] block text-[10px]">{spec.label}</span>
                      <span className="font-bold text-[#071e27] line-clamp-1">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Title, Buy Score, Actions */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#e0e0ff] text-[#000666] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <span className="text-xs text-[#5b5f61]">• {product.category}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071e27] tracking-tight mb-2">
                  {product.title}
                </h2>
                {product.subtitle && (
                  <p className="text-xs sm:text-sm text-[#5b5f61] mb-4">{product.subtitle}</p>
                )}

                {/* Price Display */}
                <div className="flex flex-wrap items-baseline gap-3 mb-5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#000666]">
                    {product.currency}{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base sm:text-lg text-[#5b5f61] line-through font-medium">
                    {product.currency}{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="bg-[#10b981]/15 text-[#005236] font-bold text-xs px-3 py-1 rounded-full border border-[#10b981]/30">
                    Save {product.currency}{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Storage & Color Selector if available */}
                {product.storageOptions && (
                  <div className="mb-4">
                    <label className="text-xs font-bold text-[#5b5f61] uppercase tracking-wider block mb-2">
                      Storage Option
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.storageOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedStorage(opt)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedStorage === opt
                              ? 'bg-[#000666] text-white border-[#000666] shadow-sm'
                              : 'bg-white text-[#071e27] border-[#c6c5d4]/50 hover:border-[#000666]/40'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modern Buy Score Intelligence Card */}
              <div className="bg-gradient-to-br from-white to-[#f3faff] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 border border-[#c6c5d4]/30 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <BuyScoreGauge score={product.buyScore} size="lg" verdict={product.buyVerdict} />

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#10b981]" />
                      <span className="font-bold text-lg text-[#071e27]">
                        {product.buyVerdict === 'Strong Buy'
                          ? 'Exceptional Value Deal'
                          : product.buyVerdict === 'Buy Now'
                          ? 'Recommended Price Point'
                          : 'Market Average Price'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#454652] leading-relaxed">
                      {product.buyAdvice}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#000666] bg-[#e0e0ff] px-2.5 py-1 rounded-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      Predicted by Dealora AI Shopping Engine
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {onAddToCart && (
                  <button
                    onClick={() => {
                      onAddToCart(product, selectedStorage || undefined, selectedColor || undefined, primaryRetailer);
                    }}
                    className="flex-1 bg-[#000666] text-white font-bold py-3.5 px-5 rounded-2xl hover:bg-[#1a237e] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <ShoppingBag className="w-5 h-5 text-[#6ffbbe]" />
                    <span>Add to Bag (₹{(primaryRetailer?.price || product.price).toLocaleString('en-IN')})</span>
                  </button>
                )}

                {onAddToCompare && (
                  <button
                    onClick={() => onAddToCompare(product)}
                    className="p-3.5 bg-[#f3faff] border border-[#c6c5d4]/40 rounded-2xl text-[#000666] hover:bg-[#e0e0ff] transition-colors flex items-center justify-center gap-1.5 text-xs font-bold"
                    title="Compare side-by-side with other models"
                  >
                    <Scale className="w-4 h-4" />
                    <span>Compare</span>
                  </button>
                )}

                <button
                  onClick={() => onTrackAlert(product)}
                  className="p-3.5 bg-white border border-[#000666] text-[#000666] font-bold rounded-2xl hover:bg-[#e0e0ff]/30 transition-all flex items-center justify-center gap-1.5 text-xs"
                >
                  <Bell className="w-4 h-4" />
                  <span>Track Price</span>
                </button>

                {onAskAiAboutProduct && (
                  <button
                    onClick={() => onAskAiAboutProduct(product)}
                    className="p-3.5 bg-white border border-[#c6c5d4]/40 rounded-2xl text-[#000666] hover:bg-[#f3faff] transition-colors flex items-center justify-center"
                    title="Ask Dealora AI Assistant about this product"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bento Grid: Compare Retailers & Price History */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Compare Retailers (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#c6c5d4]/30 p-6 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-[#071e27] flex items-center gap-2">
                  <Store className="w-5 h-5 text-[#000666]" />
                  Compare Retailer Deals
                </h3>
                <span className="text-xs text-[#5b5f61] font-medium">Real-time sync</span>
              </div>

              <div className="space-y-3">
                {product.retailers.map((retailer) => (
                  <div
                    key={retailer.id}
                    className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                      retailer.inStock
                        ? 'bg-[#f3faff]/60 border-[#c6c5d4]/40 hover:border-[#000666]/50 hover:shadow-md cursor-pointer'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                    onClick={() => retailer.inStock && onBuyDeal?.(product, retailer)}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-sm"
                        style={{ backgroundColor: retailer.logoColor }}
                      >
                        {retailer.shortCode}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#071e27] text-sm sm:text-base">{retailer.name}</span>
                          {retailer.badge && (
                            <span className="text-[10px] bg-[#10b981]/15 text-[#005236] font-bold px-2 py-0.5 rounded">
                              {retailer.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5b5f61] flex items-center gap-1 mt-0.5">
                          {retailer.inStock ? (
                            <>
                              <Truck className="w-3.5 h-3.5 text-[#10b981]" />
                              <span>{retailer.delivery}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-[#ba1a1a]" />
                              <span className="text-[#ba1a1a]">Out of Stock</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-3">
                      <div>
                        <span className="text-lg sm:text-xl font-extrabold text-[#000666]">
                          {product.currency}{retailer.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      {retailer.inStock ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBuyDeal?.(product, retailer);
                          }}
                          className="bg-[#000666] text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-[#1a237e] transition-colors flex items-center gap-1"
                        >
                          <span>VIEW</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-[#5b5f61] px-3 py-1.5 bg-gray-100 rounded-lg">
                          UNAVAILABLE
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price History Chart (5 cols) */}
            <div className="lg:col-span-5">
              <PriceHistoryChart priceHistory={product.priceHistory} currency={product.currency} />
            </div>
          </div>

          {/* AI Review Summary (Full Width Bento Card) */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#c6c5d4]/30 p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#c6c5d4]/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e0e0ff] flex items-center justify-center text-[#000666]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#071e27]">AI Verified Review Synthesis</h3>
                  <p className="text-xs text-[#5b5f61]">
                    Synthesized from {product.aiReviewSummary.totalAnalyzed.toLocaleString()} verified customer purchases
                  </p>
                </div>
              </div>

              <div className="bg-[#10b981]/10 text-[#005236] px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 border border-[#10b981]/30">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span>{product.aiReviewSummary.sentimentScore}% Positive Sentiment</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Highlights (Pros) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#005236] flex items-center gap-1.5 border-b border-[#10b981]/20 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  Verified Highlights
                </h4>
                <div className="space-y-2.5">
                  {product.aiReviewSummary.highlights.map((item, i) => (
                    <div key={i} className="bg-[#10b981]/5 border border-[#10b981]/15 p-3.5 rounded-xl">
                      <p className="text-xs text-[#071e27] leading-relaxed">
                        <strong className="text-[#005236]">{item.topic}:</strong> {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Considerations (Cons) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#93000a] flex items-center gap-1.5 border-b border-[#ba1a1a]/20 pb-2">
                  <XCircle className="w-4 h-4 text-[#ba1a1a]" />
                  Buyer Considerations
                </h4>
                <div className="space-y-2.5">
                  {product.aiReviewSummary.considerations.map((item, i) => (
                    <div key={i} className="bg-[#ba1a1a]/5 border border-[#ba1a1a]/15 p-3.5 rounded-xl">
                      <p className="text-xs text-[#071e27] leading-relaxed">
                        <strong className="text-[#93000a]">{item.topic}:</strong> {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
