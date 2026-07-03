import React, { createContext, useState, useEffect } from "react";
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
    const hostIp = window.location.hostname;
    try {
      const parsedData = JSON.parse(data);
      fetch(`http://${hostIp}:3001/api/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: parsedData })
      }).catch(err => console.error("Sync failed:", err));
    } catch (e) {
      fetch(`http://${hostIp}:3001/api/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: data })
      }).catch(err => console.error("Sync failed:", err));
    }
  };

  useEffect(() => {
    const hostIp = window.location.hostname;
    fetch(`http://${hostIp}:3001/api/data`)
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          let updated = false;
          Object.keys(data).forEach(key => {
            const value = data[key];
            const strVal = typeof value === 'object' ? JSON.stringify(value) : String(value);
            if (localStorage.getItem(key) !== strVal) {
              localStorage.setItem(key, strVal);
              updated = true;
            }
          });
          
          if (updated && !sessionStorage.getItem('synced_once')) {
            sessionStorage.setItem('synced_once', 'true');
            window.location.reload();
          }
        }
      })
      .catch(e => console.log("Backend not reachable", e));
  }, []);

  const [products, setProducts] = useState([]);
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
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState({}); // Stores { productId: quantity }
  const [orders, setOrders] = useState([]); // Stores completed order objects
  const [serviceRequests, setServiceRequests] = useState([]); // Stores watch repair tickets
  const [appointments, setAppointments] = useState([]); // Stores showroom bookings
  const [recentlyViewed, setRecentlyViewed] = useState([]); // Stores recently viewed product IDs
  const [compareList, setCompareList] = useState([]); // Stores up to 3 product IDs for comparison
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]); // Stores newsletter subscriber emails
  
  // New States for Phase 3
  const [coupons, setCoupons] = useState([
    { code: "WELCOME10", type: "percentage", value: 10, minOrder: 0 },
    { code: "CHRONEXVIP", type: "flat", value: 10000, minOrder: 100000 },
    { code: "FESTIVE5", type: "percentage", value: 5, minOrder: 0 }
  ]);
  const [giftCards, setGiftCards] = useState([]);
  const [restockAlerts, setRestockAlerts] = useState([]);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("standard");
  const [highContrast, setHighContrast] = useState("standard");
  
  // Phase 4 States
  const [currentUser, setCurrentUser] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  // Business Features States
  const [referralCode, setReferralCode] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [corporateInquiries, setCorporateInquiries] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [tradeInRequests, setTradeInRequests] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [currency, setCurrency] = useState("INR"); // Currency state
  const [showrooms, setShowrooms] = useState(() => {
    try {
      const stored = localStorage.getItem("chronex_showrooms");
      return stored ? JSON.parse(stored) : defaultShowrooms;
    } catch (e) {
      return defaultShowrooms;
    }
  });

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

  // Load database from localStorage on mount
  useEffect(() => {
    // Load currentUser
    const savedUser = localStorage.getItem("chronex_current_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        // Load loyalty points
        const savedPoints = localStorage.getItem(`chronex_points_${user.email}`) || "250"; // default mock points
        setLoyaltyPoints(Number(savedPoints));
        const savedWallet = localStorage.getItem(`chronex_wallet_${user.email}`) || "0";
        setWalletBalance(Number(savedWallet));
        
        // Load referral data
        const savedRefCode = localStorage.getItem(`chronex_ref_code_${user.email}`);
        if (savedRefCode) setReferralCode(savedRefCode);
        
        const savedReferrals = localStorage.getItem(`chronex_referrals_${user.email}`);
        if (savedReferrals) setReferrals(JSON.parse(savedReferrals));
        
        const savedEarnings = localStorage.getItem(`chronex_ref_earnings_${user.email}`);
        if (savedEarnings) setReferralEarnings(Number(savedEarnings));
        
        // Load subscription
        const savedSub = localStorage.getItem(`chronex_sub_${user.email}`);
        if (savedSub) setSubscription(JSON.parse(savedSub));
        
      } catch (e) {}
    }
    
    // Load corporate inquiries
    const savedInquiries = localStorage.getItem("chronex_corporate_inquiries");
    if (savedInquiries) {
      try {
        setCorporateInquiries(JSON.parse(savedInquiries));
      } catch (e) {}
    }
    // 1. Load Products (Initialize with mockProducts if empty)
    const savedProducts = localStorage.getItem("chronex_products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error("Error parsing products", e);
        const initialized = mockProducts.map(p => ({
          ...p,
          stock: p.stock ?? Math.floor(Math.random() * 10) + 4,
          reviews: (p.reviews || []).map(r => ({ ...r, status: r.status || "Approved" }))
        }));
        setProducts(initialized);
      }
    } else {
      const initialized = mockProducts.map(p => ({
        ...p,
        stock: p.stock ?? Math.floor(Math.random() * 10) + 4,
        reviews: (p.reviews || []).map(r => ({ ...r, status: r.status || "Approved" }))
      }));
      setProducts(initialized);
      saveToDb("chronex_products", JSON.stringify(initialized));
    }

    // 2. Load Wishlist
    const savedWishlist = localStorage.getItem("chronex_wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Error parsing wishlist", e);
      }
    }

    // 3. Load Cart
    const savedCart = localStorage.getItem("chronex_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }

    // 4. Load Orders
    const savedOrders = localStorage.getItem("chronex_orders");
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        // Clean up legacy/dummy orders that don't have proper customer data
        const validOrders = parsedOrders.filter(order => order.customer && order.customer.name);
        setOrders(validOrders);
        if (validOrders.length !== parsedOrders.length) {
          saveToDb("chronex_orders", JSON.stringify(validOrders));
        }
      } catch (e) {
        console.error("Error parsing orders", e);
      }
    }

    // 5. Load Service Requests
    const savedServices = localStorage.getItem("chronex_services");
    if (savedServices) {
      try {
        setServiceRequests(JSON.parse(savedServices));
      } catch (e) {
        console.error("Error parsing service requests", e);
      }
    }

    // 6. Load Appointments
    const savedAppointments = localStorage.getItem("chronex_appointments");
    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments));
      } catch (e) {
        console.error("Error parsing appointments", e);
      }
    }

    // 7. Load Recently Viewed
    const savedRecentlyViewed = localStorage.getItem("chronex_recently_viewed");
    if (savedRecentlyViewed) {
      try {
        setRecentlyViewed(JSON.parse(savedRecentlyViewed));
      } catch (e) {
        console.error("Error parsing recently viewed", e);
      }
    }

    // 8. Load Compare List
    const savedCompare = localStorage.getItem("chronex_compare");
    if (savedCompare) {
      try {
        setCompareList(JSON.parse(savedCompare));
      } catch (e) {}
    }

    const savedAddrs = localStorage.getItem("chronex_saved_addresses");
    if (savedAddrs) {
      try {
        setSavedAddresses(JSON.parse(savedAddrs));
      } catch (e) {}
    } else {
      setSavedAddresses([
        { id: "addr_1", name: "Home", receiverName: "Aarav Mehta", phone: "+91 98765 43210", address: "42, Shanti Kunj Society, Near Bright School, Vasna Road", cityState: "Vadodara, Gujarat", pincode: "390007", isDefault: true }
      ]);
    }

    // 15. Load Trade In Requests
    const savedTradeIns = localStorage.getItem("chronex_tradeins");
    if (savedTradeIns) {
      try { setTradeInRequests(JSON.parse(savedTradeIns)); } catch (e) {}
    }

    // 17. Load Returns
    const savedReturns = localStorage.getItem("chronex_returns");
    if (savedReturns) {
      try { setReturnRequests(JSON.parse(savedReturns)); } catch (e) {}
    }

    // 19. Load Showrooms
    const savedShowrooms = localStorage.getItem("chronex_showrooms");
    if (savedShowrooms) {
      try {
        setShowrooms(JSON.parse(savedShowrooms));
      } catch (e) {
        setShowrooms(defaultShowrooms);
      }
    } else {
      setShowrooms(defaultShowrooms);
      saveToDb("chronex_showrooms", JSON.stringify(defaultShowrooms));
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

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem("chronex_compare");
  };

  const addNewsletterSubscriber = (email) => {
    if (!newsletterSubscribers.includes(email)) {
      const updated = [...newsletterSubscribers, { email, date: new Date().toISOString() }];
      setNewsletterSubscribers(updated);
      saveToDb("chronex_newsletter", JSON.stringify(updated));
    }
  };

  const placeOrder = (customerDetails, paymentMethod, paymentDetails) => {
    const orderId = `CHX-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const orderedItems = [];
    for (const productId in cartItems) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        orderedItems.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity: cartItems[productId],
          image: product.images[0]
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

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    saveToDb("chronex_orders", JSON.stringify(updatedOrders));
  };

  const saveProductsToStorage = (updatedProducts) => {
    setProducts(updatedProducts);
    saveToDb("chronex_products", JSON.stringify(updatedProducts));
  };

  const addProduct = (product) => {
    const newProducts = [...products, { ...product, id: Date.now().toString() }];
    saveProductsToStorage(newProducts);
  };

  const editProduct = (productId, updatedProduct) => {
    const newProducts = products.map((p) => (p.id === productId ? updatedProduct : p));
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
    const bookingId = `BKG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: bookingId,
      status: "Pending", // Pending -> Confirmed -> Completed
      ...appointmentData
    };
    const updatedBookings = [newBooking, ...appointments];
    saveAppointmentsToStorage(updatedBookings);
  };

  const updateTradeInStatus = (tradeId, newStatus) => {
    const updated = tradeInRequests.map((t) => {
      if (t.id === tradeId) {
        const res = { ...t, status: newStatus };
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
    // Basic verification simulation. Any valid-looking email is accepted for demo
    if (!email.includes("@")) return { success: false, message: "Invalid email" };
    
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
    saveToDb("chronex_current_user", JSON.stringify(user));
    
    // Load points
    const savedPoints = localStorage.getItem(`chronex_points_${email}`) || "250";
    setLoyaltyPoints(Number(savedPoints));
    return { success: true, user };
  };

  const register = (name, email, password) => {
    if (!email.includes("@") || !name) return { success: false, message: "Invalid fields" };
    const users = JSON.parse(localStorage.getItem("chronex_users") || "[]");
    if (users.find(u => u.email === email)) return { success: false, message: "Email already exists" };

    const user = { name, email, role: email.startsWith("admin") ? "admin" : "customer" };
    users.push(user);
    saveToDb("chronex_users", JSON.stringify(users));
    setUsersList(users);
    
    setCurrentUser(user);
    saveToDb("chronex_current_user", JSON.stringify(user));
    setLoyaltyPoints(250); // Welcome bonus points
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
        addSavedAddress,
        deleteSavedAddress,
        getWhatsAppLink,
        addShowroom,
        updateShowroom,
        deleteShowroom,
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
        setCurrentUser,
        updatePromoBanner,
        formatPrice,
        t: (key) => locales[language]?.[key] || locales.en[key] || key,
        setCurrency,
        getCartTotal: () => {
          let total = 0;
          for (const key in cartItems) {
            const product = products.find(p => p.id === key);
            if (product) total += product.price * cartItems[key];
          }
          return total;
        },
        addCoupon: (coupon) => {
          const updated = [...coupons, coupon];
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