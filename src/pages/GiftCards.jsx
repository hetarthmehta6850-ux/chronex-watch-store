import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Gift, Copy, Check, CheckCircle2, ShieldCheck, Mail } from "lucide-react";

const PRESET_VALUES = [5000, 10000, 25000, 50000];

const GiftCards = () => {
  const { addGiftCard } = useContext(ShopContext);
  
  const [selectedValue, setSelectedValue] = useState(10000);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  
  const [isPurchased, setIsPurchased] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePurchase = (e) => {
    e.preventDefault();
    if (!recipientName || !recipientEmail || !senderName) return;

    // Generate a secure code like GC-XXXXXX
    const code = `GC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const giftCardData = {
      code,
      value: selectedValue,
      recipientName,
      recipientEmail,
      senderName,
      message,
      isRedeemed: false,
      dateCreated: new Date().toISOString()
    };

    addGiftCard(giftCardData);
    setGeneratedCode(code);
    setIsPurchased(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setIsPurchased(false);
    setGeneratedCode("");
    setRecipientName("");
    setRecipientEmail("");
    setSenderName("");
    setMessage("");
  };

  if (isPurchased) {
    return (
      <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans flex items-center justify-center animate-fade-in">
        <div className="max-w-xl w-full px-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-neutral-950 to-neutral-950"></div>
            
            <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4 relative z-10" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-100 mb-2 relative z-10">Voucher Generated Successfully!</h2>
            <p className="text-neutral-400 text-xs mb-8 relative z-10">A digital gift voucher has been sent to {recipientEmail}.</p>

            {/* Gift Card visual wrapper */}
            <div className="relative border border-amber-500/30 rounded-2xl p-6 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-left mb-8 shadow-inner">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold block mb-1">Chronex Luxury Voucher</span>
                  <span className="text-xs text-neutral-500 font-medium">Est. 2014 &bull; Vadodara</span>
                </div>
                <Gift className="text-amber-500" size={24} />
              </div>
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">Value</span>
                <span className="text-3xl font-extrabold text-neutral-100">₹{selectedValue.toLocaleString("en-IN")}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                <div>
                  <span className="text-neutral-600 block text-[9px] mb-0.5">To</span>
                  <span className="text-neutral-200 line-clamp-1">{recipientName}</span>
                </div>
                <div>
                  <span className="text-neutral-600 block text-[9px] mb-0.5">From</span>
                  <span className="text-neutral-200 line-clamp-1">{senderName}</span>
                </div>
              </div>
            </div>

            {/* Code Copy Field */}
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Voucher Code (Use at Checkout)</span>
              <div className="flex bg-neutral-950 border border-neutral-850 rounded-xl p-1 items-center justify-between">
                <span className="font-mono font-bold text-amber-500 text-base pl-4 tracking-widest">{generatedCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-350 hover:text-amber-500 text-xs font-bold uppercase tracking-widest rounded-lg transition-all flex items-center gap-1.5"
                >
                  {isCopied ? (
                    <>
                      <Check size={12} className="text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Generate Another Voucher
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans selection:bg-amber-500/30">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">Share Luxury</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-100 mt-3 mb-6">
            E-Gift Vouchers
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Gift your loved ones the freedom of choosing their perfect timepiece with our customizable digital vouchers.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Card Preview (Left) */}
          <div className="w-full lg:w-5/12 sticky top-32">
            <div className="border border-neutral-850 rounded-3xl p-8 bg-neutral-900/30 relative overflow-hidden backdrop-blur-md">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-neutral-950 to-neutral-950"></div>
              
              <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-6">Live Card Preview</h3>
              
              <div className="border border-amber-500/30 rounded-2xl p-6 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 mb-6 shadow-2xl relative">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold block mb-1">Chronex Gift Card</span>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wider font-mono">AUTHORIZED RESELLER</span>
                  </div>
                  <Gift className="text-amber-500" size={24} />
                </div>
                
                <div className="mb-8">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 block mb-1">VOUCHER VALUE</span>
                  <span className="text-4xl font-extrabold text-neutral-150 font-sans">₹{selectedValue.toLocaleString("en-IN")}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[9px] text-neutral-400 uppercase tracking-widest font-bold border-t border-neutral-900 pt-6">
                  <div>
                    <span className="text-neutral-600 block text-[8px] mb-0.5">To</span>
                    <span className="text-neutral-300 line-clamp-1">{recipientName || "Recipient Name"}</span>
                  </div>
                  <div>
                    <span className="text-neutral-600 block text-[8px] mb-0.5">From</span>
                    <span className="text-neutral-300 line-clamp-1">{senderName || "Your Name"}</span>
                  </div>
                </div>
              </div>

              {/* Message Preview */}
              {message && (
                <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-neutral-400 italic font-sans leading-relaxed">
                  "{message}"
                </div>
              )}
            </div>
          </div>

          {/* Form Fields (Right) */}
          <div className="w-full lg:w-7/12">
            <form onSubmit={handlePurchase} className="bg-neutral-900/10 border border-neutral-900 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
              
              {/* Preset Value Selector */}
              <div>
                <label className="text-xs text-neutral-400 uppercase tracking-wider block mb-3 font-semibold">Select Voucher Amount</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PRESET_VALUES.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSelectedValue(val)}
                      className={`py-3 rounded-xl border text-sm font-bold font-sans transition-all ${
                        selectedValue === val
                          ? "border-amber-500 bg-amber-500/5 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                          : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      ₹{val.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Recipient's Name</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Recipient's full name"
                    className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-xs text-neutral-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Recipient's Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="recipient@email.com"
                      className="w-full bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-3 pl-10 pr-4 text-xs text-neutral-100 focus:outline-none"
                    />
                    <Mail size={14} className="absolute left-3.5 top-3.5 text-neutral-600" />
                  </div>
                </div>
              </div>

              {/* Sender Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Your Name (Sender)</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your full name"
                  className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              {/* Gift Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Personalized Gift Message (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Happy Anniversary! Wear it in good health..."
                  rows="3"
                  maxLength="150"
                  className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-xs text-neutral-100 focus:outline-none resize-none font-sans"
                ></textarea>
              </div>

              {/* Secure Transaction Signals */}
              <div className="flex items-center gap-2 p-3 bg-neutral-950 rounded-xl border border-neutral-855 text-emerald-500/80 text-[10px] uppercase font-bold tracking-wider justify-center">
                <ShieldCheck size={14} />
                <span>Simulated Secure Voucher Generation &bull; Instant Delivery</span>
              </div>

              {/* Purchase Button */}
              <button
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
              >
                Generate Digital Gift Voucher
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GiftCards;
