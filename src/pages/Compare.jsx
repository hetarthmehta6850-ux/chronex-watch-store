import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { ArrowLeft, X, ShoppingBag, Scale } from "lucide-react";

const Compare = () => {
  const { compareList, products, removeFromCompare, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (compareList.length === 0) {
    return (
      <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-40 pb-24 flex flex-col items-center justify-center">
        <Scale size={48} className="text-neutral-800 mb-6" />
        <h2 className="text-2xl font-serif font-bold text-neutral-100 mb-2">Comparison Tray Empty</h2>
        <p className="text-neutral-500 mb-8 max-w-md text-center text-sm">Add up to 3 timepieces from our collections to compare their specifications side-by-side.</p>
        <Link 
          to="/collections" 
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  const compareProducts = compareList.map(id => products.find(p => p.id === id)).filter(Boolean);

  // Specifications to compare
  const specKeys = [
    { label: "Movement", key: "movement" },
    { label: "Case Diameter", key: "caseDiameter" },
    { label: "Case Material", key: "caseMaterial" },
    { label: "Water Resistance", key: "waterResistance" },
    { label: "Glass / Crystal", key: "glass" },
    { label: "Strap Material", key: "strapMaterial" },
    { label: "Power Reserve", key: "powerReserve" },
    { label: "Warranty", key: "warranty" }
  ];

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-32 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-amber-500 transition-colors self-start">
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
          
          <div>
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide">
              Compare Timepieces
            </h1>
            <p className="text-neutral-400 text-sm mt-3">Side-by-side specification analysis</p>
          </div>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden md:block w-full overflow-x-auto pb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-48 p-4 text-left border-b border-neutral-800"></th>
                {compareProducts.map(product => (
                  <th key={`head-${product.id}`} className="w-72 p-6 border-b border-neutral-800 align-top relative">
                    <button 
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-4 right-4 p-1.5 bg-neutral-900 hover:bg-rose-950 border border-neutral-800 hover:border-rose-900 text-neutral-500 hover:text-rose-500 rounded-lg transition-colors"
                    >
                      <X size={14} />
                    </button>
                    
                    <Link to={`/product/${product.id}`} className="block group">
                      <div className="aspect-square bg-neutral-900 rounded-xl mb-4 overflow-hidden border border-neutral-800">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold block mb-1">{product.brand}</span>
                      <h3 className="text-lg font-serif font-bold text-neutral-200 group-hover:text-amber-400 transition-colors line-clamp-2">{product.name}</h3>
                      <div className="mt-3 text-xl font-bold text-neutral-100 font-sans">₹{product.price.toLocaleString("en-IN")}</div>
                    </Link>
                    
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-full mt-6 py-3 bg-neutral-900 hover:bg-amber-500 border border-neutral-800 hover:border-amber-500 text-neutral-300 hover:text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group"
                    >
                      <ShoppingBag size={14} className="group-hover:text-neutral-950" />
                      <span>Add to Cart</span>
                    </button>
                  </th>
                ))}
                
                {/* Empty columns for layout if less than 3 */}
                {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                  <th key={`empty-head-${i}`} className="w-72 p-6 border-b border-neutral-800 align-middle">
                    <Link to="/collections" className="w-full aspect-square border-2 border-dashed border-neutral-800 rounded-xl flex flex-col items-center justify-center text-neutral-600 hover:text-amber-500 hover:border-amber-500/50 transition-colors gap-3 cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center"><Plus size={16} /></div>
                      <span className="text-xs uppercase tracking-widest font-semibold">Add Timepiece</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Product Type Row */}
              <tr>
                <td className="p-4 text-xs font-bold uppercase tracking-widest text-neutral-500 border-b border-neutral-900 bg-neutral-950/50">Collection</td>
                {compareProducts.map(product => (
                  <td key={`cat-${product.id}`} className="p-4 border-b border-neutral-900 text-sm text-neutral-300 font-medium">
                    {product.style} &bull; {product.category}
                  </td>
                ))}
                {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                  <td key={`empty-cat-${i}`} className="p-4 border-b border-neutral-900 bg-neutral-950/20"></td>
                ))}
              </tr>

              {/* Dynamic Spec Rows */}
              {specKeys.map((spec, index) => (
                <tr key={spec.key} className={index % 2 === 0 ? "bg-neutral-900/10" : ""}>
                  <td className="p-4 text-xs font-bold uppercase tracking-widest text-neutral-500 border-b border-neutral-900">{spec.label}</td>
                  
                  {compareProducts.map(product => {
                    const specValue = product.specs[spec.key] || "—";
                    return (
                      <td key={`${spec.key}-${product.id}`} className="p-4 border-b border-neutral-900 text-sm text-neutral-300">
                        {specValue}
                      </td>
                    );
                  })}
                  
                  {Array.from({ length: 3 - compareProducts.length }).map((_, i) => (
                    <td key={`empty-${spec.key}-${i}`} className="p-4 border-b border-neutral-900"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Comparison View (Vertical Cards) */}
        <div className="md:hidden flex flex-col gap-8">
          {compareProducts.map(product => (
            <div key={`mobile-${product.id}`} className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 relative">
              <button 
                onClick={() => removeFromCompare(product.id)}
                className="absolute top-4 right-4 p-2 bg-neutral-950 border border-neutral-800 text-neutral-500 rounded-full"
              >
                <X size={14} />
              </button>
              
              <div className="flex gap-4 items-center mb-6">
                <div className="w-24 h-24 shrink-0 bg-neutral-900 rounded-xl overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold block">{product.brand}</span>
                  <Link to={`/product/${product.id}`} className="text-base font-serif font-bold text-neutral-200 line-clamp-2 mt-1">{product.name}</Link>
                  <div className="mt-2 text-lg font-bold text-neutral-100">₹{product.price.toLocaleString("en-IN")}</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 mb-6">
                {specKeys.map(spec => (
                  <div key={`mob-spec-${spec.key}`} className="flex justify-between items-start border-b border-neutral-900 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 w-1/3">{spec.label}</span>
                    <span className="text-xs text-neutral-300 w-2/3 text-right">{product.specs[spec.key] || "—"}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => addToCart(product.id)}
                className="w-full py-3.5 bg-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
          
          {compareProducts.length < 3 && (
            <Link to="/collections" className="w-full py-4 border-2 border-dashed border-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500 gap-2">
              <span className="text-xl">+</span>
              <span className="text-xs uppercase tracking-widest font-bold">Add Another Timepiece</span>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

// Simple plus icon for empty state
const Plus = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default Compare;
