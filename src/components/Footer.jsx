import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { addNewsletterSubscriber } = useContext(ShopContext);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) return;
    addNewsletterSubscriber(emailInput);
    setEmailInput("");
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#0a0a0a] text-neutral-400 border-t border-amber-900/30 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle gold glow at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 relative z-10">
        
        {/* 1. Boutique Info */}
        <div className="flex flex-col gap-5 lg:col-span-2 pr-0 lg:pr-10">
          <Link to="/" className="flex items-center gap-4 group">
            <img src="/favicon.png" alt="Chronex Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 font-serif leading-none transition-all duration-500 group-hover:tracking-[0.3em]">
                CHRONEX
              </span>
              <span className="text-[9px] tracking-[0.4em] text-neutral-500 font-sans mt-2 uppercase pl-1">
                Vadodara
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-neutral-400 mt-2">
            Established in 2014, Chronex is Vadodara's premier multi-brand luxury watch boutique. Offering a curated collection of international and domestic horological masterpieces.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 text-xs text-neutral-300 bg-neutral-900/50 border border-neutral-800 px-3 py-1.5 rounded-full">
              <ShieldCheck size={14} className="text-amber-500" />
              <span>100% Genuine</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300 bg-neutral-900/50 border border-neutral-800 px-3 py-1.5 rounded-full">
              <Award size={14} className="text-amber-500" />
              <span>Authorized Retailer</span>
            </div>
          </div>
        </div>

        {/* 2. Collections */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-neutral-100 uppercase mb-6 font-sans flex items-center gap-2">
            <span className="w-4 h-[1px] bg-amber-500"></span> Collections
          </h3>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li><Link to="/collections" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">All Collections</Link></li>
            <li><Link to="/brands" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">Our Brands</Link></li>
            <li>
              <Link to="/watch-finder" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                Watch Finder <span className="bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">New</span>
              </Link>
            </li>
            <li><Link to="/lookbook" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2">Cinematic Lookbook</Link></li>
            <li><Link to="/blog" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">Horology Magazine</Link></li>
            <li>
              <Link to="/subscription" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                Collector's Box <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Join</span>
              </Link>
            </li>
            <li><Link to="/gift-cards" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">E-Gift Vouchers</Link></li>
          </ul>
        </div>

        {/* 3. Client Services */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-neutral-100 uppercase mb-6 font-sans flex items-center gap-2">
            <span className="w-4 h-[1px] bg-amber-500"></span> Services
          </h3>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li>
              <Link to="/ai-advisor" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                AI Watch Advisor <span className="text-amber-500/80">✨</span>
              </Link>
            </li>
            <li><Link to="/warranty" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">Authenticity Check</Link></li>
            <li><Link to="/trade-in" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">Trade-In & Sell</Link></li>
            <li><Link to="/showroom-locator" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">Showroom Locator</Link></li>
            <li><Link to="/corporate" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">Corporate Gifting</Link></li>
            <li><Link to="/profile" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">Track My Orders</Link></li>
            <li><Link to="/returns" className="hover:text-amber-400 hover:translate-x-1 transition-all duration-300 block">Returns & FAQ</Link></li>
          </ul>
        </div>

        {/* 4. Contact / Newsletter */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-neutral-100 uppercase mb-6 font-sans flex items-center gap-2">
            <span className="w-4 h-[1px] bg-amber-500"></span> Newsletter
          </h3>
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">Subscribe to receive updates on limited editions and exclusive showroom events.</p>
          <form onSubmit={handleSubscribe} className="relative group">
            <input 
              type="email" 
              placeholder={subscribed ? "Subscribed Successfully!" : "Your email address"} 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              disabled={subscribed}
              className="w-full bg-neutral-900 border border-neutral-800 text-sm px-4 py-3 pr-12 rounded-md outline-none focus:border-amber-500/50 transition-colors group-hover:border-neutral-700 text-white placeholder-neutral-600 disabled:text-emerald-400 disabled:border-emerald-500/20"
              required
            />
            <button 
              type="submit" 
              disabled={subscribed}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-400 disabled:bg-emerald-500/10 disabled:text-emerald-500/30 text-black p-1.5 rounded transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8">
            <h3 className="text-xs font-bold tracking-[0.2em] text-neutral-100 uppercase mb-4 font-sans">Socials</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/hetarth_8856" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Showroom Contact Strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-xl p-6 lg:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
          
          <div className="flex items-center gap-4 relative z-10 w-full lg:w-auto">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
              <MapPin size={20} className="text-amber-500" />
            </div>
            <div>
              <h4 className="text-neutral-200 font-semibold text-sm mb-1">Visit Our Boutique</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">GF-12, Ivory Plaza, Opp. Welcome Hotel<br/>Alkapuri, Vadodara 390007</p>
            </div>
          </div>

          <div className="w-full lg:w-px h-px lg:h-12 bg-neutral-800 hidden lg:block"></div>

          <div className="flex items-center gap-4 relative z-10 w-full lg:w-auto">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Clock size={20} className="text-amber-500" />
            </div>
            <div>
              <h4 className="text-neutral-200 font-semibold text-sm mb-1">Opening Hours</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">Mon - Sat: 10:30 AM - 08:30 PM<br/><span className="text-amber-500/80">Valet Parking Available</span></p>
            </div>
          </div>

          <div className="w-full lg:w-px h-px lg:h-12 bg-neutral-800 hidden lg:block"></div>

          <div className="flex items-center gap-4 relative z-10 w-full lg:w-auto">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Phone size={20} className="text-amber-500" />
            </div>
            <div>
              <h4 className="text-neutral-200 font-semibold text-sm mb-1">Contact Us</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">+91 83206 06850<br/>info@chronexvadodara.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer Brand Strip & Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-semibold">
          <span className="hover:text-neutral-400 transition-colors cursor-pointer">Rolex</span>
          <span className="hover:text-neutral-400 transition-colors cursor-pointer">Omega</span>
          <span className="hover:text-neutral-400 transition-colors cursor-pointer">Rado</span>
          <span className="hover:text-neutral-400 transition-colors cursor-pointer">TAG Heuer</span>
          <span className="hover:text-neutral-400 transition-colors cursor-pointer">Tissot</span>
          <span className="hover:text-neutral-400 transition-colors cursor-pointer">Seiko</span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="text-xs text-neutral-500 tracking-wider text-center md:text-right">
            &copy; {currentYear} Chronex Watches Vadodara. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-[10px] transition-colors uppercase tracking-[0.15em]">
            <Link to="/admin" className="bg-neutral-900/80 border border-amber-900/30 text-amber-500 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all px-4 py-2 rounded-full font-bold shadow-lg flex items-center justify-center">
              Dealer / Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
