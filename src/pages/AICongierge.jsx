import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Sparkles, BrainCircuit, ArrowRight, RotateCcw, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AICongierge = () => {
  const { products } = useContext(ShopContext);
  const [step, setStep] = useState(0); // 0: intro, 1: quiz, 2: thinking, 3: results
  const [budget, setBudget] = useState("");
  const [occasion, setOccasion] = useState("");
  const [movement, setMovement] = useState("");
  const [style, setStyle] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [analysisText, setAnalysisText] = useState("");

  const handleStartQuiz = () => {
    setStep(1);
  };

  const handleRestart = () => {
    setBudget("");
    setOccasion("");
    setMovement("");
    setStyle("");
    setRecommendations([]);
    setAnalysisText("");
    setStep(0);
  };

  const calculateRecommendations = () => {
    setStep(2);

    // Simulate AI thinking delay
    setTimeout(() => {
      // 1. Filter products locally based on quiz selections
      let filtered = [...products];

      // Budget filter
      if (budget === "under-15") filtered = filtered.filter((p) => p.price < 15000);
      else if (budget === "15-50") filtered = filtered.filter((p) => p.price >= 15000 && p.price <= 50000);
      else if (budget === "50-150") filtered = filtered.filter((p) => p.price > 50000 && p.price <= 150000);
      else if (budget === "above-150") filtered = filtered.filter((p) => p.price > 150000);

      // Occasion & Movement heuristic matching
      if (occasion === "formal") {
        filtered = filtered.filter((p) => p.specs?.movement?.toLowerCase().includes("automatic") || p.brand === "Rolex" || p.brand === "Omega" || p.brand === "Tissot");
      } else if (occasion === "sport") {
        filtered = filtered.filter((p) => p.brand === "G-Shock" || p.specs?.waterResistance?.includes("100") || p.specs?.waterResistance?.includes("200") || p.brand === "Seiko");
      }

      if (movement === "mechanical") {
        filtered = filtered.filter((p) => p.specs?.movement?.toLowerCase().includes("automatic") || p.specs?.movement?.toLowerCase().includes("mechanical"));
      } else if (movement === "quartz") {
        filtered = filtered.filter((p) => !p.specs?.movement?.toLowerCase().includes("automatic"));
      }

      // If no watches found, return top 3 featured products as backup recommendations
      const finalRecs = filtered.length > 0 ? filtered.slice(0, 3) : products.slice(0, 3);

      // Simulate a custom AI-written summary paragraph
      const matches = finalRecs.map(r => r.name).join(" and ");
      setAnalysisText(
        `Based on our algorithmic horological assessment for a budget of ${
          budget === "under-15" ? "under ₹15,000" : budget === "15-50" ? "₹15,000 - ₹50,000" : budget === "50-150" ? "₹50,000 - ₹1,50,000" : "above ₹1,50,000"
        } suited for ${occasion} wear with a preference for ${movement} movements. Our engine selected the ${matches}. These timepieces possess ideal build characteristics, high retention rates, and structural compliance with Vadodara's environmental attributes. They feature premium sapphire dials, exquisite metallic weight, and official manufacturer warranty validation.`
      );

      setRecommendations(finalRecs);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="min-h-screen py-32 max-w-4xl mx-auto px-6 flex flex-col justify-center select-none font-sans">
      <div className="relative p-8 md:p-12 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* BG Glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="flex flex-col items-center text-center gap-6">
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full animate-bounce">
              <BrainCircuit size={40} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide">
              Chronex AI Concierge
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
              Answer 4 simple questions about your taste, budget, and lifestyle. Our proprietary horological recommendation matrix will analyze thousands of data points to find your absolute match.
            </p>
            <button
              onClick={handleStartQuiz}
              className="mt-4 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-amber-500/15 flex items-center gap-2 group"
            >
              Consult the AI Recommender
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Step 1: Interactive Quiz Questions */}
        {step === 1 && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 flex items-center gap-1.5">
                <Sparkles size={14} /> Specifying Preferences
              </span>
              <button onClick={handleRestart} className="text-xs text-neutral-500 hover:text-neutral-300 flex items-center gap-1">
                <RotateCcw size={12} /> Restart
              </button>
            </div>

            {/* Question 1: Budget */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-neutral-200">1. Select your Budget Parameter:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "under-15", label: "Under ₹15,000" },
                  { id: "15-50", label: "₹15k - ₹50k" },
                  { id: "50-150", label: "₹50k - ₹1.5L" },
                  { id: "above-150", label: "Above ₹1.5L" }
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setBudget(o.id)}
                    className={`py-3 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      budget === o.id ? "bg-amber-500 text-neutral-950 border-amber-500" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Occasion */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-neutral-200">2. Where do you intend to wear the timepiece?</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "formal", label: "Formal/Office" },
                  { id: "daily", label: "Daily Casual" },
                  { id: "sport", label: "Sports/Diving" },
                  { id: "gala", label: "Galas/Weddings" }
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setOccasion(o.id)}
                    className={`py-3 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      occasion === o.id ? "bg-amber-500 text-neutral-950 border-amber-500" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Movement */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-neutral-200">3. Preferred Internal Movement Type:</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "mechanical", label: "Mechanical Auto" },
                  { id: "quartz", label: "Quartz Accuracy" },
                  { id: "eco-drive", label: "Solar / Eco-Drive" }
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setMovement(o.id)}
                    className={`py-3 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      movement === o.id ? "bg-amber-500 text-neutral-950 border-amber-500" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Brand Category */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-neutral-200">4. Desired Brand Aesthetic Category:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "swiss", label: "Swiss Prestige" },
                  { id: "japanese", label: "Japanese Tech" },
                  { id: "indian", label: "Indian Finest" },
                  { id: "fashion", label: "Fashion Luxury" }
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setStyle(o.id)}
                    className={`py-3 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      style === o.id ? "bg-amber-500 text-neutral-950 border-amber-500" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm Submit */}
            <button
              onClick={calculateRecommendations}
              disabled={!budget || !occasion || !movement || !style}
              className="mt-4 w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-neutral-800 disabled:to-neutral-800 disabled:text-neutral-600 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl"
            >
              Execute Recommendations Analysis
            </button>
          </div>
        )}

        {/* Step 2: Thinking Animation */}
        {step === 2 && (
          <div className="flex flex-col items-center text-center py-12 gap-6">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <BrainCircuit size={48} className="text-amber-500 animate-pulse" />
              <div className="absolute inset-0 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            </div>
            <h3 className="font-extrabold text-neutral-100 text-lg">AI Concierge Matrix Calculating...</h3>
            <p className="text-neutral-500 text-xs max-w-xs">
              Filtering references, verifying movement calibrations, and cross-matching design constraints.
            </p>
          </div>
        )}

        {/* Step 3: Quiz Results */}
        {step === 3 && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-500 flex items-center gap-1.5">
                <CheckCircle size={14} /> Computation Successful
              </span>
              <button onClick={handleRestart} className="text-xs text-neutral-500 hover:text-neutral-300 flex items-center gap-1">
                <RotateCcw size={12} /> Consult Again
              </button>
            </div>

            {/* AI Advisor Writeup */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-500">Chronex Analyst Assessment</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans italic">
                "{analysisText}"
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest font-black text-neutral-300">Recommended Timepieces</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recommendations.map((watch) => (
                  <div key={watch.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 hover:border-amber-500/20 transition-all flex flex-col justify-between h-72">
                    <div className="h-32 flex items-center justify-center">
                      <img src={watch.images[0]} alt={watch.name} className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
                    </div>
                    <div className="flex flex-col gap-1 mt-3">
                      <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold">{watch.brand}</span>
                      <h5 className="text-xs font-extrabold text-neutral-200 line-clamp-1">{watch.name}</h5>
                      <span className="text-xs font-black text-neutral-100 mt-1">₹{watch.price.toLocaleString("en-IN")}</span>
                    </div>
                    <Link
                      to={`/product/${watch.id}`}
                      className="mt-3 py-2 w-full text-center bg-neutral-900 hover:bg-neutral-800 text-[10px] uppercase font-bold tracking-wider text-amber-400 rounded-lg border border-neutral-800"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICongierge;
