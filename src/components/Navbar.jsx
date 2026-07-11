import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Menu, X, Heart, Truck, MapPin, ShoppingBag, Plus, Minus, Trash2, SlidersHorizontal, Search, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    wishlist, cartItems, products, updateQuantity, removeFromCart, getCartCount, getCartTotal, addToCart,
    theme, fontSize, changeFontSize, highContrast, changeHighContrast, t,
    currency, setCurrency, formatPrice
  } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Settings dropdown toggles
  const [isAccessOpen, setIsAccessOpen] = useState(false);
  const [isBoutiqueOpen, setIsBoutiqueOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawers on route change (render-phase state update to avoid cascading renders)
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    if (isOpen) setIsOpen(false);
    if (isCartOpen) setIsCartOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  }

  const desktopLinks = [
    { name: t("navCollections") || "Collections", path: "/collections" },
    { name: "Watch Finder", path: "/watch-finder" },
    { name: "Brands", path: "/brands" },
    { name: "AI Advisor", path: "/ai-advisor" },
    { name: "Corporate", path: "/corporate" },
    { name: "Trade-In", path: "/trade-in" },
    { name: t("serviceLab") || "Service Lab", path: "/service" },
    { name: t("navMagazine") || "Magazine", path: "/blog" },
  ];

  const mobileLinks = [
    { name: t("navHome") || "Home", path: "/" },
    { name: t("navCollections") || "Collections", path: "/collections" },
    { name: "Watch Finder", path: "/watch-finder" },
    { name: "Brands", path: "/brands" },
    { name: "Corporate", path: "/corporate" },
    { name: "Trade-In", path: "/trade-in" },
    { name: "Warranty Portal", path: "/warranty" },
    { name: "Showroom Locator", path: "/showroom-locator" },
    { name: t("serviceLab") || "Service Lab", path: "/service" },
    { name: t("navMagazine") || "Magazine", path: "/blog" },
    { name: "Admin Panel", path: "/admin?new_session=true" },
  ];

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Primary Navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'scrolled' : ''} ${
          isScrolled
            ? "bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/40 py-4 shadow-xl"
            : "bg-linear-to-b from-neutral-950/90 via-neutral-950/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-12 flex justify-between items-center w-full">
          {/* Left Side: Brand Logo */}
          <div className="flex-1 flex justify-start shrink-0">
            <Link to="/" aria-label="Chronex Luxury Watches Home" className="group flex items-center gap-1.5 md:gap-3 shrink-0">
              <img src="/favicon.png" alt="Chronex Logo" className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-transform duration-500 group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="text-[17px] sm:text-lg md:text-2xl font-extrabold tracking-[0.25em] md:tracking-[0.3em] text-amber-400 font-serif leading-none group-hover:text-amber-300 transition-colors">
                  CHRONEX
                </span>
                <span className="text-[5px] sm:text-[6px] md:text-[8px] tracking-[0.45em] text-neutral-400 font-sans mt-0.5 md:mt-1 uppercase text-right">
                  VADODARA
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Center Links */}
          <div className="hidden lg:flex flex-[2] justify-center items-center gap-5 xl:gap-8 shrink-0">
            {desktopLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-label={`View collection for ${link.name}`}
                  className={`text-[10px] xl:text-[11px] tracking-[0.18em] uppercase transition-all duration-300 relative py-1 hover:text-amber-400 ${
                    isActive ? "text-amber-400 font-semibold" : (!isScrolled ? "text-always-white" : "text-neutral-300")
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Shipping Badge, Wishlist, Cart & Mobile Menu */}
          <div className="flex-1 flex justify-end items-center gap-0.5 sm:gap-2 md:gap-3 xl:gap-4 shrink-0">

            {/* Profile */}
            <Link 
              to="/profile" 
              aria-label="View user profile"
              className={`relative p-1.5 md:p-2 hover:text-amber-400 transition-colors shrink-0 ${!isScrolled ? 'text-always-white' : 'text-neutral-300'}`}
              title="User Profile"
            >
              <User size={18} strokeWidth={2.5} className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
            </Link>

            {/* Global Search */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`relative p-1.5 md:p-2 hover:text-amber-400 transition-colors shrink-0 ${!isScrolled ? 'text-always-white' : 'text-neutral-300'}`}
              aria-label="Search Catalog"
            >
              <Search size={18} className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" aria-label="View wishlist items" className={`relative p-1.5 md:p-2 hover:text-rose-500 transition-colors shrink-0 ${!isScrolled ? 'text-always-white' : 'text-neutral-300'}`}>
              <Heart size={18} className={`w-[16px] h-[16px] md:w-[18px] md:h-[18px] ${wishlist.length > 0 ? "fill-rose-500 text-rose-500" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 md:top-0.5 right-0 md:right-0.5 bg-rose-600 text-white text-[8px] md:text-[9px] w-3.5 h-3.5 md:w-4.5 md:h-4.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Accessibility Controls Dropdown */}
            <div className="relative shrink-0 hidden lg:block">
              <button
                onClick={() => { setIsAccessOpen(!isAccessOpen); }}
                aria-label="Toggle accessibility scaling and contrast settings"
                aria-haspopup="true"
                aria-expanded={isAccessOpen}
                className={`p-2 hover:text-amber-400 transition-colors ${!isScrolled ? 'text-always-white' : 'text-neutral-300'}`}
                title="Accessibility settings"
              >
                <SlidersHorizontal size={18} />
              </button>
              {isAccessOpen && (
                <div className="absolute right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col gap-4 w-56 z-55 shadow-2xl">
                  {/* Font Size controls */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Text Scaling</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => changeFontSize("standard")}
                        className={`grow py-1 rounded text-[10px] font-bold uppercase transition-all ${fontSize === "standard" ? "bg-amber-500 text-neutral-950" : "bg-neutral-950 border border-neutral-850 text-neutral-400"}`}
                      >
                        Normal
                      </button>
                      <button
                        onClick={() => changeFontSize("large")}
                        className={`grow py-1 rounded text-[10px] font-bold uppercase transition-all ${fontSize === "large" ? "bg-amber-500 text-neutral-950" : "bg-neutral-950 border border-neutral-855 text-neutral-400"}`}
                      >
                        Large
                      </button>
                    </div>
                  </div>

                  {/* Contrast controls */}
                  <div className="flex flex-col gap-1.5 border-t border-neutral-850 pt-3">
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Display Contrast</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => changeHighContrast("standard")}
                        className={`grow py-1 rounded text-[10px] font-bold uppercase transition-all ${highContrast === "standard" ? "bg-amber-500 text-neutral-950" : "bg-neutral-950 border border-neutral-850 text-neutral-400"}`}
                      >
                        Standard
                      </button>
                      <button
                        onClick={() => changeHighContrast("high")}
                        className={`grow py-1 rounded text-[10px] font-bold uppercase transition-all ${highContrast === "high" ? "bg-amber-500 text-neutral-950" : "bg-neutral-950 border border-neutral-855 text-neutral-400"}`}
                      >
                        High
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative p-1.5 md:p-2 hover:text-amber-400 transition-colors shrink-0 ${!isScrolled ? 'text-always-white' : 'text-neutral-300'}`}
              aria-label="View Shopping Cart"
            >
              <ShoppingBag size={18} className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
              {getCartCount() > 0 && (
                <span className="absolute top-0 md:top-0.5 right-0 md:right-0.5 bg-amber-500 text-neutral-950 text-[8px] md:text-[9px] w-3.5 h-3.5 md:w-4.5 md:h-4.5 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {getCartCount()}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className={`lg:hidden p-1.5 md:p-2 hover:text-amber-400 transition-colors shrink-0 ml-1 md:ml-2 ${!isScrolled ? 'text-always-white' : 'text-neutral-300'}`}
              aria-label="Toggle mobile navigation menu"
            >
              {isOpen ? <X size={20} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" /> : <Menu size={20} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />}
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile Menu Overlay (Moved outside nav to prevent containing block bug on scroll) */}
      <div
        className={`fixed inset-0 top-15 w-full backdrop-blur-lg z-40 transition-all duration-300 lg:hidden flex flex-col justify-between py-10 px-8 ${
          theme === "light" 
            ? "bg-white/95 text-neutral-900 border-t border-neutral-200" 
            : "bg-neutral-950/98 text-neutral-100"
        } ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-5">
          {mobileLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                target={link.path.startsWith("/admin") ? "_blank" : undefined}
                className={`text-base tracking-widest uppercase border-b pb-3 transition-colors ${
                  theme === "light" 
                    ? "border-neutral-200" 
                    : "border-neutral-900"
                } ${
                  isActive 
                    ? (theme === "light" ? "text-amber-600 font-semibold" : "text-amber-400 font-semibold") 
                    : (theme === "light" ? "text-neutral-600 hover:text-neutral-900" : "text-neutral-350 hover:text-neutral-100")
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className={`flex flex-col gap-5 border-t pt-6 ${
          theme === "light" ? "border-neutral-200" : "border-neutral-900"
        }`}>
          <div className={`flex items-center gap-3 ${
            theme === "light" ? "text-neutral-600" : "text-neutral-450"
          }`}>
            <Truck size={16} className={theme === "light" ? "text-amber-600" : "text-amber-500"} />
            <span className="text-xs tracking-widest uppercase">Free Insured Shipping Across India</span>
          </div>
          <div className={`flex items-center gap-3 ${
            theme === "light" ? "text-neutral-600" : "text-neutral-450"
          }`}>
            <MapPin size={16} className={theme === "light" ? "text-amber-600" : "text-amber-500"} />
            <span className="text-xs tracking-wide">Alkapuri, Vadodara, Gujarat</span>
          </div>
          <a
            href="tel:+918320606850"
            className={`flex items-center justify-center gap-2 w-full py-3 text-xs uppercase tracking-widest rounded-lg transition-colors border font-semibold ${
              theme === "light"
                ? "bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-950"
                : "bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800"
            }`}
          >
            Call Boutique
          </a>
        </div>
      </div>

      {/* Sliding Shopping Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[110] overflow-hidden">
          <div
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-900 flex flex-col shadow-2xl">
              <div className="p-6 border-b border-neutral-900 flex justify-between items-center bg-neutral-950">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-amber-500" />
                  <h2 className="text-lg font-serif font-bold tracking-wide text-neutral-200">
                    Your Shopping Cart
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar flex flex-col gap-6">
                {getCartCount() === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-4">
                    <ShoppingBag size={48} className="text-neutral-800" />
                    <div>
                      <h4 className="text-sm font-bold text-neutral-300">Your cart is empty</h4>
                      <p className="text-xs text-neutral-500 mt-1 max-w-50 mx-auto leading-relaxed">
                        Add fine watches to your cart to prepare a custom Pan-India delivery order.
                      </p>
                    </div>
                    <Link
                      to="/collections"
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                    >
                      Browse Collections
                    </Link>
                  </div>
                ) : (
                  Object.keys(cartItems).map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    if (!product) return null;
                    const qty = cartItems[productId];
                    return (
                      <div
                        key={productId}
                        className="flex gap-4 p-4 rounded-xl bg-neutral-900/30 border border-neutral-900 relative group"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-950 shrink-0 border border-neutral-855">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex flex-col justify-between grow">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold">
                              {product.brand}
                            </span>
                            <h4 className="text-xs font-bold text-neutral-200 line-clamp-1 mt-0.5">
                              {product.name}
                            </h4>
                            <span className="text-xs text-neutral-400 font-medium mt-1 block">
                              {formatPrice(product.price)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center border border-neutral-800 rounded-lg bg-neutral-950 overflow-hidden">
                              <button
                                onClick={() => updateQuantity(productId, qty - 1)}
                                className="p-1 px-2.5 text-neutral-400 hover:text-amber-400 hover:bg-neutral-900 transition-colors"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="text-xs font-bold px-2.5 text-neutral-200 min-w-5 text-center">
                                {qty}
                              </span>
                              <button
                                onClick={() => addToCart(productId, 1)}
                                className="p-1 px-2.5 text-neutral-400 hover:text-amber-400 hover:bg-neutral-900 transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(productId)}
                              className="text-neutral-500 hover:text-rose-500 transition-colors p-1.5"
                              title="Remove item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {getCartCount() > 0 && (
                <div className="p-6 border-t border-neutral-900 bg-neutral-950 flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">Subtotal</span>
                    <span className="text-sm font-semibold text-neutral-300 font-sans">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">GST (18%)</span>
                    <span className="text-sm font-semibold text-neutral-300 font-sans">
                      {formatPrice(Math.round(getCartTotal() * 0.18))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-neutral-900 border-dashed">
                    <span className="text-sm font-bold text-neutral-100 uppercase tracking-wider">Grand Total</span>
                    <span className="text-lg font-bold text-amber-500 font-sans">
                      {formatPrice(getCartTotal() + Math.round(getCartTotal() * 0.18))}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500 leading-normal">
                    * Pan-India Insured Shipping is free. Billing details & address will be gathered at checkout.
                  </p>
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10 text-center"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-neutral-950/95 backdrop-blur-xl animate-fade-in">
          <div className="w-full max-w-4xl mx-auto px-6 py-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <span className="text-amber-500 font-serif tracking-[0.3em] uppercase text-xs md:text-sm">Search Catalog</span>
              <button onClick={() => setIsSearchOpen(false)} className="text-neutral-400 hover:text-white p-2 transition-colors bg-neutral-900 hover:bg-neutral-800 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="relative mb-10 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-amber-500 transition-colors" size={24} />
              <input
                type="text"
                autoFocus
                placeholder="Search brands, collections, or references..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/40 border-b-2 border-neutral-800 text-white text-xl md:text-3xl px-14 py-6 outline-none focus:border-amber-500 transition-colors font-sans font-light placeholder:text-neutral-700 rounded-t-2xl"
              />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              {searchQuery.trim().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products
                    .filter(p => 
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.style.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice(0, 10)
                    .map((product) => (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex gap-4 p-4 rounded-2xl bg-neutral-900/20 hover:bg-neutral-900/60 border border-transparent hover:border-neutral-800 transition-all items-center group"
                      >
                        <div className="w-16 h-16 rounded-xl bg-neutral-950 flex items-center justify-center shrink-0 overflow-hidden relative border border-neutral-800/50">
                          <img src={product.images[0]} alt={product.name} className="h-full object-contain mix-blend-lighten opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">{product.brand}</span>
                          <span className="text-sm font-semibold text-neutral-200 mt-0.5">{product.name}</span>
                          <span className="text-xs text-neutral-400 mt-1">{formatPrice(product.price)}</span>
                        </div>
                      </Link>
                    ))
                  }
                  {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()) || p.style.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="col-span-full py-16 text-center text-neutral-500 flex flex-col items-center gap-3">
                      <Search size={40} className="text-neutral-800" />
                      <span>No timepieces found matching "{searchQuery}"</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-6 mt-4">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-800/50 pb-2">Popular Searches</span>
                  <div className="flex flex-wrap gap-2.5">
                    {["Rolex", "Chronograph", "Dive Watch", "Automatic", "Tissot PRX"].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-2 rounded-xl border border-neutral-800 text-[11px] font-bold tracking-wider text-neutral-400 hover:text-amber-500 hover:border-amber-500/50 transition-all bg-neutral-900/30 uppercase"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
