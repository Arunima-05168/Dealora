import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Check,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Loader2,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { Product, ChatMessage } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';

interface AiAssistantViewProps {
  onSelectProduct: (product: Product) => void;
  initialPrompt?: string;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  onSelectProduct,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'user',
      text: 'Find the best phone under ₹30,000',
      timestamp: '10:14 AM'
    },
    {
      id: 'm-2',
      sender: 'assistant',
      text: 'Here are the top 2 smartphones under ₹30,000 based on current market value, camera performance, and historical pricing trends.',
      timestamp: '10:14 AM',
      statusVerdict: 'STRONG BUY',
      confidenceScore: 92,
      recommendedProducts: [
        MOCK_PRODUCTS.find((p) => p.id === 'oneplus-nord-ce4')!,
        MOCK_PRODUCTS.find((p) => p.id === 'nothing-phone-2a')!
      ],
      suggestedQuestions: [
        'Should I buy this laptop now?',
        'Compare these two phones',
        'Is this a good price for iPhone 17?'
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      // Find matching products from mock catalog
      const lower = query.toLowerCase();
      let matchedProducts: Product[] = [];

      if (lower.includes('phone') || lower.includes('30000') || lower.includes('oneplus') || lower.includes('nothing') || lower.includes('iphone')) {
        matchedProducts = MOCK_PRODUCTS.filter((p) => p.category === 'smartphones').slice(0, 3);
      } else if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('dell') || lower.includes('asus') || lower.includes('gaming')) {
        matchedProducts = MOCK_PRODUCTS.filter((p) => p.category === 'laptops' || p.category === 'gaming').slice(0, 3);
      } else if (lower.includes('headphone') || lower.includes('sony') || lower.includes('audio')) {
        matchedProducts = MOCK_PRODUCTS.filter((p) => p.category === 'headphones').slice(0, 2);
      } else if (lower.includes('watch') || lower.includes('samsung')) {
        matchedProducts = MOCK_PRODUCTS.filter((p) => p.category === 'smartwatches').slice(0, 2);
      } else {
        matchedProducts = MOCK_PRODUCTS.slice(0, 2);
      }

      // Call real backend Gemini proxy
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'I analyzed market trends across retailers. Here is our pricing recommendation.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        statusVerdict: data.statusVerdict || 'BUY',
        confidenceScore: data.confidenceScore || 89,
        recommendedProducts: matchedProducts.length > 0 ? matchedProducts : undefined,
        suggestedQuestions: data.suggestedQuestions || [
          'Should I buy this laptop now?',
          'Compare these three items',
          'Is this a good price?'
        ]
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error fetching chat response:', err);
      const fallbackMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: 'Based on Dealora’s verified price history across Amazon and Flipkart, current prices show steady seasonal value with average 7-12% discounts.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        statusVerdict: 'BUY',
        confidenceScore: 86,
        suggestedQuestions: ['Should I buy this laptop now?', 'Is this a good price?']
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'Should I buy this laptop now?',
    'Find the best phone under ₹30,000',
    'Compare these three laptops',
    'Is iPhone 17 a good price today?'
  ];

  return (
    <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto px-4 md:px-6 py-6 pb-32">
      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#e0e0ff] text-[#000666] px-3.5 py-1.5 rounded-full text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4 text-[#000666]" />
          <span>Dealora AI Engine Active</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000666] tracking-tight">
          Dealora AI Shopping Assistant
        </h1>
        <p className="text-xs sm:text-sm text-[#5b5f61] mt-1">
          Your personal shopping intelligence assistant analyzing millions of price points in real-time.
        </p>
      </div>

      {/* Chat Messages List */}
      <div className="flex flex-col gap-6 flex-1">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-3">
            {/* User Message */}
            {msg.sender === 'user' && (
              <div className="flex justify-end w-full">
                <div className="bg-[#e0e3e5] text-[#071e27] p-4 rounded-2xl rounded-br-sm shadow-sm max-w-[85%] border border-[#c6c5d4]/40 text-sm sm:text-base font-medium">
                  {msg.text}
                </div>
              </div>
            )}

            {/* Assistant Message */}
            {msg.sender === 'assistant' && (
              <div className="flex justify-start w-full gap-3">
                <div className="w-10 h-10 rounded-full bg-[#000666] flex items-center justify-center flex-shrink-0 shadow-md mt-1 text-white">
                  <Bot className="w-5 h-5" />
                </div>

                <div className="flex flex-col gap-4 max-w-[92%] sm:max-w-[85%]">
                  {/* AI text bubble */}
                  <div className="bg-[#e0e0ff] text-[#071e27] p-4 sm:p-5 rounded-2xl rounded-tl-sm shadow-sm border border-[#bdc2ff]/60 relative">
                    {/* Status verdict pill if available */}
                    {msg.statusVerdict && (
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded shadow-sm tracking-wider ${
                            msg.statusVerdict === 'WAIT'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {msg.statusVerdict}
                        </span>
                        {msg.confidenceScore && (
                          <span className="text-[11px] text-[#5b5f61] font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#000666]" />
                            {msg.confidenceScore}% Confidence
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                  </div>

                  {/* Product Carousel if attached */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="flex overflow-x-auto gap-4 pb-3 pt-1 snap-x snap-mandatory -mx-2 px-2 scrollbar-none">
                      {msg.recommendedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="snap-start flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl shadow-sm border border-[#c6c5d4]/40 p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-[#000666]/40 transition-all"
                        >
                          {/* Badge tag */}
                          {prod.badge && (
                            <div className="absolute top-0 right-0 bg-[#003824] text-[#6ffbbe] px-3 py-1 rounded-bl-xl text-[11px] font-bold tracking-wide shadow-sm">
                              {prod.badge}
                            </div>
                          )}

                          {/* Image */}
                          <div className="w-full h-36 bg-[#f3faff] rounded-xl relative overflow-hidden flex items-center justify-center p-2">
                            <img
                              src={prod.images[0]}
                              alt={prod.title}
                              className="object-contain w-full h-full mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          <div>
                            <h3 className="font-bold text-[#071e27] text-base leading-tight line-clamp-1">
                              {prod.title}
                            </h3>
                            <p className="text-lg font-extrabold text-[#000666] mt-1">
                              {prod.currency}{prod.price.toLocaleString('en-IN')}
                            </p>
                          </div>

                          {/* Buy Score Gauge Row */}
                          <div className="flex items-center gap-3 bg-[#f3faff] p-2.5 rounded-xl border border-[#c6c5d4]/30">
                            <div className="relative w-10 h-10 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e0e3e6" strokeWidth="3" />
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="15.5"
                                  fill="none"
                                  stroke={prod.buyScore >= 80 ? '#003824' : '#f59e0b'}
                                  strokeWidth="3"
                                  strokeDasharray="98"
                                  strokeDashoffset={98 - (prod.buyScore / 100) * 98}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-xs font-bold text-[#003824]">{prod.buyScore}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-[#5b5f61] uppercase tracking-wider">Buy Score</span>
                              <span className="text-xs font-bold text-[#003824]">{prod.buyVerdict}</span>
                            </div>
                          </div>

                          {/* Why this checklist */}
                          <div className="flex-1">
                            <h4 className="text-[11px] font-bold text-[#5b5f61] uppercase tracking-wider mb-1.5">
                              Why this?
                            </h4>
                            <ul className="space-y-1 text-xs text-[#454652]">
                              {prod.whyThis.slice(0, 2).map((reason, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-[#000666] mt-0.5 flex-shrink-0 font-bold" />
                                  <span className="line-clamp-1">{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <button
                            onClick={() => onSelectProduct(prod)}
                            className="w-full bg-[#000666] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#1a237e] transition-colors shadow-sm mt-1"
                          >
                            View Details
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#000666] flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-[#e0e0ff] p-4 rounded-2xl rounded-tl-sm border border-[#bdc2ff]/60 flex items-center gap-2 text-sm text-[#000666] font-semibold">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Dealora AI is analyzing pricing trends across retailers...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap gap-2.5 mt-6 justify-center md:justify-start">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-4 py-2 bg-white rounded-full border border-[#c6c5d4]/40 text-xs font-semibold text-[#454652] hover:bg-[#e0e0ff] hover:text-[#000666] hover:border-[#000666]/30 transition-all shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Floating Prompt Input Bar */}
      <div className="fixed bottom-16 md:bottom-4 left-0 w-full z-40 bg-gradient-to-t from-[#f3faff] via-[#f3faff]/90 to-transparent pt-6 pb-2 px-4 md:px-8 pointer-events-none">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="max-w-3xl mx-auto relative shadow-xl rounded-full overflow-hidden bg-white/95 backdrop-blur-xl border border-[#c6c5d4]/50 pointer-events-auto flex items-center"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Dealora AI (e.g. Find best laptop under ₹70,000)..."
            className="w-full pl-6 pr-14 py-4 bg-transparent border-none focus:outline-none text-[#071e27] text-sm sm:text-base placeholder-[#5b5f61]"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-11 h-11 bg-[#000666] text-white rounded-full flex items-center justify-center hover:bg-[#1a237e] disabled:opacity-40 transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
