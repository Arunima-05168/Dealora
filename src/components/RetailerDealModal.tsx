import React, { useState } from 'react';
import { X, ExternalLink, Check, Copy, ShieldCheck, Tag, Truck } from 'lucide-react';
import { Product, RetailerOffer } from '../types';

interface RetailerDealModalProps {
  deal: { product: Product; retailer: RetailerOffer } | null;
  onClose: () => void;
}

export const RetailerDealModal: React.FC<RetailerDealModalProps> = ({
  deal,
  onClose,
}) => {
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  if (!deal) return null;
  const { product, retailer } = deal;

  const couponCode = retailer.couponCode || 'DEALORA1500';
  const couponDiscount = retailer.couponDiscount || 1500;
  const finalPrice = retailer.price - (retailer.couponDiscount ? couponDiscount : 0);

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText(couponCode);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#c6c5d4]/40 relative overflow-hidden space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5b5f61] hover:text-[#071e27] rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-md"
            style={{ backgroundColor: retailer.logoColor }}
          >
            {retailer.shortCode}
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#005236] bg-[#10b981]/15 px-2 py-0.5 rounded">
              Verified Merchant
            </span>
            <h3 className="font-extrabold text-[#071e27] text-lg mt-0.5">
              Buy on {retailer.name}
            </h3>
          </div>
        </div>

        {/* Product snapshot */}
        <div className="flex items-center gap-3 p-3.5 bg-[#f3faff] rounded-2xl border border-[#c6c5d4]/30">
          <img src={product.images[0]} alt={product.title} className="w-14 h-14 object-contain mix-blend-multiply" />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#071e27] line-clamp-1">{product.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-extrabold text-[#000666]">
                {product.currency}{retailer.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-[#5b5f61] line-through">
                {product.currency}{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Coupon Discount Banner */}
        <div className="bg-[#10b981]/5 border border-[#10b981]/25 p-3.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#005236]">
              <Tag className="w-4 h-4" />
              <span>Available Promo Code</span>
            </div>
            <span className="text-[11px] font-bold text-[#005236]">Save ₹{couponDiscount}</span>
          </div>

          <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-[#10b981]/20">
            <code className="text-xs font-mono font-bold text-[#000666] tracking-wider">{couponCode}</code>
            <button
              onClick={handleCopyCoupon}
              className="text-[11px] font-bold px-2.5 py-1 bg-[#10b981]/15 text-[#005236] rounded-lg hover:bg-[#10b981]/25 transition-colors flex items-center gap-1"
            >
              {copiedCoupon ? (
                <>
                  <Check className="w-3 h-3 text-[#10b981]" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 text-xs border-t border-[#c6c5d4]/20 pt-3">
          <div className="flex justify-between text-[#5b5f61]">
            <span>Listed Price</span>
            <span>{product.currency}{retailer.price.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-[#5b5f61]">
            <span>Delivery Fee</span>
            <span className="text-[#10b981] font-semibold">{retailer.delivery}</span>
          </div>
          <div className="flex justify-between font-extrabold text-sm text-[#071e27] pt-2 border-t border-[#c6c5d4]/20">
            <span>Estimated Total</span>
            <span className="text-[#000666]">{product.currency}{finalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* External direct link */}
        <a
          href={retailer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#000666] hover:bg-[#1a237e] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>Continue to {retailer.name}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
