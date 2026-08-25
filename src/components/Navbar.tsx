import React from 'react';
import {
  Search,
  Bot,
  Heart,
  Bell,
  User,
  Sparkles,
  Menu,
  X,
  ShoppingBag,
  Scale,
  Tag
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'search' | 'assistant' | 'wishlist' | 'alerts' | 'profile';
  onNavigate: (tab: 'home' | 'search' | 'assistant' | 'wishlist' | 'alerts' | 'profile') => void;
  unreadCount?: number;
  wishlistCount?: number;
  cartCount?: number;
  compareCount?: number;
  onOpenCart: () => void;
  onOpenCompare: () => void;
  onOpenCoupons: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  unreadCount = 0,
  wishlistCount = 0,
  cartCount = 0,
  compareCount = 0,
  onOpenCart,
  onOpenCompare,
  onOpenCoupons,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: 'home' | 'search' | 'assistant' | 'wishlist' | 'alerts' | 'profile'; label: string; icon: any; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'search', label: 'Search Deals', icon: Search },
    { id: 'assistant', label: 'Dealora AI', icon: Bot },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: wishlistCount },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadCount },
  ];

  return (
    <header className="sticky top-0 w-full z-40 bg-[#f3faff]/90 backdrop-blur-md border-b border-[#c6c5d4]/30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#000666] hover:bg-[#e0e0ff]/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Dealora Shopping Site Brand Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#000666] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#6ffbbe]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl text-[#000666] tracking-tight leading-none">
                Dealora
              </span>
              <span className="text-[9px] font-bold text-[#5b5f61] tracking-widest uppercase mt-0.5">
                Shopping Site
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 p-1.5 rounded-2xl border border-[#c6c5d4]/40 shadow-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#000666] text-white shadow-sm'
                    : 'text-[#454652] hover:text-[#000666] hover:bg-[#f3faff]'
                }`}
              >
                {item.icon && <item.icon className="w-3.5 h-3.5" />}
                <span>{item.label}</span>

                {item.id === 'assistant' && (
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                )}

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#6ffbbe] text-[#002113]' : 'bg-[#000666] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Tools (Coupons, Compare, Bag, Profile) */}
        <div className="flex items-center gap-2">
          {/* Coupon Hub Trigger */}
          <button
            onClick={onOpenCoupons}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#c6c5d4]/40 text-xs font-bold text-[#000666] hover:bg-[#e0e0ff]/50 shadow-xs transition-all"
            title="Active Coupons & Sales"
          >
            <Tag className="w-3.5 h-3.5 text-[#000666]" />
            <span>Coupons</span>
          </button>

          {/* Compare Trigger */}
          <button
            onClick={onOpenCompare}
            className="relative hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#c6c5d4]/40 text-xs font-bold text-[#000666] hover:bg-[#e0e0ff]/50 shadow-xs transition-all"
            title="Side-by-Side Product Comparison"
          >
            <Scale className="w-3.5 h-3.5 text-[#000666]" />
            <span className="hidden md:inline">Compare</span>
            {compareCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-[#000666] text-white">
                {compareCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-[#000666] text-white hover:bg-[#1a237e] shadow-sm transition-all flex items-center justify-center"
            title="Shopping Bag & Checkout"
          >
            <ShoppingBag className="w-4 h-4 text-[#6ffbbe]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ba1a1a] text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 p-1 pl-2 bg-white rounded-full border border-[#c6c5d4]/40 hover:border-[#000666]/50 shadow-sm transition-all group"
          >
            <span className="text-xs font-bold text-[#071e27] hidden sm:inline px-1">
              Arunima
            </span>
            <div className="w-8 h-8 rounded-full bg-[#000666] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-[#1a237e]">
              A
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#c6c5d4]/40 px-4 py-4 space-y-2 animate-fadeIn shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold ${
                activeTab === item.id
                  ? 'bg-[#000666] text-white'
                  : 'text-[#071e27] hover:bg-[#f3faff]'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-[#10b981] text-white px-2 py-0.5 rounded-full text-xs">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-[#c6c5d4]/30 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenCompare();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-[#f3faff] text-[#000666] text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Scale className="w-4 h-4" />
              <span>Compare ({compareCount})</span>
            </button>
            <button
              onClick={() => {
                onOpenCoupons();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-[#f3faff] text-[#000666] text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Tag className="w-4 h-4" />
              <span>Coupons</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

