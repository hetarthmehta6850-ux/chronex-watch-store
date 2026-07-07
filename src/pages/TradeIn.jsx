import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { ArrowLeft, ArrowRight, ShieldCheck, Scale, Info, ClipboardCheck, Box } from "lucide-react";
import { Link } from "react-router-dom";

const TradeIn = () => {
  const { submitTradeIn, currentUser } = useContext(ShopContext);

  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("Rolex");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [condition, setCondition] = useState("Excellent");
  const [boxPapers, setBoxPapers] = useState("Full Set");
  
  // Submit contact info
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  
  const [referenceId, setReferenceId] = useState(null);

  const conditionGuide = {
    Mint: { multiplier: 1.1, desc: "Flawless, virtually unworn. No scratches, dings or hairpins. Original sticker options intact." },
    Excellent: { multiplier: 0.95, desc: "Minimal signs of wear. Microscopic hairline scratches, clean dial, crisp bezel edges." },
    Good: { multiplier: 0.8, desc: "Visible light scratches. Never polished, minor edge wear. Dial and crystals are clear." },
    Fair: { multiplier: 0.65, desc: "Significant surface scratches and light dings. Mechanically sound but shows clear usage." },
    Poor: { multiplier: 0.45, desc: "Deep scuffs, bezel dents. Needs servicing/refurbishment. Dial or crystal may show aging." }
  };

  const setGuide = {
    "Full Set": { multiplier: 1.0, label: "Original Box & Certificate Cards" },
    "Watch Only": { multiplier: 0.8, label: "Timepiece only, no accessories" },
    "Box Only": { multiplier: 0.88, label: "Original Box, missing warranty papers" },
    "Papers Only": { multiplier: 0.92, label: "Original Warranty certificate, missing box" }
  };

  const getEstimatedRange = () => {
    let basePrice = 40000; // default for other
    if (brand === "Rolex") basePrice = 250000;
    else if (brand === "Omega") basePrice = 180000;
    else if (brand === "Rado") basePrice = 85000;
    else if (brand === "TAG Heuer") basePrice = 95000;
    else if (brand === "Tissot") basePrice = 30000;
    else if (brand === "Seiko") basePrice = 20000;
    else if (brand === "Citizen") basePrice = 15000;

    // Adjust by age
    const age = Math.max(0, new Date().getFullYear() - Number(year));
    const depreciation = Math.max(0.4, 1 - (age * 0.04)); // 4% drop per year, floor at 40%

    const conditionMultiplier = conditionGuide[condition].multiplier;
    const setMultiplier = setGuide[boxPapers].multiplier;

    const estimatedValue = basePrice * depreciation * conditionMultiplier * setMultiplier;
    
    // Add ±10% variation range
    const lowEstimate = Math.round((estimatedValue * 0.9) / 500) * 500;
    const highEstimate = Math.round((estimatedValue * 1.1) / 500) * 500;

    return { low: lowEstimate, high: highEstimate };
  };

  const handleNextStep = () => {
    if (step === 1 && !model.trim()) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const estimate = getEstimatedRange();
    const tradeData = {
      name,
      email,
      phone,
      brand,
      model,
      purchaseYear: year,
      condition,
      boxPapers,
      notes,
      estimatedRange: `₹${estimate.low.toLocaleString("en-IN")} - ₹${estimate.high.toLocaleString("en-IN")}`
    };

    const refId = submitTradeIn(tradeData);
    setReferenceId(refId);
    setStep(6); // Success screen
  };

  const estimate = getEstimatedRange();

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3 mb-10">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/25">
            <Scale size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide text-neutral-100">
            Vintage Trade-In & Valuation
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm max-w-xl leading-relaxed">
            Upgrade your wrist profile. Submit your timepiece details to receive an instant valuation estimate and offset it against any chronex acquisition.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Progress Indicator */}
          {step <= 5 && (
            <div className="flex justify-between items-center gap-2 mb-8 border-b border-neutral-800 pb-5 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
              {["Watch Info", "Condition", "Accessories", "Estimate", "Contact"].map((label, idx) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    step > idx ? "bg-amber-500 border-amber-550 text-neutral-950" : "border-neutral-850"
                  }`}>
                    {idx + 1}
                  </span>
                  <span className={step === idx + 1 ? "text-neutral-200" : ""}>{label}</span>
                </div>
              ))}
            </div>
          )}

          {/* STEP 1: Watch Information */}
          {step === 1 && (
            <div className="flex flex-col gap-6 text-left">
              <h2 className="text-lg font-serif font-bold text-neutral-200">1. Tell us about your timepiece</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Watch Brand</label>
                  <select
                    value={brand} onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-305 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {["Rolex", "Omega", "Rado", "TAG Heuer", "Tissot", "Seiko", "Citizen", "Other Luxury"].map(b => (
                      <option key={b} value={b} className="bg-neutral-900">{b}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Watch Model Name / Reference</label>
                  <input
                    type="text" required placeholder="e.g. Speedmaster Moonwatch 42"
                    value={model} onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Purchase Year (Approx)</label>
                  <input
                    type="number" min="1950" max={new Date().getFullYear()}
                    value={year} onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-855 rounded-xl py-3 px-4 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleNextStep}
                  disabled={!model.trim()}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Condition Select */}
          {step === 2 && (
            <div className="flex flex-col gap-6 text-left">
              <h2 className="text-lg font-serif font-bold text-neutral-200">2. Assess physical condition</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(conditionGuide).map(condKey => (
                  <button
                    key={condKey}
                    onClick={() => setCondition(condKey)}
                    className={`p-5 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                      condition === condKey 
                        ? "bg-amber-500/10 border-amber-500 text-neutral-200" 
                        : "bg-neutral-950/40 border-neutral-850 text-neutral-400 hover:border-neutral-800"
                    }`}
                  >
                    <span className="font-extrabold text-xs uppercase tracking-wider">{condKey}</span>
                    <span className="text-[10px] leading-relaxed text-neutral-550 mt-1">{conditionGuide[condKey].desc}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <button onClick={handlePrevStep} className="text-neutral-550 hover:text-neutral-200 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={handleNextStep} className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Box & Papers Status */}
          {step === 3 && (
            <div className="flex flex-col gap-6 text-left">
              <h2 className="text-lg font-serif font-bold text-neutral-200">3. Supporting Accessories</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(setGuide).map(setKey => (
                  <button
                    key={setKey}
                    onClick={() => setBoxPapers(setKey)}
                    className={`p-5 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                      boxPapers === setKey 
                        ? "bg-amber-500/10 border-amber-500 text-neutral-200" 
                        : "bg-neutral-950/40 border-neutral-850 text-neutral-400 hover:border-neutral-800"
                    }`}
                  >
                    <Box size={24} className={boxPapers === setKey ? "text-amber-500" : "text-neutral-600"} />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-extrabold text-xs uppercase tracking-wider">{setKey}</span>
                      <span className="text-[10px] text-neutral-550">{setGuide[setKey].label}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <button onClick={handlePrevStep} className="text-neutral-555 hover:text-neutral-200 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={handleNextStep} className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
                  <span>Calculate Quote</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Estimate Display */}
          {step === 4 && (
            <div className="flex flex-col gap-6 text-center py-4">
              <span className="text-amber-500 text-[10px] uppercase font-extrabold tracking-[0.2em]">Estimated Instant Valuation</span>
              
              <div className="p-8 rounded-3xl bg-neutral-955 border border-neutral-850 max-w-lg mx-auto w-full flex flex-col gap-2">
                <h3 className="text-3xl md:text-4xl font-sans font-black text-neutral-100">
                  ₹{estimate.low.toLocaleString("en-IN")} - ₹{estimate.high.toLocaleString("en-IN")}
                </h3>
                <p className="text-[10px] text-neutral-500 max-w-xs mx-auto leading-relaxed mt-1">
                  This range represents a simulated buyback quote for a *{brand} {model}* in {condition} condition ({boxPapers}).
                </p>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-neutral-955/20 border border-neutral-900 text-left items-start max-w-xl mx-auto">
                <Info size={24} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  <strong>Notice:</strong> To formalize this appraisal and receive a discount coupon / trade-in credit link to apply on checkout, please proceed to submit a physical evaluation ticket.
                </p>
              </div>

              <div className="flex justify-between items-center mt-6 border-t border-neutral-850 pt-5">
                <button onClick={handlePrevStep} className="text-neutral-550 hover:text-neutral-200 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={handleNextStep} className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
                  <span>Submit Valuation Ticket</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Contact Info */}
          {step === 5 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
              <div>
                <h2 className="text-lg font-serif font-bold text-neutral-200">5. Verification Details</h2>
                <p className="text-[10px] text-neutral-500 mt-1">Provide your details to log this trade-in request inside the Admin Console.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Your Name</label>
                  <input
                    type="text" required placeholder="e.g. Rajesh Kumar"
                    value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-855 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Email Address</label>
                  <input
                    type="email" required placeholder="e.g. rajesh@gmail.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-855 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Phone Number</label>
                  <input
                    type="tel" required placeholder="e.g. +91 83206 06850"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-855 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Additional Comments / Serial Number (Optional)</label>
                <textarea
                  placeholder="Tell us about the watch's servicing history, visual scratches, or strap upgrades..."
                  value={notes} onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="w-full bg-neutral-950 border border-neutral-855 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                />
              </div>

              <div className="flex justify-between items-center mt-6 border-t border-neutral-850 pt-5">
                <button type="button" onClick={handlePrevStep} className="text-neutral-550 hover:text-neutral-200 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <button type="submit" className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
                  <ClipboardCheck size={14} />
                  <span>Submit to Admin</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 6: Success Screen */}
          {step === 6 && (
            <div className="flex flex-col gap-6 text-center py-10 items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <ShieldCheck size={36} className="animate-pulse" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-2xl font-bold font-serif text-neutral-250">Valuation Ticket Logged!</h2>
                <p className="text-xs text-neutral-500">Your trade-in reference ID: <strong className="font-mono text-amber-500">{referenceId}</strong></p>
              </div>

              <div className="p-5 bg-neutral-950 border border-neutral-850 rounded-2xl max-w-md w-full text-left flex flex-col gap-2">
                <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold block">Appraisal Details</span>
                <span className="text-xs font-sans text-neutral-300"><strong>Timepiece:</strong> {brand} {model}</span>
                <span className="text-xs font-sans text-neutral-350"><strong>Condition:</strong> {condition} &bull; {boxPapers}</span>
                <span className="text-xs font-sans text-neutral-350"><strong>Estimated Value:</strong> {estimate.low.toLocaleString("en-IN")} - {estimate.high.toLocaleString("en-IN")}</span>
              </div>

              <p className="text-[11px] text-neutral-500 max-w-sm leading-relaxed mt-2">
                Our support team is reviewing your ticket inside the Admin dashboard. You will see updates on your Profile dashboard shortly.
              </p>

              <div className="flex gap-4 mt-6">
                <Link to="/profile" className="px-6 py-3 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all">
                  Track in Profile
                </Link>
                <Link to="/collections" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all">
                  Shop Collections
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TradeIn;
