import React, { useState } from 'react';
import {
  X,
  Tag,
  Copy,
  Check,
  Calendar,
  Sparkles,
  Percent,
  Flame,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { CouponItem } from '../types';
import { MOCK_COUPONS, SEASONAL_SALE_CALENDAR } from '../data/mockProducts';

interface CouponHubModalProps {
  onClose: () => void;
  onApplyCouponToCart: (coupon: CouponItem) => void;
}

export const CouponHubModal: React.FC<CouponHubModalProps> = ({
  onClose,
  onApplyCouponToCart,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#071e27]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-white/60 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#c6c5d4]/30 flex items-center justify-between bg-[#f3faff]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#000666] text-white flex items-center justify-center shadow-md">
              <Tag className="w-5 h-5 text-[#6ffbbe]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#000666] tracking-tight">
                Dealora Coupon & Sale Hub
              </h2>
              <p className="text-xs font-semibold text-[#5b5f61]">
                Verified promo codes, instant bank discounts & seasonal sale calendar
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Active Coupons Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#000666] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#000666]" />
                Live Verified Promo Codes (100% Tested)
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {MOCK_COUPONS.length} Active Vouchers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MOCK_COUPONS.map((coupon) => {
                const isCopied = copiedCode === coupon.code;
                return (
                  <div
                    key={coupon.code}
                    className="p-4 rounded-2xl bg-white border border-[#c6c5d4]/40 shadow-xs hover:border-[#000666]/40 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden"
                  >
                    {/* Top Tag */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#000666] bg-[#e0e0ff] px-2 py-0.5 rounded-md">
                          {coupon.category}
                        </span>
                        <h4 className="font-bold text-sm text-[#000666] mt-1.5 leading-tight">
                          {coupon.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {coupon.expiresText}
                      </span>
                    </div>

                    <p className="text-xs text-[#454652] font-medium">
                      {coupon.discountText}
                    </p>

                    <div className="pt-2 border-t border-[#c6c5d4]/20 flex items-center justify-between gap-2">
                      {/* Coupon Code Pill */}
                      <div className="flex items-center gap-2 bg-[#f3faff] px-3 py-1.5 rounded-xl border border-dashed border-[#000666]/30">
                        <span className="text-xs font-black text-[#000666] tracking-wider">
                          {coupon.code}
                        </span>
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          className="text-[#5b5f61] hover:text-[#000666] transition-colors"
                          title="Copy Code"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          onApplyCouponToCart(coupon);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-[#000666] text-white text-xs font-bold rounded-xl hover:bg-[#1a237e] transition-colors shadow-xs"
                      >
                        Apply to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Seasonal Sale Calendar */}
          <div className="p-5 rounded-2xl bg-[#f3faff] border border-[#c6c5d4]/30 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#000666]" />
              <span className="text-xs font-extrabold text-[#000666] uppercase tracking-wider">
                Dealora 2026 E-Commerce Sale Calendar
              </span>
            </div>

            <div className="space-y-3">
              {SEASONAL_SALE_CALENDAR.map((sale) => (
                <div
                  key={sale.name}
                  className="p-3.5 rounded-xl bg-white border border-[#c6c5d4]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#000666]">{sale.name}</span>
                      <span className="text-[10px] font-black bg-[#e0e0ff] text-[#000666] px-2 py-0.2 rounded-full">
                        {sale.dates}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-semibold">{sale.expectedDiscount}</p>
                    <p className="text-[10px] text-[#5b5f61]">{sale.tip}</p>
                  </div>

                  <span className="text-[11px] font-extrabold text-[#000666] self-start sm:self-center bg-[#f3faff] px-2.5 py-1 rounded-lg border border-[#c6c5d4]/30 flex-shrink-0">
                    Set Sale Alert
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
