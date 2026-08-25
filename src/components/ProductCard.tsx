import React from 'react';
import { Heart, Star, ArrowRight, ShieldCheck, TrendingDown, ShoppingBag, Scale } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onTrackAlert?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart,
  onAddToCompare,
}) => {
  const savings = product.originalPrice - product.price;

  // Buy score styling
  let scoreBadgeBg = 'bg-[#10b981]/15 text-[#005236] border-[#10b981]/30';
  if (product.buyScore < 70) {
    scoreBadgeBg = 'bg-[#ba1a1a]/15 text-[#93000a] border-[#ba1a1a]/30';
  } else if (product.buyScore < 85) {
    scoreBadgeBg = 'bg-[#f59e0b]/15 text-[#92400e] border-[#f59e0b]/30';
  }

  return (
    <div className="bg-white rounded-2xl border border-[#c6c5d4]/40 shadow-[0_4px_20px_rgba(26,35,126,0.04)] overflow-hidden flex flex-col hover:shadow-[0_12px_32px_rgba(26,35,126,0.08)] hover:border-[#000666]/30 transition-all duration-300 group">
      {/* Top Badge & Wishlist Bar */}
      <div className="p-3.5 bg-[#f3faff]/80 border-b border-[#c6c5d4]/20 flex justify-between items-center">
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${scoreBadgeBg}`}>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Buy Score: {product.buyScore}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {onAddToCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCompare(product);
              }}
              title="Add to Compare"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5b5f61] hover:text-[#000666] hover:bg-[#e0e0ff]/50 transition-colors shadow-xs"
            >
              <Scale className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist?.(product.id);
            }}
            aria-label="Toggle Wishlist"
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5b5f61] hover:text-[#ba1a1a] hover:bg-red-50 transition-colors shadow-xs"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#ba1a1a] text-[#ba1a1a]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        onClick={() => onSelect(product)}
        className="h-48 w-full p-4 flex items-center justify-center bg-[#f3faff]/30 relative cursor-pointer overflow-hidden"
      >
        {product.discountPercent > 10 && (
          <div className="absolute top-3 left-3 bg-[#ba1a1a] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            -{product.discountPercent}%
          </div>
        )}
        <img
          src={product.images[0]}
          alt={product.title}
          className="max-h-40 max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#5b5f61] mb-1">
            <span className="uppercase font-semibold tracking-wider text-[10px] text-[#000666] bg-[#e0e0ff] px-2 py-0.5 rounded">
              {product.category}
            </span>
            <span>•</span>
            <span>{product.brand}</span>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="font-bold text-[#071e27] text-base line-clamp-2 hover:text-[#000666] cursor-pointer transition-colors leading-snug mb-2"
          >
            {product.title}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-[#071e27]">{product.rating}</span>
            <span className="text-xs text-[#5b5f61]">({product.reviewCount.toLocaleString()} reviews)</span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-[#c6c5d4]/20">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-extrabold text-[#000666]">
              {product.currency}{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#5b5f61] line-through font-medium">
              {product.currency}{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {savings > 0 && (
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#005236] bg-[#10b981]/10 px-2 py-0.5 rounded mb-3">
              <TrendingDown className="w-3 h-3" />
              Save {product.currency}{savings.toLocaleString('en-IN')}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => onSelect(product)}
              className="bg-[#f3faff] hover:bg-[#e0e0ff] text-[#000666] py-2.5 px-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 border border-[#c6c5d4]/30"
            >
              <span>View Deal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {onAddToCart && (
              <button
                onClick={() => onAddToCart(product)}
                className="bg-[#000666] hover:bg-[#1a237e] text-white py-2.5 px-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

