import React, { useState } from 'react';
import {
  Bell,
  Heart,
  Trash2,
  ExternalLink,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react';
import { Product, PriceAlert, UserNotification } from '../types';
import { ProductCard } from './ProductCard';

interface WishlistAlertsViewProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  priceAlerts: PriceAlert[];
  onDeleteAlert: (alertId: string) => void;
  onOpenAlertModal: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  notifications: UserNotification[];
  onMarkNotificationRead: (id: string) => void;
  initialTab?: 'alerts' | 'wishlist' | 'notifications';
  onAddToCart?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
}

export const WishlistAlertsView: React.FC<WishlistAlertsViewProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  priceAlerts,
  onDeleteAlert,
  onOpenAlertModal,
  onSelectProduct,
  notifications,
  onMarkNotificationRead,
  initialTab = 'alerts',
  onAddToCart,
  onAddToCompare,
}) => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'wishlist' | 'notifications'>(initialTab);

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-8 pb-32">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000666] tracking-tight">
            Tracker & Saved Deals
          </h1>
          <p className="text-xs sm:text-sm text-[#5b5f61] mt-1">
            Manage your real-time price drop alerts, wishlists, and deal triggers.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex bg-white p-1 rounded-2xl border border-[#c6c5d4]/40 shadow-sm">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'alerts'
                ? 'bg-[#000666] text-white shadow-sm'
                : 'text-[#454652] hover:text-[#000666]'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Price Alerts ({priceAlerts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'wishlist'
                ? 'bg-[#000666] text-white shadow-sm'
                : 'text-[#454652] hover:text-[#000666]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlistedProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'notifications'
                ? 'bg-[#000666] text-white shadow-sm'
                : 'text-[#454652] hover:text-[#000666]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Notifications ({notifications.filter((n) => !n.read).length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Price Alerts */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#071e27]">Active Tracking Alerts</h2>
            <span className="text-xs text-[#5b5f61]">Automated check every hour</span>
          </div>

          {priceAlerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {priceAlerts.map((alert) => {
                const product = products.find((p) => p.id === alert.productId);
                const isTriggered = alert.currentPrice <= alert.targetPrice;
                const priceDiff = alert.currentPrice - alert.targetPrice;

                return (
                  <div
                    key={alert.id}
                    className="bg-white rounded-2xl p-5 border border-[#c6c5d4]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={alert.productImage}
                        alt={alert.productTitle}
                        className="w-16 h-16 object-contain p-1 bg-[#f3faff] rounded-xl flex-shrink-0 mix-blend-multiply"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                              isTriggered
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#e0e0ff] text-[#000666]'
                            }`}
                          >
                            {isTriggered ? 'TARGET HIT! 🔥' : 'TRACKING ACTIVE'}
                          </span>
                          <span className="text-[10px] text-[#5b5f61]">Added {alert.createdAt}</span>
                        </div>

                        <h3 className="font-bold text-sm text-[#071e27] truncate">
                          {alert.productTitle}
                        </h3>

                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-base font-black text-[#000666]">
                            Current: ₹{alert.currentPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#5b5f61]">
                            Target: ₹{alert.targetPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Progress Bar */}
                    <div className="bg-[#f3faff] p-3 rounded-xl border border-[#c6c5d4]/20 space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#5b5f61]">Target Distance:</span>
                        <span className={isTriggered ? 'text-[#10b981] font-bold' : 'text-[#071e27]'}>
                          {isTriggered
                            ? 'Price reached target!'
                            : `₹${priceDiff.toLocaleString('en-IN')} to go`}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2 border-t border-[#c6c5d4]/20">
                      {product && (
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="flex-1 bg-[#000666] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#1a237e] transition-colors shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <span>View Current Deal</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onDeleteAlert(alert.id)}
                        className="p-2.5 text-[#5b5f61] hover:text-[#ba1a1a] hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete alert"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#c6c5d4]/30 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f3faff] text-[#000666] flex items-center justify-center mx-auto">
                <Bell className="w-7 h-7 opacity-40" />
              </div>
              <h3 className="text-lg font-bold text-[#071e27]">No price alerts set</h3>
              <p className="text-xs text-[#5b5f61] max-w-sm mx-auto">
                Track any smartphone, laptop, or gadget to receive automated notifications the second the price drops.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#071e27]">Saved Items ({wishlistedProducts.length})</h2>
          </div>

          {wishlistedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelect={onSelectProduct}
                  isWishlisted={true}
                  onToggleWishlist={onToggleWishlist}
                  onTrackAlert={onOpenAlertModal}
                  onAddToCart={onAddToCart}
                  onAddToCompare={onAddToCompare}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#c6c5d4]/30 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f3faff] text-[#000666] flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7 opacity-40" />
              </div>
              <h3 className="text-lg font-bold text-[#071e27]">Your wishlist is empty</h3>
              <p className="text-xs text-[#5b5f61] max-w-sm mx-auto">
                Save deals you like by tapping the heart icon on any product card.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#071e27]">Deal Alerts Feed</h2>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => onMarkNotificationRead(n.id)}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                  n.read
                    ? 'bg-white border-[#c6c5d4]/30'
                    : 'bg-[#e0e0ff]/40 border-[#bdc2ff] shadow-sm'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#000666] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-[#071e27]">{n.title}</h4>
                    <span className="text-[10px] text-[#5b5f61]">{n.time}</span>
                  </div>
                  <p className="text-xs text-[#454652] mt-1">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
