import React from 'react';
import {
  X,
  Scale,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  TrendingDown,
  ChevronRight
} from 'lucide-react';
import { Product } from '../types';
import { BuyScoreGauge } from './BuyScoreGauge';

interface CompareModalProps {
  productsToCompare: Product[];
  allProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onAddProduct: (product: Product) => void;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  productsToCompare,
  allProducts,
  onRemoveProduct,
  onAddProduct,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const availableToAdd = allProducts.filter(
    (p) => !productsToCompare.some((cp) => cp.id === p.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#071e27]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-white/60 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#c6c5d4]/30 flex items-center justify-between bg-[#f3faff]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#000666] text-white flex items-center justify-center shadow-md">
              <Scale className="w-5 h-5 text-[#6ffbbe]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#000666] tracking-tight">
                Side-by-Side Product Comparison
              </h2>
              <p className="text-xs font-semibold text-[#5b5f61]">
                Comparing {productsToCompare.length} products with Dealora AI Buy Scores, live pricing & full specifications
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#5b5f61] hover:text-[#000666] hover:bg-[#e0e0ff]/50 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6">
          {productsToCompare.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#f3faff] text-[#000666] flex items-center justify-center border border-[#c6c5d4]/30">
                <Scale className="w-8 h-8 text-[#000666]/40" />
              </div>
              <h3 className="text-lg font-bold text-[#000666]">No products selected for comparison</h3>
              <p className="text-xs text-[#5b5f61] max-w-md mx-auto">
                Add products from the catalog to analyze price gaps, specifications, and AI buy recommendations.
              </p>

              {/* Quick Add Suggestions */}
              <div className="max-w-md mx-auto pt-4 space-y-2 text-left">
                <span className="text-xs font-bold text-[#000666]">Suggested comparisons:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allProducts.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onAddProduct(p)}
                      className="p-2.5 rounded-xl border border-[#c6c5d4]/30 bg-white hover:border-[#000666] text-left text-xs font-bold text-[#000666] flex items-center justify-between"
                    >
                      <span className="truncate">{p.title}</span>
                      <Plus className="w-4 h-4 text-[#000666] flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="min-w-[700px] space-y-6">
              {/* Product Header Cards Row */}
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col justify-end p-4 bg-[#f3faff] rounded-2xl border border-[#c6c5d4]/20">
                  <span className="text-xs font-black uppercase tracking-wider text-[#000666]">
                    Feature Matrix
                  </span>
                  <p className="text-[11px] text-[#5b5f61] mt-1">
                    Powered by Dealora AI Multi-Store Intelligence
                  </p>
                </div>

                {productsToCompare.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-white border border-[#c6c5d4]/40 shadow-xs flex flex-col justify-between relative group hover:border-[#000666]/40 transition-all"
                  >
                    <button
                      onClick={() => onRemoveProduct(prod.id)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-lg text-[#5b5f61] hover:text-[#ba1a1a] hover:bg-red-50 transition-colors"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-2.5">
                      <div className="w-full h-32 flex items-center justify-center p-2 bg-[#f3faff] rounded-xl">
                        <img
                          src={prod.images[0]}
                          alt={prod.title}
                          className="h-28 object-contain"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-[#5b5f61] uppercase tracking-wider">
                          {prod.brand}
                        </span>
                        <h4 className="font-bold text-xs text-[#000666] line-clamp-2 mt-0.5">
                          {prod.title}
                        </h4>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-black text-[#000666]">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#5b5f61] line-through">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#c6c5d4]/20 space-y-2 mt-3">
                      <button
                        onClick={() => onAddToCart(prod)}
                        className="w-full py-2 bg-[#000666] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#1a237e] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectProduct(prod);
                        }}
                        className="w-full py-1.5 bg-[#f3faff] text-[#000666] rounded-xl text-[11px] font-bold hover:bg-[#e0e0ff] transition-colors"
                      >
                        View Full Details
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add more slot if less than 3 */}
                {productsToCompare.length < 3 && (
                  <div className="p-4 rounded-2xl border-2 border-dashed border-[#c6c5d4]/50 bg-[#f3faff]/50 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-white text-[#000666] flex items-center justify-center shadow-xs">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#000666]">Add Product to Compare</span>
                    <select
                      onChange={(e) => {
                        const sel = allProducts.find((p) => p.id === e.target.value);
                        if (sel) onAddProduct(sel);
                      }}
                      defaultValue=""
                      className="w-full text-xs font-bold p-2 bg-white rounded-xl border border-[#c6c5d4]/40 text-[#000666] focus:outline-none"
                    >
                      <option value="" disabled>Choose a product...</option>
                      {availableToAdd.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* SECTION: AI BUY SCORE */}
              <div className="p-4 rounded-2xl bg-white border border-[#c6c5d4]/30 shadow-xs space-y-3">
                <div className="text-xs font-extrabold text-[#000666] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#000666]" />
                  <span>Dealora AI Buy Score & Timing Recommendation</span>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="text-xs font-bold text-[#5b5f61]">
                    Buy Score / Verdict
                  </div>

                  {productsToCompare.map((prod) => (
                    <div key={prod.id} className="p-3 bg-[#f3faff] rounded-xl border border-[#c6c5d4]/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-[#000666]">{prod.buyScore}/100</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          prod.buyVerdict === 'Strong Buy' ? 'bg-emerald-100 text-emerald-800' :
                          prod.buyVerdict === 'Buy Now' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {prod.buyVerdict}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#454652] leading-tight line-clamp-2">
                        {prod.buyAdvice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: RETAILER COMPARISON */}
              <div className="p-4 rounded-2xl bg-white border border-[#c6c5d4]/30 shadow-xs space-y-3">
                <div className="text-xs font-extrabold text-[#000666]">
                  Retailer Prices & Stock Availability
                </div>

                <div className="grid grid-cols-4 gap-4 items-start">
                  <div className="text-xs font-bold text-[#5b5f61]">
                    Best Available Store
                  </div>

                  {productsToCompare.map((prod) => {
                    const bestRetailer = prod.retailers.find((r) => r.inStock) || prod.retailers[0];
                    return (
                      <div key={prod.id} className="p-3 bg-[#f3faff] rounded-xl border border-[#c6c5d4]/20 text-xs space-y-1">
                        <div className="flex justify-between items-center font-bold">
                          <span className="text-[#000666]">{bestRetailer.name}</span>
                          <span className="text-emerald-700 font-extrabold">
                            ₹{bestRetailer.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5b5f61]">{bestRetailer.delivery}</p>
                        {bestRetailer.badge && (
                          <span className="inline-block text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                            {bestRetailer.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: SPECIFICATIONS COMPARISON */}
              <div className="p-4 rounded-2xl bg-white border border-[#c6c5d4]/30 shadow-xs space-y-3">
                <div className="text-xs font-extrabold text-[#000666]">
                  Key Technical Specifications
                </div>

                {/* Common specs labels */}
                {['Display', 'Processor', 'Camera', 'Battery', 'Chip', 'Memory'].map((specKey) => (
                  <div key={specKey} className="grid grid-cols-4 gap-4 py-2 border-b border-[#c6c5d4]/20 text-xs">
                    <div className="font-bold text-[#5b5f61]">{specKey}</div>
                    {productsToCompare.map((prod) => {
                      const spec = prod.specs.find(
                        (s) => s.label.toLowerCase().includes(specKey.toLowerCase())
                      );
                      return (
                        <div key={prod.id} className="text-[#071e27] font-medium text-[11px]">
                          {spec ? spec.value : '—'}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* SECTION: CUSTOMER SENTIMENT */}
              <div className="p-4 rounded-2xl bg-white border border-[#c6c5d4]/30 shadow-xs space-y-3">
                <div className="text-xs font-extrabold text-[#000666]">
                  Dealora AI Review Sentiment
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="text-xs font-bold text-[#5b5f61]">
                    Overall Satisfaction
                  </div>

                  {productsToCompare.map((prod) => (
                    <div key={prod.id} className="text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-emerald-700">
                          {prod.aiReviewSummary.sentimentScore}% Positive
                        </span>
                        <span className="text-[10px] text-[#5b5f61]">
                          ({prod.aiReviewSummary.totalAnalyzed.toLocaleString()} reviews)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#454652]">
                        ★ {prod.rating} / 5.0 rating
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
