import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";

const WhatsAppWidget = () => {
  const [showBubble, setShowBubble] = useState(false);
  const phone = "918320606850"; // Vadodara Showroom Number

  useEffect(() => {
    // Show the greeting bubble after 3 seconds to capture user attention softly
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppRedirect = () => {
    const defaultMessage = "Namaste Chronex Vadodara! I am visiting your website and would like to ask some questions about your watch collections and showroom in Alkapuri.";
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3 font-sans">
      {/* Dynamic Pop-up Greeting */}
      {showBubble && (
        <div className="bg-neutral-900 border border-neutral-800 text-neutral-200 p-4 rounded-2xl shadow-2xl max-w-[280px] relative animate-fade-in duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-300 transition-colors"
            aria-label="Close message"
          >
            <X size={14} />
          </button>
          <div className="flex gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping mt-1 shrink-0"></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold">
                Store Online
              </p>
              <h4 className="text-xs font-semibold text-neutral-100 mt-0.5">
                Boutique Assistant
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Namaste! Looking for a specific watch? Chat with our experts in Vadodara now!
              </p>
            </div>
          </div>
          <button
            onClick={handleWhatsAppRedirect}
            className="mt-3 w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <MessageSquare size={12} />
            <span>Start Chat</span>
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setShowBubble(!showBubble)}
        className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-105 transition-all animate-bounce"
        aria-label="Contact on WhatsApp"
      >
        <MessageSquare size={26} className="group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Soft pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping opacity-25"></span>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
