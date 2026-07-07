import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { ArrowRight, Shield, Award, Sparkles, MapPin, Heart, Wrench, Truck, ShieldCheck, Eye, Star, StarHalf, Scale } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import QuickView from "../components/QuickView";
import InstagramFeed from "../components/InstagramFeed";
import { useSEO } from "../hooks/useSEO";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString('en-IN')}{suffix}</span>;
};

const Home = () => {
  useScrollReveal(); // Initialize scroll reveal hook
  useSEO({
    title: "Exclusive Luxury Horology",
    description: "Discover Chronex, the ultimate destination for luxury Swiss and Japanese timepieces. Shop certified authentic watches from Rolex, Omega, Seiko, and more.",
    keywords: "luxury watches, chronex, buy rolex, buy omega, swiss watches, certified authentic watches",
  });
  const { products, toggleWishlist, wishlist, toggleCompare, compareList } = useContext(ShopContext);
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Get featured products
  const featuredProducts = products.filter((p) => p.isFeatured);

  // List of brands with descriptive subtitle
  const brandsList = [
    { name: "Rolex", subtitle: "Swiss Iconography" },
    { name: "Omega", subtitle: "Horological Legacy" },
    { name: "Rado", subtitle: "Ceramic Masterpieces" },
    { name: "TAG Heuer", subtitle: "Racing Spirit" },
    { name: "Tissot", subtitle: "Swiss Innovation" },
    { name: "Seiko", subtitle: "Japanese Craftsmanship" },
    { name: "G-Shock", subtitle: "Ultimate Toughness" },
    { name: "Citizen", subtitle: "Light-powered Eco-Drive" },
    { name: "Titan", subtitle: "India's Finest Heritage" },
    { name: "Timex", subtitle: "Classic Durability" },
    { name: "Fossil", subtitle: "Modern Fashion Aesthetics" },
    { name: "Fastrack", subtitle: "Youthful & Sporty" }
  ];

  const handleBrandClick = (brandName) => {
    navigate("/collections", { state: { selectedBrand: brandName } });
  };

  const testimonials = [
    {
      name: "Rajesh Patel",
      location: "Vasna Road, Vadodara",
      review: "Purchased a Seiko 5 GMT from Chronex Alkapuri. The collection is incredible and the staff is extremely knowledgeable. They explained the automatic movement beautifully. Highly recommended!",
      watch: "Seiko 5 Sports GMT"
    },
    {
      name: "Aditya Sharma",
      location: "Mumbai, Maharashtra",
      review: "Was hesitant to buy a luxury Tissot PRX online, but Chronex offered Pan-India insured delivery. The watch arrived in Mumbai within 48 hours in pristine, secure wooden packing. Incredible service!",
      watch: "Tissot PRX Powermatic 80"
    },
    {
      name: "Mehul Mehta",
      location: "Akota, Vadodara",
      review: "The only place in Vadodara I trust for my luxury watches. Their service center replaced the battery on my classic Rado with an original cell and pressure-tested it for water resistance in 15 minutes.",
      watch: "Rado Centrix Automatic"
    }
  ];

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen font-sans overflow-x-hidden">
      {/* 1. Cinematic Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-amber-500 rounded-full blur-[2px] opacity-60 animate-float"></div>
           <div className="absolute top-[60%] left-[8%] w-3 h-3 bg-amber-400 rounded-full blur-[3px] opacity-40 animate-float-delayed"></div>
           <div className="absolute top-[30%] right-[20%] w-1.5 h-1.5 bg-amber-200 rounded-full blur-[1px] opacity-70 animate-float"></div>
           <div className="absolute top-[70%] right-[10%] w-4 h-4 bg-amber-600 rounded-full blur-[4px] opacity-30 animate-float-delayed"></div>
        </div>

        {/* Background Image with Deep Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1600"
            alt="Luxury watches banner background"
            className="w-full h-full object-cover opacity-25 scale-105 animate-zoom-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
          <span 
            className="text-amber-500 text-[10px] md:text-xs tracking-[0.45em] uppercase font-bold mb-4"
            data-animate="fade-up"
          >
            Boutique Showroom — Alkapuri, Vadodara
          </span>
          <h1 
            className="text-4xl md:text-7xl font-bold font-serif text-neutral-100 tracking-wide leading-tight mb-6 delay-100 relative overflow-hidden"
            data-animate="scale-in"
          >
            Time is a Luxury.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 relative inline-block">
              Wear it Well.
              {/* Shimmer line across text */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite_ease-in-out_2s]"></span>
            </span>
          </h1>
          <p 
            className="text-neutral-400 text-xs md:text-base max-w-xl leading-relaxed mb-10 font-sans delay-200"
            data-animate="fade-up"
          >
            Explore Vadodara's most extensive multi-brand collection. Authorized dealers of Swiss and Japanese horology. Now delivering fully insured timepieces across India.
          </p>
          <div 
            className="flex flex-col sm:flex-row gap-4 delay-300"
            data-animate="fade-up"
          >
            <Link
              to="/collections"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-amber-500/15 flex items-center gap-2 group hover:scale-[1.02]"
            >
              <span>Explore Collections</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-neutral-900/80 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 border border-neutral-800 hover:border-amber-500/40 backdrop-blur-sm"
            >
              Book Showroom Visit
            </Link>
          </div>
        </div>

        {/* Floating Trust Strip */}
        <div className="absolute bottom-10 left-0 w-full hidden md:block z-10" data-animate="fade-up" data-animate-once>
          <div className="max-w-7xl mx-auto px-12 flex justify-between text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            <span>Est. 2014 &bull; Vadodara</span>
            <span>100% Genuine Certified</span>
            <span>Free Pan-India Insured Shipping</span>
          </div>
        </div>
      </header>

      {/* 1b. Premium Scrolling Marquee Ticker */}
      <div className="bg-gradient-to-r from-amber-500/10 via-neutral-900 to-amber-500/10 border-y border-neutral-900 py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap gap-16 animate-[marquee_25s_linear_infinite] text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400">
          <span>&bull; Free Insured Pan-India Shipping</span>
          <span>&bull; 100% Genuine Brand Guarantee</span>
          <span>&bull; Valet Parking at Alkapuri Boutique</span>
          <span>&bull; In-House Authorized Service Center</span>
          <span>&bull; Easy Monthly EMI Schemes Available</span>
          {/* Repeating for seamless loop */}
          <span>&bull; Free Insured Pan-India Shipping</span>
          <span>&bull; 100% Genuine Brand Guarantee</span>
          <span>&bull; Valet Parking at Alkapuri Boutique</span>
          <span>&bull; In-House Authorized Service Center</span>
          <span>&bull; Easy Monthly EMI Schemes Available</span>
        </div>
      </div>

      {/* 2. Interactive Brand Logo Carousel */}
      <section className="py-12 border-b border-neutral-900 bg-neutral-950 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex whitespace-nowrap gap-24 items-center animate-[marquee_40s_linear_infinite] hover:!animation-play-state-paused cursor-pointer group">
          {/* Duplicate list to create seamless loop */}
          {[...brandsList, ...brandsList].map((brand, i) => (
            <div 
              key={i} 
              onClick={() => handleBrandClick(brand.name)}
              className="text-2xl md:text-4xl font-serif text-neutral-600 hover:text-amber-400 transition-colors duration-500 opacity-60 group-hover:opacity-40 hover:!opacity-100 select-none"
            >
              {brand.name.toUpperCase()}
            </div>
          ))}
        </div>
      </section>

      {/* 3. By The Numbers - Animated Stats */}
      <section className="py-20 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center" data-animate="fade-up" data-animate-once>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-600">
                <AnimatedCounter end={10} suffix="+" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">Years of Excellence</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-600">
                <AnimatedCounter end={12} suffix="+" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">Premium Brands</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-600">
                <AnimatedCounter end={5000} suffix="+" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">Happy Customers</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-600">
                <AnimatedCounter end={100} suffix="%" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">Genuine Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Universe Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16" data-animate="fade-up">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
            Authorized Retailer
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
            Browse By Brand
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
          <p className="text-neutral-400 text-xs max-w-lg mx-auto mt-3">
            Select a brand to view its full collection available at our showroom or for immediate dispatch across India.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandsList.map((brand, idx) => (
            <button
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className={`group relative p-8 bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-900 hover:border-amber-500/30 rounded-2xl transition-all duration-300 text-left flex flex-col justify-between h-36 shadow-sm hover:translate-y-[-2px] delay-${(idx % 4) * 100}`}
              data-animate="fade-up"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-xl md:text-2xl font-bold font-serif tracking-wider text-neutral-300 group-hover:text-amber-400 transition-colors">
                  {brand.name}
                </span>
                <Sparkles size={12} className="text-neutral-750 group-hover:text-amber-500/60 transition-colors" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-neutral-500">
                  {brand.subtitle}
                </p>
                <span className="text-[9px] font-bold text-amber-500 tracking-widest uppercase mt-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>View Catalog</span>
                  <ArrowRight size={8} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Featured Masterpieces with Glassmorphism Overlays */}
      <section className="py-24 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16" data-animate="fade-right">
            <div>
              <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
                Curated Selection
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
                Featured Timepieces
              </h2>
            </div>
            <Link
              to="/collections"
              className="text-amber-500 text-xs tracking-widest font-semibold uppercase flex items-center gap-1 hover:text-amber-400 transition-colors mt-4 md:mt-0 group"
            >
              <span>View All Watches</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((watch, idx) => {
              const isWished = wishlist.includes(watch.id);
              const isNew = watch.price > 150000;

              return (
                <div
                  key={watch.id}
                  className={`group bg-neutral-900/20 border border-neutral-900 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 flex flex-col relative hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:-translate-y-1 delay-${(idx % 4) * 100}`}
                  data-animate="fade-up"
                >
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {isNew && (
                      <span className="bg-amber-500 text-neutral-950 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                        New Arrival
                      </span>
                    )}
                  </div>

                  {/* Wishlist Icon */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(watch.id);
                    }}
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/55 text-neutral-400 hover:text-rose-500 hover:border-rose-500/30 transition-all duration-300 shadow-lg"
                  >
                    <Heart size={16} className={isWished ? "fill-rose-500 text-rose-500" : ""} />
                  </button>

                  {/* Image & Quick Action Overlay */}
                  <div className="relative overflow-hidden aspect-square block bg-neutral-950">
                    <img
                      src={watch.images[0]}
                      alt={watch.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    
                    {/* Glassmorphism Quick Action Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2">
                       <button 
                        onClick={(e) => { e.preventDefault(); setQuickViewProduct(watch); }}
                        className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                       >
                         <Eye size={14} /> View
                       </button>
                       <button 
                        onClick={(e) => { e.preventDefault(); toggleCompare(watch.id); }}
                        className={`flex-1 backdrop-blur-md border text-[10px] uppercase tracking-widest font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                          compareList.includes(watch.id) ? "bg-amber-500/20 border-amber-500/50 text-amber-500" : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
                        }`}
                       >
                         <Scale size={14} /> Compare
                       </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-grow relative z-10 bg-neutral-900/20">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] tracking-widest uppercase text-amber-500 font-semibold">
                        {watch.brand}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-850">
                        {watch.style}
                      </span>
                    </div>
                    <Link
                      to={`/product/${watch.id}`}
                      className="text-base font-serif font-semibold text-neutral-200 mt-2 hover:text-amber-400 transition-colors line-clamp-1"
                    >
                      {watch.name}
                    </Link>
                    
                    <div className="flex items-center gap-1 mt-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const rating = watch.rating || 5;
                        if (i < Math.floor(rating)) return <Star key={i} size={10} className="fill-amber-500 text-amber-500" />;
                        if (i === Math.floor(rating) && rating % 1 !== 0) return <StarHalf key={i} size={10} className="fill-amber-500 text-amber-500" />;
                        return <Star key={i} size={10} className="text-neutral-700" />;
                      })}
                    </div>
                    
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {watch.movement} &bull; {watch.category}
                    </p>
                    
                    {/* Price */}
                    <div className="mt-auto pt-5 border-t border-neutral-900/50 flex justify-between items-center">
                      <span className="text-lg font-bold text-neutral-100">
                        ₹{watch.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Pan-India Delivery Focus Block */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div 
          className="p-8 md:p-16 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-900 shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-12 relative overflow-hidden"
          data-animate="scale-in"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full"></div>
          
          <div className="flex-1 flex flex-col gap-5 relative z-10">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-2xl w-fit text-amber-500">
              <Truck size={28} />
            </div>
            <span className="text-amber-500 text-xs tracking-[0.25em] uppercase font-bold">Nationwide Shipping</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide leading-tight">
              Pan-India Insured Doorstep Delivery
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed font-sans max-w-xl">
              Can't make it to Alkapuri? We bring the boutique showroom directly to you. Chronex provides free, fully insured transit delivery across India. Every shipment is double-boxed, tamper-sealed, and sent via specialized secure logistics partners with active tracking. 
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full relative z-10">
            {[
              { icon: ShieldCheck, title: "100% Transit Insured", desc: "Every package is fully covered against any loss or damage during transit." },
              { icon: Sparkles, title: "Original Luxury Packing", desc: "Delivered in official brand packaging, complete with stamped warranties." },
              { icon: Wrench, title: "Pre-Sized For You", desc: "Provide your wrist size at enquiry, and our watchmakers will size the links." },
              { icon: Award, title: "Secure Dispatch", desc: "Partnered with specialized high-value logistics carriers." }
            ].map((feature, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-amber-500/20 transition-colors delay-${i * 100}`} data-animate="fade-left">
                <feature.icon className="text-amber-500 mb-3" size={24} />
                <h4 className="text-sm font-bold text-neutral-200">{feature.title}</h4>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Showroom Experience */}
      <section className="py-24 bg-gradient-to-b from-neutral-955 to-neutral-900 border-t border-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl" data-animate="fade-right">
            <img
              src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800"
              alt="Chronex Boutique Interior"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-neutral-950 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-neutral-200">Alkapuri Boutique</h4>
                <p className="text-xs text-neutral-400">Ivory Plaza, Vadodara</p>
              </div>
            </div>
          </div>

          {/* Description & Core features */}
          <div className="lg:col-span-6 flex flex-col gap-6" data-animate="fade-left">
            <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
              The Boutique Experience
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide leading-tight">
              A Personal Consultation Awaits
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Buying a watch is a tactile experience. You must feel the weight of the metal, observe the sweep of the mechanical hand, and see how the dial catches the light. Visit our showroom in Alkapuri, Vadodara, for a personalized shopping session.
            </p>

            {/* Sub-highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="flex gap-3 hover:-translate-y-1 transition-transform">
                <Shield className="text-amber-500 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-semibold text-neutral-200">Valet & Free Parking</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Dedicated spacious parking slot in front of the plaza for hassle-free entry.</p>
                </div>
              </div>
              <div className="flex gap-3 hover:-translate-y-1 transition-transform">
                <Wrench className="text-amber-500 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-semibold text-neutral-200">On-Site Servicing Lab</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Quick resizing, strap swapping, and pressure checking while you wait.</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 text-neutral-100 hover:text-amber-400 text-xs font-bold uppercase tracking-widest rounded-lg transition-all inline-flex items-center gap-2"
              >
                <span>Schedule an Appointment</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16" data-animate="fade-up">
            <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
              Customer Voices
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
              Boutique Patrons
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className={`p-8 bg-neutral-900/30 border border-neutral-900/80 hover:border-amber-500/30 hover:bg-neutral-900/50 rounded-2xl flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-2 delay-${index * 100}`}
                data-animate="fade-up"
              >
                <div>
                  <span className="text-5xl font-serif text-amber-500/25 absolute top-6 left-6 select-none">
                    “
                  </span>
                  <p className="text-sm text-neutral-300 italic leading-relaxed relative z-10 pt-4 font-sans">
                    {t.review}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col">
                  <span className="text-sm font-semibold text-neutral-200">
                    {t.name}
                  </span>
                  <span className="text-xs text-neutral-500 mt-0.5">
                    {t.location}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-amber-500 font-semibold mt-3">
                    Purchased: {t.watch}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed mockup */}
      <InstagramFeed />

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};

export default Home;
