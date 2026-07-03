import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";

const steps = [
  {
    id: "budget",
    title: "What is your budget?",
    subtitle: "Select a price range for your new timepiece.",
    options: [
      { id: "entry", label: "Under ₹25,000", value: [0, 25000] },
      { id: "mid", label: "₹25,000 - ₹1,00,000", value: [25000, 100000] },
      { id: "luxury", label: "₹1,00,000 - ₹5,00,000", value: [100000, 500000] },
      { id: "ultra", label: "Over ₹5,00,000", value: [500000, 99999999] },
    ]
  },
  {
    id: "occasion",
    title: "How will you wear it?",
    subtitle: "Select the primary occasion for this watch.",
    options: [
      { id: "daily", label: "Daily Wear", value: "daily" },
      { id: "formal", label: "Formal / Dress", value: "formal" },
      { id: "sport", label: "Sports / Active", value: "sport" },
      { id: "statement", label: "Statement Piece", value: "statement" },
    ]
  },
  {
    id: "style",
    title: "What's your preferred style?",
    subtitle: "Choose the aesthetic that matches your personality.",
    options: [
      { id: "classic", label: "Classic & Minimalist", value: "Classic" },
      { id: "modern", label: "Modern & Bold", value: "Modern" },
      { id: "vintage", label: "Vintage Inspired", value: "Vintage" },
      { id: "tech", label: "High-Tech & Smart", value: "Tech" },
    ]
  },
  {
    id: "movement",
    title: "Preferred movement type?",
    subtitle: "The engine that drives your timepiece.",
    options: [
      { id: "automatic", label: "Automatic (Mechanical)", value: "Automatic" },
      { id: "quartz", label: "Quartz (Battery)", value: "Quartz" },
      { id: "solar", label: "Solar Powered", value: "Solar" },
      { id: "any", label: "I'm not sure", value: "any" },
    ]
  },
  {
    id: "size",
    title: "What is your wrist size?",
    subtitle: "Helps us recommend the perfect case diameter.",
    options: [
      { id: "small", label: "Small (Under 6.5\")", value: [30, 38] },
      { id: "medium", label: "Medium (6.5\" - 7.5\")", value: [39, 42] },
      { id: "large", label: "Large (Over 7.5\")", value: [43, 50] },
    ]
  }
];

const WatchFinder = () => {
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendedWatches, setRecommendedWatches] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep, showResults]);

  const handleSelect = (stepId, optionValue) => {
    setAnswers(prev => ({ ...prev, [stepId]: optionValue }));
    
    // Add small delay for animation
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        calculateResults();
      }
      setIsAnimating(false);
    }, 400);
  };

  const calculateResults = () => {
    // A simple scoring algorithm to find the best matches
    const scored = products.map(product => {
      let score = 0;
      let maxScore = 5; // 5 questions

      // 1. Budget Match (Must match, or score heavily penalized)
      const budget = answers.budget;
      if (product.price >= budget[0] && product.price <= budget[1]) {
        score += 2; // Budget is very important
      } else if (product.price > budget[1] && product.price <= budget[1] * 1.2) {
        score += 0.5; // Slightly over budget
      }

      // 2. Occasion / Category mapping
      const occasion = answers.occasion;
      if (occasion === "formal" && product.style === "Dress") score += 1;
      if (occasion === "sport" && product.style === "Sport") score += 1;
      if (occasion === "daily" && (product.style === "Casual" || product.style === "Dress")) score += 1;
      if (occasion === "statement" && product.price > 100000) score += 1;

      // 3. Style Match
      if (answers.style === "any" || product.style.includes(answers.style)) score += 1;

      // 4. Movement Match
      const movement = answers.movement;
      if (movement === "any" || (product.specs.movement && product.specs.movement.includes(movement))) {
        score += 1;
      }

      // 5. Size Match (Case Diameter)
      const sizeRange = answers.size;
      const caseSize = parseInt(product.specs.caseDiameter);
      if (caseSize >= sizeRange[0] && caseSize <= sizeRange[1]) {
        score += 1;
      }

      return { ...product, matchScore: (score / maxScore) * 100 };
    });

    // Sort by score and take top 4
    const topMatches = scored
      .filter(p => p.matchScore > 20) // Filter out terrible matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 4);

    setRecommendedWatches(topMatches);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans animate-fade-in-up">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-100 mb-4">Your Perfect Match</h1>
            <p className="text-neutral-400">Based on your preferences, we've handpicked these timepieces for you.</p>
          </div>

          {recommendedWatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedWatches.map((product, idx) => (
                <div key={product.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group flex flex-col">
                  {/* Match Badge */}
                  <div className="absolute z-10 m-3 px-3 py-1 bg-neutral-950/80 backdrop-blur-md border border-amber-500/30 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-amber-500" />
                    <span className="text-[10px] font-bold text-amber-500">{Math.min(99, Math.round(product.matchScore))}% Match</span>
                  </div>
                  
                  <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-neutral-950">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                  
                  <div className="p-5 flex flex-col grow">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 mb-1">{product.brand}</span>
                    <h3 className="font-serif font-bold text-lg text-neutral-200 line-clamp-2 mb-4 group-hover:text-amber-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-bold text-neutral-100 font-sans">₹{product.price.toLocaleString('en-IN')}</span>
                      <Link to={`/product/${product.id}`} className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-neutral-900/30 border border-neutral-800 rounded-3xl">
              <p className="text-neutral-400 mb-6">We couldn't find a perfect match for those exact criteria, but we have many other beautiful timepieces.</p>
              <Link to="/collections" className="px-8 py-4 bg-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl">
                Browse All Collections
              </Link>
            </div>
          )}

          <div className="mt-16 flex justify-center gap-4">
            <button 
              onClick={resetQuiz}
              className="px-6 py-3 border border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
            >
              <RefreshCw size={14} /> Retake Quiz
            </button>
            <Link 
              to="/collections"
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-6 flex-grow flex flex-col">
        
        {/* Header & Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => currentStep > 0 ? setCurrentStep(prev => prev - 1) : navigate(-1)}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:bg-neutral-900 hover:text-neutral-200 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Step {currentStep + 1} of {steps.length}
            </span>
            <div className="w-10 h-10"></div> {/* Spacer for centering */}
          </div>
          
          <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Area */}
        <div className={`flex-grow flex flex-col justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-100 mb-4">{step.title}</h2>
            <p className="text-neutral-400 text-lg">{step.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {step.options.map((option) => {
              const isSelected = answers[step.id] === option.value || 
                (Array.isArray(answers[step.id]) && Array.isArray(option.value) && answers[step.id][0] === option.value[0]);
                
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(step.id, option.value)}
                  className={`p-6 md:p-8 rounded-2xl border-2 text-left transition-all duration-300 flex flex-col gap-2 ${
                    isSelected 
                      ? "border-amber-500 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.1)]" 
                      : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border mb-2 flex items-center justify-center transition-colors ${
                    isSelected ? "border-amber-500 bg-amber-500 text-neutral-950" : "border-neutral-700"
                  }`}>
                    {isSelected && <CheckCircle2 size={14} />}
                  </div>
                  <span className={`font-bold text-lg ${isSelected ? "text-amber-500" : "text-neutral-200"}`}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WatchFinder;
