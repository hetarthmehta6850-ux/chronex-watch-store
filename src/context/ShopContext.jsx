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
    const defaults = [
      {
        id: "CHX-847291",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        customer: { name: "Ananya Iyer", email: "ananya.iyer@outlook.com", phone: "+91 98321 04850" },
        items: [{ id: "p1", name: "Submariner Date", brand: "Rolex", price: 950000, quantity: 1, image: "" }],
        total: 950000,
        paymentMethod: "Credit Card",
        paymentDetails: "Visa ending in 4829",
        orderStatus: "Delivered"
      },
      {
        id: "CHX-103849",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        customer: { name: "Kabir Sharma", email: "kabir.sharma@gmail.com", phone: "+91 87492 01830" },
        items: [{ id: "p2", name: "Speedmaster Professional", brand: "Omega", price: 450000, quantity: 1, image: "" }],
        total: 450000,
        paymentMethod: "Bank Transfer",
        paymentDetails: "HDFC Transaction ID 84920",
        orderStatus: "Shipped"
      },
      {
        id: "CHX-928471",
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        customer: { name: "Vikram Malhotra", email: "vikram.malhotra@yahoo.com", phone: "+91 74892 04820" },
        items: [{ id: "p3", name: "Monaco Calibre 11", brand: "TAG Heuer", price: 180000, quantity: 1, image: "" }],
        total: 180000,
        paymentMethod: "UPI",
        paymentDetails: "Google Pay UPI Ref 7291038",
        orderStatus: "Processing"
      },
      {
        id: "CHX-374920",
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        customer: { name: "Meera Reddy", email: "meera.reddy@gmail.com", phone: "+91 93820 18402" },
        items: [{ id: "p4", name: "Prospex Alpinist", brand: "Seiko", price: 95000, quantity: 1, image: "" }],
        total: 95000,
        paymentMethod: "Cash on Delivery",
        paymentDetails: "Verified COD Request",
        orderStatus: "Delivered"
      }
    ];

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
    const defaults = [
      { id: "TKT-829103", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), name: "Kabir Sharma", phone: "+91 87492 01830", watchBrand: "Rolex", watchModel: "Submariner 116610", serviceType: "Complete Overhaul", issueDescription: "Gaining 15 seconds per day, needs regulation and movement lubrication.", status: "In Progress" },
      { id: "TKT-492019", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), name: "Ananya Iyer", phone: "+91 98321 04850", watchBrand: "Omega", watchModel: "Seamaster 300M", serviceType: "Water Resistance Restoral", issueDescription: "Condensation inside glass after swimming. Gaskets probably worn out.", status: "Awaiting Parts" },
      { id: "TKT-103948", date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), name: "Vikram Malhotra", phone: "+91 74892 04820", watchBrand: "TAG Heuer", watchModel: "Carrera Calibre 16", serviceType: "Polishing & Refinishing", issueDescription: "Deep desk-diving scratches on the bracelet and case side.", status: "Delivered" },
      { id: "TKT-374920", date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), name: "Meera Reddy", phone: "+91 93820 18402", watchBrand: "Seiko", watchModel: "Alpinist SPB121J1", serviceType: "Crystal Replacement", issueDescription: "Sapphire glass has a minor chip near the 2 o'clock position.", status: "Completed" },
      { id: "TKT-928401", date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), name: "Aditya Sen", phone: "+91 88320 19302", watchBrand: "Tudor", watchModel: "Black Bay 58", serviceType: "Movement Calibration", issueDescription: "Bezel alignment is slightly off center. Movement runs fine.", status: "Ticket Created" },
      { id: "TKT-610293", date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), name: "Nisha Patel", phone: "+91 91234 56789", watchBrand: "Longines", watchModel: "Master Collection", serviceType: "Strap Customization", issueDescription: "Change steel bracelet to premium brown alligator leather strap.", status: "Delivered" },
      { id: "TKT-883021", date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), name: "Rajesh Gupta", phone: "+91 98765 01234", watchBrand: "Cartier", watchModel: "Santos Medium", serviceType: "Battery Replacement", issueDescription: "Quartz movement stopped running last week. Needs new battery.", status: "Delivered" },
      { id: "TKT-773829", date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), name: "Shreya Joshi", phone: "+91 99887 76655", watchBrand: "Tissot", watchModel: "PRX Quartz", serviceType: "Battery & Seal Service", issueDescription: "Replace battery and pressure test for water resistance.", status: "Completed" },
      { id: "TKT-482019", date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(), name: "Karan Verma", phone: "+91 88776 65544", watchBrand: "Audemars Piguet", watchModel: "Royal Oak", serviceType: "Complete Restoration", issueDescription: "Vintage piece inherited, hasn't run in 10 years. Needs full service.", status: "Under Evaluation" },
      { id: "TKT-293048", date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), name: "Diya Kapoor", phone: "+91 77665 54433", watchBrand: "Omega", watchModel: "Speedmaster Reduced", serviceType: "Chronograph Repair", issueDescription: "Top pusher is sticky and chronograph second hand doesn't reset to zero.", status: "Awaiting Customer Approval" }
    ];

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
    const defaults = [
      { id: "BK-902810", date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), name: "Kabir Sharma", phone: "+91 87492 01830", email: "kabir.sharma@gmail.com", showroomId: "vadodara", time: "11:30 AM", notes: "Interested in trying out the Rolex Submariner Date.", status: "Confirmed" },
      { id: "BK-482019", date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), name: "Ananya Iyer", phone: "+91 98321 04850", email: "ananya.iyer@outlook.com", showroomId: "mumbai", time: "02:30 PM", notes: "Would like to view the Cartier Santos and Jaeger-LeCoultre Reverso.", status: "Confirmed" },
      { id: "BK-103948", date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), name: "Vikram Malhotra", phone: "+91 74892 04820", email: "vikram.malhotra@yahoo.com", showroomId: "delhi", time: "04:00 PM", notes: "Looking for a luxury sports chronograph. Please keep options ready.", status: "Confirmed" },
      { id: "BK-374920", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), name: "Meera Reddy", phone: "+91 93820 18402", email: "meera.reddy@gmail.com", showroomId: "bangalore", time: "05:30 PM", notes: "Gift shopping for husband. Omega or Tudor preferred.", status: "Completed" },
      { id: "BK-928401", date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), name: "Aditya Sen", phone: "+91 88320 19302", email: "aditya.sen@live.com", showroomId: "vadodara", time: "12:00 PM", notes: "First high-end watch purchase. Needs custom consulting.", status: "Pending Approval" },
      { id: "BK-610293", date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), name: "Nisha Patel", phone: "+91 91234 56789", email: "nisha.patel@gmail.com", showroomId: "mumbai", time: "03:00 PM", notes: "Wants to view ladies Diamond collection.", status: "Completed" },
      { id: "BK-883021", date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), name: "Rajesh Gupta", phone: "+91 98765 01234", email: "rajesh.gupta@yahoo.com", showroomId: "delhi", time: "01:30 PM", notes: "Corporate order presentation for 10 pieces.", status: "Confirmed" },
      { id: "BK-773829", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), name: "Shreya Joshi", phone: "+91 99887 76655", email: "shreya.joshi@gmail.com", showroomId: "bangalore", time: "06:00 PM", notes: "Sizing request for Cartier Tank.", status: "Cancelled" },
      { id: "BK-482011", date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), name: "Karan Verma", phone: "+91 88776 65544", email: "karan.verma@outlook.com", showroomId: "mumbai", time: "04:30 PM", notes: "Trade-in evaluation in showroom.", status: "Confirmed" },
      { id: "BK-293048", date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), name: "Diya Kapoor", phone: "+91 77665 54433", email: "diya.kapoor@gmail.com", showroomId: "delhi", time: "11:00 AM", notes: "Omega Speedmaster viewing.", status: "Completed" }
    ];

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
      return saved ? JSON.parse(saved) : [
        { id: "addr_1", name: "Home", receiverName: "Aarav Mehta", phone: "+91 98765 43210", address: "42, Shanti Kunj Society, Near Bright School, Vasna Road", cityState: "Vadodara, Gujarat", pincode: "390007", isDefault: true }
      ];
    } catch (e) {
      return [
        { id: "addr_1", name: "Home", receiverName: "Aarav Mehta", phone: "+91 98765 43210", address: "42, Shanti Kunj Society, Near Bright School, Vasna Road", cityState: "Vadodara, Gujarat", pincode: "390007", isDefault: true }
      ];
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
  const refreshDbData = () => {
    return fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
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

    // Run database seeder if not seeded yet
    seedDatabase();
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
    if (!newsletterSubscribers.includes(email)) {
      const updated = [...newsletterSubscribers, { email, date: new Date().toISOString() }];
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
    localStorage.setItem("chronex_current_user", JSON.stringify(user));
    
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
    localStorage.setItem("chronex_current_user", JSON.stringify(user));
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
        },
        applyReferral: (friendEmail) => {
          if (!currentUser || !referralCode) return;
          const newReferrals = [...referrals, { email: friendEmail, date: new Date().toLocaleDateString("en-IN"), status: "Completed" }];
          setReferrals(newReferrals);
          localStorage.setItem(`chronex_referrals_${currentUser.email}`, JSON.stringify(newReferrals));
          
          const newEarnings = referralEarnings + 500;
          setReferralEarnings(newEarnings);
          localStorage.setItem(`chronex_ref_earnings_${currentUser.email}`, String(newEarnings));
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