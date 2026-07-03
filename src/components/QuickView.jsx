import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ShoppingBag, Scale, Heart, ShieldCheck, Truck } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const QuickView = ({ product, isOpen, onClose }) => {
  const { addToCart, toggleWishlist, wishlist, toggleCompare, compareList } = useContext(ShopContext);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Helper for star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-amber-500">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-amber-500">★</span>); // Simplified half star for quick view
      } else {
        stars.push(<span key={i} className="text-neutral-700">★</span>);
      }
    }
    return stars;
  };

  const handleAddToCart = () => {
    addToCart(product.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-scale-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Image Gallery (Left Side) */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-neutral-900 relative">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          {/* Badge */}
          {product.isNew && (
            <div className="absolute top-6 left-6 bg-amber-500 text-neutral-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              New Arrival
            </div>
          )}

          {/* Thumbnail Navigation */}
          {product.images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4 z-10">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-all shadow-md ${
                    idx === currentImageIndex ? "border-amber-500 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          
          {/* Gradient Overlay for bottom thumbnails */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950/80 to-transparent pointer-events-none"></div>
        </div>

        {/* Product Details (Right Side) */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col h-full overflow-y-auto">
          
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">{product.brand}</span>
              <div className="flex items-center gap-1 text-xs">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-neutral-500 ml-1">({product.reviews?.length || 0})</span>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-100 leading-tight mb-4">
              {product.name}
            </h2>
            
            <div className="text-2xl font-bold text-neutral-100 font-sans mb-4">
              ₹{product.price.toLocaleString("en-IN")}
            </div>
            
            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
              {product.description}
            </p>
          </div>

          <hr className="border-neutral-800 mb-6" />

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Movement</span>
              <span className="text-sm font-medium text-neutral-200">{product.specs?.movement || "—"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Case Size</span>
              <span className="text-sm font-medium text-neutral-200">{product.specs?.caseDiameter || "—"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Material</span>
              <span className="text-sm font-medium text-neutral-200">{product.specs?.caseMaterial || "—"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Water Resistance</span>
              <span className="text-sm font-medium text-neutral-200">{product.specs?.waterResistance || "—"}</span>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center gap-2 text-xs text-emerald-500/80">
              <ShieldCheck size={14} />
              <span>{product.specs?.warranty || "2 Year Warranty"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Truck size={14} />
              <span>Free Insured Delivery</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-3">
            <button 
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] flex justify-center items-center gap-2"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>
            
            <div className="flex gap-3">
              <button 
                onClick={() => toggleCompare(product.id)}
                className={`flex-1 py-3 border text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex justify-center items-center gap-2 ${
                  isCompared 
                    ? "bg-amber-500/10 border-amber-500/50 text-amber-500" 
                    : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                }`}
              >
                <Scale size={14} />
                {isCompared ? "Added to Compare" : "Compare"}
              </button>
              
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 shrink-0 border rounded-xl flex items-center justify-center transition-all ${
                  isWishlisted 
                    ? "bg-rose-500/10 border-rose-500/50 text-rose-500" 
                    : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-rose-500 hover:border-rose-500/50 hover:bg-rose-500/5"
                }`}
              >
                <Heart size={16} className={isWishlisted ? "fill-rose-500" : ""} />
              </button>
            </div>

            <Link 
              to={`/product/${product.id}`}
              className="mt-4 text-center text-xs uppercase tracking-widest text-neutral-500 hover:text-amber-500 transition-colors underline-offset-4 hover:underline"
            >
              View Full Details
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default QuickView;
