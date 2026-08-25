import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  CreditCard,
  Bell,
  Settings,
  Sparkles,
  TrendingDown,
  Check,
  ShoppingBag,
  Package,
  Truck,
  MapPin,
  Clock,
  ExternalLink,
  Receipt
} from 'lucide-react';
import { MOCK_ORDER_HISTORY } from '../data/mockProducts';

export const ProfileView: React.FC = () => {
  const [name, setName] = useState('Arunima Dutta');
  const [email, setEmail] = useState('duttaarunima50@gmail.com');
  const [currency, setCurrency] = useState('₹ INR');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'settings'>('orders');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-8 pb-32">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000666] tracking-tight">
          Shopper Profile & Orders
        </h1>
        <p className="text-xs sm:text-sm text-[#5b5f61] mt-1">
          Manage your order history, verified deal tracking, address book and shopping settings.
        </p>
      </div>

      {/* Savings Summary Banner */}
      <div className="bg-gradient-to-r from-[#000666] to-[#1a237e] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6ffbbe]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#6ffbbe] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Dealora Member Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Welcome back, {name}!
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              {email} • 3 Orders active with automated delivery sync
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center sm:text-right min-w-[180px]">
            <p className="text-[11px] font-bold text-[#6ffbbe] uppercase tracking-wider mb-0.5">
              TOTAL ESTIMATED SAVINGS
            </p>
            <p className="text-2xl sm:text-3xl font-black text-white">₹24,850</p>
            <p className="text-[10px] text-gray-300 mt-0.5">Through Dealora AI price alerts & coupons</p>
          </div>
        </div>
      </div>

      {/* Sub Tabs: Orders vs Settings */}
      <div className="flex bg-white p-1 rounded-2xl border border-[#c6c5d4]/40 shadow-xs max-w-sm">
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'orders'
              ? 'bg-[#000666] text-white shadow-sm'
              : 'text-[#454652] hover:text-[#000666]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({MOCK_ORDER_HISTORY.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('settings')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'settings'
              ? 'bg-[#000666] text-white shadow-sm'
              : 'text-[#454652] hover:text-[#000666]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Account Settings</span>
        </button>
      </div>

      {/* Orders List View */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-[#071e27] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#000666]" />
              Recent Deal Purchases
            </h3>
            <span className="text-xs text-[#5b5f61]">Auto-synced from retailers</span>
          </div>

          <div className="space-y-4">
            {MOCK_ORDER_HISTORY.map((order) => {
              let statusBadgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              if ((order.status as string) === 'out_for_delivery') {
                statusBadgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
              } else if ((order.status as string) === 'shipped') {
                statusBadgeBg = 'bg-blue-50 text-blue-800 border-blue-200';
              }

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#c6c5d4]/40 p-5 shadow-xs hover:border-[#000666]/30 transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#c6c5d4]/20">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#000666]">{order.id}</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${statusBadgeBg}`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5b5f61]">
                        Placed on {order.orderDate} • Retailer: <strong className="text-[#071e27]">{order.retailer}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-[#000666]">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <p className="text-[11px] text-emerald-700 font-bold">
                        Saved ₹{order.savings.toLocaleString('en-IN')} with Dealora
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-contain bg-[#f3faff] p-1 border border-[#c6c5d4]/20"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#071e27] truncate">{item.title}</h4>
                          <p className="text-[11px] text-[#5b5f61]">
                            Qty: {item.quantity} • ₹{item.price.toLocaleString('en-IN')} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking info */}
                  <div className="pt-3 border-t border-[#c6c5d4]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-[#5b5f61]">
                      <Truck className="w-4 h-4 text-[#000666]" />
                      <span>Tracking: <strong>{order.trackingNumber}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Tracking package ${order.trackingNumber}: Status is ${order.status.toUpperCase()}`)}
                        className="px-3 py-1.5 bg-[#f3faff] text-[#000666] font-bold rounded-lg hover:bg-[#e0e0ff] transition-colors border border-[#c6c5d4]/30"
                      >
                        Track Package
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Preferences Form */}
      {activeSubTab === 'settings' && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c6c5d4]/40 shadow-sm space-y-6">
          <h3 className="font-bold text-base text-[#071e27] flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#000666]" />
            Account & Shopping Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#5b5f61] block mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#f3faff] border border-[#c6c5d4]/40 text-sm font-semibold text-[#071e27] focus:ring-2 focus:ring-[#000666]/20 focus:border-[#000666] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#5b5f61] block mb-1.5">
                Alert Notification Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#f3faff] border border-[#c6c5d4]/40 text-sm font-semibold text-[#071e27] focus:ring-2 focus:ring-[#000666]/20 focus:border-[#000666] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#5b5f61] block mb-1.5">
                Preferred Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#f3faff] border border-[#c6c5d4]/40 text-sm font-semibold text-[#071e27] focus:ring-2 focus:ring-[#000666]/20 focus:border-[#000666] outline-none"
              >
                <option value="₹ INR">₹ Indian Rupee (INR)</option>
                <option value="$ USD">$ US Dollar (USD)</option>
                <option value="€ EUR">€ Euro (EUR)</option>
                <option value="£ GBP">£ British Pound (GBP)</option>
              </select>
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-4 border-t border-[#c6c5d4]/20 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5b5f61]">
              Notification Preferences
            </h4>

            <label className="flex items-center justify-between p-3.5 bg-[#f3faff] rounded-2xl cursor-pointer">
              <div>
                <span className="font-bold text-xs sm:text-sm text-[#071e27] block">
                  Instant Price Drop Push Alerts
                </span>
                <span className="text-[11px] text-[#5b5f61]">
                  Receive instant alerts when tracked products hit your target price.
                </span>
              </div>
              <input
                type="checkbox"
                checked={pushAlerts}
                onChange={(e) => setPushAlerts(e.target.checked)}
                className="w-5 h-5 accent-[#000666] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-[#f3faff] rounded-2xl cursor-pointer">
              <div>
                <span className="font-bold text-xs sm:text-sm text-[#071e27] block">
                  Weekly Best Deals Digest
                </span>
                <span className="text-[11px] text-[#5b5f61]">
                  Summary of biggest price drops in electronics & smartphones.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-5 h-5 accent-[#000666] rounded cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-[#000666] text-white rounded-xl text-xs font-bold hover:bg-[#1a237e] transition-colors shadow-sm"
            >
              {isSaved ? 'Preferences Saved!' : 'Save Preferences'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

