import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Package, Star, Crown, Diamond, Check, AlertCircle, ArrowLeft, Calendar, Loader2 } from "lucide-react";

const plans = [
  {
    name: "Silver Tier",
    price: 499,
    icon: <Star size={24} className="text-neutral-400" />,
    color: "neutral-400",
    features: [
      "1 Premium NATO Strap",
      "Microfiber Cleaning Cloth",
      "Monthly Watch Magazine",
      "Access to Members Sale"
    ]
  },
  {
    name: "Gold Tier",
    price: 999,
    icon: <Crown size={24} className="text-amber-500" />,
    color: "amber-500",
    features: [
      "1 Handcrafted Leather Strap",
      "Professional Watch Tool Kit",
      "Premium Cleaning Solution",
      "Early Access to Limited Editions",
      "Free Express Shipping"
    ]
  },
  {
    name: "Platinum Tier",
    price: 1999,
    icon: <Diamond size={24} className="text-cyan-400" />,
    color: "cyan-400",
    features: [
      "1 Authentic Alligator/Crocodile Strap",
      "Luxury Watch Travel Roll (Vegan Leather)",
      "Dedicated Concierge Service",
      "VIP Event Invitations",
      "Free Watch Servicing (Once a year)"
    ]
  }
];

const SubscriptionBox = () => {
  const { theme, currentUser, subscription, subscribe, cancelSubscription } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <Link to="/profile" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-amber-500 transition-colors mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Back to Profile
      </Link>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mb-6">
          <Package size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-6 leading-tight">
          The Collector's Box
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Elevate your watch-collecting journey with our curated monthly subscription boxes. Discover premium straps, care tools, and exclusive accessories delivered straight to your door.
        </p>
      </div>

      {!currentUser && (
        <div className="mb-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center max-w-2xl mx-auto flex flex-col items-center">
          <AlertCircle className="text-amber-500 mb-3" size={32} />
          <h3 className="text-amber-500 font-bold mb-2">Login Required</h3>
          <p className="text-neutral-400 text-sm mb-4">Please log in or register to subscribe to The Collector's Box.</p>
          <button 
            onClick={() => navigate("/profile")}
            className="bg-amber-500 text-neutral-950 font-bold px-6 py-2 rounded-lg text-sm hover:bg-amber-400 transition-colors"
          >
            Login to Subscribe
          </button>
        </div>
      )}

      {subscription && subscription.status === 'Active' ? (
        <div className={`max-w-2xl mx-auto p-8 rounded-3xl border ${theme === 'light' ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-neutral-800'}`}>
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-neutral-800">
            <div>
              <h2 className="text-2xl font-serif text-amber-500 mb-1">Your Subscription</h2>
              <p className="text-neutral-400 text-sm">Manage your Collector's Box</p>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
              Active
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Current Plan</span>
              <span className="text-neutral-100 font-bold">{subscription.plan} Tier</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Next Delivery</span>
              <span className="text-neutral-100 flex items-center gap-2">
                <Calendar size={14} className="text-amber-500" />
                {new Date(subscription.nextBilling).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Monthly Amount</span>
              <span className="text-neutral-100 font-bold">₹{plans.find(p => p.name.includes(subscription.plan))?.price.toLocaleString("en-IN")}/mo</span>
            </div>
          </div>

          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 mb-8">
            <h3 className="text-sm font-bold text-neutral-300 mb-4">Upcoming Box Preview</h3>
            <div className="flex items-center gap-4 text-neutral-400 text-sm">
              <Package size={24} className="text-amber-500" />
              <p>Your {subscription.plan} box is being curated. It includes a seasonal strap and care tools.</p>
            </div>
          </div>

          <button 
            onClick={cancelSubscription}
            className="w-full py-3 rounded-xl border border-rose-500/30 text-rose-500 font-bold hover:bg-rose-500/10 transition-colors text-sm"
          >
            Cancel Subscription
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative p-8 rounded-3xl border flex flex-col transition-transform hover:-translate-y-2 ${theme === 'light' ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-neutral-800'} ${plan.name === 'Gold Tier' ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : ''}`}>
              {plan.name === 'Gold Tier' && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-neutral-950 text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-${plan.color}/10`}>
                  {plan.icon}
                </div>
                <h3 className={`text-xl font-bold text-${plan.color}`}>{plan.name}</h3>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-light text-neutral-100">₹{plan.price.toLocaleString("en-IN")}</span>
                <span className="text-neutral-500 text-sm">/month</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                    <Check size={16} className={`text-${plan.color} shrink-0 mt-0.5`} />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={!currentUser}
                onClick={() => subscribe(plan.name.split(' ')[0])}
                className={`w-full py-3 rounded-xl font-bold transition-all text-sm ${
                  !currentUser
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    : plan.name === 'Gold Tier'
                      ? "bg-amber-500 text-neutral-950 hover:bg-amber-400"
                      : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                }`}
              >
                {currentUser ? "Subscribe Now" : "Login to Subscribe"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionBox;
