import React, { useState, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  Sparkles,
  TrendingDown,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Watch,
  Gamepad2,
  Send,
  ShieldCheck,
  Bot,
  Flame,
  CheckCircle2,
  Tag,
  Clock,
  Zap,
  ShoppingBag,
  Scale
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { BuyScoreGauge } from './BuyScoreGauge';
import { ProductCard } from './ProductCard';
import { MOCK_FLASH_DEALS, MOCK_COUPONS } from '../data/mockProducts';

interface HomeDashboardProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSearchQuery: (query: string) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenAiAssistant: (customPrompt?: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
  onOpenCoupons?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  products,
  onSelectProduct,
  onSearchQuery,
  onSelectCategory,
  onOpenAiAssistant,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onAddToCompare,
  onOpenCoupons,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [quickAiPrompt, setQuickAiPrompt] = useState('');

  // Flash deals countdown timer (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput.trim());
    }
  };

  const handleQuickAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickAiPrompt.trim()) {
      onOpenAiAssistant(quickAiPrompt.trim());
      setQuickAiPrompt('');
    }
  };

  const popularSearches = [
    'iPhone 17',
    'MacBook Air',
    'Sony WH-1000XM6',
    'Samsung S25 Ultra',
    'Bose Headphones',
    'Gaming Laptop'
  ];

  const featuredDeals = products.slice(0, 3);
  const trendingDrops = products.filter((p) => (p.trendingDrop || 0) > 0 || p.discountPercent >= 11).slice(0, 4);

  const categoryCards: { id: ProductCategory; name: string; icon: React.ReactNode }[] = [
    { id: 'smartphones', name: 'Smartphones', icon: <Smartphone className="w-6 h-6 text-[#000666]" /> },
    { id: 'laptops', name: 'Laptops', icon: <Laptop className="w-6 h-6 text-[#000666]" /> },
    { id: 'headphones', name: 'Headphones', icon: <Headphones className="w-6 h-6 text-[#000666]" /> },
    { id: 'tvs', name: 'TVs & Displays', icon: <Tv className="w-6 h-6 text-[#000666]" /> },
    { id: 'smartwatches', name: 'Smartwatches', icon: <Watch className="w-6 h-6 text-[#000666]" /> },
    { id: 'gaming', name: 'Gaming', icon: <Gamepad2 className="w-6 h-6 text-[#000666]" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-12 pb-28">
      {/* Hero Section with Ambient Gradient */}
      <section className="relative rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-[0_8px_32px_rgba(26,35,126,0.04)] border border-white/80 bg-gradient-to-br from-white/70 via-white/50 to-[#e0e0ff]/30 backdrop-blur-md overflow-hidden">
        {/* Glow orb */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#bdc2ff]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#6ffbbe]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#e0e0ff] text-[#000666] px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#000666]" />
            <span>Dealora Shopping Site • AI Price Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#000666] tracking-tight leading-tight mb-4">
            Shop Smarter. Pay Less.
          </h1>
          <p className="text-sm sm:text-base text-[#454652] max-w-xl mx-auto mb-8 leading-relaxed font-medium">
            Compare prices across Amazon, Flipkart, Croma & Reliance Digital with AI Buy Scores, instant coupon savings & price drop tracking.
          </p>

          {/* Hero Search Bar */}
          <form onSubmit={handleHeroSearch} className="relative group max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5b5f61] group-focus-within:text-[#000666] transition-colors" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products, brands, or tech models (e.g. MacBook, iPhone 17)..."
              className="w-full pl-16 pr-28 py-4.5 rounded-full bg-white border border-[#c6c5d4]/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03),0_6px_20px_rgba(26,35,126,0.06)] focus:ring-2 focus:ring-[#000666]/30 focus:border-[#000666] text-base text-[#071e27] placeholder-[#5b5f61] outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-[#000666] text-white rounded-full text-xs font-bold hover:bg-[#1a237e] transition-colors shadow-sm"
            >
              Search Deals
            </button>
          </form>

          {/* Popular Search Pills */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5b5f61] mr-1">Trending:</span>
            {popularSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearchQuery(tag)}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#c6c5d4]/30 text-xs font-semibold text-[#071e27] hover:border-[#000666] hover:text-[#000666] hover:bg-[#f3faff] transition-all shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH DEALS COUNTDOWN BANNER SECTION */}
      <section className="bg-gradient-to-r from-[#000666] via-[#1a237e] to-[#000666] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6ffbbe]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#6ffbbe] text-[#000666] px-3 py-1 rounded-full text-xs font-black">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>LIMITED FLASH DEALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Up to 30% Off Today's Hot Picks
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-md">
              Real-time algorithmic price matches with verified lowest 90-day prices.
            </p>
          </div>

          {/* Timer Clock */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <Clock className="w-5 h-5 text-[#6ffbbe]" />
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-white/70 block">Ends in</span>
              <div className="flex items-center gap-1 font-mono font-black text-lg text-white">
                <span className="bg-black/30 px-2 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>:
                <span className="bg-black/30 px-2 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>:
                <span className="bg-black/30 px-2 py-0.5 rounded text-[#6ffbbe]">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Deals Mini Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {MOCK_FLASH_DEALS.map((deal) => {
            const prod = products.find((p) => p.id === deal.productId);
            if (!prod) return null;
            return (
              <div
                key={deal.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-white text-[#071e27] p-4 rounded-2xl flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform shadow-lg group"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-white bg-[#ba1a1a] px-2 py-0.5 rounded-md">
                      {deal.discountPercent}% OFF
                    </span>
                    <span className="text-[10px] font-bold text-[#5b5f61]">
                      {deal.claimedPercent}% Claimed
                    </span>
                  </div>

                  <div className="w-full h-24 flex items-center justify-center p-2 my-2">
                    <img src={prod.images[0]} alt={prod.title} className="h-20 object-contain mix-blend-multiply" />
                  </div>

                  <h4 className="font-bold text-xs text-[#000666] line-clamp-1 group-hover:text-[#1a237e]">
                    {prod.title}
                  </h4>
                </div>

                <div className="mt-2 pt-2 border-t border-[#c6c5d4]/20 flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-[#000666]">
                      ₹{deal.flashPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-[#5b5f61] line-through ml-1.5">
                      ₹{deal.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {onAddToCart && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-2 bg-[#000666] text-white rounded-xl hover:bg-[#1a237e] transition-colors"
                      title="Add Flash Deal to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#6ffbbe]" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bento Grid: Left Column Deals (8 cols) + Right Column AI & Trending (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Today's Best Deals (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 text-[#ba1a1a] font-bold text-xs uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 fill-[#ba1a1a]" />
                <span>Handpicked Algorithms</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000666] tracking-tight">
                Today's Best Deals
              </h2>
            </div>
            <button
              onClick={() => onSearchQuery('')}
              className="text-xs font-bold text-[#000666] flex items-center gap-1 hover:underline pb-1"
            >
              <span>View All Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {featuredDeals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onAddToCompare={onAddToCompare}
              />
            ))}
          </div>

          {/* Promotional Coupon Strip */}
          <div className="bg-[#e0e0ff]/50 border border-[#bdc2ff]/60 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#000666] text-white flex items-center justify-center">
                <Tag className="w-5 h-5 text-[#6ffbbe]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#000666]">
                  Get Extra ₹2,000 Instant Discount with Code: <span className="underline">DEALORA2000</span>
                </p>
                <p className="text-[11px] text-[#454652]">
                  Valid across all electronics orders above ₹40,000.
                </p>
              </div>
            </div>

            {onOpenCoupons && (
              <button
                onClick={onOpenCoupons}
                className="px-4 py-2 bg-[#000666] text-white rounded-xl text-xs font-bold hover:bg-[#1a237e] transition-colors flex-shrink-0"
              >
                View All Coupons
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Embedded Dealora AI Card + Trending Price Drops (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dealora AI Interactive Intelligence Widget */}
          <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(76,86,175,0.08),0_4px_12px_rgba(26,35,126,0.04)] border border-[#c6c5d4]/40 overflow-hidden flex flex-col relative">
            <div className="p-4 border-b border-[#c6c5d4]/20 flex items-center justify-between bg-[#f3faff]/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#000666] text-white flex items-center justify-center shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-[#000666] text-base tracking-tight">Dealora AI</h3>
              </div>
              <span className="text-[10px] font-bold text-[#005236] bg-[#10b981]/15 px-2 py-0.5 rounded">
                Live Advisor
              </span>
            </div>

            <div className="p-5 space-y-4 flex-1 bg-gradient-to-b from-transparent to-[#f3faff]/30">
              {/* Sample User message bubble */}
              <div className="flex justify-end">
                <div className="bg-[#000666] text-white text-xs font-medium px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%]">
                  Should I buy the Dell XPS 15 right now?
                </div>
              </div>

              {/* Sample AI Response with Amber status */}
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#000666] flex-shrink-0 flex items-center justify-center text-white shadow-sm mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl rounded-tl-none p-3.5 text-xs text-[#071e27] space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
                      WAIT
                    </span>
                    <span className="text-[10px] text-[#5b5f61] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#000666]" /> 84% Confidence
                    </span>
                  </div>
                  <p className="leading-relaxed text-[#454652]">
                    The current price is 8% above its 90-day average. Historical data suggests a drop is likely during the upcoming sale event. I recommend waiting.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Ask Box */}
            <form onSubmit={handleQuickAiSubmit} className="p-3.5 border-t border-[#c6c5d4]/20 bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={quickAiPrompt}
                  onChange={(e) => setQuickAiPrompt(e.target.value)}
                  placeholder="Ask Dealora AI about any product price..."
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#f3faff] border border-[#c6c5d4]/40 focus:ring-1 focus:ring-[#000666] focus:border-[#000666] text-xs text-[#071e27] placeholder-[#5b5f61] outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#000666] hover:bg-[#e0e0ff] rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Trending Price Drops List */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_8px_24px_rgba(26,35,126,0.03)] border border-[#c6c5d4]/30 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#000666] text-base flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-[#10b981]" />
                Trending Price Drops
              </h3>
              <span className="text-[10px] font-bold text-[#5b5f61] uppercase tracking-wider">Today</span>
            </div>

            <ul className="space-y-3.5">
              {trendingDrops.map((prod) => (
                <li
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="flex items-center gap-3 pb-3 border-b border-[#c6c5d4]/20 last:border-0 last:pb-0 cursor-pointer hover:bg-[#f3faff]/50 p-1 rounded-xl transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f3faff] flex items-center justify-center flex-shrink-0 p-1 border border-[#c6c5d4]/20">
                    <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#071e27] truncate">{prod.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-extrabold text-[#000666]">
                        {prod.currency}{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#5b5f61] line-through">
                        {prod.currency}{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <div className="text-[#005236] text-[11px] font-bold bg-[#10b981]/15 px-2 py-1 rounded-lg border border-[#10b981]/30">
                    -{prod.trendingDrop || prod.discountPercent}%
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Popular Categories Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-[#000666] tracking-tight">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryCards.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="bg-white border border-[#c6c5d4]/30 shadow-[0_2px_8px_rgba(26,35,126,0.02)] rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-[#000666]/50 hover:shadow-[0_8px_24px_rgba(26,35,126,0.06)] hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f3faff] flex items-center justify-center mb-3 group-hover:bg-[#e0e0ff] transition-colors">
                {cat.icon}
              </div>
              <span className="font-bold text-xs sm:text-sm text-[#071e27]">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

