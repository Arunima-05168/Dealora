import React, { useState } from 'react';
import { X, Bell, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface PriceAlertModalProps {
  product: Product | null;
  onClose: () => void;
  onSaveAlert: (productId: string, targetPrice: number, email?: string) => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  product,
  onClose,
  onSaveAlert,
}) => {
  if (!product) return null;

  const defaultTarget = Math.round(product.price * 0.95);
  const [targetPrice, setTargetPrice] = useState<number>(defaultTarget);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAlert(product.id, targetPrice, email);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  const discountFromCurrent = Math.round(((product.price - targetPrice) / product.price) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#c6c5d4]/40 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5b5f61] hover:text-[#071e27] rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 bg-[#10b981]/15 text-[#10b981] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 font-bold" />
            </div>
            <h3 className="text-xl font-black text-[#071e27]">Price Tracker Activated!</h3>
            <p className="text-xs text-[#5b5f61]">
              We will notify you immediately the moment {product.title} hits ₹{targetPrice.toLocaleString('en-IN')}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e0e0ff] text-[#000666] flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#071e27] text-lg">Set Price Drop Alert</h3>
                <p className="text-xs text-[#5b5f61]">Get automated alerts when price drops</p>
              </div>
            </div>

            {/* Product summary card */}
            <div className="flex items-center gap-3 p-3 bg-[#f3faff] rounded-2xl border border-[#c6c5d4]/30">
              <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-contain mix-blend-multiply" />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#071e27] truncate">{product.title}</h4>
                <p className="text-xs text-[#000666] font-extrabold mt-0.5">
                  Current: {product.currency}{product.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Target Price input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#5b5f61] block mb-1.5">
                Target Alert Price ({product.currency})
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-sm">
                  {product.currency}
                </span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  min={100}
                  max={product.price}
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-white border border-[#c6c5d4] focus:ring-2 focus:ring-[#000666]/20 focus:border-[#000666] text-base font-bold text-[#071e27] outline-none"
                />
              </div>
              {discountFromCurrent > 0 && (
                <p className="text-[11px] font-semibold text-[#005236] mt-1.5">
                  ✨ Alert triggers when price drops by {discountFromCurrent}% (Save {product.currency}{(product.price - targetPrice).toLocaleString('en-IN')})
                </p>
              )}
            </div>

            {/* Quick % buttons */}
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((pct) => (
                <button
                  type="button"
                  key={pct}
                  onClick={() => setTargetPrice(Math.round(product.price * (1 - pct / 100)))}
                  className="flex-1 py-1.5 bg-[#f3faff] hover:bg-[#e0e0ff] text-[#000666] rounded-lg text-xs font-bold border border-[#c6c5d4]/40 transition-colors"
                >
                  -{pct}%
                </button>
              ))}
            </div>

            {/* Notification Email */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#5b5f61] block mb-1.5">
                Email for Notifications (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#c6c5d4] focus:ring-2 focus:ring-[#000666]/20 focus:border-[#000666] text-sm text-[#071e27] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#000666] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#1a237e] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span>Save Price Alert</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
