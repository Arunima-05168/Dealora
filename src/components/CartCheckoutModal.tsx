import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Tag,
  CreditCard,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Receipt,
  Download,
  AlertCircle
} from 'lucide-react';
import { CartItem, BankOffer, CouponItem, OrderRecord } from '../types';
import { MOCK_BANK_OFFERS, MOCK_COUPONS } from '../data/mockProducts';

interface CartCheckoutModalProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onClose: () => void;
  onOrderSuccess?: (order: OrderRecord) => void;
  onNavigateToShop?: () => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onClose,
  onOrderSuccess,
  onNavigateToShop,
}) => {
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponItem | null>(null);
  const [couponError, setCouponError] = useState('');
  const [selectedBankOffer, setSelectedBankOffer] = useState<BankOffer | null>(MOCK_BANK_OFFERS[0]);

  // Shipping Form State
  const [shippingData, setShippingData] = useState({
    fullName: 'Arunima Dutta',
    email: 'duttaarunima50@gmail.com',
    phone: '+91 98765 43210',
    address: '42, Cyber Green Residency, Sector 45',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122003',
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'emi' | 'cod'>('card');
  const [placedOrder, setPlacedOrder] = useState<OrderRecord | null>(null);

  // Calculations
  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.selectedRetailer?.price || item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const rawOriginalTotal = cartItems.reduce((acc, item) => {
    return acc + item.product.originalPrice * item.quantity;
  }, 0);

  const baseProductDiscount = Math.max(0, rawOriginalTotal - rawSubtotal);

  // Bank offer discount
  let bankDiscountAmount = 0;
  if (selectedBankOffer && rawSubtotal >= selectedBankOffer.minOrderValue) {
    const calculatedDiscount = Math.round((rawSubtotal * selectedBankOffer.discountPercent) / 100);
    bankDiscountAmount = Math.min(calculatedDiscount, selectedBankOffer.maxDiscount);
  }

  // Coupon discount
  let couponDiscountAmount = 0;
  if (appliedCoupon && rawSubtotal >= appliedCoupon.minOrder) {
    couponDiscountAmount = appliedCoupon.discountValue;
  }

  const deliveryFee = rawSubtotal > 499 || rawSubtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, rawSubtotal - bankDiscountAmount - couponDiscountAmount + deliveryFee);
  const totalSavings = baseProductDiscount + bankDiscountAmount + couponDiscountAmount;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');

    const found = MOCK_COUPONS.find((c) => c.code.toUpperCase() === code);
    if (!found) {
      setCouponError('Invalid coupon code. Try DEALORA2000 or FESTIVE1500');
      return;
    }

    if (rawSubtotal < found.minOrder) {
      setCouponError(`Minimum order value for ${found.code} is ₹${found.minOrder.toLocaleString('en-IN')}`);
      return;
    }

    setAppliedCoupon(found);
    setCouponCode(found.code);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: OrderRecord = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cartItems.map((item) => ({
        productTitle: item.product.title,
        productImage: item.product.images[0],
        price: item.selectedRetailer?.price || item.product.price,
        quantity: item.quantity,
        retailerName: item.selectedRetailer?.name || 'Dealora Verified Retailer',
      })),
      totalAmount: finalTotal,
      discountAmount: totalSavings,
      bankDiscount: bankDiscountAmount,
      promoCode: appliedCoupon?.code,
      status: 'Confirmed',
      shippingAddress: `${shippingData.fullName}, ${shippingData.address}, ${shippingData.city}, ${shippingData.state} - ${shippingData.pincode} (Ph: ${shippingData.phone})`,
      estimatedDelivery: 'Estimated by ' + new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      paymentMethod: paymentMethod === 'card' ? 'HDFC Credit Card (Ending in 4092)' : paymentMethod === 'upi' ? 'UPI (Google Pay)' : paymentMethod === 'emi' ? 'No-Cost EMI (3 Months)' : 'Cash on Delivery',
    };

    setPlacedOrder(newOrder);
    onOrderSuccess(newOrder);
    onClearCart();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#071e27]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-white/60 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#c6c5d4]/30 flex items-center justify-between bg-[#f3faff]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#000666] text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-5 h-5 text-[#6ffbbe]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#000666] tracking-tight">
                {step === 'cart' && 'Your Shopping Bag'}
                {step === 'shipping' && 'Delivery & Shipping Details'}
                {step === 'payment' && 'Payment & Instant Bank Offers'}
                {step === 'success' && 'Order Placed Successfully!'}
              </h2>
              <p className="text-xs font-semibold text-[#5b5f61]">
                {step === 'cart' && `${cartItems.length} item${cartItems.length === 1 ? '' : 's'} with live retailer discounts`}
                {step === 'shipping' && 'Fast, insured shipping via Dealora Verified Logistics'}
                {step === 'payment' && 'Bank level 256-bit encrypted checkout'}
                {step === 'success' && `Order ID: ${placedOrder?.orderId}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Step Indicators */}
            {step !== 'success' && (
              <div className="hidden sm:flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#c6c5d4]/40 text-xs font-bold text-[#5b5f61]">
                <span className={step === 'cart' ? 'text-[#000666] font-extrabold' : ''}>1. Bag</span>
                <span>→</span>
                <span className={step === 'shipping' ? 'text-[#000666] font-extrabold' : ''}>2. Address</span>
                <span>→</span>
                <span className={step === 'payment' ? 'text-[#000666] font-extrabold' : ''}>3. Pay</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 text-[#5b5f61] hover:text-[#000666] hover:bg-[#e0e0ff]/50 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <div>
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-[#f3faff] text-[#000666] flex items-center justify-center border border-[#c6c5d4]/30">
                    <ShoppingBag className="w-10 h-10 text-[#000666]/50" />
                  </div>
                  <h3 className="text-xl font-bold text-[#000666]">Your shopping bag is empty</h3>
                  <p className="text-sm text-[#5b5f61] max-w-sm mx-auto">
                    Explore top price drops, compare tech across retailers, and find unbeatable deals on Dealora Shopping Site.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToShop();
                    }}
                    className="px-6 py-3 bg-[#000666] text-white rounded-2xl text-sm font-bold shadow-md hover:bg-[#1a237e] transition-colors inline-flex items-center gap-2"
                  >
                    <span>Browse Today’s Deals</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Cart Items List */}
                  <div className="lg:col-span-7 space-y-3.5">
                    {cartItems.map((item) => {
                      const currentItemPrice = item.selectedRetailer?.price || item.product.price;
                      return (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 rounded-2xl bg-white border border-[#c6c5d4]/30 shadow-xs hover:border-[#000666]/30 transition-all"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl bg-[#f3faff] p-2 border border-[#c6c5d4]/20 flex-shrink-0"
                          />

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-bold text-sm text-[#000666] line-clamp-2 leading-tight">
                                  {item.product.title}
                                </h4>
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-[#ba1a1a] hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-[#5b5f61]">
                                {item.selectedRetailer && (
                                  <span className="px-2 py-0.5 rounded-md bg-[#e0e0ff] text-[#000666] font-bold text-[11px]">
                                    {item.selectedRetailer.name}
                                  </span>
                                )}
                                {item.selectedStorage && <span>Storage: {item.selectedStorage}</span>}
                                {item.selectedColor && <span>• Color: {item.selectedColor}</span>}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#c6c5d4]/20">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-base text-[#000666]">
                                  ₹{currentItemPrice.toLocaleString('en-IN')}
                                </span>
                                <span className="text-xs text-[#5b5f61] line-through">
                                  ₹{item.product.originalPrice.toLocaleString('en-IN')}
                                </span>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2 bg-[#f3faff] rounded-xl border border-[#c6c5d4]/30 px-2 py-1">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="p-1 text-[#000666] hover:bg-white rounded transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-black text-[#000666] w-5 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 text-[#000666] hover:bg-white rounded transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Dealora Price Guarantee Card */}
                    <div className="p-4 rounded-2xl bg-[#e0e0ff]/40 border border-[#bdc2ff]/40 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#000666] flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-[#000666]">
                        <p className="font-bold">Dealora Lowest Price & Free Returns Guarantee</p>
                        <p className="text-[#454652] mt-0.5">
                          If this item drops in price on Amazon or Flipkart within 7 days of delivery, Dealora will alert and refund the difference.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Order Summary & Coupon */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Coupon Input Box */}
                    <div className="p-4 rounded-2xl bg-[#f3faff] border border-[#c6c5d4]/30 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#000666]">
                        <Tag className="w-4 h-4 text-[#000666]" />
                        <span>Apply Dealora Promo / Coupon</span>
                      </div>

                      {appliedCoupon ? (
                        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                          <div>
                            <span className="text-xs font-extrabold text-emerald-800 tracking-wider">
                              {appliedCoupon.code}
                            </span>
                            <p className="text-[11px] text-emerald-700">{appliedCoupon.discountText}</p>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-xs font-bold text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => {
                                setCouponCode(e.target.value);
                                setCouponError('');
                              }}
                              placeholder="Enter coupon code (e.g. DEALORA2000)"
                              className="flex-1 px-3 py-2 text-xs uppercase font-bold rounded-xl border border-[#c6c5d4]/40 bg-white focus:outline-none focus:border-[#000666]"
                            />
                            <button
                              type="button"
                              onClick={() => handleApplyCoupon()}
                              className="px-3.5 py-2 bg-[#000666] text-white text-xs font-bold rounded-xl hover:bg-[#1a237e] transition-colors"
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && (
                            <p className="text-[11px] font-semibold text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              <span>{couponError}</span>
                            </p>
                          )}
                          {/* Quick Coupon Suggester */}
                          <div className="mt-2.5 pt-2 border-t border-[#c6c5d4]/20 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#5b5f61]">Suggested:</span>
                            {MOCK_COUPONS.slice(0, 2).map((c) => (
                              <button
                                key={c.code}
                                onClick={() => handleApplyCoupon(c.code)}
                                className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-white border border-[#bdc2ff] text-[#000666] hover:bg-[#e0e0ff]"
                              >
                                {c.code} (Save ₹{c.discountValue})
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cost Breakdown Card */}
                    <div className="p-5 rounded-2xl bg-white border border-[#c6c5d4]/40 shadow-xs space-y-3">
                      <h4 className="font-extrabold text-sm text-[#000666] border-b border-[#c6c5d4]/20 pb-2">
                        Price Summary
                      </h4>

                      <div className="space-y-2 text-xs text-[#454652]">
                        <div className="flex justify-between">
                          <span>Total MRP ({cartItems.length} items)</span>
                          <span className="line-through">₹{rawOriginalTotal.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Retailer Deal Discount</span>
                          <span>- ₹{baseProductDiscount.toLocaleString('en-IN')}</span>
                        </div>

                        {appliedCoupon && (
                          <div className="flex justify-between text-emerald-700 font-semibold">
                            <span>Coupon Discount ({appliedCoupon.code})</span>
                            <span>- ₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span>Standard Express Delivery</span>
                          <span className="text-emerald-700 font-bold">FREE</span>
                        </div>

                        <div className="pt-3 border-t border-[#c6c5d4]/30 flex justify-between items-baseline">
                          <div>
                            <span className="text-sm font-black text-[#000666]">Total Amount</span>
                            <p className="text-[10px] text-emerald-700 font-bold">
                              You Save ₹{totalSavings.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <span className="text-xl font-black text-[#000666]">
                            ₹{finalTotal.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setStep('shipping')}
                        className="w-full py-3.5 bg-[#000666] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#1a237e] transition-all flex items-center justify-center gap-2 mt-4"
                      >
                        <span>Proceed to Shipping</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SHIPPING & ADDRESS */}
          {step === 'shipping' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-[#f3faff] p-4 rounded-2xl border border-[#c6c5d4]/30 flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#000666]" />
                <div className="text-xs text-[#000666]">
                  <span className="font-bold">Dealora Express Superfast Delivery</span>
                  <p className="text-[#5b5f61]">Deliveries are verified and tracked in real-time with OTP security.</p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep('payment');
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#000666] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                      className="w-full p-2.5 text-xs font-medium rounded-xl border border-[#c6c5d4]/40 focus:border-[#000666] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#000666] mb-1">Email for Invoices</label>
                    <input
                      type="email"
                      required
                      value={shippingData.email}
                      onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      className="w-full p-2.5 text-xs font-medium rounded-xl border border-[#c6c5d4]/40 focus:border-[#000666] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#000666] mb-1">Mobile Phone (+91)</label>
                    <input
                      type="tel"
                      required
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      className="w-full p-2.5 text-xs font-medium rounded-xl border border-[#c6c5d4]/40 focus:border-[#000666] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#000666] mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={shippingData.pincode}
                      onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                      className="w-full p-2.5 text-xs font-medium rounded-xl border border-[#c6c5d4]/40 focus:border-[#000666] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#000666] mb-1">Street Address, House/Flat No.</label>
                  <input
                    type="text"
                    required
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    className="w-full p-2.5 text-xs font-medium rounded-xl border border-[#c6c5d4]/40 focus:border-[#000666] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#000666] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      className="w-full p-2.5 text-xs font-medium rounded-xl border border-[#c6c5d4]/40 focus:border-[#000666] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#000666] mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={shippingData.state}
                      onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                      className="w-full p-2.5 text-xs font-medium rounded-xl border border-[#c6c5d4]/40 focus:border-[#000666] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#c6c5d4]/30">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="px-4 py-2 text-xs font-bold text-[#5b5f61] hover:text-[#000666]"
                  >
                    ← Back to Bag
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#000666] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#1a237e] transition-colors flex items-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: PAYMENT & INSTANT BANK OFFERS */}
          {step === 'payment' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Bank Offer Selector */}
              <div className="p-4 rounded-2xl bg-[#e0e0ff]/40 border border-[#bdc2ff]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#000666] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#000666]" />
                    Instant Partner Bank Discount
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Auto-Checked
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MOCK_BANK_OFFERS.map((bank) => {
                    const isSelected = selectedBankOffer?.id === bank.id;
                    const discountVal = Math.min(Math.round((rawSubtotal * bank.discountPercent) / 100), bank.maxDiscount);
                    return (
                      <div
                        key={bank.id}
                        onClick={() => setSelectedBankOffer(isSelected ? null : bank)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#000666] text-white border-[#000666] shadow-sm'
                            : 'bg-white border-[#c6c5d4]/40 text-[#071e27] hover:border-[#000666]'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span>{bank.bankName}</span>
                          <span className={isSelected ? 'text-[#6ffbbe]' : 'text-emerald-700'}>
                            Save ₹{discountVal.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-1 ${isSelected ? 'text-white/80' : 'text-[#5b5f61]'}`}>
                          {bank.discountPercent}% Instant Off (Code: {bank.code})
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#000666] uppercase tracking-wider">Select Payment Method</h4>

                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#000666] bg-[#f3faff] text-[#000666]'
                        : 'border-[#c6c5d4]/30 bg-white text-[#454652]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-[#000666]"
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#000666]" />
                        <span className="text-xs font-bold">Credit / Debit Card (HDFC, ICICI, SBI, Axis, Visa, MC)</span>
                      </div>
                    </div>
                    {bankDiscountAmount > 0 && (
                      <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        ₹{bankDiscountAmount} Off Applied
                      </span>
                    )}
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#000666] bg-[#f3faff] text-[#000666]'
                        : 'border-[#c6c5d4]/30 bg-white text-[#454652]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-[#000666]"
                      />
                      <span className="text-xs font-bold">Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#5b5f61]">Zero Convenience Fee</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'emi'
                        ? 'border-[#000666] bg-[#f3faff] text-[#000666]'
                        : 'border-[#c6c5d4]/30 bg-white text-[#454652]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'emi'}
                        onChange={() => setPaymentMethod('emi')}
                        className="accent-[#000666]"
                      />
                      <span className="text-xs font-bold">No-Cost EMI (Starting at ₹{Math.round(finalTotal / 6).toLocaleString('en-IN')}/mo)</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#000666] bg-[#f3faff] text-[#000666]'
                        : 'border-[#c6c5d4]/30 bg-white text-[#454652]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#000666]"
                      />
                      <span className="text-xs font-bold">Cash / UPI on Delivery</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Final Confirmation Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#c6c5d4]/40 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-[#000666]">
                  <span>Total Payable</span>
                  <span className="text-base font-black">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-[#5b5f61]">
                  Delivering to: {shippingData.fullName}, {shippingData.city} ({shippingData.pincode})
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#c6c5d4]/30">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-2 text-xs font-bold text-[#5b5f61] hover:text-[#000666]"
                >
                  ← Back to Address
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 bg-[#000666] text-white rounded-xl text-sm font-black shadow-lg hover:bg-[#1a237e] transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#6ffbbe]" />
                  <span>Pay ₹{finalTotal.toLocaleString('en-IN')} & Place Order</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER SUCCESS & RECEIPT */}
          {step === 'success' && placedOrder && (
            <div className="max-w-xl mx-auto text-center space-y-6 py-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Dealora Verified Order
                </span>
                <h3 className="text-2xl font-black text-[#000666] mt-2">
                  Thank You, {shippingData.fullName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-[#5b5f61] mt-1">
                  Your order has been confirmed. Confirmation details sent to <strong>{shippingData.email}</strong>.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="bg-[#f3faff] p-5 rounded-2xl border border-[#c6c5d4]/30 text-left space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-[#c6c5d4]/20 pb-2">
                  <span className="font-bold text-[#000666]">Order ID</span>
                  <span className="font-extrabold text-[#000666]">{placedOrder.orderId}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5b5f61]">Status</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    {placedOrder.status}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5b5f61]">Delivery Date</span>
                  <span className="font-bold text-[#000666]">{placedOrder.estimatedDelivery}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5b5f61]">Payment Method</span>
                  <span className="font-medium text-[#000666]">{placedOrder.paymentMethod}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#c6c5d4]/20 font-bold text-[#000666]">
                  <span>Total Amount Paid</span>
                  <span className="text-sm font-black">₹{placedOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToShop();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#000666] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#1a237e] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
