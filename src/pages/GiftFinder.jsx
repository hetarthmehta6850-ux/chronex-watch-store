import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Gift, ArrowRight, CheckCircle2, RefreshCw, MessageSquare, Briefcase, Heart } from "lucide-react";

const GiftFinder = () => {
  const { products, toggleWishlist, wishlist } = useContext(ShopContext);

  // Quiz States
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [quizResults, setQuizResults] = useState([]);

  // Corporate Gifting States
  const [corpName, setCorpName] = useState("");
  const [corpCompany, setCorpCompany] = useState("");
  const [corpPhone, setCorpPhone] = useState("");
  const [corpQty, setCorpQty] = useState("10-50");
  const [corpBudget, setCorpBudget] = useState("Under ₹5,000");
  const [corpNotes, setCorpNotes] = useState("");
  const [corpSuccess, setCorpSuccess] = useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const runGiftFinder = () => {
    // Perform Filtering based on Quiz inputs
    const results = products.filter((product) => {
      // 1. Recipient Gender matching
      let genderMatch = true;
      if (recipient === "Him") {
        genderMatch = product.category === "Men" || product.category === "Unisex";
      } else if (recipient === "Her") {
        genderMatch = product.category === "Women" || product.category === "Unisex";
      }

      // 2. Budget matching
      let budgetMatch = true;
      if (budget === "budget") {
        budgetMatch = product.price <= 15000;
      } else if (budget === "mid") {
        budgetMatch = product.price > 15000 && product.price <= 60000;
      } else if (budget === "premium") {
        budgetMatch = product.price > 60000 && product.price <= 250000;
      } else if (budget === "luxury") {
        budgetMatch = product.price > 250000;
      }

      // 3. Occasion matching (Style association)
      let styleMatch = true;
      if (occasion === "Wedding" || occasion === "Anniversary") {
        styleMatch = product.style === "Luxury" || product.style === "Formal";
      } else if (occasion === "Sports / Adventure") {
        styleMatch = product.style === "Sport";
      } else if (occasion === "Daily Wear / Casual") {
        styleMatch = product.style === "Casual" || product.style === "Sport";
      }

      return genderMatch && budgetMatch && styleMatch;
    });

    setQuizResults(results);
    setStep(4); // Move to results step
  };

  const resetQuiz = () => {
    setRecipient("");
    setOccasion("");
    setBudget("");
    setQuizResults([]);
    setStep(1);
  };

  const handleCorporateSubmit = (e) => {
    e.preventDefault();
    setCorpSuccess(true);

    const corpMsg = `Namaste Chronex Vadodara! I am placing a corporate/bulk gifting enquiry.
    
- *Contact Person:* ${corpName}
- *Company Name:* ${corpCompany}
- *Contact Phone:* ${corpPhone}
- *Quantity Needed:* ${corpQty}
- *Estimated Budget per Watch:* ${corpBudget}
- *Notes / Custom Engraving:* ${corpNotes || "N/A"}

Please share some options and a quotation. Thank you!`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=918320606850&text=${encodeURIComponent(corpMsg)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setCorpSuccess(false);
      setCorpName("");
      setCorpCompany("");
      setCorpPhone("");
      setCorpNotes("");
    }, 1500);
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
            Bespoke Gifting Studio
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
            The Gift Selection Suite
          </h1>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
          <p className="text-neutral-400 text-sm mt-4 leading-relaxed">
            Watches are the ultimate symbols of milestones, relationships, and achievements. Use our interactive Finder below to find the perfect match, or explore our corporate gifting solutions for bulk showroom commissions.
          </p>
        </div>

        {/* 1. Interactive Gift Finder Quiz */}
        <div className="mb-24 max-w-4xl mx-auto bg-neutral-900/10 border border-neutral-900 rounded-3xl p-8 md:p-12 shadow-xl relative">
          <div className="absolute top-6 right-8 flex items-center gap-1.5 text-xs text-neutral-500">
            <Gift size={16} className="text-amber-500" />
            <span>Curator Engine v1.0</span>
          </div>

          {/* STEP 1: RECIPIENT */}
          {step === 1 && (
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-xs text-amber-500 font-semibold uppercase tracking-wider">Step 1 of 3</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-100 mt-1">Who is this milestone gift for?</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {["Him", "Her", "Unisex / Shared"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setRecipient(option)}
                    className={`p-6 rounded-2xl border text-left flex flex-col justify-between h-32 transition-all ${
                      recipient === option
                        ? "border-amber-500 bg-amber-500/5 text-amber-400"
                        : "border-neutral-850 bg-neutral-900/20 hover:border-neutral-700 hover:bg-neutral-900/40 text-neutral-300"
                    }`}
                  >
                    <span className="text-base font-semibold">{option}</span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500">Select</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNextStep}
                  disabled={!recipient}
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: OCCASION */}
          {step === 2 && (
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-xs text-amber-500 font-semibold uppercase tracking-wider">Step 2 of 3</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-100 mt-1">What is the special occasion?</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["Wedding / Engagement", "Birthday / Anniversary", "Sports / Adventure", "Daily Wear / Casual"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setOccasion(option)}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-32 transition-all ${
                      occasion === option
                        ? "border-amber-500 bg-amber-500/5 text-amber-400"
                        : "border-neutral-850 bg-neutral-900/20 hover:border-neutral-700 hover:bg-neutral-900/40 text-neutral-300"
                    }`}
                  >
                    <span className="text-xs font-semibold leading-relaxed">{option}</span>
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500">Select</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-4 border-t border-neutral-900">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!occasion}
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET */}
          {step === 3 && (
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-xs text-amber-500 font-semibold uppercase tracking-wider">Step 3 of 3</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-100 mt-1">What is your estimated budget?</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "budget", title: "Under ₹15,000", desc: "Popular utility & fashion brands (Fastrack, Timex, Casio)" },
                  { key: "mid", title: "₹15,000 - ₹60,000", desc: "Sophisticated premium timepieces (Titan, Citizen, Seiko, Fossil, G-Shock)" },
                  { key: "premium", title: "₹60,000 - ₹2,50,000", desc: "Entry-luxury Swiss automatic movements (Tissot, Rado)" },
                  { key: "luxury", title: "Above ₹2,50,000", desc: "Investment-grade Swiss watchmaking (Rolex, Omega, TAG Heuer)" }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setBudget(option.key)}
                    className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      budget === option.key
                        ? "border-amber-500 bg-amber-500/5 text-amber-400"
                        : "border-neutral-850 bg-neutral-900/20 hover:border-neutral-700 hover:bg-neutral-900/40 text-neutral-300"
                    }`}
                  >
                    <div>
                      <h4 className="text-base font-bold">{option.title}</h4>
                      <p className="text-xs text-neutral-500 mt-1">{option.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-4 border-t border-neutral-900">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={runGiftFinder}
                  disabled={!budget}
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Curate Watches</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RESULTS */}
          {step === 4 && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-neutral-900 pb-6">
                <div>
                  <span className="text-xs text-amber-500 font-semibold uppercase tracking-wider">Curated suggestions</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-100 mt-1">Recommended Masterpieces</h2>
                </div>
                
                <button
                  onClick={resetQuiz}
                  className="text-xs text-neutral-400 hover:text-amber-500 transition-colors uppercase tracking-widest font-semibold flex items-center gap-1"
                >
                  <RefreshCw size={14} />
                  <span>Start Quiz Over</span>
                </button>
              </div>

              {quizResults.length === 0 ? (
                <div className="text-center py-16 bg-neutral-950/40 border border-neutral-900 rounded-2xl">
                  <p className="text-neutral-400 text-sm">No watches matched that exact criteria in our current database.</p>
                  <button
                    onClick={resetQuiz}
                    className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-full transition-all"
                  >
                    Try Different Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {quizResults.map((watch) => {
                    const isWished = wishlist.includes(watch.id);
                    return (
                      <div
                        key={watch.id}
                        className="flex gap-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-850 hover:border-neutral-800 transition-all relative"
                      >
                        {/* Image */}
                        <Link to={`/product/${watch.id}`} className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-neutral-950">
                          <img src={watch.images[0]} alt={watch.name} className="w-full h-full object-cover" />
                        </Link>

                        {/* Content Info */}
                        <div className="flex flex-col justify-between py-1 flex-grow">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold">{watch.brand}</span>
                            <h4 className="text-sm font-serif font-bold text-neutral-200 mt-0.5 line-clamp-1">
                              {watch.name}
                            </h4>
                            <p className="text-[10px] text-neutral-500 mt-0.5">{watch.movement} &bull; {watch.category}</p>
                          </div>
                          <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-900/40">
                            <span className="text-xs font-bold text-neutral-200">
                              ₹{watch.price.toLocaleString("en-IN")}
                            </span>
                            <Link
                              to={`/product/${watch.id}`}
                              className="text-[9px] font-bold text-amber-500 tracking-widest uppercase hover:text-amber-400 transition-colors"
                            >
                              Details &rarr;
                            </Link>
                          </div>
                        </div>

                        {/* Quick Wishlist */}
                        <button
                          onClick={() => toggleWishlist(watch.id)}
                          className="absolute top-3 right-3 text-neutral-500 hover:text-rose-500"
                        >
                          <Heart size={14} className={isWished ? "fill-rose-500 text-rose-500" : ""} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. Corporate Gifting Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-neutral-900 pt-24">
          
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-amber-500 text-xs tracking-[0.2em] uppercase font-semibold">
              B2B / Showroom Commissioning
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide leading-tight">
              Corporate Gifting & Bulk Orders
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Celebrate employee milestones, client relationships, or corporate achievements with horological gifting. Chronex Vadodara handles bulk institutional orders for banks, corporates, and universities, delivering premium watch selections customized to your brand.
            </p>

            {/* Core offerings */}
            <div className="flex flex-col gap-3.5 mt-2">
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Briefcase size={16} className="text-amber-500 shrink-0" />
                <span>Custom caseback engraving (Company Logos, Names, Dates).</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Briefcase size={16} className="text-amber-500 shrink-0" />
                <span>Dedicated custom brand boxes with gold embossment.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Briefcase size={16} className="text-amber-500 shrink-0" />
                <span>Specialized institutional B2B pricing on bulk commissions.</span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-neutral-900/20 border border-neutral-900 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            {corpSuccess ? (
              <div className="py-12 flex flex-col items-center text-center">
                <CheckCircle2 size={56} className="text-emerald-500 animate-bounce mb-4" />
                <h3 className="text-xl font-serif font-bold text-neutral-100">Corporate Enquiry Received!</h3>
                <p className="text-xs text-neutral-400 mt-2 max-w-xs">
                  We are opening WhatsApp to share your company's gifting parameters with our showroom sales director.
                </p>
                <div className="w-10 h-1 border-t-2 border-emerald-500 animate-spin rounded-full mt-6"></div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-100 mb-6 border-b border-neutral-900 pb-3">
                  Inquire For Corporate Orders
                </h3>
                
                <form onSubmit={handleCorporateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Contact Person</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={corpName}
                      onChange={(e) => setCorpName(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Company / Institution</label>
                    <input
                      type="text"
                      required
                      placeholder="Company name"
                      value={corpCompany}
                      onChange={(e) => setCorpCompany(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 83206 06850"
                      value={corpPhone}
                      onChange={(e) => setCorpPhone(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Quantity Needed */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Estimated Quantity</label>
                    <select
                      value={corpQty}
                      onChange={(e) => setCorpQty(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-300 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="10-50" className="bg-neutral-900 text-neutral-300">10 to 50 pieces</option>
                      <option value="50-100" className="bg-neutral-900 text-neutral-300">50 to 100 pieces</option>
                      <option value="100-500" className="bg-neutral-900 text-neutral-300">100 to 500 pieces</option>
                      <option value="500+" className="bg-neutral-900 text-neutral-300">500+ pieces</option>
                    </select>
                  </div>

                  {/* Budget Per Piece */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Budget Per Watch</label>
                    <select
                      value={corpBudget}
                      onChange={(e) => setCorpBudget(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-300 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Under ₹5,000" className="bg-neutral-900 text-neutral-300">Under ₹5,000 (Fastrack, Sonata, Casio)</option>
                      <option value="₹5,000 - ₹15,000" className="bg-neutral-900 text-neutral-300">₹5,000 to ₹15,000 (Titan, Timex, Fossil)</option>
                      <option value="₹15,000 - ₹50,000" className="bg-neutral-900 text-neutral-300">₹15,000 to ₹50,000 (Titan Edge, Seiko, Citizen)</option>
                      <option value="₹50,000+" className="bg-neutral-900 text-neutral-300">₹50,000+ (Luxury / Swiss watches)</option>
                    </select>
                  </div>

                  {/* Notes / Customization */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Custom requirements (Optional)</label>
                    <textarea
                      rows="3"
                      placeholder="Detail logo engraving preferences, specific brand interests, or timeline deadlines..."
                      value={corpNotes}
                      onChange={(e) => setCorpNotes(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="sm:col-span-2 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 mt-2"
                  >
                    <MessageSquare size={16} />
                    <span>Submit Enquiry via WhatsApp</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftFinder;
