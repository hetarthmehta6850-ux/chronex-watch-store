import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { X, Scale } from "lucide-react";

const CompareBar = () => {
  const { compareList, products, removeFromCompare, clearCompare } = useContext(ShopContext);
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  const compareProducts = compareList.map(id => products.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-900 border-t border-neutral-800 shadow-2xl animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex flex-col shrink-0 mr-4">
            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">Compare</span>
            <span className="text-neutral-400 text-xs">{compareList.length} / 3 Selected</span>
          </div>

          <div className="flex gap-4">
            {compareProducts.map(product => (
              <div key={product.id} className="relative w-16 h-16 rounded-lg bg-neutral-950 border border-neutral-800 shrink-0 group">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-lg p-1" />
                <button 
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            
            {/* Empty slots */}
            {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
              <div key={`empty-${i}`} className="w-16 h-16 rounded-lg bg-neutral-950/50 border border-dashed border-neutral-800 shrink-0 flex items-center justify-center">
                <span className="text-neutral-600 text-xs">+</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={clearCompare}
            className="flex-1 md:flex-none px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
          >
            Clear All
          </button>
          <button 
            onClick={() => navigate('/compare')}
            disabled={compareList.length < 2}
            className={`flex-1 md:flex-none px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
              compareList.length >= 2 
                ? "bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/10" 
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
          >
            <Scale size={14} />
            <span>Compare Now</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default CompareBar;
