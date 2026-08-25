import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  Check,
  ChevronDown,
  X,
  Sparkles
} from 'lucide-react';
import { Product, ProductCategory, SearchFilterState } from '../types';
import { ProductCard } from './ProductCard';

interface SearchResultsViewProps {
  products: Product[];
  initialQuery?: string;
  initialCategory?: ProductCategory;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  products,
  initialQuery = '',
  initialCategory = 'all',
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onAddToCompare,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedRetailer, setSelectedRetailer] = useState<string>('all');
  const [minBuyScore, setMinBuyScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'best-deal' | 'lowest-price' | 'highest-score' | 'biggest-discount'>('best-deal');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Available brands and retailers
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Query match
        if (query.trim()) {
          const q = query.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(q);
          const matchesBrand = p.brand.toLowerCase().includes(q);
          const matchesCategory = p.category.toLowerCase().includes(q);
          if (!matchesTitle && !matchesBrand && !matchesCategory) return false;
        }

        // Category match
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Brand match
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
          return false;
        }

        // Retailer match
        if (selectedRetailer !== 'all') {
          const hasRetailer = p.retailers.some(
            (r) => r.name.toLowerCase() === selectedRetailer.toLowerCase()
          );
          if (!hasRetailer) return false;
        }

        // Buy score
        if (p.buyScore < minBuyScore) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'lowest-price') return a.price - b.price;
        if (sortBy === 'highest-score') return b.buyScore - a.buyScore;
        if (sortBy === 'biggest-discount') return b.discountPercent - a.discountPercent;
        // Default best-deal: composite score
        return b.buyScore * 0.6 + b.discountPercent * 0.4 - (a.buyScore * 0.6 + a.discountPercent * 0.4);
      });
  }, [products, query, selectedCategory, selectedBrand, selectedRetailer, minBuyScore, sortBy]);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'smartphones', label: 'Smartphones' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'headphones', label: 'Headphones' },
    { id: 'tvs', label: 'TVs & Displays' },
    { id: 'smartwatches', label: 'Smartwatches' },
    { id: 'gaming', label: 'Gaming Laptops' },
  ];

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedRetailer('all');
    setMinBuyScore(0);
    setSortBy('best-deal');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6 pb-28">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5b5f61]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search smartphones, laptops, headphones, TVs..."
          className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white border border-[#c6c5d4]/40 shadow-sm focus:ring-2 focus:ring-[#000666]/30 focus:border-[#000666] text-[#071e27] text-base placeholder-[#5b5f61] outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 text-[#5b5f61]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills Slider */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#000666] text-white shadow-sm'
                : 'bg-white border border-[#c6c5d4]/40 text-[#454652] hover:border-[#000666]/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#c6c5d4]/20">
        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Brand Selector */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#c6c5d4]/40 text-xs font-bold text-[#071e27] focus:outline-none focus:border-[#000666]"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Retailer Selector */}
          <select
            value={selectedRetailer}
            onChange={(e) => setSelectedRetailer(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#c6c5d4]/40 text-xs font-bold text-[#071e27] focus:outline-none focus:border-[#000666]"
          >
            <option value="all">All Retailers</option>
            <option value="Amazon">Amazon</option>
            <option value="Flipkart">Flipkart</option>
            <option value="Croma">Croma</option>
            <option value="Reliance Digital">Reliance Digital</option>
          </select>

          {/* Min Buy Score Filter */}
          <select
            value={minBuyScore}
            onChange={(e) => setMinBuyScore(Number(e.target.value))}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#c6c5d4]/40 text-xs font-bold text-[#071e27] focus:outline-none focus:border-[#000666]"
          >
            <option value="0">Any Buy Score</option>
            <option value="80">Buy Score ≥ 80 (Good Deals)</option>
            <option value="90">Buy Score ≥ 90 (Strong Buys)</option>
          </select>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5b5f61]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#c6c5d4]/40 text-xs font-bold text-[#000666] focus:outline-none focus:border-[#000666]"
          >
            <option value="best-deal">🔥 Best Deal (Default)</option>
            <option value="lowest-price">💰 Lowest Price</option>
            <option value="highest-score">⭐ Highest Buy Score</option>
            <option value="biggest-discount">🏷️ Biggest Discount %</option>
          </select>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[#5b5f61]">
          Showing <span className="font-bold text-[#071e27]">{filteredProducts.length}</span> verified deals
          {query ? ` for "${query}"` : ''}
        </p>

        {(selectedCategory !== 'all' || selectedBrand !== 'all' || selectedRetailer !== 'all' || minBuyScore > 0 || query) && (
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-[#000666] hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              isWishlisted={wishlistIds.includes(prod.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onAddToCompare={onAddToCompare}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#c6c5d4]/30 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#f3faff] text-[#000666] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8 opacity-40" />
          </div>
          <h3 className="text-lg font-bold text-[#071e27]">No matching deals found</h3>
          <p className="text-xs text-[#5b5f61] max-w-md mx-auto">
            We couldn't find any products matching your specific filters. Try loosening your price or category parameters.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#000666] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#1a237e]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
