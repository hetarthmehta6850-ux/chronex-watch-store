import { useEffect, useState, useContext, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ShopProvider, ShopContext } from "./context/ShopContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import LoadingScreen from "./components/LoadingScreen";
import PromoBanner from "./components/PromoBanner";
import ScrollToTopButton from "./components/ScrollToTop";
import CompareBar from "./components/CompareBar";
import NewsletterPopup from "./components/NewsletterPopup";
import Chatbot from "./components/Chatbot";

// Pages (Home is loaded eagerly for instant LCP)
import Home from "./pages/Home";
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const ServiceCenter = lazy(() => import("./pages/ServiceCenter"));
const GiftFinder = lazy(() => import("./pages/GiftFinder"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Invoice = lazy(() => import("./pages/Invoice"));
const Compare = lazy(() => import("./pages/Compare"));
const WatchFinder = lazy(() => import("./pages/WatchFinder"));
const Brands = lazy(() => import("./pages/Brands"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const GiftCards = lazy(() => import("./pages/GiftCards"));
const AICongierge = lazy(() => import("./pages/AICongierge"));
const WarrantyPortal = lazy(() => import("./pages/WarrantyPortal"));
const ShowroomLocator = lazy(() => import("./pages/ShowroomLocator"));
const Lookbook = lazy(() => import("./pages/Lookbook"));
const ReferralProgram = lazy(() => import("./pages/ReferralProgram"));
const SubscriptionBox = lazy(() => import("./pages/SubscriptionBox"));
const CorporateOrders = lazy(() => import("./pages/CorporateOrders"));
const TradeIn = lazy(() => import("./pages/TradeIn"));
const ReturnsExchange = lazy(() => import("./pages/ReturnsExchange"));

const RouteLoader = () => (
  <div className="min-h-[60vh] w-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
      <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-semibold">Loading Chronex...</span>
    </div>
  </div>
);

// Scroll to Top on route changes for fluid UX
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, fontSize, highContrast, promoBanner } = useContext(ShopContext);
  const location = useLocation();
  const isInvoiceRoute = location.pathname.startsWith("/invoice");
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideHeaderFooter = isInvoiceRoute || isAdminRoute;

  const wrapperClass = [
    "min-h-screen flex flex-col justify-between antialiased selection:bg-amber-500/20 selection:text-amber-500 transition-all duration-300",
    theme === "light" ? "light-theme bg-neutral-50 text-neutral-900" : "bg-neutral-950 text-neutral-100 dark-theme",
    fontSize === "large" ? "accessibility-large-text" : "",
    highContrast === "high" ? "high-contrast-mode" : ""
  ].join(" ");

  return (
    <div className={wrapperClass}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!hideHeaderFooter && <PromoBanner />}
      {/* Persistent Navigation */}
      {!hideHeaderFooter && <Navbar />}

      {/* Primary Route Stage */}
      <main className={`grow flex flex-col ${!hideHeaderFooter ? (promoBanner?.isVisible ? "pt-29 sm:pt-29" : "pt-19") : ""}`}>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/service" element={<ServiceCenter />} />
            <Route path="/gift-finder" element={<GiftFinder />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            <Route path="/invoice/:orderId" element={<Invoice />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/watch-finder" element={<WatchFinder />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/ai-advisor" element={<AICongierge />} />
            <Route path="/warranty" element={<WarrantyPortal />} />
            <Route path="/showroom-locator" element={<ShowroomLocator />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/referral" element={<ReferralProgram />} />
            <Route path="/subscription" element={<SubscriptionBox />} />
            <Route path="/corporate" element={<CorporateOrders />} />
            <Route path="/trade-in" element={<TradeIn />} />
            <Route path="/returns" element={<ReturnsExchange />} />
            <Route path="*" element={<Home />} /> {/* Fallback routing */}
          </Routes>
        </Suspense>
      </main>

      {/* Global Components */}
      {!hideHeaderFooter && <CompareBar />}
      {!hideHeaderFooter && <NewsletterPopup />}

      {/* Persistent Footer */}
      {!hideHeaderFooter && <Footer />}

      {/* Floating Actions */}
      {!hideHeaderFooter && (
        <>
          <ScrollToTopButton />
          <WhatsAppWidget />
          <Chatbot />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;