import React, { useState, useEffect } from 'react';
import {
  Product,
  ProductCategory,
  PriceAlert,
  UserNotification,
  RetailerOffer,
  CartItem,
  CouponItem
} from './types';
import { MOCK_PRODUCTS, INITIAL_PRICE_ALERTS, INITIAL_NOTIFICATIONS, MOCK_COUPONS } from './data/mockProducts';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeDashboard } from './components/HomeDashboard';
import { SearchResultsView } from './components/SearchResultsView';
import { AiAssistantView } from './components/AiAssistantView';
import { WishlistAlertsView } from './components/WishlistAlertsView';
import { ProfileView } from './components/ProfileView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { RetailerDealModal } from './components/RetailerDealModal';
import { CartCheckoutModal } from './components/CartCheckoutModal';
import { CompareModal } from './components/CompareModal';
import { CouponHubModal } from './components/CouponHubModal';
import { Check, ShoppingBag, Scale, Tag } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'assistant' | 'wishlist' | 'alerts' | 'profile'>('home');
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [aiPrompt, setAiPrompt] = useState<string>('');

  // Cart State (persisted)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dealora_cart');
      if (saved) return JSON.parse(saved);
      // Default initial cart item for rich immediate demo
      const p1 = MOCK_PRODUCTS[0];
      return [
        {
          id: 'cart-demo-1',
          product: p1,
          quantity: 1,
          selectedStorage: p1.storageOptions ? p1.storageOptions[0] : undefined,
          selectedColor: p1.colorOptions ? p1.colorOptions[0] : undefined,
          selectedRetailer: p1.retailers[0],
        }
      ];
    } catch {
      return [];
    }
  });

  // Compare State (up to 4 products)
  const [compareProductIds, setCompareProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dealora_compare');
      return saved ? JSON.parse(saved) : ['iphone-17-256gb', 'samsung-galaxy-s25-ultra'];
    } catch {
      return ['iphone-17-256gb', 'samsung-galaxy-s25-ultra'];
    }
  });

  // Wishlist state (persisted)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dealora_wishlist');
      return saved ? JSON.parse(saved) : ['iphone-17-256gb', 'sony-wh1000xm6'];
    } catch {
      return ['iphone-17-256gb', 'sony-wh1000xm6'];
    }
  });

  // Price Alerts state (persisted)
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(() => {
    try {
      const saved = localStorage.getItem('dealora_alerts');
      return saved ? JSON.parse(saved) : INITIAL_PRICE_ALERTS;
    } catch {
      return INITIAL_PRICE_ALERTS;
    }
  });

  // Notifications state
  const [notifications, setNotifications] = useState<UserNotification[]>(() => {
    try {
      const saved = localStorage.getItem('dealora_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Modals state
  const [alertModalProduct, setAlertModalProduct] = useState<Product | null>(null);
  const [activeRetailerDeal, setActiveRetailerDeal] = useState<{ product: Product; retailer: RetailerOffer } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCouponHubOpen, setIsCouponHubOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('dealora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('dealora_compare', JSON.stringify(compareProductIds));
    } catch (e) {
      console.error(e);
    }
  }, [compareProductIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dealora_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dealora_alerts', JSON.stringify(priceAlerts));
    } catch (e) {
      console.error(e);
    }
  }, [priceAlerts]);

  useEffect(() => {
    try {
      localStorage.setItem('dealora_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  // Cart Handlers
  const handleAddToCart = (product: Product, storage?: string, color?: string, retailer?: RetailerOffer) => {
    const selectedRetailer = retailer || product.retailers.find((r) => r.inStock) || product.retailers[0];

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedStorage === storage &&
          item.selectedColor === color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product: product,
        quantity: 1,
        selectedStorage: storage || (product.storageOptions ? product.storageOptions[0] : undefined),
        selectedColor: color || (product.colorOptions ? product.colorOptions[0] : undefined),
        selectedRetailer: selectedRetailer,
      };
      return [...prev, newItem];
    });

    showToast(`Added "${product.title.slice(0, 24)}..." to Shopping Bag!`);
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Compare Handlers
  const handleAddToCompare = (product: Product) => {
    if (compareProductIds.includes(product.id)) {
      setIsCompareOpen(true);
      return;
    }
    if (compareProductIds.length >= 4) {
      showToast('Comparison limit reached (max 4 products). Opening comparison.');
      setIsCompareOpen(true);
      return;
    }
    setCompareProductIds((prev) => [...prev, product.id]);
    showToast(`Added "${product.title.slice(0, 20)}..." to Comparison!`);
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearCompare = () => {
    setCompareProductIds([]);
  };

  const compareProductsList = products.filter((p) => compareProductIds.includes(p.id));

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleSearchFromHome = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
    setActiveTab('search');
  };

  const handleCategoryFromHome = (category: ProductCategory) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setActiveTab('search');
  };

  const handleOpenAiAssistant = (customPrompt?: string) => {
    if (customPrompt) {
      setAiPrompt(customPrompt);
    }
    setActiveTab('assistant');
  };

  const handleAskAiAboutProduct = (product: Product) => {
    setSelectedProduct(null);
    setAiPrompt(`Should I buy ${product.title} at ${product.currency}${product.price.toLocaleString('en-IN')} right now?`);
    setActiveTab('assistant');
  };

  const handleSavePriceAlert = (productId: string, targetPrice: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      productImage: product.images[0],
      currentPrice: product.price,
      targetPrice: targetPrice,
      originalPrice: product.originalPrice,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    setPriceAlerts((prev) => [newAlert, ...prev]);
    showToast(`Price drop alert set for ₹${targetPrice.toLocaleString('en-IN')}!`);
  };

  const handleDeletePriceAlert = (alertId: string) => {
    setPriceAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleBuyDeal = (product: Product, retailer: RetailerOffer) => {
    setActiveRetailerDeal({ product, retailer });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#f3faff] text-[#071e27] flex flex-col font-sans selection:bg-[#bdc2ff] selection:text-[#000767]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#000666] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-white/20 animate-bounce">
          <Check className="w-4 h-4 text-[#6ffbbe]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar with Dealora Shopping Site branding */}
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadCount={unreadNotificationCount}
        wishlistCount={wishlistIds.length}
        cartCount={totalCartCount}
        compareCount={compareProductIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenCoupons={() => setIsCouponHubOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomeDashboard
            products={products}
            onSelectProduct={setSelectedProduct}
            onSearchQuery={handleSearchFromHome}
            onSelectCategory={handleCategoryFromHome}
            onOpenAiAssistant={handleOpenAiAssistant}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onAddToCompare={handleAddToCompare}
            onOpenCoupons={() => setIsCouponHubOpen(true)}
          />
        )}

        {activeTab === 'search' && (
          <SearchResultsView
            products={products}
            initialQuery={searchQuery}
            initialCategory={selectedCategory}
            onSelectProduct={setSelectedProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onAddToCompare={handleAddToCompare}
          />
        )}

        {activeTab === 'assistant' && (
          <AiAssistantView
            onSelectProduct={setSelectedProduct}
            initialPrompt={aiPrompt}
          />
        )}

        {(activeTab === 'wishlist' || activeTab === 'alerts') && (
          <WishlistAlertsView
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            priceAlerts={priceAlerts}
            onDeleteAlert={handleDeletePriceAlert}
            onOpenAlertModal={setAlertModalProduct}
            onSelectProduct={setSelectedProduct}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            initialTab={activeTab === 'wishlist' ? 'wishlist' : 'alerts'}
            onAddToCart={handleAddToCart}
            onAddToCompare={handleAddToCompare}
          />
        )}

        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadCount={unreadNotificationCount}
        wishlistCount={wishlistIds.length}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onTrackAlert={(p) => {
            setSelectedProduct(null);
            setAlertModalProduct(p);
          }}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAskAiAboutProduct={handleAskAiAboutProduct}
          onBuyDeal={handleBuyDeal}
          onAddToCart={handleAddToCart}
          onAddToCompare={handleAddToCompare}
        />
      )}

      {/* Price Alert Modal */}
      {alertModalProduct && (
        <PriceAlertModal
          product={alertModalProduct}
          onClose={() => setAlertModalProduct(null)}
          onSaveAlert={handleSavePriceAlert}
        />
      )}

      {/* Retailer Deal Modal */}
      {activeRetailerDeal && (
        <RetailerDealModal
          deal={activeRetailerDeal}
          onClose={() => setActiveRetailerDeal(null)}
        />
      )}

      {/* Cart & End-to-End Checkout Modal */}
      {isCartOpen && (
        <CartCheckoutModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          onOpenCompare={() => {
            setIsCartOpen(false);
            setIsCompareOpen(true);
          }}
        />
      )}

      {/* Product Comparison Modal */}
      {isCompareOpen && (
        <CompareModal
          products={compareProductsList}
          allAvailableProducts={products}
          onClose={() => setIsCompareOpen(false)}
          onRemoveProduct={handleRemoveFromCompare}
          onAddProduct={handleAddToCompare}
          onClearCompare={handleClearCompare}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Coupon & Sale Hub Modal */}
      {isCouponHubOpen && (
        <CouponHubModal
          onClose={() => setIsCouponHubOpen(false)}
          onApplyCouponToCart={(coupon) => {
            showToast(`Coupon ${coupon.code} activated!`);
            setIsCartOpen(true);
          }}
        />
      )}
    </div>
  );
}

