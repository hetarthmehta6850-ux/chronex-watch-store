import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Heart, MessageSquare, Calendar, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Award, ArrowLeft, Truck, ShoppingBag, Star, StarHalf, Ruler, Scale, Landmark, Camera } from "lucide-react";
import SizeGuide from "../components/SizeGuide";
import AROverlay from "../components/AROverlay";
import ThreeViewer from "../components/ThreeViewer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, toggleWishlist, wishlist, getWhatsAppLink, addToCart, addAppointment, recentlyViewed, addRecentlyViewed, addReview, toggleCompare, compareList, addRestockAlert, formatPrice } = useContext(ShopContext);
  
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [selectedEmi, setSelectedEmi] = useState(() => {
    return JSON.parse(sessionStorage.getItem("chronex_selected_emi") || "null");
  });
  const [emiMessage, setEmiMessage] = useState("");
  
  // Review Form State
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImageUrl, setReviewImageUrl] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Restock alert state
  const [restockEmail, setRestockEmail] = useState("");
  const [restockSubmitted, setRestockSubmitted] = useState(false);
  
  // Pincode Delivery Checker State
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(null); // null, 'local', 'national', 'invalid'

  // Booking Form State
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("11:00");

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.images[0]);
      setBookingSuccess(false);
      setDeliveryStatus(null);
      setPincode("");
      setAddedMessage(false);
      setReviewSubmitted(false);
      addRecentlyViewed(foundProduct.id);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-40 pb-24 flex flex-col items-center justify-center">
        <p className="text-neutral-400">Loading timepiece details...</p>
        <Link to="/collections" className="text-amber-500 hover:underline mt-4">Return to Collections</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => (p.brand === product.brand || p.style === product.style) && p.id !== product.id)
    .slice(0, 4);

  const viewedProducts = recentlyViewed
    .map(viewedId => products.find(p => p.id === viewedId))
    .filter(p => p && p.id !== product.id)
    .slice(0, 4);

  const isWished = wishlist.includes(product.id);

  // Check Pincode Delivery
  const checkDelivery = () => {
    const trimmedPin = pincode.trim();
    if (!/^\d{6}$/.test(trimmedPin)) {
      setDeliveryStatus("invalid");
      return;
    }

    if (trimmedPin.startsWith("390")) {
      setDeliveryStatus("local");
    } else {
      setDeliveryStatus("national");
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      name: bookingName,
      phone: bookingPhone,
      date: bookingDate,
      time: bookingTime,
      purpose: `Bespoke Viewing: ${product.brand} ${product.name}`
    };

    // 1. Log booking to local database (ShopContext)
    addAppointment(bookingData);

    setTimeout(() => {
      setBookingSuccess(true);
      const bookingMsg = `Namaste Chronex Vadodara! I have just booked an in-store viewing appointment via your website.
      
- *Name:* ${bookingName}
- *Phone:* ${bookingPhone}
- *Timepiece:* ${product.brand} - ${product.name}
- *Preferred Date:* ${bookingDate}
- *Preferred Time:* ${bookingTime}

Please confirm if this slot is available at your Alkapuri showroom. Thank you!`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=918320606850&text=${encodeURIComponent(bookingMsg)}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        setShowBookingModal(false);
        setBookingName("");
        setBookingPhone("");
        setBookingDate("");
      }, 1500);
    }, 800);
  };

  // Add to Cart handler
  const handleAddToCart = () => {
    addToCart(product.id, 1);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 3000);
  };

  // Buy Now handler
  const handleBuyNow = () => {
    addToCart(product.id, 1);
    navigate("/checkout");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    
    addReview(product.id, {
      author: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      imageUrl: reviewImageUrl.trim() || null,
      date: new Date().toISOString().split('T')[0]
    });
    
    setReviewSubmitted(true);
    setReviewName("");
    setReviewComment("");
    setReviewImageUrl("");
    setReviewRating(5);
    
    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  const handleRestockAlertSubmit = (e) => {
    e.preventDefault();
    if (!restockEmail) return;
    addRestockAlert(restockEmail, product.id);
    setRestockSubmitted(true);
    setRestockEmail("");
    setTimeout(() => setRestockSubmitted(false), 4000);
  };

  // Helper for rendering stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => {
      if (i < Math.floor(rating)) return <Star key={i} size={14} className="fill-amber-500 text-amber-500" />;
      if (i === Math.floor(rating) && rating % 1 !== 0) return <StarHalf key={i} size={14} className="fill-amber-500 text-amber-500" />;
      return <Star key={i} size={14} className="text-neutral-700" />;
    });
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans">
      <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
          <Link to="/collections" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <ArrowLeft size={14} />
            <span>Back to Collections</span>
          </Link>
          <ChevronRight size={12} className="text-neutral-700" />
          <span className="text-neutral-400">{product.brand}</span>
          <ChevronRight size={12} className="text-neutral-700" />
          <span className="text-neutral-300 line-clamp-1">{product.name}</span>
        </div>

        {/* Core Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          
          {/* Left Column: Image Presentation */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-900 relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gallery Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border bg-neutral-900 transition-all ${
                      activeImage === img
                        ? "border-amber-500 shadow-lg shadow-amber-500/10"
                        : "border-neutral-900 hover:border-neutral-800"
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 block">{product.brand}</span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-neutral-100 leading-tight">
                    {product.name}
                  </h1>
                </div>
              </div>

              {/* Specs Capsule Row */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t border-neutral-900">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Movement</span>
                  <span className="text-sm font-medium text-neutral-200">{product.specs.movement}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Case Size</span>
                  <span className="text-sm font-medium text-neutral-200">{product.specs.caseDiameter}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Material</span>
                  <span className="text-sm font-medium text-neutral-200">{product.specs.caseMaterial}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Water Resistance</span>
                  <span className="text-sm font-medium text-neutral-200">{product.specs.waterResistance}</span>
                </div>
              </div>
              
              <div className="flex gap-4 mt-4">
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-amber-500 transition-colors w-max"
                >
                  <Ruler size={14} />
                  <span className="underline underline-offset-4">Size Guide</span>
                </button>
                <button 
                  onClick={() => setIsEmiModalOpen(true)}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-amber-500 transition-colors w-max"
                >
                  <Landmark size={14} />
                  <span className="underline underline-offset-4">EMI Calculator</span>
                </button>
              </div>
              {selectedEmi && (
                <span className="text-[10px] text-amber-500 bg-amber-500/5 border border-amber-500/15 rounded-lg px-2.5 py-1 block mt-2 font-mono w-max">
                  Selected Plan: {selectedEmi.bank} &bull; {selectedEmi.months} mos ({formatPrice(selectedEmi.amount)}/mo)
                </span>
              )}

              {/* Price Panel */}
              <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-900/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-8">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest block">Showroom Price (MRP)</span>
                  <span className="text-3xl md:text-4xl font-extrabold text-neutral-100 mt-1 block font-sans">
                    {formatPrice(product.price)}
                  </span>
                  {/* Stock status badge */}
                  <div className="mt-2 flex items-center gap-2">
                    {product.stock === 0 ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-rose-500/10 border border-rose-500/20 text-rose-500">
                        Out of Stock
                      </span>
                    ) : product.stock <= 3 ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-amber-500/10 border border-amber-500/20 text-amber-500 animate-pulse">
                        Low Stock (Only {product.stock} left!)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-450">
                        In Stock ({product.stock} units)
                      </span>
                    )}
                  </div>
                </div>
                
                {product.price > 15000 && (
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-neutral-500 uppercase tracking-widest block">Easy EMI Options</span>
                    <span className="text-base font-semibold text-amber-500 mt-1 block">
                      Starts at {formatPrice(Math.round(product.price / 12))}/mo
                    </span>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wider block mt-0.5">For 12 Months *</span>
                  </div>
                )}
              </div>

              {/* Shipping Highlight Panel */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-neutral-300 mb-8">
                <Truck size={18} className="text-amber-500 shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Free Fully Insured Delivery Across India
                </span>
              </div>
              
              {/* RESTOCK ALERTS WIDGET FOR LUXURY WATCHES */}
              {product.stock === 0 && (
                <div className="p-6 bg-neutral-900/30 border border-neutral-900 rounded-2xl mb-8">
                  <h3 className="text-xs uppercase tracking-[0.18em] font-bold text-neutral-200 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    <span>Boutique Availability: Out of Stock</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mb-4 font-sans leading-relaxed">
                    This high-demand timepiece is currently out of stock at our Vadodara showroom. Register your email to be notified instantly when restocked or available for custom ordering.
                  </p>
                  {restockSubmitted ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 text-xs font-semibold uppercase tracking-wider text-center rounded-xl animate-fade-in">
                      ✓ Restock alert registered successfully!
                    </div>
                  ) : (
                    <form onSubmit={handleRestockAlertSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Enter email address"
                        value={restockEmail}
                        onChange={(e) => setRestockEmail(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none flex-grow"
                      />
                      <button
                        type="submit"
                        className="px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                      >
                        Notify Me
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Narrative */}
            <div className="mb-8 font-sans text-sm text-neutral-400 leading-relaxed">
              <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-300 mb-2">Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Interactive Pincode Delivery Checker Widget */}
            <div className="p-6 bg-neutral-900/30 border border-neutral-900 rounded-2xl mb-8">
              <h3 className="text-xs uppercase tracking-[0.18em] font-bold text-neutral-200 mb-3 flex items-center gap-2">
                <Truck size={14} className="text-amber-500" />
                <span>Check Pan-India Delivery</span>
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none flex-grow"
                />
                <button
                  onClick={checkDelivery}
                  className="px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  Check
                </button>
              </div>

              {/* Delivery Status Messages */}
              {deliveryStatus === "local" && (
                <p className="text-[11px] text-emerald-400 font-semibold mt-3 flex items-center gap-1.5 animate-fade-in">
                  <CheckCircle2 size={13} />
                  <span>Same-Day Delivery or Pick-up available in Vadodara!</span>
                </p>
              )}
              {deliveryStatus === "national" && (
                <p className="text-[11px] text-amber-400 font-semibold mt-3 flex items-center gap-1.5 animate-fade-in">
                  <CheckCircle2 size={13} />
                  <span>Insured Delivery available. Arrives in 2-4 business days.</span>
                </p>
              )}
              {deliveryStatus === "invalid" && (
                <p className="text-[11px] text-rose-500 font-semibold mt-3 animate-fade-in">
                  Please enter a valid 6-digit Indian pincode.
                </p>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-neutral-900 py-6 mb-8">
              <div className="flex flex-col items-center text-center gap-1.5">
                <ShieldCheck size={20} className="text-amber-500" />
                <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-semibold">100% Genuine</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <Award size={20} className="text-amber-500" />
                <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-semibold">Boutique Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <Sparkles size={20} className="text-amber-500" />
                <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-semibold">Luxury Boxed</span>
              </div>
            </div>

            {/* Added to Cart Alert */}
            {addedMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 text-xs font-semibold uppercase tracking-wider text-center animate-fade-in">
                ✓ Added successfully to your shopping cart!
              </div>
            )}

            {emiMessage && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/35 text-amber-400 text-xs font-semibold uppercase tracking-wider text-center animate-fade-in">
                ✓ {emiMessage}
              </div>
            )}

            {/* AR Try-On Button */}
            <button
              onClick={() => setShowAR(true)}
              className="w-full py-3.5 mb-4 bg-gradient-to-r from-neutral-900 to-neutral-950 border border-amber-500/20 hover:border-amber-500/40 text-amber-400 font-extrabold uppercase tracking-widest text-xs rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg"
            >
              <Camera size={15} />
              Try On Virtually (WebAR)
            </button>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-grow py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-neutral-950 font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] flex justify-center items-center gap-3"
              >
                <ShoppingBag size={18} />
                <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
              </button>
              
              <div className="flex gap-4">
                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`flex-1 sm:flex-none px-6 py-4 border text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex justify-center items-center gap-2 ${
                    compareList.includes(product.id) 
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-500" 
                      : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                  }`}
                >
                  <Scale size={16} />
                  <span className="sm:hidden">{compareList.includes(product.id) ? "Added" : "Compare"}</span>
                </button>
                
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-14 shrink-0 flex items-center justify-center rounded-xl border transition-all ${
                    isWished
                      ? "border-rose-500 bg-rose-500/10 text-rose-500"
                      : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-rose-500 hover:border-rose-500/50 hover:bg-rose-500/5"
                  }`}
                >
                  <Heart size={20} className={isWished ? "fill-rose-500" : ""} />
                </button>
              </div>
            </div>

            {/* Secondary Communication Row */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href={getWhatsAppLink(product.name, product.price, product.brand, deliveryStatus === "national" || deliveryStatus === "local" ? pincode : "")}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-900/30 hover:border-emerald-600/60 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                onClick={() => setShowBookingModal(true)}
                className="flex-1 py-3.5 bg-neutral-900/40 border border-neutral-850 hover:border-neutral-750 text-neutral-400 hover:text-amber-500 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                <span>Book Showroom Slot</span>
              </button>
            </div>

          </div>
        </div>

        {/* 3D Interactive Studio Section */}
        <div className="mb-24 mt-16">
          <h2 className="text-xl md:text-2xl font-bold font-serif text-neutral-100 tracking-wide mb-6">
            3D Timepiece Studio
          </h2>
          <ThreeViewer product={product} />
        </div>

        {/* Technical Specification Section */}
        <div className="mb-24 mt-16">
          <h2 className="text-xl md:text-2xl font-bold font-serif text-neutral-100 tracking-wide mb-6">
            Technical Specifications
          </h2>
          <div className="border border-neutral-900 rounded-2xl overflow-hidden bg-neutral-900/10 grid grid-cols-1 md:grid-cols-2">
            {Object.entries(product.specs).map(([key, val], idx) => (
              <div
                key={key}
                className={`p-5 flex justify-between items-center text-sm border-neutral-900 ${
                  idx % 2 === 0 ? "bg-neutral-950/40" : "bg-transparent"
                } ${idx < Object.keys(product.specs).length - 2 ? "border-b" : ""}`}
              >
                <span className="text-neutral-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <span className="text-neutral-300 font-medium text-right ml-4 max-w-[65%]">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mb-24 mt-16 border-t border-neutral-900 pt-16">
          <h2 className="text-xl md:text-2xl font-bold font-serif text-neutral-100 tracking-wide mb-8">
            Customer Reviews
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Reviews List */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {product.reviews && product.reviews.filter(r => r.status === "Approved").length > 0 ? (
                product.reviews.filter(r => r.status === "Approved").map((review) => (
                  <div key={review.id} className="p-6 bg-neutral-900/20 border border-neutral-900 rounded-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-300">
                          {review.author.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-neutral-200">{review.author}</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{review.date}</span>
                    </div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans mt-1">"{review.comment}"</p>
                    {review.imageUrl && (
                      <div className="mt-3 w-28 h-28 rounded-xl overflow-hidden border border-neutral-800 shrink-0">
                        <img src={review.imageUrl} alt="Customer wrist shot" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-neutral-500 text-sm italic">No reviews yet. Be the first to review this timepiece.</div>
              )}
            </div>

            {/* Write a Review Form */}
            <div className="lg:col-span-5">
              <div className="p-8 bg-neutral-900/40 border border-neutral-850 rounded-2xl sticky top-32">
                <h3 className="text-lg font-bold font-serif text-neutral-100 mb-6">Write a Review</h3>
                
                {reviewSubmitted ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                    <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={32} />
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">Review Submitted</p>
                    <p className="text-[10px] text-neutral-550 mt-1 leading-normal font-sans">Thank you! Your review is pending approval by our moderators.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Your Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="focus:outline-none"
                          >
                            <Star size={24} className={star <= reviewRating ? "fill-amber-500 text-amber-500" : "text-neutral-700"} />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5 mt-2">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 focus:outline-none"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5 mt-2">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Review</label>
                      <textarea
                        required
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience..."
                        rows="4"
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 focus:outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Wrist Shot Image URL (Optional)</label>
                      <input
                        type="url"
                        value={reviewImageUrl}
                        onChange={(e) => setReviewImageUrl(e.target.value)}
                        placeholder="e.g. https://images.unsplash.com/..."
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 focus:outline-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="mt-2 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif text-neutral-100 tracking-wide mb-6">
              Similar Timepieces
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((watch) => {
                const isRelatedWished = wishlist.includes(watch.id);
                return (
                  <div
                    key={watch.id}
                    className="group bg-neutral-900/20 border border-neutral-900 rounded-2xl overflow-hidden hover:border-neutral-800/80 transition-all duration-300 flex flex-col relative hover:translate-y-[-2px]"
                  >
                    <button
                      onClick={() => toggleWishlist(watch.id)}
                      className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/55 text-neutral-400 hover:text-rose-500 transition-colors"
                    >
                      <Heart size={16} className={isRelatedWished ? "fill-rose-500 text-rose-500" : ""} />
                    </button>

                    <Link to={`/product/${watch.id}`} className="overflow-hidden aspect-square block bg-neutral-950">
                      <img
                        src={watch.images[0]}
                        alt={watch.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[10px] tracking-widest uppercase text-amber-500 font-semibold">
                        {watch.brand}
                      </span>
                      <Link
                        to={`/product/${watch.id}`}
                        className="text-sm font-serif font-semibold text-neutral-200 mt-1 hover:text-amber-400 transition-colors line-clamp-1"
                      >
                        {watch.name}
                      </Link>
                      <div className="mt-auto pt-4 flex justify-between items-center border-t border-neutral-900">
                        <span className="text-sm font-bold text-neutral-100">
                          ₹{watch.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recently Viewed Section */}
        {viewedProducts.length > 0 && (
          <div className="mt-24 border-t border-neutral-900 pt-16">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-neutral-100 tracking-wide mb-6">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {viewedProducts.map((watch) => {
                const isViewedWished = wishlist.includes(watch.id);
                return (
                  <div
                    key={watch.id}
                    className="group bg-neutral-900/10 border border-neutral-900 rounded-2xl overflow-hidden hover:border-neutral-800/80 transition-all duration-300 flex flex-col relative opacity-80 hover:opacity-100"
                  >
                    <button
                      onClick={() => toggleWishlist(watch.id)}
                      className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/55 text-neutral-400 hover:text-rose-500 transition-colors"
                    >
                      <Heart size={16} className={isViewedWished ? "fill-rose-500 text-rose-500" : ""} />
                    </button>

                    <Link to={`/product/${watch.id}`} className="overflow-hidden aspect-square block bg-neutral-950">
                      <img
                        src={watch.images[0]}
                        alt={watch.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-[9px] tracking-widest uppercase text-neutral-500 font-semibold">
                        {watch.brand}
                      </span>
                      <Link
                        to={`/product/${watch.id}`}
                        className="text-xs font-serif font-semibold text-neutral-300 mt-1 hover:text-amber-400 transition-colors line-clamp-1"
                      >
                        {watch.name}
                      </Link>
                      <div className="mt-auto pt-3 flex justify-between items-center">
                        <span className="text-xs font-bold text-neutral-400">
                          ₹{watch.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Appointment Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm"
            onClick={() => setShowBookingModal(false)}
          ></div>
          
          <div className="relative bg-neutral-900 border border-neutral-800 p-8 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            {bookingSuccess ? (
              <div className="py-8 flex flex-col items-center text-center">
                <CheckCircle2 size={56} className="text-emerald-500 animate-bounce mb-4" />
                <h3 className="text-xl font-serif font-bold text-neutral-100">Appointment Request Booked!</h3>
                <p className="text-sm text-neutral-400 mt-2 max-w-xs">
                  We are opening WhatsApp to finalize and confirm your slot at our Alkapuri, Vadodara showroom.
                </p>
                <div className="w-10 h-1 border-t-2 border-emerald-500 animate-spin rounded-full mt-6"></div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-serif font-bold text-neutral-100">Book Showroom Viewing</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Schedule a private, one-on-one presentation of the <strong className="text-amber-500">{product.brand} {product.name}</strong>.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 83206 06850"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-355 focus:outline-none transition-colors cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Preferred Time</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-300 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="11:00" className="bg-neutral-900 text-neutral-300">11:00 AM</option>
                        <option value="12:30" className="bg-neutral-900 text-neutral-300">12:30 PM</option>
                        <option value="14:00" className="bg-neutral-900 text-neutral-300">02:00 PM</option>
                        <option value="15:30" className="bg-neutral-900 text-neutral-300">03:30 PM</option>
                        <option value="17:00" className="bg-neutral-900 text-neutral-300">05:00 PM</option>
                        <option value="18:30" className="bg-neutral-900 text-neutral-300">06:30 PM</option>
                        <option value="20:00" className="bg-neutral-900 text-neutral-300">08:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="w-1/2 py-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-855 text-neutral-400 text-xs uppercase tracking-widest rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10"
                    >
                      Confirm Slot
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuide 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
      />

      {/* EMI CALCULATOR MODAL */}
      {isEmiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 p-6 flex justify-between items-center z-10">
              <div>
                <h3 className="text-xl font-serif font-bold text-neutral-100">Boutique EMI Calculator</h3>
                <p className="text-xs text-neutral-500 mt-1">Simulated finance plans for {product.brand} {product.name}</p>
              </div>
              <button
                onClick={() => setIsEmiModalOpen(false)}
                className="w-10 h-10 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <div className="mb-6 flex justify-between items-center bg-neutral-900/40 p-4 rounded-xl border border-neutral-900">
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Total Price (Principal)</span>
                <span className="text-2xl font-extrabold text-neutral-100 font-sans">₹{product.price.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { name: "HDFC Bank Credit Card", apr: 13 },
                  { name: "SBI Credit Card", apr: 14 },
                  { name: "ICICI Bank Credit Card", apr: 13.5 },
                  { name: "American Express Card", apr: 15 }
                ].map((bank) => (
                  <div key={bank.name} className="border border-neutral-900 rounded-2xl p-5 bg-neutral-900/10">
                    <div className="flex justify-between items-center border-b border-neutral-900 pb-3 mb-4">
                      <span className="text-sm font-bold text-neutral-200">{bank.name}</span>
                      <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold px-2 py-0.5 rounded uppercase tracking-wider">{bank.apr}% APR</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      {[3, 6, 9, 12].map((months) => {
                        const totalWithInterest = product.price * (1 + (bank.apr / 100) * (months / 12));
                        const emiAmount = Math.round(totalWithInterest / months);
                        return (
                          <div key={months} className="bg-neutral-950 p-3 rounded-xl border border-neutral-855 flex flex-col justify-between items-center gap-2">
                            <div>
                              <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">{months} Months</span>
                              <span className="text-xs font-extrabold text-neutral-200 font-sans block">₹{emiAmount.toLocaleString("en-IN")}/mo</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const plan = { bank: bank.name, months, amount: emiAmount };
                                setSelectedEmi(plan);
                                sessionStorage.setItem("chronex_selected_emi", JSON.stringify(plan));
                                setIsEmiModalOpen(false);
                                setEmiMessage(`Selected: ${bank.name} (${months} mos)`);
                                setTimeout(() => setEmiMessage(""), 3000);
                              }}
                              className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[9px] font-bold uppercase rounded-lg transition-colors"
                            >
                              Select
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-neutral-900 bg-neutral-900/50 text-center">
              <p className="text-[10px] text-neutral-500 leading-relaxed font-sans max-w-md mx-auto">
                * Simulated calculations including estimated annual interest rates. Final EMI options will be configured inside the payment terminal portal during final checkout.
              </p>
            </div>

          </div>
        </div>
      )}
      {showAR && (
        <AROverlay product={product} onClose={() => setShowAR(false)} />
      )}
    </div>
  );
};

export default ProductDetails;
