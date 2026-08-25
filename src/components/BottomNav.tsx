import React from 'react';
import {
  Home,
  Search,
  Bot,
  Heart,
  ShoppingBag,
  User,
} from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'search' | 'assistant' | 'wishlist' | 'alerts' | 'profile';
  onNavigate: (tab: 'home' | 'search' | 'assistant' | 'wishlist' | 'alerts' | 'profile') => void;
  unreadCount?: number;
  wishlistCount?: number;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
  unreadCount = 0,
  wishlistCount = 0,
  cartCount = 0,
  onOpenCart,
}) => {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'search' as const, label: 'Search', icon: Search },
    { id: 'assistant' as const, label: 'Dealora AI', icon: Bot, isSpecial: true },
    { id: 'wishlist' as const, label: 'Wishlist', icon: Heart, count: wishlistCount },
    { id: 'cart' as const, label: 'Bag', icon: ShoppingBag, count: cartCount, isCart: true },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 backdrop-blur-md bg-white/95 border-t border-[#c6c5d4]/40 shadow-[0_-4px_20px_rgba(26,35,126,0.08)]">
      <div className="flex justify-around items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.isCart && onOpenCart) {
                  onOpenCart();
                } else if (tab.id !== 'cart') {
                  onNavigate(tab.id as any);
                }
              }}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                isActive
                  ? 'text-[#000666] scale-105'
                  : 'text-[#5b5f61] hover:text-[#000666]'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#e0e0ff] text-[#000666]'
                    : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              </div>

              <span className={`text-[10px] font-bold mt-0.5 tracking-tight ${isActive ? 'text-[#000666]' : 'text-[#5b5f61]'}`}>
                {tab.label}
              </span>

              {tab.count !== undefined && tab.count > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-[#ba1a1a] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

