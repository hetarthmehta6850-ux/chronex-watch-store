import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { RotateCcw, Box, ShieldCheck, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

const ReturnsExchange = () => {
  const { orders, submitReturnRequest, addToast } = useContext(ShopContext);

  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("Design choice / preference");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate order exists
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
      setError("We couldn't find an order with that ID.");
      return;
    }

    if (order.email !== email && order.userEmail !== email) {
      setError("The email provided does not match the order record.");
      return;
    }

    if (order.orderStatus !== "Delivered") {
      setError("Only delivered orders can be returned. Please wait for delivery or cancel the order from your profile.");
      return;
    }

    // Submit Request
    submitReturnRequest({
      orderId,
      email,
      reason,
      notes,
      total: order.total
    });

    addToast("Return Request Successfully Filed", "success");
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] uppercase block mb-4">Client Services</span>
          <h1 className="text-4xl md:text-5xl font-serif text-neutral-100 mb-6">Returns & Exchanges</h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            At Chronex, we want you to be completely satisfied with your luxury timepiece. If your purchase doesn't meet your expectations, we offer a seamless 30-day return process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Policy Information */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-xl font-serif text-neutral-200 mb-6 border-b border-neutral-800 pb-4">Our Commitment</h2>
              
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <RotateCcw size={18} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-widest mb-1">30-Day Window</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">You have 30 days from the date of delivery to initiate a return or exchange for unworn timepieces.</p>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-widest mb-1">Pristine Condition</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">Watches must be returned in flawless condition, with all original protective plastics, tags, and documentation intact.</p>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Box size={18} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-widest mb-1">Original Packaging</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">The original manufacturer's box, warranty card, and all accessories must be included to process the refund.</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>
              <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-widest mb-2">Need Assistance?</h4>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">If you have any questions regarding your return, our concierge team is available to help.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest hover:text-amber-400 transition-colors">
                Contact Support <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-10 rounded-3xl shadow-2xl relative">
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-serif text-neutral-100 mb-3">Request Logged</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                    Your return request has been sent to our boutique team. We will review your case and email you the shipping labels within 24 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setOrderId("");
                      setEmail("");
                    }}
                    className="px-8 py-3 border border-neutral-700 text-neutral-300 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-colors"
                  >
                    File Another Return
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-serif text-neutral-200 mb-2">Initiate Return</h2>
                  <p className="text-xs text-neutral-500 mb-8 leading-relaxed">Enter your order details below. Registered users can also file returns directly from their <Link to="/profile" className="text-amber-500 hover:underline">Profile Dashboard</Link>.</p>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {error && (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold">
                        {error}
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <label htmlFor="orderId" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Order ID <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        id="orderId"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="e.g. ORD-123456"
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 transition-colors font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Email Address <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input 
                          type="email" 
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email used for the order"
                          required
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="reason" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Reason for Return</label>
                      <select
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="Design choice / preference">Design choice / preference</option>
                        <option value="Sizing issue">Sizing issue</option>
                        <option value="Defective / Damaged on arrival">Defective / Damaged on arrival</option>
                        <option value="Received wrong item">Received wrong item</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="notes" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Additional Notes</label>
                      <textarea 
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Please provide any relevant details..."
                        rows={3}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 mt-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                    >
                      Submit Request
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchange;
