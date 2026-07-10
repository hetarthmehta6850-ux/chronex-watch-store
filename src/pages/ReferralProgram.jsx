import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Share2, Copy, Gift, Users, Coins, ArrowLeft, CheckCircle2, Link as LinkIcon, MessageCircle } from "lucide-react";

const ReferralProgram = () => {
  const { theme, currentUser, referralCode, generateReferralCode, referrals, referralEarnings, applyReferral } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const [copied, setCopied] = useState(false);
  const [mockEmail, setMockEmail] = useState("");

  const handleCopy = () => {
    if (referralCode) {
      navigator.clipboard.writeText(`ref=${referralCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleMockReferral = (e) => {
    e.preventDefault();
    if (mockEmail) {
      // Parse the input to be flexible (supporting full link, ref=code, or just code)
      let parsedValue = mockEmail.trim();
      if (parsedValue.includes("ref=")) {
        const parts = parsedValue.split("ref=");
        parsedValue = parts[parts.length - 1];
      }
      
      // If the user inputs their own code, automatically generate a mock friend registration
      if (parsedValue === referralCode) {
        const randomFriend = `friend.${Math.floor(1000 + Math.random() * 9000)}@gmail.com`;
        applyReferral(randomFriend);
      } else {
        applyReferral(parsedValue);
      }
      setMockEmail("");
    }
  };

  if (!currentUser) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-2xl mx-auto text-center min-h-[60vh] flex flex-col justify-center">
        <Gift className="w-16 h-16 mx-auto mb-6 text-amber-500 opacity-50" />
        <h2 className="text-3xl font-serif text-amber-500 mb-4">Refer & Earn</h2>
        <p className="text-neutral-400 mb-8">You need to log in to access the Chronex Referral Program.</p>
        <button 
          onClick={() => navigate("/profile")}
          className="bg-amber-500 text-neutral-950 font-bold px-8 py-3 rounded-xl hover:bg-amber-400 transition-colors mx-auto"
        >
          Login to Continue
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <Link to="/profile" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-amber-500 transition-colors mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Back to Profile
      </Link>

      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mb-6">
          <Gift size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-6 leading-tight">
          Share the Luxury,<br />Earn Rewards
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Invite your friends to experience Chronex. They get 10% off their first order, and you receive ₹500 Chronex Credit when they make a purchase.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Action Card */}
        <div className={`lg:col-span-2 p-5 sm:p-8 md:p-12 rounded-3xl border ${theme === "light" ? "bg-white border-neutral-200" : "bg-neutral-900 border-neutral-800"}`}>
          <h2 className="text-2xl font-serif text-amber-500 mb-2">Your Referral Link</h2>
          <p className="text-neutral-400 mb-8">Share this unique link to start earning rewards.</p>

          {!referralCode ? (
            <div className="text-center p-8 border border-dashed border-neutral-700 rounded-2xl">
              <p className="text-neutral-400 mb-4">You haven't generated a referral code yet.</p>
              <button
                onClick={generateReferralCode}
                className="bg-amber-500 text-neutral-950 font-bold px-8 py-3 rounded-xl hover:bg-amber-400 transition-all"
              >
                Generate My Link
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`flex flex-col sm:flex-row sm:items-center p-3 sm:p-4 rounded-xl border gap-3 ${theme === 'light' ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-950 border-neutral-800'}`}>
                <div className="flex-grow truncate text-neutral-300 font-mono text-sm px-4 py-2 sm:py-0 text-center sm:text-left bg-neutral-900/20 sm:bg-transparent rounded-lg">
                  ref={referralCode}
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-xs transition-colors w-full sm:w-auto shrink-0 ${
                    copied ? "bg-emerald-500/20 text-emerald-400" : "bg-neutral-800 text-neutral-300 hover:text-amber-500"
                  }`}
                >
                  {copied ? <><CheckCircle2 size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
                </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-800">
                <p className="w-full text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Share via</p>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-700 hover:border-amber-500 hover:text-amber-500 transition-colors text-sm text-neutral-300">
                  <MessageCircle size={16} /> WhatsApp
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-700 hover:border-amber-500 hover:text-amber-500 transition-colors text-sm text-neutral-300">
                  <Share2 size={16} /> Share Link
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className={`p-5 sm:p-8 rounded-3xl border flex flex-col gap-6 ${theme === "light" ? "bg-white border-neutral-200" : "bg-neutral-900 border-neutral-800"}`}>
          <div>
            <h2 className="text-xl font-serif text-amber-500 mb-6">Your Earnings</h2>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-light text-neutral-100">₹{referralEarnings.toLocaleString("en-IN")}</span>
              <span className="text-sm text-emerald-400 font-bold">Credit</span>
            </div>
            <p className="text-xs text-neutral-500">Available to use on your next purchase</p>
          </div>

          <div className="h-px bg-neutral-800 w-full my-2"></div>

          <div>
            <h3 className="text-sm font-bold text-neutral-300 mb-4 flex items-center gap-2">
              <Users size={16} className="text-amber-500" />
              Successful Referrals
            </h3>
            <p className="text-3xl font-light text-neutral-100">{referrals.length}</p>
          </div>
          
          <Link to="/collections" className="mt-auto block text-center w-full py-3 rounded-xl border border-amber-500 text-amber-500 font-bold hover:bg-amber-500 hover:text-neutral-950 transition-colors text-sm">
            Shop Now
          </Link>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-24 mb-16">
        <h2 className="text-2xl font-serif text-amber-500 text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500 mb-6">
              <LinkIcon size={24} />
            </div>
            <h3 className="text-lg font-bold text-neutral-200 mb-3">1. Share Your Link</h3>
            <p className="text-sm text-neutral-400">Send your unique referral link to friends via WhatsApp, email, or social media.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500 mb-6">
              <Gift size={24} />
            </div>
            <h3 className="text-lg font-bold text-neutral-200 mb-3">2. Friend Gets 10% Off</h3>
            <p className="text-sm text-neutral-400">When your friend signs up using your link, they receive a 10% discount on their first order.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500 mb-6">
              <Coins size={24} />
            </div>
            <h3 className="text-lg font-bold text-neutral-200 mb-3">3. You Get ₹500</h3>
            <p className="text-sm text-neutral-400">Once their first order is delivered, ₹500 Chronex Credit is added to your account.</p>
          </div>
        </div>
      </div>

      {/* Developer Tool: Simulate Referral */}
      {referralCode && (
        <div className="mt-20 p-4 sm:p-6 border border-neutral-800 rounded-2xl bg-neutral-900/50 max-w-md mx-auto">
          <h3 className="text-sm font-bold text-amber-500 mb-4 flex items-center gap-2">
            <span className="bg-amber-500 text-neutral-950 text-[10px] px-2 py-0.5 rounded-sm">DEMO</span>
            Simulate a Referral
          </h3>
          <form onSubmit={handleMockReferral} className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              placeholder="Friend's Email or Referral Code" 
              value={mockEmail}
              onChange={(e) => setMockEmail(e.target.value)}
              className="flex-grow bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-neutral-100 focus:border-amber-500 outline-none w-full sm:w-auto"
              required
            />
            <button type="submit" className="bg-neutral-800 hover:bg-neutral-700 text-amber-500 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors w-full sm:w-auto shrink-0">
              Simulate
            </button>
          </form>
          <p className="text-[10px] text-neutral-500 mt-3 leading-relaxed">
            Use this to test the referral flow. Enter any email or paste a referral code (like `ref=CHX-XXXX-XXXX`) and click Simulate. You'll instantly receive ₹500 credit in your stats and wallet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReferralProgram;
