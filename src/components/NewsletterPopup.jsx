import { useState, useEffect, useContext } from "react";
import { X, Mail, CheckCircle2 } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success
  const { addNewsletterSubscriber } = useContext(ShopContext);

  useEffect(() => {
    // Check if user has already seen this or subscribed recently
    const hasSeen = localStorage.getItem("chronex_newsletter_seen");
    
    if (!hasSeen) {
      // Show popup after 5 seconds on first visit
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Don't show again for 7 days
    const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("chronex_newsletter_seen", expiry.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate network request
    setTimeout(() => {
      addNewsletterSubscriber(email);
      setStatus("success");
      
      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-scale-in">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-5/12 h-48 md:h-auto relative">
          <img 
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800" 
            alt="Luxury Watch" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          
          <div className="mb-2">
            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">Chronex VIP</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-100 mb-4">
            Join the Inner Circle
          </h2>
          
          <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
            Subscribe to our newsletter to receive early access to limited editions, 
            exclusive event invitations, and a <strong className="text-neutral-200">special 10% privilege discount</strong> on your first timepiece purchase.
          </p>

          {status === "success" ? (
            <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-6 flex flex-col items-center justify-center text-center animate-fade-in">
              <CheckCircle2 size={32} className="text-emerald-500 mb-3" />
              <h3 className="text-lg font-bold text-neutral-200 mb-1">Welcome to the Club</h3>
              <p className="text-emerald-500/80 text-xs">Your privilege code has been sent to your email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                />
              </div>
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-70 flex justify-center items-center h-12"
              >
                {status === "loading" ? (
                  <div className="w-5 h-5 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin"></div>
                ) : (
                  "Unlock Privilege"
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button 
              onClick={handleClose}
              className="text-neutral-600 hover:text-neutral-400 text-[10px] uppercase tracking-wider underline-offset-4 hover:underline transition-all"
            >
              No thanks, I prefer paying full price
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NewsletterPopup;
