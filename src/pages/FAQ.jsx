import { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQ_DATA = [
  {
    category: "Billing & EMI",
    q: "How do I pay with EMI on the website?",
    a: "During checkout, select 'Credit Card / EMI' as your payment method. You can choose from leading banks (HDFC, ICICI, SBI, Axis, AMEX) and pick a tenure of 3, 6, 9, or 12 months. The monthly installments and exact bank interest charges will be calculated and presented transparently."
  },
  {
    category: "Billing & EMI",
    q: "Is there a zero-interest EMI scheme available?",
    a: "Yes! We run regular promotional No-Cost EMI schemes on selected brands (like Seiko and Citizen) for tenures up to 6 months. Please contact our showroom manager on WhatsApp before placing your order to check if your chosen model qualifies."
  },
  {
    category: "Shipping & Delivery",
    q: "How do you ship high-value luxury watches safely?",
    a: "We ship all timepieces via specialized secured logistics carriers (Sequel and BlueDart Apex) in tamper-proof, sealed packaging. Every single shipment is 100% fully insured from our Alkapuri boutique door to your delivery doorstep at no extra cost to you."
  },
  {
    category: "Shipping & Delivery",
    q: "How long does delivery take inside India?",
    a: "Local deliveries within Vadodara are completed on the same business day. For other metro cities (Mumbai, Delhi, Bangalore) it takes 2 business days. For rest of India, shipping takes 3-4 business days. Tracked shipping links are emailed immediately upon dispatch."
  },
  {
    category: "Servicing & Repair",
    q: "Does my watch come with a warranty?",
    a: "Absolutely. Every brand-new watch purchased comes with the official international brand warranty card (typically 2 years). We also stamp and include Chronex's physical warranty card which allows you to get priority diagnostics at our in-house Service Lab."
  },
  {
    category: "Servicing & Repair",
    q: "Where do I send my watch for routine servicing?",
    a: "You can book a 'Service Ticket' directly from our Service Center page on the website. You can drop off your timepiece at our Alkapuri boutique or request a secured pick-up. Our lab is equipped with Swiss-grade machinery and run by certified watchsmiths."
  },
  {
    category: "Authenticity",
    q: "Are the watches 100% original and genuine?",
    qShort: "Are watches genuine?",
    a: "Chronex is an authorized retailer for all featured brands. We deal directly with official brand distributors. We guarantee 100% authenticity. We do not sell pre-owned, replica, or grey-market watches. Every watch is delivered in its original box with complete papers."
  }
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", "Billing & EMI", "Shipping & Delivery", "Servicing & Repair", "Authenticity"];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans selection:bg-amber-500/30">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">Support Desk</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-100 mt-3 mb-6">
            FAQ & Help Center
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Find instant answers to questions regarding payments, insured shipping, EMI schemes, and watch maintenance.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-neutral-900">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setExpandedIndex(null); }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 border-amber-500 text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-250"
                }`}
              >
                {cat.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setExpandedIndex(null); }}
              placeholder="Search help articles..."
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-3 pl-11 pr-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
            />
            <Search size={16} className="absolute left-4 top-3.5 text-neutral-600" />
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`border rounded-2xl transition-all duration-300 ${
                    isExpanded 
                      ? "bg-neutral-900/40 border-amber-500/30" 
                      : "bg-neutral-900/10 border-neutral-900 hover:border-neutral-800"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <div className="flex items-start gap-4">
                      <HelpCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                      <span className="font-serif font-bold text-sm md:text-base text-neutral-200">{faq.q}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-neutral-500 shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-neutral-500 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-0 pl-14 text-neutral-400 text-xs md:text-sm leading-relaxed border-t border-neutral-900/50 mt-2 font-sans animate-fade-in-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-neutral-900/10 border border-neutral-900 rounded-3xl">
            <p className="text-neutral-500 text-sm italic">No answers found for your query. Send us a message on WhatsApp!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default FAQ;
