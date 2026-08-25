import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'iphone-17-256gb',
    title: 'Apple iPhone 17 (256GB)',
    subtitle: 'Midnight Black • Super Retina XDR OLED • A19 Bionic',
    category: 'smartphones',
    brand: 'Apple',
    price: 79999,
    originalPrice: 84900,
    discountPercent: 6,
    currency: '₹',
    buyScore: 87,
    buyVerdict: 'Strong Buy',
    buyAdvice: 'Current price is 8% below the 90-day average. Strong buy recommendation from our AI models.',
    rating: 4.8,
    reviewCount: 2150,
    badge: 'Trending Deal',
    storageOptions: ['128GB', '256GB', '512GB'],
    colorOptions: ['Midnight Black', 'Starlight Silver', 'Deep Titanium', 'Desert Gold'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCq6zyPHrGus-Mibo_VYBYFfzGELPRerC59YVljAhkM4CCBJ1VtnTs19l9e29ju6pirun2af1O8j0Yckxn6pNflKcG2wiH_hANtXxS8af8GFeV-XZHnWGXN2x4VSaP80XGkvRKeGbbhqpKR41CXC4fHPx0P0oofgRu5YwzppEGa7FNEGuAWwkEL5Q3nam8z_Bsa5Bs6q64s-1CHiInfUj-04mAYj4otmgD71eYBxxpljlxvt4oUp7HD5w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLXf2zOSo9euttjPIhdJuBXWyzJZCpOy_tFkA9zCpiP571rb9p8097IyPl4as8Oyt_Qb6aTk0oY5qTCc0jAGh062uQ6puLIavJJn8P2Wmw7RIsWgAcF8mTFBXhNZR6460ICjuhI79DDtnc-qocYGlmG2RQiSmcssjS6RSbUtmZYCxnRydqJCR6oq5vARIAM0IW_s7cRi5NWDEvwjsSL3caYRC3ti0-sCE_8mJfLeKbTBjYG-lwqzZKSw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiWl68MDR2iI6_Ljcuwz53UtVV9_PNTIUQGtnIX5G_p2K1L2CXmF0-tuotjG1Fus6KlgolseEXwO2ovvMZvPn30jGw24sxrNfpsNTo8zQ-VtimzxlYdsp-0C-DKEBrwdWkTdQi_pSI3gS5pQtE0cb_fGtSw7mJP1oJ6ZB20kz8nwWejnkKk05nUP9aXEOrOjKbeSSZXQMTpJDYYLw9ASc5mmE2Z-QZ8u0qKukOxTBdcGzmDFK7nwOh6A',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCouUFP-LYBsAtJYtbLeOPz2HwhKq3XLRC6cwufpHPFQDBeiyfQWleaZLOPFs5Hp4MDhc0jlew3yxGYGVHQzMDymNCJawbNAi5mLJzGE5meUOISrZ0vQ5IvVw89nfM66dru8PkMKb5J7Plgz8QtNlq_DAebmLPiCvdFgZLMt8JQIiAY0dIzZuM9z0sQsqqDXwWV6ctzvP3SXL_1umZOkAvzoRRB7PBnjaxrPhJWoFHqN0c3AoKw3VhYVg'
    ],
    whyThis: [
      'Current price is near historical low',
      '120Hz ProMotion display upgrade',
      'A19 Bionic chip with next-gen Neural Engine',
      'Class-leading 48MP triple camera setup'
    ],
    retailers: [
      {
        id: 'amz-1',
        name: 'Amazon',
        shortCode: 'A',
        logoColor: '#FF9900',
        price: 79999,
        delivery: 'Free Next-Day Delivery',
        inStock: true,
        url: 'https://amazon.in',
        badge: 'Lowest Price Today',
        couponDiscount: 1500
      },
      {
        id: 'fk-1',
        name: 'Flipkart',
        shortCode: 'F',
        logoColor: '#047BD5',
        price: 78999,
        delivery: '+ ₹99 Delivery',
        inStock: true,
        url: 'https://flipkart.com',
        badge: 'Instant Bank Offer'
      },
      {
        id: 'cro-1',
        name: 'Croma',
        shortCode: 'C',
        logoColor: '#128C7E',
        price: 80499,
        delivery: 'Out of Stock',
        inStock: false,
        url: 'https://croma.com'
      },
      {
        id: 'rel-1',
        name: 'Reliance Digital',
        shortCode: 'R',
        logoColor: '#E42529',
        price: 81990,
        delivery: 'Store Pickup Available',
        inStock: true,
        url: 'https://reliancedigital.in'
      }
    ],
    priceHistory: {
      lowest90d: 76999,
      average90d: 83500,
      highest90d: 84900,
      priceTrend: 'dropping',
      period30d: [
        { date: 'Aug 01', price: 83990 },
        { date: 'Aug 07', price: 82500 },
        { date: 'Aug 14', price: 81999 },
        { date: 'Aug 19', price: 80499 },
        { date: 'Aug 25', price: 79999 }
      ],
      period90d: [
        { date: 'Jun 01', price: 84900 },
        { date: 'Jun 20', price: 84900 },
        { date: 'Jul 10', price: 83500 },
        { date: 'Jul 28', price: 76999, label: 'Lowest' },
        { date: 'Aug 10', price: 82990 },
        { date: 'Aug 25', price: 79999, label: 'Current' }
      ],
      period1y: [
        { date: 'Sep 25', price: 84900 },
        { date: 'Nov 25', price: 82990 },
        { date: 'Jan 26', price: 79999 },
        { date: 'Apr 26', price: 78500 },
        { date: 'Jul 26', price: 76999 },
        { date: 'Aug 26', price: 79999 }
      ]
    },
    aiReviewSummary: {
      sentimentScore: 94,
      totalAnalyzed: 1240,
      highlights: [
        { topic: 'Display', text: 'Class-leading OLED panel with 120Hz refresh rate, excellent color accuracy in direct sunlight.' },
        { topic: 'Performance', text: 'Next-gen silicon handles heavy multitasking and gaming without thermal throttling.' },
        { topic: 'Battery Life', text: 'Comfortably lasts a full day of heavy usage, a significant upgrade from previous generation.' }
      ],
      considerations: [
        { topic: 'Accessories', text: 'Does not include a fast charging brick in the standard box.' },
        { topic: 'Charging Speed', text: 'Wired charging maxes out at 30W, lagging slightly behind Android flagships.' }
      ]
    },
    specs: [
      { label: 'Display', value: '6.3-inch Super Retina XDR OLED, 120Hz ProMotion' },
      { label: 'Processor', value: 'Apple A19 Bionic (3nm architecture)' },
      { label: 'Camera', value: '48MP Main + 48MP Ultra-wide + 12MP Telephoto' },
      { label: 'Battery', value: 'Up to 26 hours video playback' },
      { label: 'OS', value: 'iOS 19 with Apple Intelligence' }
    ]
  },
  {
    id: 'oneplus-nord-ce4',
    title: 'OnePlus Nord CE4 5G',
    subtitle: 'Dark Chrome • 8GB RAM + 128GB Storage • 100W SUPERVOOC',
    category: 'smartphones',
    brand: 'OnePlus',
    price: 24999,
    originalPrice: 26999,
    discountPercent: 7,
    currency: '₹',
    buyScore: 92,
    buyVerdict: 'Strong Buy',
    buyAdvice: 'Exceptional value in the under-₹30k segment with 100W flash charging and smooth 120Hz AMOLED.',
    rating: 4.6,
    reviewCount: 4320,
    badge: 'Best Value',
    storageOptions: ['128GB', '256GB'],
    colorOptions: ['Celadon Marble', 'Dark Chrome'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOWh-hQssGC64cdukR5t-og80EjqgW06ZhIdbF8183nyljpsfvJTRcKZQNR-XQCq-8darxKQWPYloY8sIetiOi9O_GW-M9BbadGbaVHx0Zlzj_KhWEwEAB9TD6X8TAeGmfGdkmJl4p9hbyajuCM1GCQ66kwnC9ojtuwsDIOix5FOJ5DzXHYxsTujThSWCk82ZG0XTSPF5vUHRYRGnM2ygR824uTmRbMmD_JTbJ-vaN0CZao95tE9_MJQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAYWWPGHHWFS3wqQqAr-ZpptRIVKDhBfacubfLsK8XmSUiFdpBeZ3G1u56rpCz3JYZFgZme7aqcqnNLA2l4W_qJmtV-_sUazTMEGt6JIcWXl_CLbTGT6dA-5BX5VVTkQ45Jz72Di4XOX63MLzLmYxXSYhZKFMay7kRW0wdkKF5hvBMBq7PcyKEua8Z7Qzzob0ppkhqwtvtiRzQ8xMQr5zSbMyqCDDOSVvEgL5YP52sp-rtcIJUgeDGHA'
    ],
    whyThis: [
      '100W SUPERVOOC charging (1-100% in 29 mins)',
      'Snapdragon 7 Gen 3 processor for lag-free gaming',
      'Clean OxygenOS without bloatware',
      'Massive 5500mAh battery'
    ],
    retailers: [
      { id: 'amz-ce4', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 24999, delivery: 'Free Prime Delivery', inStock: true, url: 'https://amazon.in' },
      { id: 'fk-ce4', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 24999, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com' },
      { id: 'oneplus-ce4', name: 'OnePlus Store', shortCode: 'O', logoColor: '#EB0028', price: 24999, delivery: 'Free Earbuds included', inStock: true, url: 'https://oneplus.in' }
    ],
    priceHistory: {
      lowest90d: 23999,
      average90d: 25499,
      highest90d: 26999,
      priceTrend: 'stable',
      period30d: [{ date: 'Aug 01', price: 25999 }, { date: 'Aug 15', price: 24999 }, { date: 'Aug 25', price: 24999 }],
      period90d: [{ date: 'Jun 01', price: 26999 }, { date: 'Jul 15', price: 23999 }, { date: 'Aug 25', price: 24999 }],
      period1y: [{ date: 'May 25', price: 26999 }, { date: 'Aug 25', price: 24999 }]
    },
    aiReviewSummary: {
      sentimentScore: 92,
      totalAnalyzed: 890,
      highlights: [
        { topic: 'Battery & Charging', text: '100W charging fills the battery in under 30 minutes with exceptional stamina.' },
        { topic: 'Software', text: 'OxygenOS 14 is lightweight, smooth, and provides 2+3 years of updates.' }
      ],
      considerations: [
        { topic: 'Cameras', text: 'Low-light photography is average; lacks a dedicated telephoto lens.' }
      ]
    },
    specs: [
      { label: 'Chipset', value: 'Snapdragon 7 Gen 3' },
      { label: 'Display', value: '6.7-inch 120Hz Fluid AMOLED' },
      { label: 'Battery', value: '5500 mAh + 100W Fast Charge' },
      { label: 'Camera', value: '50MP Sony LYT-600 with OIS' }
    ]
  },
  {
    id: 'nothing-phone-2a',
    title: 'Nothing Phone (2a) 5G',
    subtitle: 'Milk White • 8GB RAM + 128GB • Glyph Interface',
    category: 'smartphones',
    brand: 'Nothing',
    price: 25999,
    originalPrice: 27999,
    discountPercent: 7,
    currency: '₹',
    buyScore: 88,
    buyVerdict: 'Buy Now',
    buyAdvice: 'Iconic transparent design with Glyph lights, refined Nothing OS, and balanced Dimensity 7200 Pro chipset.',
    rating: 4.5,
    reviewCount: 3100,
    badge: 'Design Choice',
    storageOptions: ['128GB', '256GB'],
    colorOptions: ['Black', 'Milk White', 'Special Edition'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCEp3BbbOxB_CUaDIT8Njp_P5eTXqGWgvwAbsO4lYply9sFZyELqXOao6Yp5fGLxkd5mpjQReyx4qg60JtL2vXyMbrso4qPOZw50H_oN7y3Za4dQAZ98QXpboIVflXmbMfApKPKIQflWNGaq9X2_D8AEwa5HvBjght1eeR0PulgUR-Q5JJmBvYLhsitEs-CuogpCQ9gx_9wj8RvdxTQmvoPlGVqWYYkYLdtgrm3J9LaZNmR5S4xx2jV8Q',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAH79wqtb2OPkWX8R2n9uPkByNx2fZQgz-izcd0BunVCVHn_B5RVFqcPmuFuheLUp5e0rjseADIrPifbRpSrpZ8Nn_F-3Zab5DjywFSaG8ILny5PGH7W1iqcZU7USj9eKtILpFZhQrmbTMBZNxlAnRDXJjF5oicp7bPveA4mt3_RYS8ygifaBvq676wM0Ae3FLTfcCttY5NuFcr0f6-EvDaxRbYV4dUBbP3PT715uE4sUkGzD7jwQHzZQ'
    ],
    whyThis: [
      'Unique transparent back aesthetic with Glyph LEDs',
      'Nothing OS 2.5 is super fast and clean',
      'Dual 50MP rear camera with optical stabilization',
      'Symmetrical razor-thin bezels'
    ],
    retailers: [
      { id: 'fk-np2a', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 25999, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com', badge: 'Exclusive Deal' },
      { id: 'cro-np2a', name: 'Croma', shortCode: 'C', logoColor: '#128C7E', price: 26499, delivery: 'In Stock', inStock: true, url: 'https://croma.com' }
    ],
    priceHistory: {
      lowest90d: 24999,
      average90d: 26200,
      highest90d: 27999,
      priceTrend: 'dropping',
      period30d: [{ date: 'Aug 01', price: 26999 }, { date: 'Aug 15', price: 25999 }, { date: 'Aug 25', price: 25999 }],
      period90d: [{ date: 'Jun 01', price: 27999 }, { date: 'Jul 20', price: 24999 }, { date: 'Aug 25', price: 25999 }],
      period1y: [{ date: 'Apr 25', price: 27999 }, { date: 'Aug 25', price: 25999 }]
    },
    aiReviewSummary: {
      sentimentScore: 89,
      totalAnalyzed: 940,
      highlights: [
        { topic: 'Design & OS', text: 'Standout industrial design with unique Glyph lights and zero bloatware OS.' },
        { topic: 'Display', text: 'Vibrant 10-bit AMOLED panel with balanced symmetrical bezels.' }
      ],
      considerations: [
        { topic: 'Plastic Build', text: 'Back panel is polycarbonate which scratches more easily than glass.' }
      ]
    },
    specs: [
      { label: 'Processor', value: 'MediaTek Dimensity 7200 Pro (4nm)' },
      { label: 'Display', value: '6.7-inch Flexible AMOLED, 120Hz' },
      { label: 'Camera', value: '50MP Main (OIS) + 50MP Ultra-wide' },
      { label: 'Battery', value: '5000 mAh, 45W Fast Charging' }
    ]
  },
  {
    id: 'iphone-16-pro',
    title: 'Apple iPhone 16 Pro (256GB)',
    subtitle: 'Natural Titanium • 48MP Fusion Camera • A18 Pro Chip',
    category: 'smartphones',
    brand: 'Apple',
    price: 114900,
    originalPrice: 134900,
    discountPercent: 15,
    currency: '₹',
    buyScore: 92,
    buyVerdict: 'Strong Buy',
    buyAdvice: 'Price has dropped ₹20,000 from launch! One of the best times to upgrade to Pro titanium hardware.',
    rating: 4.9,
    reviewCount: 4180,
    badge: '15% Off',
    storageOptions: ['128GB', '256GB', '512GB', '1TB'],
    colorOptions: ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Desert Titanium'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYVQpt5WjQx-0lgmUnt5YhjT6xWuPk2z2KLfEZPLZxnOW8FwsBl8nn4x_dRFq6Sv2j3nq3lBX1UyKOX-44N3DXEua2-W9sfZO9O71qJNRPcs6T6r4oty_UbiMoGKVsy9tf8ebZzsbls2sTZh-ts3D35Cu_8Y4VdxnGHHWqzIVZ18JREV17y4CZ8yjkB4pt1-5OPRqxZR6sf5kLhRB10sjx4sWBEgwWKu_AGhR4ShxioP2AOu7CTB4Iaw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC29s7KBv99RX4VYsMlePrgElQu1m77slF6Jb_D9crXahqDaKjPrXL9SfGP4b11cgYuYO6nTlOtYXtgKHgLAc6BQ-7AhYipJXWvDVpgjBkmvu6SI4LpX9lTbIp0wfpbee3r_Sz7jipVfHjjGRv-3vgP8hc-xMyWPdWZXndKexcqWVgxqFvMn--gx0BQpMjNnxrU58FdFPGZkCZEwiGFvXtEYZ4Tsu2YJa3oSCTf9__WkCifguqozvkJXQ'
    ],
    whyThis: [
      '15% price cut brings titanium pro features within reach',
      '5x optical zoom tetraprism lens',
      'Apple Intelligence with 16-core Neural Engine',
      'Action Button + dedicated Camera Control'
    ],
    retailers: [
      { id: 'amz-16p', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 114900, delivery: 'Free Express Delivery', inStock: true, url: 'https://amazon.in', badge: 'Save ₹20,000' },
      { id: 'fk-16p', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 115900, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com' },
      { id: 'cro-16p', name: 'Croma', shortCode: 'C', logoColor: '#128C7E', price: 117900, delivery: 'In-store Pickup', inStock: true, url: 'https://croma.com' }
    ],
    priceHistory: {
      lowest90d: 114900,
      average90d: 124500,
      highest90d: 134900,
      priceTrend: 'dropping',
      period30d: [{ date: 'Aug 01', price: 122900 }, { date: 'Aug 14', price: 118900 }, { date: 'Aug 25', price: 114900 }],
      period90d: [{ date: 'Jun 01', price: 134900 }, { date: 'Jul 15', price: 124900 }, { date: 'Aug 25', price: 114900, label: 'Lowest' }],
      period1y: [{ date: 'Sep 25', price: 134900 }, { date: 'Jan 26', price: 129900 }, { date: 'Aug 26', price: 114900 }]
    },
    aiReviewSummary: {
      sentimentScore: 96,
      totalAnalyzed: 3400,
      highlights: [
        { topic: 'Camera Capabilities', text: '48MP Fusion and 5x optical telephoto provide DSLR-rivaling portraits and 4K 120fps video.' },
        { topic: 'Ergonomics', text: 'Grade 5 Titanium frame makes the device significantly lighter and comfortable to hold.' }
      ],
      considerations: [
        { topic: 'AI Rollout', text: 'Some advanced Siri and vision features roll out gradually with software updates.' }
      ]
    },
    specs: [
      { label: 'Display', value: '6.3-inch Super Retina XDR OLED, 2000 nits peak' },
      { label: 'Processor', value: 'A18 Pro chip with 6-core GPU' },
      { label: 'Camera', value: '48MP Main + 48MP Ultra-wide + 12MP 5x Telephoto' },
      { label: 'Weight', value: '199 grams' }
    ]
  },
  {
    id: 'sony-wh1000xm6',
    title: 'Sony WH-1000XM6 Wireless Headphones',
    subtitle: 'Active Noise Cancelling • Hi-Res LDAC • 40hr Battery',
    category: 'headphones',
    brand: 'Sony',
    price: 23490,
    originalPrice: 29990,
    discountPercent: 22,
    currency: '₹',
    buyScore: 88,
    buyVerdict: 'Buy Now',
    buyAdvice: '22% off for flagship noise-cancelling headphones. Unbeatable soundstage and multi-point connectivity.',
    rating: 4.8,
    reviewCount: 3890,
    badge: '22% Off',
    colorOptions: ['Matte Black', 'Silver Cloud', 'Midnight Navy'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBw11yoZxQ-j2yE1FYSZDPKUrTPnkDecbjUC3__TSjes01GGyd_y2VkbWgQblo3gTVDaf8NeNU0rGMiiADCF9xJBWeHSqgqbrRS2QE4DAyG9axG0EA4_Fkh39R_v1wO4obOF0_frTulfd441G35u-2IDAD9BAuQpcTWagQBCKEaXvel6YzQYxuiY16pqR8bESrRTZNwn8MSl3JQsZ0oFWHb6kmgU-udpTOaq2koeChpHDfRlitCZu_biA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb7biiW7dtLJqRVyH34Bmfkf0zAVpfwJ3Tk8iXAk1AlaZYCZfd-1cWQwJ8DPE7SVZCsTrdFTerw7-TgZV9XKudgRMoLTuJupwPxk_5OdpWw8DPtQTgVhxyOB-5JydOyYk81Ecsd-aplNnOhnhFWGxHKM77hvxVdUbjMxzKrfCWkWIDEC1wfo0bbwEw4Rk4l86cm9eIuf9vCoL_4UGBKo-iQwxBGEci7Rn-vS1aLXMkySVbDhdT_GP_Lg'
    ],
    whyThis: [
      'Best-in-class HD Noise Cancelling Processor QN2',
      'Ultra-comfortable memory foam earcups for all-day listening',
      'Speak-to-Chat & Multipoint Bluetooth 5.4',
      'Quick charge: 3 mins gives 3 hours playback'
    ],
    retailers: [
      { id: 'amz-sony', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 23490, delivery: 'Free One-Day', inStock: true, url: 'https://amazon.in', badge: 'Best Seller' },
      { id: 'fk-sony', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 24490, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com' },
      { id: 'rel-sony', name: 'Reliance Digital', shortCode: 'R', logoColor: '#E42529', price: 24990, delivery: 'Store Pickup Available', inStock: true, url: 'https://reliancedigital.in' }
    ],
    priceHistory: {
      lowest90d: 22990,
      average90d: 27490,
      highest90d: 29990,
      priceTrend: 'dropping',
      period30d: [{ date: 'Aug 01', price: 28990 }, { date: 'Aug 12', price: 25490 }, { date: 'Aug 25', price: 23490 }],
      period90d: [{ date: 'Jun 01', price: 29990 }, { date: 'Jul 18', price: 22990 }, { date: 'Aug 25', price: 23490 }],
      period1y: [{ date: 'Sep 25', price: 29990 }, { date: 'Jan 26', price: 27990 }, { date: 'Aug 26', price: 23490 }]
    },
    aiReviewSummary: {
      sentimentScore: 95,
      totalAnalyzed: 1900,
      highlights: [
        { topic: 'Noise Cancellation', text: 'Mutes airplane cabin roar and bustling open office noise effortlessly.' },
        { topic: 'Microphone Quality', text: 'AI beamforming mics isolate voice crystal clear even in windy conditions.' }
      ],
      considerations: [
        { topic: 'Case Bulk', text: 'Fold-flat case is slightly bulkier than competing Bose models.' }
      ]
    },
    specs: [
      { label: 'Battery Life', value: 'Up to 40 hours with ANC on' },
      { label: 'Drivers', value: '30mm carbon fiber precision drivers' },
      { label: 'Codecs', value: 'LDAC, AAC, SBC, LC3' },
      { label: 'Weight', value: '250g' }
    ]
  },
  {
    id: 'lg-c4-55-oled',
    title: 'LG C4 55" 4K OLED evo Smart TV',
    subtitle: 'α9 AI Processor Gen7 • 144Hz G-Sync • Dolby Vision & Atmos',
    category: 'tvs',
    brand: 'LG',
    price: 104990,
    originalPrice: 149990,
    discountPercent: 30,
    currency: '₹',
    buyScore: 65,
    buyVerdict: 'Average',
    buyAdvice: 'Good discount now, but festival sales often bring this down to ₹94,990. Consider waiting if not urgent.',
    rating: 4.7,
    reviewCount: 1240,
    badge: '30% Off',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC63YSgGFDgYCWiMpTTxUtfN17CUIdMb4fAG0gemP0RCvin37RrJmSVAu2uXBNhciR1PqeG5TYy77vriyEHX1LpdrLHb8jswFdgQb8F7b1Vd0nvWgCK8C-UYgM2o7mvY0lYIP2r8YbSqyX4kXps1SboIE6eXKp1gwR_2Oq_L2y4tmDpyZmyLdRGcDUf347YTJqype9a2RXOflZMej_t8JjDSaT7CFDgvOUbcfydb0Nt4nvqyn7GA6PoEw'
    ],
    whyThis: [
      'Infinite contrast with self-lit OLED pixels',
      '144Hz variable refresh rate for PS5 & PC Gaming',
      'α9 AI Processor 4K Gen7 with AI Picture Pro',
      '4x full bandwidth HDMI 2.1 ports'
    ],
    retailers: [
      { id: 'amz-lg', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 104990, delivery: 'Free Scheduled Delivery & Install', inStock: true, url: 'https://amazon.in' },
      { id: 'fk-lg', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 106990, delivery: 'Free Installation', inStock: true, url: 'https://flipkart.com' },
      { id: 'cro-lg', name: 'Croma', shortCode: 'C', logoColor: '#128C7E', price: 108990, delivery: 'Out of Stock in some pincodes', inStock: false, url: 'https://croma.com' }
    ],
    priceHistory: {
      lowest90d: 98990,
      average90d: 112000,
      highest90d: 149990,
      priceTrend: 'stable',
      period30d: [{ date: 'Aug 01', price: 109990 }, { date: 'Aug 15', price: 104990 }, { date: 'Aug 25', price: 104990 }],
      period90d: [{ date: 'Jun 01', price: 149990 }, { date: 'Jul 10', price: 98990 }, { date: 'Aug 25', price: 104990 }],
      period1y: [{ date: 'May 25', price: 149990 }, { date: 'Aug 25', price: 104990 }]
    },
    aiReviewSummary: {
      sentimentScore: 91,
      totalAnalyzed: 650,
      highlights: [
        { topic: 'Picture Quality', text: 'True black levels with vibrant HDR specular highlights.' },
        { topic: 'Gaming Response', text: 'Ultra-low 0.1ms response time with 4x 144Hz HDMI 2.1 ports.' }
      ],
      considerations: [
        { topic: 'Audio', text: 'Built-in speakers are adequate; a dedicated soundbar is recommended for cinema room.' }
      ]
    },
    specs: [
      { label: 'Screen Size', value: '55-inch (139 cm)' },
      { label: 'Panel Type', value: '4K OLED evo' },
      { label: 'Refresh Rate', value: 'Native 144Hz' },
      { label: 'HDR Formats', value: 'Dolby Vision / HDR10 / HLG' }
    ]
  },
  {
    id: 'samsung-galaxy-watch-6',
    title: 'Samsung Galaxy Watch 6 (44mm Bluetooth)',
    subtitle: 'BioActive Sensor • Sleep Coaching • Sapphire Crystal',
    category: 'smartwatches',
    brand: 'Samsung',
    price: 18990,
    originalPrice: 24990,
    discountPercent: 24,
    currency: '₹',
    buyScore: 91,
    buyVerdict: 'Strong Buy',
    buyAdvice: '24% price slash makes this the premier WearOS smartwatch for Android users right now.',
    rating: 4.6,
    reviewCount: 2780,
    badge: 'Trending Drop -24%',
    trendingDrop: 24,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb7biiW7dtLJqRVyH34Bmfkf0zAVpfwJ3Tk8iXAk1AlaZYCZfd-1cWQwJ8DPE7SVZCsTrdFTerw7-TgZV9XKudgRMoLTuJupwPxk_5OdpWw8DPtQTgVhxyOB-5JydOyYk81Ecsd-aplNnOhnhFWGxHKM77hvxVdUbjMxzKrfCWkWIDEC1wfo0bbwEw4Rk4l86cm9eIuf9vCoL_4UGBKo-iQwxBGEci7Rn-vS1aLXMkySVbDhdT_GP_Lg'
    ],
    whyThis: [
      '24% price reduction (Save ₹6,000)',
      'Advanced ECG, Blood Pressure & Body Composition',
      'Slimmer bezel with 20% larger AMOLED screen',
      'Seamless WearOS with Google Maps and Wallet'
    ],
    retailers: [
      { id: 'amz-gw6', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 18990, delivery: 'Free Prime Delivery', inStock: true, url: 'https://amazon.in', badge: '₹6,000 Off' },
      { id: 'fk-gw6', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 19490, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com' },
      { id: 'sam-gw6', name: 'Samsung Store', shortCode: 'S', logoColor: '#1428A0', price: 18990, delivery: 'Free Extra Strap', inStock: true, url: 'https://samsung.com' }
    ],
    priceHistory: {
      lowest90d: 18490,
      average90d: 22490,
      highest90d: 24990,
      priceTrend: 'dropping',
      period30d: [{ date: 'Aug 01', price: 23990 }, { date: 'Aug 14', price: 19990 }, { date: 'Aug 25', price: 18990 }],
      period90d: [{ date: 'Jun 01', price: 24990 }, { date: 'Jul 20', price: 18490 }, { date: 'Aug 25', price: 18990 }],
      period1y: [{ date: 'Oct 25', price: 24990 }, { date: 'Aug 26', price: 18990 }]
    },
    aiReviewSummary: {
      sentimentScore: 93,
      totalAnalyzed: 1420,
      highlights: [
        { topic: 'Health Tracking', text: 'Accurate sleep stage breakdown and comprehensive body fat measurement.' },
        { topic: 'Display', text: 'Sapphire glass screen is highly scratch-resistant and crystal clear.' }
      ],
      considerations: [
        { topic: 'Battery', text: 'Daily charging required when Always-On Display is active.' }
      ]
    },
    specs: [
      { label: 'Display', value: '1.5-inch Super AMOLED (480x480)' },
      { label: 'Sensors', value: 'Samsung BioActive (Optical + Electrical + BIA)' },
      { label: 'Durability', value: '5ATM + IP68 / MIL-STD-810H' },
      { label: 'OS', value: 'Wear OS Powered by Samsung' }
    ]
  },
  {
    id: 'asus-rog-zephyrus-g14',
    title: 'ASUS ROG Zephyrus G14 Gaming Laptop',
    subtitle: 'AMD Ryzen 9 8945HS • RTX 4070 • 32GB RAM • 3K 120Hz OLED',
    category: 'gaming',
    brand: 'ASUS',
    price: 134990,
    originalPrice: 155990,
    discountPercent: 13,
    currency: '₹',
    buyScore: 90,
    buyVerdict: 'Strong Buy',
    buyAdvice: 'Rare discount on the golden standard of compact gaming laptops. Outstanding 3K OLED & CNC aluminum build.',
    rating: 4.8,
    reviewCount: 780,
    badge: 'Trending Drop -13%',
    trendingDrop: 13,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAubIeMe0Zrm46xxlTdUfyGcPQDNV-FfwYk9-zHLe-Ns_8hgcuf-i0k_pmKsCEp10zqnlxfN6uzrzgJzGh4XWHsfB15PmCsULDvwxcsfJ8eUU4AQx1jf5dt6fvUxQwBSfJAo1OweuDIVsW2jZJqsHsULlzekUbshVqRkajZopqQ0xrD7RYgtSm1YS8Tc66PzHy-lZXjKOJmFfduOIZqFx6i2YNlZpm3b-TOAfU6GrBXcjWOozbuqYHBxA'
    ],
    whyThis: [
      'CNC aluminum chassis weighs just 1.5kg',
      'Gorgeous ROG Nebula 3K 120Hz OLED display with 0.2ms response',
      'NVIDIA GeForce RTX 4070 (90W TGP)',
      'Long 9-10 hour productivity battery life'
    ],
    retailers: [
      { id: 'amz-rog', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 134990, delivery: 'Free Express Delivery', inStock: true, url: 'https://amazon.in', badge: 'Save ₹21,000' },
      { id: 'fk-rog', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 136490, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com' },
      { id: 'cro-rog', name: 'Croma', shortCode: 'C', logoColor: '#128C7E', price: 139990, delivery: 'In Stock', inStock: true, url: 'https://croma.com' }
    ],
    priceHistory: {
      lowest90d: 134990,
      average90d: 147500,
      highest90d: 155990,
      priceTrend: 'dropping',
      period30d: [{ date: 'Aug 01', price: 149990 }, { date: 'Aug 14', price: 139990 }, { date: 'Aug 25', price: 134990 }],
      period90d: [{ date: 'Jun 01', price: 155990 }, { date: 'Jul 25', price: 145990 }, { date: 'Aug 25', price: 134990, label: 'Lowest' }],
      period1y: [{ date: 'Mar 25', price: 155990 }, { date: 'Aug 25', price: 134990 }]
    },
    aiReviewSummary: {
      sentimentScore: 94,
      totalAnalyzed: 510,
      highlights: [
        { topic: 'Display & Build', text: 'OLED panel provides breath-taking contrast; CNC aluminum shell feels like a MacBook Pro.' },
        { topic: 'Speakers', text: 'Quad-speaker array produces punchy bass and expansive stereo separation.' }
      ],
      considerations: [
        { topic: 'Soldered RAM', text: 'Memory is soldered LPDDR5X, so pick 32GB upfront.' }
      ]
    },
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 9 8945HS (8 Cores / 16 Threads)' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 4070 (8GB GDDR6)' },
      { label: 'Display', value: '14" 3K (2880 x 1800) OLED 120Hz, 500 nits' },
      { label: 'Weight', value: '1.50 kg (3.31 lbs)' }
    ]
  },
  {
    id: 'dell-xps-15',
    title: 'Dell XPS 15 9530 Laptop',
    subtitle: '13th Gen Intel Core i7-13700H • RTX 4050 • 16GB RAM • 512GB SSD',
    category: 'laptops',
    brand: 'Dell',
    price: 154990,
    originalPrice: 169990,
    discountPercent: 9,
    currency: '₹',
    buyScore: 58,
    buyVerdict: 'Wait',
    buyAdvice: 'The current price is 8% above its 90-day average. Historical data suggests a drop is likely next week during the upcoming sale event. I recommend waiting.',
    rating: 4.4,
    reviewCount: 650,
    badge: 'Price Alert: Wait',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAubIeMe0Zrm46xxlTdUfyGcPQDNV-FfwYk9-zHLe-Ns_8hgcuf-i0k_pmKsCEp10zqnlxfN6uzrzgJzGh4XWHsfB15PmCsULDvwxcsfJ8eUU4AQx1jf5dt6fvUxQwBSfJAo1OweuDIVsW2jZJqsHsULlzekUbshVqRkajZopqQ0xrD7RYgtSm1YS8Tc66PzHy-lZXjKOJmFfduOIZqFx6i2YNlZpm3b-TOAfU6GrBXcjWOozbuqYHBxA'
    ],
    whyThis: [
      'Stunning InfinityEdge display',
      'Solid CNC machined aluminum chassis with carbon fiber palm rest',
      'Reliable creator performance for video editing',
      'Expected to discount by ~₹15,000 in upcoming seasonal sale'
    ],
    retailers: [
      { id: 'amz-dell', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 154990, delivery: 'Free Standard Delivery', inStock: true, url: 'https://amazon.in' },
      { id: 'fk-dell', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 156990, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com' },
      { id: 'dell-direct', name: 'Dell Official', shortCode: 'D', logoColor: '#0076CE', price: 154990, delivery: 'Free Shipping', inStock: true, url: 'https://dell.com' }
    ],
    priceHistory: {
      lowest90d: 139990,
      average90d: 143500,
      highest90d: 169990,
      priceTrend: 'rising',
      period30d: [{ date: 'Aug 01', price: 144990 }, { date: 'Aug 15', price: 151990 }, { date: 'Aug 25', price: 154990 }],
      period90d: [{ date: 'Jun 01', price: 169990 }, { date: 'Jul 10', price: 139990, label: 'Lowest' }, { date: 'Aug 25', price: 154990, label: 'Current (High)' }],
      period1y: [{ date: 'Jan 26', price: 169990 }, { date: 'Jul 26', price: 139990 }, { date: 'Aug 26', price: 154990 }]
    },
    aiReviewSummary: {
      sentimentScore: 82,
      totalAnalyzed: 420,
      highlights: [
        { topic: 'Design & Build', text: 'Classic minimalist aluminum chassis with expansive glass trackpad.' }
      ],
      considerations: [
        { topic: 'Thermals', text: 'Fans get loud during heavy CPU rendering loads.' },
        { topic: 'Price Timing', text: 'Currently marked up compared to last month sale.' }
      ]
    },
    specs: [
      { label: 'CPU', value: 'Intel Core i7-13700H (14 cores, up to 5.0 GHz)' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 4050 (6GB GDDR6)' },
      { label: 'Display', value: '15.6" FHD+ (1920 x 1200) InfinityEdge, 500 nits' },
      { label: 'Memory', value: '16GB DDR5 4800MHz' }
    ]
  },
  {
    id: 'macbook-air-m3',
    title: 'Apple MacBook Air 13" (M3 Chip)',
    subtitle: '8-core CPU • 10-core GPU • 16GB Unified Memory • 512GB SSD',
    category: 'laptops',
    brand: 'Apple',
    price: 119900,
    originalPrice: 134900,
    discountPercent: 11,
    currency: '₹',
    buyScore: 94,
    buyVerdict: 'Strong Buy',
    buyAdvice: 'Upgraded 16GB base RAM model at an all-time low price. Incredible 18-hour battery and fanless silent operation.',
    rating: 4.9,
    reviewCount: 3120,
    badge: 'Top Pick',
    colorOptions: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAubIeMe0Zrm46xxlTdUfyGcPQDNV-FfwYk9-zHLe-Ns_8hgcuf-i0k_pmKsCEp10zqnlxfN6uzrzgJzGh4XWHsfB15PmCsULDvwxcsfJ8eUU4AQx1jf5dt6fvUxQwBSfJAo1OweuDIVsW2jZJqsHsULlzekUbshVqRkajZopqQ0xrD7RYgtSm1YS8Tc66PzHy-lZXjKOJmFfduOIZqFx6i2YNlZpm3b-TOAfU6GrBXcjWOozbuqYHBxA'
    ],
    whyThis: [
      'M3 chip with hardware-accelerated ray tracing',
      'Dual external display support with lid closed',
      'Fanless silent design that never heats up',
      '18-hour real world battery life'
    ],
    retailers: [
      { id: 'amz-mba', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 119900, delivery: 'Free Prime Next-Day', inStock: true, url: 'https://amazon.in', badge: 'Best Deal' },
      { id: 'fk-mba', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 121900, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com' },
      { id: 'cro-mba', name: 'Croma', shortCode: 'C', logoColor: '#128C7E', price: 123900, delivery: 'In Stock', inStock: true, url: 'https://croma.com' }
    ],
    priceHistory: {
      lowest90d: 119900,
      average90d: 128900,
      highest90d: 134900,
      priceTrend: 'dropping',
      period30d: [{ date: 'Aug 01', price: 127900 }, { date: 'Aug 14', price: 122900 }, { date: 'Aug 25', price: 119900 }],
      period90d: [{ date: 'Jun 01', price: 134900 }, { date: 'Jul 20', price: 126900 }, { date: 'Aug 25', price: 119900, label: 'Lowest' }],
      period1y: [{ date: 'Mar 25', price: 134900 }, { date: 'Aug 25', price: 119900 }]
    },
    aiReviewSummary: {
      sentimentScore: 98,
      totalAnalyzed: 2800,
      highlights: [
        { topic: 'Portability & Battery', text: 'Sub-3lb weight with a battery that comfortably survives 2 days of office work.' },
        { topic: 'M3 Speed', text: 'Handles 4K ProRes video rendering and multiple virtual machines smoothly.' }
      ],
      considerations: [
        { topic: 'Port Selection', text: 'Limited to two Thunderbolt/USB4 ports plus MagSafe.' }
      ]
    },
    specs: [
      { label: 'Chip', value: 'Apple M3 (8-core CPU, 10-core GPU, 16-core NPU)' },
      { label: 'Memory', value: '16GB Unified Memory' },
      { label: 'Display', value: '13.6-inch Liquid Retina Display, 500 nits' },
      { label: 'Weight', value: '1.24 kg' }
    ]
  },
  {
    id: 'samsung-s25-ultra',
    title: 'Samsung Galaxy S25 Ultra 5G (512GB)',
    subtitle: 'Titanium Gray • Snapdragon 8 Elite • 200MP Quad Tele • S-Pen',
    category: 'smartphones',
    brand: 'Samsung',
    price: 129999,
    originalPrice: 139999,
    discountPercent: 7,
    currency: '₹',
    buyScore: 91,
    buyVerdict: 'Strong Buy',
    buyAdvice: 'Flagship tier Android powerhouse with built-in S-Pen and revolutionary AI zooming capabilities.',
    rating: 4.8,
    reviewCount: 1840,
    badge: 'Flagship King',
    storageOptions: ['256GB', '512GB', '1TB'],
    colorOptions: ['Titanium Gray', 'Titanium Black', 'Titanium Violet'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCq6zyPHrGus-Mibo_VYBYFfzGELPRerC59YVljAhkM4CCBJ1VtnTs19l9e29ju6pirun2af1O8j0Yckxn6pNflKcG2wiH_hANtXxS8af8GFeV-XZHnWGXN2x4VSaP80XGkvRKeGbbhqpKR41CXC4fHPx0P0oofgRu5YwzppEGa7FNEGuAWwkEL5Q3nam8z_Bsa5Bs6q64s-1CHiInfUj-04mAYj4otmgD71eYBxxpljlxvt4oUp7HD5w'
    ],
    whyThis: [
      '200MP Main sensor with 100x Space Zoom AI',
      'Flat Dynamic AMOLED 2X anti-reflective display',
      'Built-in stylus with low-latency Bluetooth',
      'Snapdragon 8 Elite tuned for Galaxy'
    ],
    retailers: [
      { id: 'amz-s25', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 129999, delivery: 'Free Next-Day', inStock: true, url: 'https://amazon.in', badge: 'Bank ₹5,000 Off' },
      { id: 'fk-s25', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 131999, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com' },
      { id: 'sam-direct', name: 'Samsung Store', shortCode: 'S', logoColor: '#1428A0', price: 129999, delivery: 'Free Express', inStock: true, url: 'https://samsung.com/in' }
    ],
    priceHistory: {
      lowest90d: 128999,
      average90d: 134500,
      highest90d: 139999,
      priceTrend: 'dropping',
      period30d: [{ date: 'Aug 01', price: 134999 }, { date: 'Aug 15', price: 131999 }, { date: 'Aug 25', price: 129999 }],
      period90d: [{ date: 'Jun 01', price: 139999 }, { date: 'Jul 20', price: 132000 }, { date: 'Aug 25', price: 129999, label: 'Lowest' }],
      period1y: [{ date: 'Jan 26', price: 139999 }, { date: 'Aug 26', price: 129999 }]
    },
    aiReviewSummary: {
      sentimentScore: 95,
      totalAnalyzed: 1950,
      highlights: [
        { topic: 'Anti-Reflective Glass', text: 'Drastically reduces glare indoors and outdoors under intense sunlight.' },
        { topic: 'Zoom Quality', text: '5x and 10x periscope telephoto photos are crystal sharp even in low light.' }
      ],
      considerations: [
        { topic: 'Weight & Size', text: 'Substantial phone with sharp titanium boxy corners.' }
      ]
    },
    specs: [
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X, 120Hz, 2600 nits' },
      { label: 'Processor', value: 'Qualcomm Snapdragon 8 Elite (3nm)' },
      { label: 'Camera', value: '200MP Main + 50MP 5x Tele + 50MP Ultra-wide + 10MP 3x' },
      { label: 'Battery', value: '5000 mAh with 45W Fast Charging' }
    ]
  },
  {
    id: 'bose-qc-ultra',
    title: 'Bose QuietComfort Ultra Wireless Headphones',
    subtitle: 'Black • Spatial Audio • World-Class Noise Cancelling • 24hr Playtime',
    category: 'headphones',
    brand: 'Bose',
    price: 32900,
    originalPrice: 38900,
    discountPercent: 15,
    currency: '₹',
    buyScore: 89,
    buyVerdict: 'Buy Now',
    buyAdvice: 'Best-in-class Active Noise Cancellation and luxurious pillow-soft ear cushions. ₹6,000 discount currently live.',
    rating: 4.7,
    reviewCount: 1450,
    badge: '15% Off Today',
    trendingDrop: 15,
    colorOptions: ['Black', 'White Smoke', 'Sandstone'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCouUFP-LYBsAtJYtbLeOPz2HwhKq3XLRC6cwufpHPFQDBeiyfQWleaZLOPFs5Hp4MDhc0jlew3yxGYGVHQzMDymNCJawbNAi5mLJzGE5meUOISrZ0vQ5IvVw89nfM66dru8PkMKb5J7Plgz8QtNlq_DAebmLPiCvdFgZLMt8JQIiAY0dIzZuM9z0sQsqqDXwWV6ctzvP3SXL_1umZOkAvzoRRB7PBnjaxrPhJWoFHqN0c3AoKw3VhYVg'
    ],
    whyThis: [
      'Revolutionary Bose Immersive Audio with head tracking',
      'CustomTune technology personalizes sound to your ear canal',
      'Ultra-comfortable lightweight headband and memory foam cups',
      'WindBlock mode for pristine calling outdoors'
    ],
    retailers: [
      { id: 'amz-bose', name: 'Amazon', shortCode: 'A', logoColor: '#FF9900', price: 32900, delivery: 'Free Prime Delivery', inStock: true, url: 'https://amazon.in', badge: 'Lowest Price' },
      { id: 'fk-bose', name: 'Flipkart', shortCode: 'F', logoColor: '#047BD5', price: 33499, delivery: 'Free Delivery', inStock: true, url: 'https://flipkart.com' },
      { id: 'cro-bose', name: 'Croma', shortCode: 'C', logoColor: '#128C7E', price: 34900, delivery: 'In Stock', inStock: true, url: 'https://croma.com' }
    ],
    priceHistory: {
      lowest90d: 31990,
      average90d: 36500,
      highest90d: 38900,
      priceTrend: 'dropping',
      period30d: [{ date: 'Aug 01', price: 37900 }, { date: 'Aug 14', price: 34500 }, { date: 'Aug 25', price: 32900 }],
      period90d: [{ date: 'Jun 01', price: 38900 }, { date: 'Jul 15', price: 35000 }, { date: 'Aug 25', price: 32900, label: 'Current' }],
      period1y: [{ date: 'Oct 25', price: 38900 }, { date: 'Aug 26', price: 32900 }]
    },
    aiReviewSummary: {
      sentimentScore: 93,
      totalAnalyzed: 1100,
      highlights: [
        { topic: 'Noise Cancelling', text: 'Blocks airline cabin and cafe chatter more effectively than nearly any competitor.' },
        { topic: 'Comfort', text: 'Extremely gentle clamping force allows 6+ hours of listening without fatigue.' }
      ],
      considerations: [
        { topic: 'Battery with Immersive Mode', text: 'Immersive spatial audio reduces battery runtime from 24h to 18h.' }
      ]
    },
    specs: [
      { label: 'Battery Life', value: 'Up to 24 hours (18 hours with Immersive Audio)' },
      { label: 'Connectivity', value: 'Bluetooth 5.3, Snapdragon Sound aptX Adaptive' },
      { label: 'Weight', value: '253 grams' },
      { label: 'Microphones', value: 'Array with noise rejection algorithms' }
    ]
  }
];

export const CATEGORIES_LIST = [
  { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone', count: 48 },
  { id: 'laptops', name: 'Laptops', icon: 'Laptop', count: 32 },
  { id: 'headphones', name: 'Headphones', icon: 'Headphones', count: 26 },
  { id: 'tvs', name: 'TVs & Displays', icon: 'Tv', count: 18 },
  { id: 'smartwatches', name: 'Smartwatches', icon: 'Watch', count: 22 },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', count: 19 }
];

export const MOCK_BANK_OFFERS = [
  {
    id: 'bank-1',
    bankName: 'HDFC Bank',
    cardType: 'Credit Card' as const,
    discountPercent: 10,
    maxDiscount: 4000,
    minOrderValue: 20000,
    code: 'HDFC10'
  },
  {
    id: 'bank-2',
    bankName: 'ICICI Bank',
    cardType: 'Credit Card' as const,
    discountPercent: 7.5,
    maxDiscount: 3500,
    minOrderValue: 15000,
    code: 'ICICI75'
  },
  {
    id: 'bank-3',
    bankName: 'SBI Card',
    cardType: 'Credit Card' as const,
    discountPercent: 10,
    maxDiscount: 2500,
    minOrderValue: 10000,
    code: 'SBISPECIAL'
  },
  {
    id: 'bank-4',
    bankName: 'Axis Bank',
    cardType: 'Debit Card' as const,
    discountPercent: 5,
    maxDiscount: 1500,
    minOrderValue: 8000,
    code: 'AXISDEBIT'
  }
];

export const MOCK_COUPONS = [
  {
    code: 'DEALORA2000',
    title: 'Dealora Smart Buyer Flat Discount',
    discountText: 'Flat ₹2,000 Off on orders above ₹40,000',
    discountValue: 2000,
    retailer: 'Universal (All Stores)',
    minOrder: 40000,
    category: 'Electronics',
    expiresText: 'Valid till midnight',
    verified: true
  },
  {
    code: 'FESTIVE1500',
    title: 'Amazon & Flipkart Verified Promo',
    discountText: '₹1,500 Instant Cashback on Laptops & Phones',
    discountValue: 1500,
    retailer: 'Amazon / Flipkart',
    minOrder: 25000,
    category: 'Laptops',
    expiresText: '3 days left',
    verified: true
  },
  {
    code: 'AUDIO500',
    title: 'Headphones & Wearables Special',
    discountText: 'Flat ₹500 Off on Headphones & Smartwatches',
    discountValue: 500,
    retailer: 'All Stores',
    minOrder: 5000,
    category: 'Audio',
    expiresText: 'Active now',
    verified: true
  },
  {
    code: 'FIRSTBUY',
    title: 'New Shopper Welcome Voucher',
    discountText: '₹1,000 Off on first Dealora checkout',
    discountValue: 1000,
    retailer: 'Dealora Direct Checkout',
    minOrder: 15000,
    category: 'All Categories',
    expiresText: 'No expiry',
    verified: true
  }
];

export const MOCK_FLASH_DEALS = [
  {
    id: 'flash-1',
    productId: 'sony-wh1000xm6',
    flashPrice: 22490,
    originalPrice: 29990,
    discountPercent: 25,
    claimedPercent: 88,
    endsAt: Date.now() + 4 * 60 * 60 * 1000 + 32 * 60 * 1000
  },
  {
    id: 'flash-2',
    productId: 'samsung-galaxy-watch-6',
    flashPrice: 17499,
    originalPrice: 24999,
    discountPercent: 30,
    claimedPercent: 94,
    endsAt: Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000
  },
  {
    id: 'flash-3',
    productId: 'oneplus-nord-ce4',
    flashPrice: 23999,
    originalPrice: 26999,
    discountPercent: 11,
    claimedPercent: 72,
    endsAt: Date.now() + 6 * 60 * 60 * 1000 + 45 * 60 * 1000
  }
];

export const MOCK_INITIAL_ORDERS = [
  {
    orderId: 'ORD-984210',
    date: '2026-08-20',
    items: [
      {
        productTitle: 'Sony WH-1000XM6 Noise Cancelling Headphones',
        productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCouUFP-LYBsAtJYtbLeOPz2HwhKq3XLRC6cwufpHPFQDBeiyfQWleaZLOPFs5Hp4MDhc0jlew3yxGYGVHQzMDymNCJawbNAi5mLJzGE5meUOISrZ0vQ5IvVw89nfM66dru8PkMKb5J7Plgz8QtNlq_DAebmLPiCvdFgZLMt8JQIiAY0dIzZuM9z0sQsqqDXwWV6ctzvP3SXL_1umZOkAvzoRRB7PBnjaxrPhJWoFHqN0c3AoKw3VhYVg',
        price: 23490,
        quantity: 1,
        retailerName: 'Amazon Prime'
      }
    ],
    totalAmount: 21990,
    discountAmount: 6500,
    bankDiscount: 1500,
    promoCode: 'FESTIVE1500',
    status: 'Delivered' as const,
    shippingAddress: '42, Cyber Green Residency, Sector 45, Gurugram, Haryana - 122003',
    estimatedDelivery: 'Delivered on Aug 22, 2026',
    paymentMethod: 'HDFC Credit Card (Ending in 4092)'
  },
  {
    orderId: 'ORD-981045',
    date: '2026-08-14',
    items: [
      {
        productTitle: 'Samsung Galaxy Watch 6 (44mm Bluetooth)',
        productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCouUFP-LYBsAtJYtbLeOPz2HwhKq3XLRC6cwufpHPFQDBeiyfQWleaZLOPFs5Hp4MDhc0jlew3yxGYGVHQzMDymNCJawbNAi5mLJzGE5meUOISrZ0vQ5IvVw89nfM66dru8PkMKb5J7Plgz8QtNlq_DAebmLPiCvdFgZLMt8JQIiAY0dIzZuM9z0sQsqqDXwWV6ctzvP3SXL_1umZOkAvzoRRB7PBnjaxrPhJWoFHqN0c3AoKw3VhYVg',
        price: 18990,
        quantity: 1,
        retailerName: 'Flipkart Assured'
      }
    ],
    totalAmount: 17990,
    discountAmount: 6000,
    bankDiscount: 1000,
    promoCode: 'AUDIO500',
    status: 'Delivered' as const,
    shippingAddress: '42, Cyber Green Residency, Sector 45, Gurugram, Haryana - 122003',
    estimatedDelivery: 'Delivered on Aug 16, 2026',
    paymentMethod: 'UPI (Google Pay)'
  }
];

export const SEASONAL_SALE_CALENDAR = [
  {
    name: 'Diwali Festive Mega Sale',
    dates: 'October 18 - 25, 2026',
    expectedDiscount: 'Up to 35-50% off on Smartphones & Laptops',
    tip: 'Lowest prices of the year for consumer electronics and TVs.'
  },
  {
    name: 'Big Billion Days & Great Indian Festival',
    dates: 'September 24 - 30, 2026',
    expectedDiscount: 'Unprecedented iPhone & Flagship Exchange Bonuses',
    tip: 'Ideal window to buy previous-gen flagships at steep discounts.'
  },
  {
    name: 'Black Friday & Cyber Week',
    dates: 'November 27 - 30, 2026',
    expectedDiscount: 'Global electronics, headphones & gaming PC components',
    tip: 'Best for audio gear like Bose, Sony, and Apple AirPods.'
  }
];

export const INITIAL_PRICE_ALERTS = [
  {
    id: 'alert-1',
    productId: 'iphone-17-256gb',
    productTitle: 'Apple iPhone 17 (256GB) - Midnight Black',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq6zyPHrGus-Mibo_VYBYFfzGELPRerC59YVljAhkM4CCBJ1VtnTs19l9e29ju6pirun2af1O8j0Yckxn6pNflKcG2wiH_hANtXxS8af8GFeV-XZHnWGXN2x4VSaP80XGkvRKeGbbhqpKR41CXC4fHPx0P0oofgRu5YwzppEGa7FNEGuAWwkEL5Q3nam8z_Bsa5Bs6q64s-1CHiInfUj-04mAYj4otmgD71eYBxxpljlxvt4oUp7HD5w',
    currentPrice: 79999,
    targetPrice: 76000,
    originalPrice: 84900,
    createdAt: '2026-08-20',
    status: 'active' as const,
    retailerPreference: 'Amazon'
  },
  {
    id: 'alert-2',
    productId: 'dell-xps-15',
    productTitle: 'Dell XPS 15 9530 Laptop',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAubIeMe0Zrm46xxlTdUfyGcPQDNV-FfwYk9-zHLe-Ns_8hgcuf-i0k_pmKsCEp10zqnlxfN6uzrzgJzGh4XWHsfB15PmCsULDvwxcsfJ8eUU4AQx1jf5dt6fvUxQwBSfJAo1OweuDIVsW2jZJqsHsULlzekUbshVqRkajZopqQ0xrD7RYgtSm1YS8Tc66PzHy-lZXjKOJmFfduOIZqFx6i2YNlZpm3b-TOAfU6GrBXcjWOozbuqYHBxA',
    currentPrice: 154990,
    targetPrice: 140000,
    originalPrice: 169990,
    createdAt: '2026-08-22',
    status: 'active' as const
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: '🔥 Price Drop Alert: Samsung Galaxy Watch 6',
    message: 'Dropped by 24% (Save ₹6,000) on Amazon. Currently ₹18,990!',
    time: '2 hours ago',
    read: false,
    type: 'price_drop' as const,
    productId: 'samsung-galaxy-watch-6'
  },
  {
    id: 'notif-2',
    title: '🎯 Dealora AI Recommendation',
    message: 'Sony WH-1000XM6 reached its 90-day low at ₹23,490. Buy score is 88.',
    time: 'Yesterday',
    read: false,
    type: 'deal_alert' as const,
    productId: 'sony-wh1000xm6'
  }
];

export const MOCK_ORDER_HISTORY = [
  {
    id: 'ORD-98314-IN',
    orderDate: 'August 23, 2026',
    status: 'out_for_delivery' as const,
    retailer: 'Amazon India',
    totalAmount: 23490,
    savings: 6500,
    trackingNumber: 'DEL-884920194',
    items: [
      {
        title: 'Sony WH-1000XM6 Wireless Headphones (Silver)',
        quantity: 1,
        price: 23490,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTW5v7bWfGzOaJmO93r5c43d81b4W38rV2eS1d6rQ1x92Jt727pC79c4L7K5g42t_g7a2zM1s9qZ3w8b4g237kL8p2f-76Qv5_a0gB3jX4wG1k2aB7Y0x'
      }
    ]
  },
  {
    id: 'ORD-76291-IN',
    orderDate: 'August 10, 2026',
    status: 'delivered' as const,
    retailer: 'Flipkart SuperDeals',
    totalAmount: 79999,
    savings: 14901,
    trackingNumber: 'EKART-491028301',
    items: [
      {
        title: 'Apple iPhone 17 (256GB) - Midnight Black',
        quantity: 1,
        price: 79999,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq6zyPHrGus-Mibo_VYBYFfzGELPRerC59YVljAhkM4CCBJ1VtnTs19l9e29ju6pirun2af1O8j0Yckxn6pNflKcG2wiH_hANtXxS8af8GFeV-XZHnWGXN2x4VSaP80XGkvRKeGbbhqpKR41CXC4fHPx0P0oofgRu5YwzppEGa7FNEGuAWwkEL5Q3nam8z_Bsa5Bs6q64s-1CHiInfUj-04mAYj4otmgD71eYBxxpljlxvt4oUp7HD5w'
      }
    ]
  },
  {
    id: 'ORD-54012-IN',
    orderDate: 'July 18, 2026',
    status: 'delivered' as const,
    retailer: 'Croma Retail',
    totalAmount: 18990,
    savings: 6000,
    trackingNumber: 'BLUEDART-9382103',
    items: [
      {
        title: 'Samsung Galaxy Watch 6 Classic (44mm)',
        quantity: 1,
        price: 18990,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDndXU93v1mX1wG1k2aB7Y0x8b4g237kL8p2f-76Qv5_a0gB3jX4wG1k2aB7Y0x'
      }
    ]
  }
];

