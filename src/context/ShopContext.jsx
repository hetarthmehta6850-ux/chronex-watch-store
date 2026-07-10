import { createContext, useState, useEffect } from "react";
import { mockProducts } from "../data/mockProducts";
export const ShopContext = createContext();

const locales = {
  en: {
    brandName: "Chronex",
    exploreCollections: "Explore Collections",
    addToCart: "Add to Cart",
    watchFinder: "Watch Finder",
    ourBrands: "Our Brands",
    serviceLab: "Service Lab",
    ourStory: "Our Story",
    checkout: "Checkout",
    wishlist: "Wishlist",
    showroomPrice: "Showroom Price (MRP)",
    emiStarts: "Starts at",
    easyEmi: "Easy EMI Options",
    checkDelivery: "Check Pan-India Delivery",
    freeShipping: "Free Fully Insured Delivery Across India",
    enquireWhatsApp: "Enquire on WhatsApp",
    bookSlot: "Book Showroom Slot",
    writeReview: "Write a Review",
    technicalSpecs: "Technical Specifications",
    relatedProducts: "Related Timepieces",
    welcomeClub: "Welcome to the Club",
    newsletterSub: "Join the Inner Circle",
    unlockPrivilege: "Unlock Privilege",
    // Navbar additions
    navHome: "Home",
    navCollections: "Collections",
    navMagazine: "Magazine",
    navFAQ: "FAQ",
    navGiftVouchers: "Gift Vouchers",
    navAdmin: "Admin Panel"
  },
  hi: {
    brandName: "क्रोनेक्स",
    exploreCollections: "संग्रह देखें",
    addToCart: "कार्ट में जोड़ें",
    watchFinder: "वॉच फाइंडर",
    ourBrands: "हमारे ब्रांड्स",
    serviceLab: "सर्विस लैब",
    ourStory: "हमारी कहानी",
    checkout: "चेकआउट",
    wishlist: "इच्छा सूची",
    showroomPrice: "शोरूम कीमत (एमआरपी)",
    emiStarts: "शुरुआती दर",
    easyEmi: "आसान ईएमआई विकल्प",
    checkDelivery: "अखिल भारतीय डिलीवरी जांचें",
    freeShipping: "भारत भर में मुफ्त पूर्ण बीमाकृत डिलीवरी",
    enquireWhatsApp: "व्हाट्सएप पर पूछताछ करें",
    bookSlot: "शोरूम स्लॉट बुक करें",
    writeReview: "समीक्षा लिखें",
    technicalSpecs: "तकनीकी विवरण",
    relatedProducts: "संबंधित घड़ियाँ",
    welcomeClub: "क्लब में आपका स्वागत है",
    newsletterSub: "इनर सर्कल में शामिल हों",
    unlockPrivilege: "विशेषाधिकार अनलॉक करें",
    // Navbar additions
    navHome: "होम",
    navCollections: "कलेक्शन",
    navMagazine: "पत्रिका",
    navFAQ: "सामान्य प्रश्न",
    navGiftVouchers: "गिफ्ट वाउचर",
    navAdmin: "एडमिन पैनल"
  }
};

const initialBlogPosts = [
  {
    id: "guide-swiss-mechanical-movements",
    title: "Understanding Swiss Mechanical Movements",
    category: "Guides",
    readTime: "5 min read",
    author: "Arjun Mehta",
    date: "June 25, 2026",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800",
    content: "Swiss mechanical watches are the pinnacle of horological art. Driven by a complex system of gears, springs, and escapements, these movements represent centuries of refinement. Unlike quartz movements powered by batteries, mechanical watches capture power from a wound mainspring. In this guide, we dive deep into how mainsprings, hairsprings, and balance wheels work together to achieve precise timekeeping."
  },
  {
    id: "spotting-replica-luxury-watches",
    title: "How to Spot a Replica Luxury Watch",
    category: "Care",
    readTime: "7 min read",
    author: "Vikram Sen",
    date: "May 18, 2026",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800",
    content: "The market for replica watches is larger than ever. To protect your investment, always inspect watch details closely. Look for dial print alignment, weight, mechanical sweeping of the second hand (for automatic movements), engraving depth, and sound. True luxury Swiss watches do not tick loudly. In this guide, we show comparison charts between genuine watches and high-grade replicas."
  },
  {
    id: "top-5-watches-under-50k",
    title: "Top 5 Watches Under ₹50,000 in India",
    category: "Swiss Watches",
    readTime: "4 min read",
    author: "Rohan Sharma",
    date: "April 02, 2026",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    content: "Looking for an entry-level luxury watch? Brand heritage, design durability, and movement quality are key. We highlight five excellent options from Seiko, Citizen, Titan, and Tissot that offer premium materials like sapphire glass, solid automatic movements, and stunning dials without breaking the bank."
  }
];

export const defaultShowrooms = [
  {
    id: "vadodara",
    city: "Vadodara",
    name: "Chronex Alkapuri Boutique",
    address: "SF-12, Premium Galleria, RC Dutt Rd, Alkapuri, Vadodara, Gujarat 390007",
    hours: "10:30 AM - 8:30 PM (Daily)",
    phone: "+91 83206 06850",
    coords: { x: 38, y: 55 },
    email: "alkapuri@chronex.in"
  },
  {
    id: "mumbai",
    city: "Mumbai",
    name: "Chronex Colaba Flagship",
    address: "Taj Mahal Palace Galleria, Colaba, Mumbai, Maharashtra 400001",
    hours: "11:00 AM - 9:00 PM (Daily)",
    phone: "+91 22 8765 4321",
    coords: { x: 35, y: 70 },
    email: "colaba@chronex.in"
  },
  {
    id: "delhi",
    city: "Delhi",
    name: "Chronex Connaught Place",
    address: "Block H, Connaught Place, New Delhi, Delhi 110001",
    hours: "10:30 AM - 8:30 PM (Daily)",
    phone: "+91 11 9876 5432",
    coords: { x: 45, y: 30 },
    email: "delhi@chronex.in"
  },
  {
    id: "bangalore",
    city: "Bangalore",
    name: "Chronex UB City Lounge",
    address: "Level 2, UB City Mall, Vittal Mallya Rd, Bangalore, Karnataka 560001",
    hours: "11:00 AM - 9:30 PM (Daily)",
    phone: "+91 80 8765 4321",
    coords: { x: 40, y: 88 },
    email: "ubcity@chronex.in"
  }
];

export const ShopProvider = ({ children }) => {

  const saveToDb = (key, data) => {
    localStorage.setItem(key, data);
    try {
      const parsedData = JSON.parse(data);
      fetch('/api/data', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: parsedData })
      }).catch(err => console.error("Sync failed:", err));
    } catch (e) {
      fetch('/api/data', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: data })
      }).catch(err => console.error("Sync failed:", err));
    }
  };
  const saveMultipleToDb = (payload) => {
    Object.keys(payload).forEach(key => {
      const value = payload[key];
      const strVal = typeof value === 'object' ? JSON.stringify(value) : String(value);
      localStorage.setItem(key, strVal);
    });
    fetch('/api/data', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(err => console.error("Batch sync failed:", err));
  };


  const [products, setProducts] = useState(() => {
    let list = [];
    try {
      const saved = localStorage.getItem("chronex_products");
      if (saved) list = JSON.parse(saved);
    } catch (e) {}
    
    if (!list || !Array.isArray(list) || list.length === 0) {
      list = mockProducts;
    }
    
    return list.map(p => {
      const images = (p.images && Array.isArray(p.images) && p.images.length > 0)
        ? p.images
        : [p.imageUrl || p.image || "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800"];
      return {
        ...p,
        images,
        imageUrl: images[0],
        stock: p.stock ?? Math.floor(Math.random() * 10) + 4,
        reviews: (p.reviews || []).map(r => ({ ...r, status: r.status || "Approved" }))
      };
    });
  });
  const [promoBanner, setPromoBanner] = useState(() => {
    const saved = localStorage.getItem("chronex_promo_banner");
    if (saved) return JSON.parse(saved);
    return {
      isVisible: true,
      title: "CHRONEX EXCLUSIVES SALE",
      subtitle: "Complimentary Winder with Automatics. Ends in:",
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString()
    };
  });
  const updatePromoBanner = (newConfig) => {
    setPromoBanner(prev => {
      const updated = { ...prev, ...newConfig };
      saveToDb("chronex_promo_banner", JSON.stringify(updated));
      return updated;
    });
  };
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_wishlist");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (e) {}
    return {};
  }); // Stores { productId: quantity }
  const [orders, setOrders] = useState(() => {
    // Default list of mock orders to make the admin dashboard populate realistically
    const defaults = [];

    let currentOrders = [];
    try {
      const saved = localStorage.getItem("chronex_orders");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          currentOrders = parsed.filter(order => order && order.customer && order.customer.name);
        }
      }
    } catch (e) {}

    // Merge default orders that are missing
    let merged = [...currentOrders];
    let updated = false;

    defaults.forEach(def => {
      if (!merged.some(o => o.id === def.id)) {
        merged.push(def);
        updated = true;
      }
    });

    if (updated || currentOrders.length === 0) {
      try {
        localStorage.setItem("chronex_orders", JSON.stringify(merged));
      } catch (e) {}
    }
    return merged;
  }); // Stores completed order objects
  const [serviceRequests, setServiceRequests] = useState(() => {
    const defaults = [];

    let current = [];
    try {
      const saved = localStorage.getItem("chronex_services");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) current = parsed;
      }
    } catch (e) {}

    let merged = [...current];
    let updated = false;
    defaults.forEach(def => {
      if (!merged.some(s => s.id === def.id)) {
        merged.push(def);
        updated = true;
      }
    });

    if (updated || current.length === 0) {
      try {
        localStorage.setItem("chronex_services", JSON.stringify(merged));
      } catch (e) {}
    }
    return merged;
  }); // Stores watch repair tickets
  const [appointments, setAppointments] = useState(() => {
    const defaults = [];

    let current = [];
    try {
      const saved = localStorage.getItem("chronex_appointments");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) current = parsed;
      }
    } catch (e) {}

    let merged = [...current];
    let updated = false;
    defaults.forEach(def => {
      if (!merged.some(a => a.id === def.id)) {
        merged.push(def);
        updated = true;
      }
    });

    if (updated || current.length === 0) {
      try {
        localStorage.setItem("chronex_appointments", JSON.stringify(merged));
      } catch (e) {}
    }
    return merged;
  }); // Stores showroom bookings
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_recently_viewed");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  }); // Stores recently viewed product IDs
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_compare");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  }); // Stores up to 3 product IDs for comparison
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]); // Stores newsletter subscriber emails
  
  // New States for Phase 3
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_coupons");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { code: "WELCOME10", type: "percentage", value: 10, minOrder: 0 },
      { code: "CHRONEXVIP", type: "flat", value: 10000, minOrder: 100000 },
      { code: "FESTIVE5", type: "percentage", value: 5, minOrder: 0 }
    ];
  });
  const [giftCards, setGiftCards] = useState([]);
  const [restockAlerts, setRestockAlerts] = useState([]);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  
  const [language, setLanguage] = useState(() => localStorage.getItem("chronex_language") || "en");
  const [theme, setTheme] = useState(() => localStorage.getItem("chronex_theme") || "dark");
  const [fontSize, setFontSize] = useState(() => localStorage.getItem("chronex_fontsize") || "standard");
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem("chronex_contrast") || "standard");
  
  // Phase 4 States
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_current_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) return parsed;
      }
    } catch (e) {}
    return null;
  });
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  // Business Features States
  const [referralCode, setReferralCode] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [corporateInquiries, setCorporateInquiries] = useState([]);
  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_users");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });
  const [tradeInRequests, setTradeInRequests] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_tradeins");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });
  const [returnRequests, setReturnRequests] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_returns");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_saved_addresses");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [currency, setCurrency] = useState("INR"); // Currency state
  const [showrooms, setShowrooms] = useState(() => {
    try {
      const stored = localStorage.getItem("chronex_showrooms");
      return stored ? JSON.parse(stored) : defaultShowrooms;
    } catch (e) {
      return defaultShowrooms;
    }
  });

  const [warrantyLedger, setWarrantyLedger] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_warranty_ledger");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [
      { id: 1, serial: "CHX-DEMO-789", model: "Submariner Date 41", clientName: "Aarav Mehta", expiryDate: "2031-03-12", dateMinted: "2026-06-25" },
      { id: 2, serial: "CHX-DEMO-123", model: "Speedmaster Professional", clientName: "Diya Sharma", expiryDate: "2031-05-18", dateMinted: "2026-06-26" }
    ];
  });

  const [warrantyValidDict, setWarrantyValidDict] = useState(() => {
    try {
      const saved = localStorage.getItem("chronex_warranty_valid_dict");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {}
    return {};
  });

  const mintWarrantyCertificate = (serialNum, watchModel, clientName, expiryDate, brand, purchasedOn) => {
    const serial = serialNum.toUpperCase().trim();
    
    // 1. Add to warranty ledger if not already there
    const currentLedger = [...warrantyLedger];
    const existsInLedger = currentLedger.some(w => w.serial.toUpperCase() === serial);
    
    let updatedLedger = currentLedger;
    if (!existsInLedger) {
      const newCert = {
        id: `WARR-${Math.floor(100000 + Math.random() * 900000)}`,
        serial: serial,
        model: watchModel,
        clientName: clientName,
        expiresOn: expiryDate,
        dateMinted: new Date().toISOString().split('T')[0]
      };
      updatedLedger = [newCert, ...currentLedger];
      setWarrantyLedger(updatedLedger);
      saveToDb("chronex_warranty_ledger", JSON.stringify(updatedLedger));
    }
    
    // 2. Add to warranty valid dictionary if not already there
    const currentDict = { ...warrantyValidDict };
    if (!currentDict[serial]) {
      currentDict[serial] = {
        model: watchModel,
        brand: brand || "Chronex",
        purchasedOn: purchasedOn || new Date().toISOString().split('T')[0],
        expiresOn: expiryDate,
        clientName: clientName,
        status: "Authentic & Insured",
        certId: `CERT-${(brand || "CHX").substring(0,3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`
      };
      setWarrantyValidDict(currentDict);
      saveToDb("chronex_warranty_valid_dict", JSON.stringify(currentDict));
    }
  };

  const refreshDbData = () => {
    return fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          const syncPayload = {};
          let needsSync = false;

          // 1. User Profile Self-healing
          const savedUser = localStorage.getItem("chronex_current_user");
          if (savedUser) {
            try {
              const localUser = JSON.parse(savedUser);
              if (localUser && localUser.email) {
                const uEmail = localUser.email;

                // Check points
                const localPoints = localStorage.getItem(`chronex_points_${uEmail}`);
                const serverPoints = data[`chronex_points_${uEmail}`];
                if (localPoints && (!serverPoints || Number(localPoints) > Number(serverPoints))) {
                  syncPayload[`chronex_points_${uEmail}`] = localPoints;
                  data[`chronex_points_${uEmail}`] = localPoints; // merge locally in-memory
                  needsSync = true;
                }

                // Check wallet (only local higher value overwrites server)
                const localWallet = localStorage.getItem(`chronex_wallet_${uEmail}`);
                const serverWallet = data[`chronex_wallet_${uEmail}`];
                if (localWallet && (!serverWallet || Number(localWallet) > Number(serverWallet))) {
                  syncPayload[`chronex_wallet_${uEmail}`] = localWallet;
                  data[`chronex_wallet_${uEmail}`] = localWallet;
                  needsSync = true;
                }

                // Check subscription
                const localSub = localStorage.getItem(`chronex_sub_${uEmail}`);
                const serverSub = data[`chronex_sub_${uEmail}`];
                if (localSub && !serverSub) {
                  syncPayload[`chronex_sub_${uEmail}`] = localSub;
                  data[`chronex_sub_${uEmail}`] = localSub;
                  needsSync = true;
                }

                // Check referral code
                const localRef = localStorage.getItem(`chronex_ref_code_${uEmail}`);
                const serverRef = data[`chronex_ref_code_${uEmail}`];
                if (localRef && !serverRef) {
                  syncPayload[`chronex_ref_code_${uEmail}`] = localRef;
                  data[`chronex_ref_code_${uEmail}`] = localRef;
                  needsSync = true;
                }

                // Check referrals list (merge local mock and server-registered referrals)
                const localRefs = localStorage.getItem(`chronex_referrals_${uEmail}`);
                const serverRefs = data[`chronex_referrals_${uEmail}`];
                if (localRefs) {
                  try {
                    const parsedLocal = JSON.parse(localRefs);
                    const parsedServer = typeof serverRefs === "string" ? JSON.parse(serverRefs) : (serverRefs || []);
                    if (Array.isArray(parsedLocal) && Array.isArray(parsedServer)) {
                      const missingInServer = parsedLocal.filter(lr => !parsedServer.some(sr => sr.email === lr.email));
                      if (missingInServer.length > 0) {
                        const merged = [...parsedServer, ...missingInServer];
                        syncPayload[`chronex_referrals_${uEmail}`] = merged;
                        data[`chronex_referrals_${uEmail}`] = merged;
                        needsSync = true;
                      }
                    }
                  } catch (e) {}
                } else if (serverRefs) {
                  data[`chronex_referrals_${uEmail}`] = serverRefs;
                }

                // Check referral earnings
                const localEarnings = localStorage.getItem(`chronex_ref_earnings_${uEmail}`);
                const serverEarnings = data[`chronex_ref_earnings_${uEmail}`];
                if (localEarnings && (!serverEarnings || Number(localEarnings) > Number(serverEarnings))) {
                  syncPayload[`chronex_ref_earnings_${uEmail}`] = localEarnings;
                  data[`chronex_ref_earnings_${uEmail}`] = localEarnings;
                  needsSync = true;
                }

                // Hydrate React states with the latest synced profile details in-memory
                const finalPoints = data[`chronex_points_${uEmail}`] || localPoints || "250";
                setLoyaltyPoints(Number(finalPoints));

                const finalWallet = data[`chronex_wallet_${uEmail}`] || localWallet || "0";
                setWalletBalance(Number(finalWallet));

                const finalRefCode = data[`chronex_ref_code_${uEmail}`] || localStorage.getItem(`chronex_ref_code_${uEmail}`);
                if (finalRefCode) setReferralCode(finalRefCode);

                const finalReferrals = data[`chronex_referrals_${uEmail}`] || localStorage.getItem(`chronex_referrals_${uEmail}`);
                if (finalReferrals) {
                  try {
                    setReferrals(typeof finalReferrals === "string" ? JSON.parse(finalReferrals) : finalReferrals);
                  } catch (e) {}
                }

                const finalEarnings = data[`chronex_ref_earnings_${uEmail}`] || localEarnings || "0";
                setReferralEarnings(Number(finalEarnings));

                const finalSub = data[`chronex_sub_${uEmail}`] || localStorage.getItem(`chronex_sub_${uEmail}`);
                if (finalSub) {
                  try {
                    setSubscription(typeof finalSub === "string" ? JSON.parse(finalSub) : finalSub);
                  } catch (e) {}
                }
              }
            } catch (e) {}
          }

          // 2. Collections Self-healing (Orders, Appointments, Services, Tradeins, Returns, Corporate Inquiries)
          
          // Orders
          const localOrdersStr = localStorage.getItem("chronex_orders");
          if (localOrdersStr) {
            try {
              const localOrders = JSON.parse(localOrdersStr);
              const serverOrders = data.chronex_orders || [];
              if (Array.isArray(localOrders) && localOrders.length > 0) {
                const missing = localOrders.filter(lo => lo && lo.id && !serverOrders.some(so => so.id === lo.id));
                if (missing.length > 0) {
                  const merged = [...serverOrders, ...missing];
                  syncPayload["chronex_orders"] = merged;
                  data.chronex_orders = merged;
                  needsSync = true;
                }
              }
            } catch (e) {}
          }

          // Appointments
          const localApptsStr = localStorage.getItem("chronex_appointments");
          if (localApptsStr) {
            try {
              const localAppts = JSON.parse(localApptsStr);
              const serverAppts = data.chronex_appointments || [];
              if (Array.isArray(localAppts) && localAppts.length > 0) {
                const missing = localAppts.filter(la => la && la.id && !serverAppts.some(sa => sa.id === la.id));
                if (missing.length > 0) {
                  const merged = [...serverAppts, ...missing];
                  syncPayload["chronex_appointments"] = merged;
                  data.chronex_appointments = merged;
                  needsSync = true;
                }
              }
            } catch (e) {}
          }

          // Services
          const localServStr = localStorage.getItem("chronex_services");
          if (localServStr) {
            try {
              const localServ = JSON.parse(localServStr);
              const serverServ = data.chronex_services || [];
              if (Array.isArray(localServ) && localServ.length > 0) {
                const missing = localServ.filter(ls => ls && ls.id && !serverServ.some(ss => ss.id === ls.id));
                if (missing.length > 0) {
                  const merged = [...serverServ, ...missing];
                  syncPayload["chronex_services"] = merged;
                  data.chronex_services = merged;
                  needsSync = true;
                }
              }
            } catch (e) {}
          }

          // Trade-Ins status-aware merging
          const localTradeStr = localStorage.getItem("chronex_tradeins");
          if (localTradeStr) {
            try {
              const localTrade = JSON.parse(localTradeStr);
              const serverTrade = data.chronex_tradeins || [];
              if (Array.isArray(localTrade)) {
                let mergedTrade = [...serverTrade];
                let tradeUpdated = false;

                const statusPriority = {
                  "Pending": 1,
                  "Counter-Offered": 2,
                  "Accepted": 3,
                  "Rejected": 3,
                  "Cancelled": 3
                };

                localTrade.forEach(lt => {
                  if (!lt || !lt.id) return;
                  const idx = mergedTrade.findIndex(st => st.id === lt.id);
                  if (idx === -1) {
                    mergedTrade.push(lt);
                    tradeUpdated = true;
                  } else {
                    const st = mergedTrade[idx];
                    const localPri = statusPriority[lt.status] || 1;
                    const serverPri = statusPriority[st.status] || 1;
                    
                    if (localPri > serverPri) {
                      mergedTrade[idx] = { ...st, ...lt };
                      tradeUpdated = true;
                    } else if (serverPri > localPri) {
                      data.chronex_tradeins[idx] = { ...lt, ...st };
                    } else {
                      // If statuses are equal, check if local has a counterOffer but server doesn't
                      if (lt.counterOffer !== undefined && st.counterOffer === undefined) {
                        mergedTrade[idx].counterOffer = lt.counterOffer;
                        tradeUpdated = true;
                      }
                    }
                  }
                });

                if (tradeUpdated) {
                  syncPayload["chronex_tradeins"] = mergedTrade;
                  data.chronex_tradeins = mergedTrade;
                  needsSync = true;
                }
              }
            } catch (e) {}
          }

          // Returns status-aware merging
          const localReturnStr = localStorage.getItem("chronex_returns");
          if (localReturnStr) {
            try {
              const localReturn = JSON.parse(localReturnStr);
              const serverReturn = data.chronex_returns || [];
              if (Array.isArray(localReturn)) {
                let mergedReturn = [...serverReturn];
                let returnUpdated = false;

                const statusPriority = {
                  "Pending": 1,
                  "Approved": 2,
                  "Rejected": 2,
                  "Completed": 3,
                  "Refunded": 3
                };

                localReturn.forEach(lr => {
                  if (!lr || !lr.id) return;
                  const idx = mergedReturn.findIndex(sr => sr.id === lr.id);
                  if (idx === -1) {
                    mergedReturn.push(lr);
                    returnUpdated = true;
                  } else {
                    const sr = mergedReturn[idx];
                    const localPri = statusPriority[lr.status] || 1;
                    const serverPri = statusPriority[sr.status] || 1;
                    
                    if (localPri > serverPri) {
                      mergedReturn[idx] = { ...sr, ...lr };
                      returnUpdated = true;
                    } else if (serverPri > localPri) {
                      data.chronex_returns[idx] = { ...lr, ...sr };
                    }
                  }
                });

                if (returnUpdated) {
                  syncPayload["chronex_returns"] = mergedReturn;
                  data.chronex_returns = mergedReturn;
                  needsSync = true;
                }
              }
            } catch (e) {}
          }

          // Corporate Inquiries
          const localCorpStr = localStorage.getItem("chronex_corporate_inquiries");
          if (localCorpStr) {
            try {
              const localCorp = JSON.parse(localCorpStr);
              const serverCorp = data.chronex_corporate_inquiries || [];
              if (Array.isArray(localCorp) && localCorp.length > 0) {
                const missing = localCorp.filter(lc => lc && lc.id && !serverCorp.some(sc => sc.id === lc.id));
                if (missing.length > 0) {
                  const merged = [...serverCorp, ...missing];
                  syncPayload["chronex_corporate_inquiries"] = merged;
                  data.chronex_corporate_inquiries = merged;
                  needsSync = true;
                }
              }
            } catch (e) {}
          }

          // Warranty Ledger merging
          const localLedgerStr = localStorage.getItem("chronex_warranty_ledger");
          if (localLedgerStr) {
            try {
              const localLedger = JSON.parse(localLedgerStr);
              const serverLedger = data.chronex_warranty_ledger || [];
              if (Array.isArray(localLedger)) {
                let mergedLedger = [...serverLedger];
                let ledgerUpdated = false;

                localLedger.forEach(ll => {
                  if (!ll || !ll.serial) return;
                  const idx = mergedLedger.findIndex(sl => sl.serial.toUpperCase() === ll.serial.toUpperCase());
                  if (idx === -1) {
                    mergedLedger.push(ll);
                    ledgerUpdated = true;
                  }
                });

                if (ledgerUpdated) {
                  syncPayload["chronex_warranty_ledger"] = mergedLedger;
                  data.chronex_warranty_ledger = mergedLedger;
                  needsSync = true;
                }
              }
            } catch (e) {}
          }

          // Warranty Valid Dictionary merging
          const localDictStr = localStorage.getItem("chronex_warranty_valid_dict");
          if (localDictStr) {
            try {
              const localDict = JSON.parse(localDictStr);
              const serverDict = data.chronex_warranty_valid_dict || {};
              if (localDict && typeof localDict === 'object') {
                let mergedDict = { ...serverDict };
                let dictUpdated = false;

                Object.keys(localDict).forEach(k => {
                  const key = k.toUpperCase().trim();
                  if (!mergedDict[key]) {
                    mergedDict[key] = localDict[k];
                    dictUpdated = true;
                  }
                });

                if (dictUpdated) {
                  syncPayload["chronex_warranty_valid_dict"] = mergedDict;
                  data.chronex_warranty_valid_dict = mergedDict;
                  needsSync = true;
                }
              }
            } catch (e) {}
          }

          if (needsSync) {
            saveMultipleToDb(syncPayload);
          }

          // Synchronize localStorage cache
          Object.keys(data).forEach(key => {
            const value = data[key];
            const strVal = typeof value === 'object' ? JSON.stringify(value) : String(value);
            localStorage.setItem(key, strVal);
          });

          // Hydrate React States in-memory
          if (data.chronex_products) {
            const normalized = data.chronex_products.map(p => {
              const images = (p.images && Array.isArray(p.images) && p.images.length > 0)
                ? p.images
                : [p.imageUrl || p.image || "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800"];
              return {
                ...p,
                images,
                imageUrl: images[0],
                stock: p.stock ?? Math.floor(Math.random() * 10) + 4,
                reviews: (p.reviews || []).map(r => ({ ...r, status: r.status || "Approved" }))
              };
            });
            setProducts(normalized);
          }
          if (data.chronex_promo_banner) setPromoBanner(data.chronex_promo_banner);
          if (data.chronex_wishlist) setWishlist(data.chronex_wishlist);
          if (data.chronex_cart) setCartItems(data.chronex_cart);
          if (data.chronex_orders) setOrders(data.chronex_orders);
          if (data.chronex_services) setServiceRequests(data.chronex_services);
          if (data.chronex_appointments) setAppointments(data.chronex_appointments);
          if (data.chronex_recently_viewed) setRecentlyViewed(data.chronex_recently_viewed);
          if (data.chronex_compare) setCompareList(data.chronex_compare);
          if (data.chronex_coupons) setCoupons(data.chronex_coupons);
          if (data.chronex_warranty_ledger) setWarrantyLedger(data.chronex_warranty_ledger);
          if (data.chronex_warranty_valid_dict) setWarrantyValidDict(data.chronex_warranty_valid_dict);
          if (data.chronex_users) {
            setUsersList(data.chronex_users);
            // Self-healing: if the user is logged in locally in browser but missing on the server db (e.g. after a redeploy/restart), automatically re-register them
            const savedUser = localStorage.getItem("chronex_current_user");
            if (savedUser) {
              try {
                const localUser = JSON.parse(savedUser);
                if (localUser && localUser.email) {
                  const exists = data.chronex_users.some(u => u.email === localUser.email);
                  if (!exists) {
                    const updatedUsers = [...data.chronex_users, localUser];
                    setUsersList(updatedUsers);
                    saveToDb("chronex_users", JSON.stringify(updatedUsers));
                  }
                }
              } catch (e) {}
            }
          }
          if (data.chronex_tradeins) setTradeInRequests(data.chronex_tradeins);
          if (data.chronex_returns) setReturnRequests(data.chronex_returns);
          if (data.chronex_addresses) setSavedAddresses(data.chronex_addresses);
          if (data.chronex_showrooms) setShowrooms(data.chronex_showrooms);
        }
      })
      .catch(e => console.log("Backend not reachable", e));
  };

  useEffect(() => {
    refreshDbData();
  }, []);


  // Currency Formatting Helper
  const formatPrice = (priceInINR) => {
    switch (currency) {
      case "USD": return `$${Math.round(priceInINR / 83.5).toLocaleString("en-US")}`;
      case "EUR": return `€${Math.round(priceInINR / 90.2).toLocaleString("en-DE")}`;
      case "GBP": return `£${Math.round(priceInINR / 105.8).toLocaleString("en-GB")}`;
      case "AED": return `${Math.round(priceInINR / 22.7).toLocaleString("en-AE")} د.إ`;
      default: return `₹${priceInINR.toLocaleString("en-IN")}`;
    }
  };

  const seedDatabase = () => {
    if (localStorage.getItem("chronex_seeded_v5") === "true") return;

    console.log("🌱 Seeding database with dynamic user-side entries...");

    const usersToRegister = [
      { name: "Kabir Sharma", email: "kabir.sharma@gmail.com", phone: "+91 87492 01830" },
      { name: "Ananya Iyer", email: "ananya.iyer@outlook.com", phone: "+91 98321 04850" },
      { name: "Vikram Malhotra", email: "vikram.malhotra@yahoo.com", phone: "+91 74892 04820" },
      { name: "Meera Reddy", email: "meera.reddy@gmail.com", phone: "+91 93820 18402" },
      { name: "Aditya Sen", email: "aditya.sen@live.com", phone: "+91 88320 19302" },
      { name: "Nisha Patel", email: "nisha.patel@gmail.com", phone: "+91 91234 56789" },
      { name: "Rajesh Gupta", email: "rajesh.gupta@yahoo.com", phone: "+91 98765 01234" },
      { name: "Shreya Joshi", email: "shreya.joshi@gmail.com", phone: "+91 99887 76655" },
      { name: "Karan Verma", email: "karan.verma@outlook.com", phone: "+91 88776 65544" },
      { name: "Diya Kapoor", email: "diya.kapoor@gmail.com", phone: "+91 77665 54433" }
    ];

    const usersListTemp = [];
    const ordersTemp = [];
    const appointmentsTemp = [];
    const servicesTemp = [];
    const tradeinsTemp = [];
    const returnsTemp = [];

    // Load any existing users to prevent overwriting Hetarthmehta6850
    const savedUsers = localStorage.getItem("chronex_users");
    if (savedUsers) {
      try {
        const parsed = JSON.parse(savedUsers);
        if (Array.isArray(parsed)) usersListTemp.push(...parsed);
      } catch (e) {}
    }

    usersToRegister.forEach((u, index) => {
      // 1. Add User
      if (!usersListTemp.some(existing => existing.email.toLowerCase() === u.email.toLowerCase())) {
        usersListTemp.push({ name: u.name, email: u.email, role: "customer", phone: u.phone });
      }

      // Pre-set loyalty points and wallet balances in localStorage
      const points = [1200, 2800, 650, 350, 150, 500, 900, 450, 1500, 800][index];
      const wallet = [15000, 45000, 5000, 2500, 1000, 12000, 8500, 4000, 30000, 9000][index];
      localStorage.setItem(`chronex_points_${u.email}`, String(points));
      localStorage.setItem(`chronex_wallet_${u.email}`, String(wallet));

      // 2. Orders (Simulate placing order)
      const watchName = ["Submariner Date", "Speedmaster Professional", "Monaco Calibre 11", "Prospex Alpinist", "Black Bay Fifty-Eight", "Santos de Cartier", "HydroConquest", "Datejust 41", "Constellation", "PRX Powermatic 80"][index];
      const watchBrand = ["Rolex", "Omega", "TAG Heuer", "Seiko", "Tudor", "Cartier", "Longines", "Rolex", "Omega", "Tissot"][index];
      const price = [950000, 450000, 180000, 95000, 250000, 380000, 120000, 720000, 210000, 65000][index];
      const paymentMethod = ["Credit Card", "Bank Transfer", "UPI", "Cash on Delivery", "Credit Card", "UPI", "Debit Card", "Bank Transfer", "UPI", "Cash on Delivery"][index];
      const paymentDetails = ["Visa ending in 4829", "HDFC Transaction ID 84920", "Google Pay UPI Ref 7291038", "Verified COD Request", "Mastercard ending in 9012", "Paytm UPI Ref 9283018", "Visa Debit ending in 7731", "ICICI Transaction ID 93021", "PhonePe UPI Ref 8301928", "COD Request"][index];
      const status = ["Delivered", "Shipped", "Processing", "Delivered", "Delivered", "Processing", "Shipped", "Processing", "Delivered", "Processing"][index];

      const orderId = `CHX-${Math.floor(100000 + Math.random() * 900000)}`;
      ordersTemp.push({
        id: orderId,
        date: new Date(Date.now() - index * 3 * 24 * 60 * 60 * 1000).toISOString(),
        customer: { name: u.name, email: u.email, phone: u.phone },
        items: [{ id: `p_${index}`, name: watchName, brand: watchBrand, price: price, quantity: 1, image: "" }],
        total: price,
        paymentMethod,
        paymentDetails,
        orderStatus: status
      });

      // 3. Appointments (Simulate booking showroom visit)
      const showroom = ["vadodara", "mumbai", "delhi", "bangalore"][index % 4];
      const time = ["11:30 AM", "02:30 PM", "04:00 PM", "05:30 PM", "12:00 PM", "03:00 PM", "01:30 PM", "06:00 PM", "04:30 PM", "11:00 AM"][index];
      const appStatus = ["Confirmed", "Confirmed", "Confirmed", "Completed", "Pending Approval", "Completed", "Confirmed", "Cancelled", "Confirmed", "Completed"][index];
      const notes = [
        "Interested in trying out the Rolex Submariner Date.",
        "Would like to view the Cartier Santos and Jaeger-LeCoultre Reverso.",
        "Looking for a luxury sports chronograph. Please keep options ready.",
        "Gift shopping for husband. Omega or Tudor preferred.",
        "First high-end watch purchase. Needs custom consulting.",
        "Wants to view ladies Diamond collection.",
        "Corporate order presentation for 10 pieces.",
        "Sizing request for Cartier Tank.",
        "Trade-in evaluation in showroom.",
        "Omega Speedmaster viewing."
      ][index];

      appointmentsTemp.push({
        id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(Date.now() + (index % 2 === 0 ? 1 : -1) * index * 24 * 60 * 60 * 1000).toISOString(),
        name: u.name,
        phone: u.phone,
        email: u.email,
        showroomId: showroom,
        time,
        purpose: notes,
        status: appStatus
      });

      // 4. Service Requests (Simulate submitting repair request)
      const serviceType = ["Complete Overhaul", "Water Resistance Restoral", "Polishing & Refinishing", "Crystal Replacement", "Movement Calibration", "Strap Customization", "Battery Replacement", "Battery & Seal Service", "Complete Restoration", "Chronograph Repair"][index];
      const serviceStatus = ["In Progress", "Awaiting Parts", "Delivered", "Completed", "Ticket Created", "Delivered", "Delivered", "Completed", "Under Evaluation", "Awaiting Customer Approval"][index];
      const issue = [
        "Gaining 15 seconds per day, needs regulation and movement lubrication.",
        "Condensation inside glass after swimming. Gaskets probably worn out.",
        "Deep desk-diving scratches on the bracelet and case side.",
        "Sapphire glass has a minor chip near the 2 o'clock position.",
        "Bezel alignment is slightly off center. Movement runs fine.",
        "Change steel bracelet to premium brown alligator leather strap.",
        "Quartz movement stopped running last week. Needs new battery.",
        "Replace battery and pressure test for water resistance.",
        "Vintage piece inherited, hasn't run in 10 years. Needs full service.",
        "Top pusher is sticky and chronograph second hand doesn't reset to zero."
      ][index];

      servicesTemp.push({
        id: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(Date.now() - index * 2 * 24 * 60 * 60 * 1000).toISOString(),
        name: u.name,
        phone: u.phone,
        watchBrand,
        watchModel: watchName,
        serviceType,
        issueDescription: issue,
        status: serviceStatus
      });

      // 5. Trade-Ins (Simulate submitting trade-in evaluation)
      const condition = ["Good", "Excellent", "Very Good", "Excellent", "Fair", "Good", "Excellent", "Good", "Excellent", "Very Good"][index];
      const papers = ["Both", "Both", "Box Only", "Both", "None", "Papers Only", "Both", "Both", "Both", "Both"][index];
      const expectedVal = ["₹25,000", "₹3,50,000", "₹1,80,000", "₹35,000", "₹40,000", "₹60,000", "₹30,000", "₹85,000", "₹1,50,000", "₹1,10,000"][index];
      const tradeStatus = ["Pending", "Accepted", "Pending", "Accepted", "Rejected", "Accepted", "Pending", "Pending", "Accepted", "Pending"][index];

      tradeinsTemp.push({
        id: `TRD-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(Date.now() - index * 2 * 24 * 60 * 60 * 1000).toISOString(),
        name: u.name,
        email: u.email,
        phone: u.phone,
        brand: watchBrand === "Rolex" ? "Omega" : "Rolex",
        model: watchName === "Submariner Date" ? "Speedmaster" : "Seamaster",
        purchaseYear: String(2015 + (index % 8)),
        condition,
        boxPapers: papers,
        estimatedRange: [
          "₹22,000 - ₹28,000",
          "₹3,20,000 - ₹3,80,000",
          "₹1,60,000 - ₹2,00,000",
          "₹30,000 - ₹40,000",
          "₹35,000 - ₹45,000",
          "₹55,000 - ₹65,000",
          "₹25,000 - ₹35,000",
          "₹75,000 - ₹95,000",
          "₹1,30,000 - ₹1,70,000",
          "₹95,000 - ₹1,25,000"
        ][index],
        image: "",
        status: tradeStatus
      });

      // 6. Returns (Simulate return requests)
      const returnType = ["Exchange", "Replacement", "Replacement", "Refund", "Exchange", "Refund", "Replacement", "Refund", "Replacement", "Replacement"][index];
      const returnStatus = ["Pending", "Approved", "Completed", "Rejected", "Pending", "Approved", "Pending", "Completed", "Approved", "Pending"][index];
      const returnReason = [
        "Sizing issue / watch too large for wrist",
        "Found minor defect on bezel alignment",
        "Incorrect color shipped (wanted green, got black)",
        "Changed mind, want to upgrade to Rolex instead",
        "Bracelet too small, need extra links",
        "Gift recipient already owns similar model",
        "Crown feels loose and hard to wind",
        "Dial color looks different in daylight",
        "Minor scratch on clasp on arrival",
        "Rotor makes rattling sound inside case"
      ][index];

      returnsTemp.push({
        id: `RET-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(Date.now() - index * 2 * 24 * 60 * 60 * 1000).toISOString(),
        orderId: orderId,
        name: u.name,
        email: u.email,
        watchName,
        reason: returnReason,
        type: returnType,
        status: returnStatus,
        total: price
      });
    });

    // Also register Admin User
    if (!usersListTemp.some(existing => existing.email.toLowerCase() === "admin@chronex.in")) {
      usersListTemp.push({ name: "Admin User", email: "admin@chronex.in", role: "admin", phone: "+91 83206 06850" });
    }
    localStorage.setItem("chronex_points_admin@chronex.in", "9999");
    localStorage.setItem("chronex_wallet_admin@chronex.in", "1000000");

    // Save to states
    setUsersList(usersListTemp);
    setOrders(ordersTemp);
    setAppointments(appointmentsTemp);
    setServiceRequests(servicesTemp);
    setTradeInRequests(tradeinsTemp);
    setReturnRequests(returnsTemp);

    // Save to Database
    saveToDb("chronex_users", JSON.stringify(usersListTemp));
    saveToDb("chronex_orders", JSON.stringify(ordersTemp));
    saveToDb("chronex_appointments", JSON.stringify(appointmentsTemp));
    saveToDb("chronex_services", JSON.stringify(servicesTemp));
    saveToDb("chronex_tradeins", JSON.stringify(tradeinsTemp));
    saveToDb("chronex_returns", JSON.stringify(returnsTemp));

    localStorage.setItem("chronex_seeded_v5", "true");
    console.log("🌱 Database seeded successfully!");
  };

  // Load database from localStorage on mount
  useEffect(() => {
    // Load currentUser settings if present
    const savedUser = localStorage.getItem("chronex_current_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user && user.email) {
          setCurrentUser(user);
          // Load loyalty points
          const savedPoints = localStorage.getItem(`chronex_points_${user.email}`) || "250"; // default mock points
          setLoyaltyPoints(Number(savedPoints));
          const savedWallet = localStorage.getItem(`chronex_wallet_${user.email}`) || "0";
          setWalletBalance(Number(savedWallet));
          
          // Load referral data from the users database list or local storage
          const usersListLocal = JSON.parse(localStorage.getItem("chronex_users") || "[]");
          const dbUser = usersListLocal.find(u => u.email === user.email);
          const savedRefCode = dbUser?.referralCode || localStorage.getItem(`chronex_ref_code_${user.email}`);
          if (savedRefCode) {
            setReferralCode(savedRefCode);
            localStorage.setItem(`chronex_ref_code_${user.email}`, savedRefCode);
          }
          
          const savedReferrals = localStorage.getItem(`chronex_referrals_${user.email}`);
          if (savedReferrals) setReferrals(JSON.parse(savedReferrals));
          
          const savedEarnings = localStorage.getItem(`chronex_ref_earnings_${user.email}`);
          if (savedEarnings) setReferralEarnings(Number(savedEarnings));
          
          // Load subscription
          const savedSub = localStorage.getItem(`chronex_sub_${user.email}`);
          if (savedSub) setSubscription(JSON.parse(savedSub));
        } else {
          setCurrentUser(null);
        }
      } catch (e) {}
    }
    
    // Load corporate inquiries
    const savedInquiries = localStorage.getItem("chronex_corporate_inquiries");
    if (savedInquiries) {
      try {
        setCorporateInquiries(JSON.parse(savedInquiries));
      } catch (e) {}
    }
  }, []);


  const toggleWishlist = (product) => {
    let updatedWishlist;
    if (wishlist.find(item => item.id === product.id)) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }
    setWishlist(updatedWishlist);
    saveToDb("chronex_wishlist", JSON.stringify(updatedWishlist));
  };

  const saveCartToStorage = (newCart) => {
    setCartItems(newCart);
    saveToDb("chronex_cart", JSON.stringify(newCart));
  };

  const addToCart = (productId, quantity = 1) => {
    const newCart = { ...cartItems };
    if (newCart[productId]) {
      newCart[productId] += quantity;
    } else {
      newCart[productId] = quantity;
    }
    saveCartToStorage(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = { ...cartItems };
    delete newCart[productId];
    saveCartToStorage(newCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = { ...cartItems };
    newCart[productId] = quantity;
    saveCartToStorage(newCart);
  };

  const clearCart = () => {
    saveCartToStorage({});
  };

  const addRecentlyViewed = (productId) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter(id => id !== productId);
      const updated = [productId, ...filtered].slice(0, 5); // Keep max 5
      saveToDb("chronex_recently_viewed", JSON.stringify(updated));
      return updated;
    });
  };

  const getWhatsAppOrderLink = (customerDetails, cart) => {
    const phone = "919876543210";
    
    let itemsText = "";
    let subtotal = 0;
    let index = 1;

    for (const productId in cart) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        const qty = cart[productId];
        const cost = product.price * qty;
        itemsText += `${index}. ${product.brand} ${product.name} (Qty: ${qty}) - ₹${cost.toLocaleString("en-IN")}\n`;
        subtotal += cost;
        index++;
      }
    }

    const message = `*NEW ORDER ALERT*\n\n*Customer Details:*\nName: ${customerDetails.firstName} ${customerDetails.lastName}\nEmail: ${customerDetails.email}\nPhone: ${customerDetails.phone}\nAddress: ${customerDetails.address}, ${customerDetails.cityState}, ${customerDetails.pincode}\n\n*Order Items:*\n${itemsText}\n*Total Value:* ₹${subtotal.toLocaleString("en-IN")}\n\nPlease confirm my order.`;
    
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  };

  const getCartCount = () => {
    let count = 0;
    for (const key in cartItems) {
      count += cartItems[key];
    }
    return count;
  };

  const getCartTotal = () => {
    let total = 0;
    for (const key in cartItems) {
      const product = products.find(p => String(p.id) === String(key));
      if (product) total += product.price * cartItems[key];
    }
    return total;
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem("chronex_compare");
  };

  const addNewsletterSubscriber = (email) => {
    const trimmedEmail = email?.trim().toLowerCase();
    if (!trimmedEmail) return;
    if (!newsletterSubscribers.some(s => s.email.toLowerCase() === trimmedEmail)) {
      const updated = [...newsletterSubscribers, { email: trimmedEmail, date: new Date().toISOString() }];
      setNewsletterSubscribers(updated);
      saveToDb("chronex_newsletter", JSON.stringify(updated));
    }
  };

  const placeOrder = (customerDetails, paymentMethod, paymentDetails) => {
    // eslint-disable-next-line react-hooks/purity
    const orderId = `CHX-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const orderedItems = [];
    for (const productId in cartItems) {
      const product = products.find((p) => String(p.id) === String(productId));
      if (product) {
        orderedItems.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity: cartItems[productId],
          image: (product.images && product.images.length > 0) ? product.images[0] : (product.imageUrl || product.image || "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800")
        });
      }
    }

    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      customer: customerDetails,
      items: orderedItems,
      total: getCartTotal(),
      paymentMethod,
      paymentDetails,
      orderStatus: "Processing"
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrdersToStorage(updatedOrders);
    clearCart();
    return orderId;
  };

  const saveOrdersToStorage = (updatedOrders) => {
    setOrders(updatedOrders);
    saveToDb("chronex_orders", JSON.stringify(updatedOrders));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => 
      order.id === orderId ? { ...order, orderStatus: newStatus, status: newStatus } : order
    );
    setOrders(updatedOrders);
    saveToDb("chronex_orders", JSON.stringify(updatedOrders));
  };

  const saveProductsToStorage = (updatedProducts) => {
    setProducts(updatedProducts);
    saveToDb("chronex_products", JSON.stringify(updatedProducts));
  };

  const addProduct = (product) => {
    const images = (product.images && Array.isArray(product.images) && product.images.length > 0)
      ? product.images
      : [product.imageUrl || product.image || "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800"];
    const normalizedProduct = {
      ...product,
      images,
      imageUrl: images[0],
      id: Date.now().toString()
    };
    const newProducts = [...products, normalizedProduct];
    saveProductsToStorage(newProducts);
  };

  const editProduct = (productId, updatedProduct) => {
    const images = (updatedProduct.images && Array.isArray(updatedProduct.images) && updatedProduct.images.length > 0)
      ? updatedProduct.images
      : [updatedProduct.imageUrl || updatedProduct.image || "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800"];
    const normalizedProduct = {
      ...updatedProduct,
      images,
      imageUrl: images[0]
    };
    const newProducts = products.map((p) => (p.id === productId ? { ...p, ...normalizedProduct } : p));
    saveProductsToStorage(newProducts);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    saveProductsToStorage(updatedProducts);
  };

  const toggleCompare = (productId) => {
    setCompareList((prev) => {
      let updated;
      if (prev.includes(productId)) {
        updated = prev.filter(id => id !== productId);
      } else {
        if (prev.length >= 3) {
          updated = prev; // Max 3 items allowed
        } else {
          updated = [...prev, productId];
        }
      }
      saveToDb("chronex_compare", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => {
      const updated = prev.filter(id => id !== productId);
      saveToDb("chronex_compare", JSON.stringify(updated));
      return updated;
    });
  };

  const removeNewsletterSubscriber = (email) => {
    const updated = newsletterSubscribers.filter(s => s.email !== email);
    setNewsletterSubscribers(updated);
    saveToDb("chronex_newsletter", JSON.stringify(updated));
  };

  const updateAppointmentStatus = (bookingId, newStatus) => {
    const updatedBookings = appointments.map((bkg) => {
      if (bkg.id === bookingId) {
        return { ...bkg, status: newStatus };
      }
      return bkg;
    });
    saveAppointmentsToStorage(updatedBookings);
  };

  const updateProductStock = (productId, change) => {
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return { ...p, stock: Math.max(0, (p.stock || 0) + change) };
      }
      return p;
    });
    saveProductsToStorage(updatedProducts);
  };

  const cancelOrder = (orderId) => {
    const updatedOrders = orders.map(o => {
      if (o.id === orderId) {
        o.items.forEach(item => {
          updateProductStock(item.id, item.quantity);
        });
        return { ...o, orderStatus: "Cancelled" };
      }
      return o;
    });
    setOrders(updatedOrders);
    saveToDb("chronex_orders", JSON.stringify(updatedOrders));
  };

  const submitReturnRequest = (returnDetails) => {
    const returnId = `RET-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReturn = {
      id: returnId,
      date: new Date().toISOString(),
      status: "Pending",
      ...returnDetails
    };
    const updated = [newReturn, ...returnRequests];
    setReturnRequests(updated);
    saveToDb("chronex_returns", JSON.stringify(updated));
    return returnId;
  };

  const updateReturnStatus = (returnId, newStatus) => {
    const updated = returnRequests.map(r => r.id === returnId ? { ...r, status: newStatus } : r);
    setReturnRequests(updated);
    saveToDb("chronex_returns", JSON.stringify(updated));
  };

  const approveReview = (productId, reviewId) => {
    const updatedProducts = products.map((p) => {
      if (p.id === productId) {
        const updatedReviews = (p.reviews || []).map(r => r.id === reviewId ? { ...r, status: "Approved" } : r);
        const approvedReviews = updatedReviews.filter(r => r.status === "Approved");
        const newRating = approvedReviews.length > 0
          ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
          : p.rating;
        return { ...p, reviews: updatedReviews, rating: Number(newRating) };
      }
      return p;
    });
    saveProductsToStorage(updatedProducts);
  };

  const rejectReview = (productId, reviewId) => {
    const updatedProducts = products.map((p) => {
      if (p.id === productId) {
        const updatedReviews = (p.reviews || []).map(r => r.id === reviewId ? { ...r, status: "Rejected" } : r);
        const approvedReviews = updatedReviews.filter(r => r.status === "Approved");
        const newRating = approvedReviews.length > 0
          ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
          : p.rating;
        return { ...p, reviews: updatedReviews, rating: Number(newRating) };
      }
      return p;
    });
    saveProductsToStorage(updatedProducts);
  };

  const submitTradeIn = (tradeInData) => {
    const tradeId = `TRD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRequest = {
      id: tradeId,
      date: new Date().toISOString(),
      status: "Pending",
      ...tradeInData
    };
    const updated = [newRequest, ...tradeInRequests];
    setTradeInRequests(updated);
    saveToDb("chronex_tradeins", JSON.stringify(updated));
    return tradeId;
  };

  const addAppointment = (appointmentData) => {
    // eslint-disable-next-line react-hooks/purity
    const bookingId = `BKG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: bookingId,
      status: "Pending", // Pending -> Confirmed -> Completed
      ...appointmentData
    };
    const updatedBookings = [newBooking, ...appointments];
    saveAppointmentsToStorage(updatedBookings);
  };

  const saveAppointmentsToStorage = (updatedBookings) => {
    setAppointments(updatedBookings);
    saveToDb("chronex_appointments", JSON.stringify(updatedBookings));
  };

  const updateTradeInStatus = (tradeId, newStatus, counterOfferVal) => {
    const updated = tradeInRequests.map((t) => {
      if (t.id === tradeId) {
        const res = { ...t, status: newStatus };
        if (counterOfferVal !== undefined) {
          res.counterOffer = counterOfferVal;
        }
        if (newStatus === "Accepted") {
          const userEmail = t.email;
          const currentPoints = Number(localStorage.getItem(`chronex_points_${userEmail}`) || "250");
          saveToDb(`chronex_points_${userEmail}`, String(currentPoints + 1000));
          if (currentUser && currentUser.email === userEmail) {
            setLoyaltyPoints(currentPoints + 1000);
          }
        }
        return res;
      }
      return t;
    });
    setTradeInRequests(updated);
    saveToDb("chronex_tradeins", JSON.stringify(updated));
  };

  const cancelAppointment = (bookingId) => {
    updateAppointmentStatus(bookingId, "Cancelled");
  };

  const cancelServiceRequest = (ticketId) => {
    updateServiceStatus(ticketId, "Cancelled");
  };

  const addServiceRequest = (requestData) => {
    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRequest = {
      id: ticketId,
      date: new Date().toISOString(),
      status: "Ticket Created",
      ...requestData
    };
    const updated = [newRequest, ...serviceRequests];
    setServiceRequests(updated);
    saveToDb("chronex_services", JSON.stringify(updated));
    return ticketId;
  };

  const updateServiceStatus = (ticketId, newStatus) => {
    const updated = serviceRequests.map((s) => 
      s.id === ticketId ? { ...s, status: newStatus } : s
    );
    setServiceRequests(updated);
    saveToDb("chronex_services", JSON.stringify(updated));
  };

  const addSavedAddress = (address) => {
    const newAddr = {
      id: `addr_${Date.now()}`,
      isDefault: savedAddresses.length === 0,
      ...address
    };
    const updated = [...savedAddresses, newAddr];
    setSavedAddresses(updated);
    saveToDb("chronex_addresses", JSON.stringify(updated));
  };

  const deleteSavedAddress = (id) => {
    const updated = savedAddresses.filter(a => a.id !== id);
    setSavedAddresses(updated);
    saveToDb("chronex_addresses", JSON.stringify(updated));
  };

  const getWhatsAppLink = (watchName, watchPrice, watchBrand, pincode = "") => {
    const phone = "919876543210";
    const pincodeText = pincode ? `to Pincode: *${pincode}*` : "to my location";
    
    const message = `Namaste Chronex Vadodara! I am visiting your website and I am interested in this timepiece:
    
- *Brand:* ${watchBrand}
- *Model:* ${watchName}
- *Price:* ₹${watchPrice.toLocaleString("en-IN")}

I would like to enquire about:
1. Availability at your Alkapuri showroom.
2. Insured Pan-India Shipping ${pincodeText}.

Please let me know how to proceed.`;
    
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  };

  const addShowroom = (showroom) => {
    const updated = [...showrooms, { ...showroom, id: showroom.city.toLowerCase().replace(/\s+/g, '-') }];
    setShowrooms(updated);
    saveToDb("chronex_showrooms", JSON.stringify(updated));
  };

  const updateShowroom = (id, updatedShowroom) => {
    const updated = showrooms.map(s => s.id === id ? { ...s, ...updatedShowroom } : s);
    setShowrooms(updated);
    saveToDb("chronex_showrooms", JSON.stringify(updated));
  };

  const deleteShowroom = (id) => {
    const updated = showrooms.filter(s => s.id !== id);
    setShowrooms(updated);
    saveToDb("chronex_showrooms", JSON.stringify(updated));
  };

  const resetShowrooms = () => {
    setShowrooms(defaultShowrooms);
    saveToDb("chronex_showrooms", JSON.stringify(defaultShowrooms));
  };

  const updateUserLoyaltyPoints = (email, newPoints) => {
    saveToDb(`chronex_points_${email}`, String(newPoints));
    if (currentUser && currentUser.email === email) {
      setLoyaltyPoints(newPoints);
    }
    setUsersList(prev => [...prev]);
  };

  const cancelUserSubscription = (email) => {
    if (currentUser && currentUser.email === email) {
      setSubscription(prev => prev ? { ...prev, status: 'Cancelled' } : null);
    }
    localStorage.setItem(`chronex_sub_${email}`, JSON.stringify({ status: 'Cancelled' }));
    setUsersList(prev => [...prev]);
  };

  const processRefund = (returnId) => {
    const updated = returnRequests.map(r => r.id === returnId ? { ...r, status: "Completed" } : r);
    setReturnRequests(updated);
    saveToDb("chronex_returns", JSON.stringify(updated));
  };

  const logout = () => {
    setCurrentUser(null);
    setLoyaltyPoints(0);
    localStorage.removeItem("chronex_current_user");
  };

  const addLoyaltyPoints = (points) => {
    if (!currentUser) return;
    const newPoints = loyaltyPoints + points;
    setLoyaltyPoints(newPoints);
    saveToDb(`chronex_points_${currentUser.email}`, String(newPoints));
  };

  const login = (email, password) => {
    // Validate email format strictly (e.g., must contain a domain extension like .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { success: false, message: "Please enter a valid email address (e.g. name@example.com)" };
    
    // Check if users database exists in storage
    const users = JSON.parse(localStorage.getItem("chronex_users") || "[]");
    let user = users.find(u => u.email === email);
    
    if (!user) {
      // For demo convenience, automatically register new emails
      user = { name: email.split("@")[0], email, role: email.startsWith("admin") ? "admin" : "customer" };
      users.push(user);
      saveToDb("chronex_users", JSON.stringify(users));
      setUsersList(users);
    }
    
    setCurrentUser(user);
    localStorage.setItem("chronex_current_user", JSON.stringify(user));
    
    // Load points
    const savedPoints = localStorage.getItem(`chronex_points_${email}`) || "250";
    setLoyaltyPoints(Number(savedPoints));

    // Load referral code from user object or local storage
    if (user.referralCode) {
      setReferralCode(user.referralCode);
      localStorage.setItem(`chronex_ref_code_${email}`, user.referralCode);
    } else {
      const savedRefCode = localStorage.getItem(`chronex_ref_code_${email}`);
      if (savedRefCode) setReferralCode(savedRefCode);
      else setReferralCode(null);
    }
    return { success: true, user };
  };

  const register = (name, email, password, appliedRefCode) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !name) return { success: false, message: "Invalid fields or email format" };
    
    const users = JSON.parse(localStorage.getItem("chronex_users") || "[]");
    if (users.find(u => u.email === email)) return { success: false, message: "Email already exists" };

    const user = { name, email, role: email.startsWith("admin") ? "admin" : "customer" };
    users.push(user);
    saveToDb("chronex_users", JSON.stringify(users));
    setUsersList(users);
    
    setCurrentUser(user);
    localStorage.setItem("chronex_current_user", JSON.stringify(user));
    setLoyaltyPoints(250); // Welcome bonus points
    localStorage.setItem(`chronex_points_${email}`, "250");
    localStorage.setItem(`chronex_wallet_${email}`, "0");

    // Process referral code if entered
    if (appliedRefCode) {
      let parsedRefCode = appliedRefCode.trim();
      if (parsedRefCode.includes("ref=")) {
        const parts = parsedRefCode.split("ref=");
        parsedRefCode = parts[parts.length - 1];
      }

      // Find user who owns this referral code
      const referrer = users.find(u => {
        const uCode = localStorage.getItem(`chronex_ref_code_${u.email}`);
        return uCode === parsedRefCode;
      });

      if (referrer) {
        // Add new user to referrer's list of referrals
        const refKey = `chronex_referrals_${referrer.email}`;
        const currentRefs = JSON.parse(localStorage.getItem(refKey) || "[]");
        if (!currentRefs.some(r => r.email === email)) {
          const updatedRefs = [...currentRefs, { email: email, date: new Date().toLocaleDateString("en-IN"), status: "Completed" }];
          
          // Increment referrer's earnings
          const earnKey = `chronex_ref_earnings_${referrer.email}`;
          const currentEarnings = Number(localStorage.getItem(earnKey) || "0");
          const newEarnings = currentEarnings + 500;

          // Increment referrer's wallet balance
          const walletKey = `chronex_wallet_${referrer.email}`;
          const currentWallet = Number(localStorage.getItem(walletKey) || "0");
          const newWallet = currentWallet + 500;

          // Sync payload to db
          const payload = {};
          payload[refKey] = updatedRefs;
          payload[earnKey] = String(newEarnings);
          payload[walletKey] = String(newWallet);
          saveMultipleToDb(payload);
        }
      }
    }

    return { success: true, user };
  };

  return (
    <ShopContext.Provider
      value={{
        toggleWishlist,
        saveCartToStorage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addRecentlyViewed,
        getWhatsAppOrderLink,
        getCartCount,
        clearCompare,
        addNewsletterSubscriber,
        placeOrder,
        updateOrderStatus,
        saveProductsToStorage,
        addProduct,
        editProduct,
        deleteProduct,
        toggleCompare,
        removeFromCompare,
        removeNewsletterSubscriber,
        updateAppointmentStatus,
        updateProductStock,
        cancelOrder,
        submitReturnRequest,
        updateReturnStatus,
        approveReview,
        rejectReview,
        submitTradeIn,
        addAppointment,
        updateTradeInStatus,
        cancelAppointment,
        cancelServiceRequest,
        addServiceRequest,
        updateServiceStatus,
        addSavedAddress,
        deleteSavedAddress,
        getWhatsAppLink,
        addShowroom,
        updateShowroom,
        deleteShowroom,
        resetShowrooms,
        updateUserLoyaltyPoints,
        cancelUserSubscription,
        processRefund,
        logout,
        addLoyaltyPoints,
        login,
        register,
        products,
        promoBanner,
        wishlist,
        cartItems,
        orders,
        serviceRequests,
        appointments,
        recentlyViewed,
        compareList,
        newsletterSubscribers,
        coupons,
        giftCards,
        restockAlerts,
        blogPosts,
        language,
        theme,
        fontSize,
        highContrast,
        currentUser,
        loyaltyPoints,
        walletBalance,
        referralCode,
        referrals,
        referralEarnings,
        subscription,
        corporateInquiries,
        usersList,
        tradeInRequests,
        returnRequests,
        savedAddresses,
        currency,
        showrooms,
        warrantyLedger,
        warrantyValidDict,
        mintWarrantyCertificate,
        setCurrentUser,
        updatePromoBanner,
        formatPrice,
        refreshDbData,
        t: (key) => locales[language]?.[key] || locales.en[key] || key,
        setCurrency,
        getCartTotal,
        addCoupon: (coupon) => {
          const updated = [...coupons, { ...coupon, active: true }];
          setCoupons(updated);
          saveToDb("chronex_coupons", JSON.stringify(updated));
        },
        deleteCoupon: (code) => {
          const updated = coupons.filter(c => c.code !== code);
          setCoupons(updated);
          saveToDb("chronex_coupons", JSON.stringify(updated));
        },
        addBlogPost: (post) => {
          const updated = [post, ...blogPosts];
          setBlogPosts(updated);
          saveToDb('chronex_blog', JSON.stringify(updated));
        },
        deleteBlogPost: (id) => {
          const updated = blogPosts.filter(p => p.id !== id);
          setBlogPosts(updated);
          saveToDb('chronex_blog', JSON.stringify(updated));
        },
        changeLanguage: (lang) => {
          setLanguage(lang);
          saveToDb('chronex_language', lang);
        },
        changeTheme: (newTheme) => {
          setTheme(newTheme);
          saveToDb('chronex_theme', newTheme);
        },
        changeFontSize: (size) => {
          setFontSize(size);
          saveToDb('chronex_fontsize', size);
        },
        changeHighContrast: (contrast) => {
          setHighContrast(contrast);
          saveToDb('chronex_contrast', contrast);
        },
        generateReferralCode: () => {
          if (!currentUser) return;
          const code = `CHX-${currentUser.name.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
          setReferralCode(code);
          localStorage.setItem(`chronex_ref_code_${currentUser.email}`, code);

          // Update the global users database so the referral code is available to other clients
          const users = JSON.parse(localStorage.getItem("chronex_users") || "[]");
          const updatedUsers = users.map(u => 
            u.email === currentUser.email ? { ...u, referralCode: code } : u
          );
          setUsersList(updatedUsers);
          saveToDb("chronex_users", JSON.stringify(updatedUsers));
        },
        applyReferral: (friendEmail) => {
          if (!currentUser || !referralCode) return;
          const newReferrals = [...referrals, { email: friendEmail, date: new Date().toLocaleDateString("en-IN"), status: "Completed" }];
          setReferrals(newReferrals);
          
          const newEarnings = referralEarnings + 500;
          setReferralEarnings(newEarnings);

          const newWalletBalance = walletBalance + 500;
          setWalletBalance(newWalletBalance);

          // Save updates to local storage and sync to the backend database
          const payload = {};
          payload[`chronex_referrals_${currentUser.email}`] = newReferrals;
          payload[`chronex_ref_earnings_${currentUser.email}`] = String(newEarnings);
          payload[`chronex_wallet_${currentUser.email}`] = String(newWalletBalance);
          saveMultipleToDb(payload);
        },
        cancelSubscription: () => {
          if (!currentUser || !subscription) return;
          const updatedSub = { ...subscription, status: 'Cancelled' };
          setSubscription(updatedSub);
          saveToDb(`chronex_sub_${currentUser.email}`, JSON.stringify(updatedSub));
        },
        submitCorporateInquiry: (inquiry) => {
          const newInquiry = { ...inquiry, id: `CORP-${Math.floor(10000 + Math.random()*90000)}`, date: new Date().toISOString(), status: 'Pending' };
          const updated = [newInquiry, ...corporateInquiries];
          setCorporateInquiries(updated);
          saveToDb('chronex_corporate_inquiries', JSON.stringify(updated));
        }
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;