import { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Heart, Search, SlidersHorizontal, ArrowUpDown, X, Eye, ShoppingBag, Star, StarHalf, Scale } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import QuickView from "../components/QuickView";
import { useSEO } from "../hooks/useSEO";

const Products = () => {
  useScrollReveal();
  useSEO({
    title: "Luxury Watch Collections",
    description: "Browse our exclusive catalog of luxury watches. Discover automatic, mechanical, chronograph, and quartz watches from top global brands.",
    keywords: "watch catalog, buy watches online, luxury watch brands, Chronex store",
  });
  const { products, toggleWishlist, wishlist, addToCart, toggleCompare, compareList, formatPrice } = useContext(ShopContext);
  const location = useLocation();

  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState(() => {
    if (location.state && location.state.selectedBrand) {
      return [location.state.selectedBrand];
    }
    return [];
  });
  const [selectedGender, setSelectedGender] = useState("");
  const [priceRange, setPriceRange] = useState(2000000); // Default to max (20 Lakhs)
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedMovement, setSelectedMovement] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  
  // Mobile filter drawer state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Handle pre-selected brand from navigation state (clicking brand on Home)
  useEffect(() => {
    if (location.state && location.state.selectedBrand) {
      // Clear navigation state so it doesn't lock on subsequent visits
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const brands = [...new Set(products.map((p) => p.brand))];
  const styles = [...new Set(products.map((p) => p.style))];
  const movements = [...new Set(products.map((p) => p.movement))];

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedGender("");
    setPriceRange(2000000);
    setSelectedStyle("");
    setSelectedMovement("");
    setSearchQuery("");
    setSortBy("default");
  };

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    
    const matchesGender =
      selectedGender === "" || product.category === selectedGender;
    
    const matchesPrice = product.price <= priceRange;
    
    const matchesStyle =
      selectedStyle === "" || product.style === selectedStyle;
      
    const matchesMovement =
      selectedMovement === "" || product.movement === selectedMovement;

    return matchesSearch && matchesBrand && matchesGender && matchesPrice && matchesStyle && matchesMovement;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default (original order)
  });

  const renderFilterSidebar = () => (
    <div className="flex flex-col gap-8 text-neutral-300">
      {/* Search Bar inside sidebar for mobile, desktop can use top bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search watches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 pl-11 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-colors"
        />
        <Search size={18} className="absolute left-4 top-3.5 text-neutral-500" />
      </div>

      {/* Brands Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-200 mb-4 border-b border-neutral-900 pb-2">
          Brands
        </h3>
        <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 text-sm cursor-pointer hover:text-amber-400 transition-colors">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 rounded bg-neutral-900 border-neutral-800 text-amber-500 focus:ring-amber-500/30 cursor-pointer"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-200 mb-4 border-b border-neutral-900 pb-2">
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Men", "Women", "Unisex"].map((gender) => (
            <button
              key={gender}
              onClick={() => setSelectedGender(selectedGender === gender ? "" : gender)}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-widest border transition-all duration-300 ${
                selectedGender === gender
                  ? "bg-amber-500 text-neutral-950 border-amber-500 font-semibold"
                  : "bg-neutral-900 border-neutral-850 hover:border-neutral-750 text-neutral-300"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Style Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-200 mb-4 border-b border-neutral-900 pb-2">
          Style
        </h3>
        <div className="flex flex-wrap gap-2">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(selectedStyle === style ? "" : style)}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-widest border transition-all duration-300 ${
                selectedStyle === style
                  ? "bg-amber-500 text-neutral-950 border-amber-500 font-semibold"
                  : "bg-neutral-900 border-neutral-850 hover:border-neutral-750 text-neutral-300"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Movement Filter */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-200 mb-4 border-b border-neutral-900 pb-2">
          Movement
        </h3>
        <div className="flex flex-wrap gap-2">
          {movements.map((mov) => (
            <button
              key={mov}
              onClick={() => setSelectedMovement(selectedMovement === mov ? "" : mov)}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-widest border transition-all duration-300 ${
                selectedMovement === mov
                  ? "bg-amber-500 text-neutral-950 border-amber-500 font-semibold"
                  : "bg-neutral-900 border-neutral-850 hover:border-neutral-750 text-neutral-300"
              }`}
            >
              {mov}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-200 border-b border-neutral-900 pb-2 w-full flex justify-between">
            <span>Max Price</span>
            <span className="text-amber-500 font-bold tracking-normal text-sm border-none pb-0">
             {priceRange >= 1500000
               ? "Any Price"
               : formatPrice(priceRange)}
           </span>
          </h3>
        </div>
        <input
          type="range"
          min="3000"
          max="1500000"
          step="5000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-[10px] text-neutral-500 mt-2">
          <span>{formatPrice(3000)}</span>
          <span>{formatPrice(1500000)}+</span>
        </div>
      </div>

      {/* Clear Button */}
      <button
        onClick={clearAllFilters}
        className="mt-4 w-full py-3 border border-neutral-800 hover:border-rose-500/40 text-neutral-400 hover:text-rose-500 text-xs uppercase tracking-widest rounded-xl transition-all font-semibold"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="mb-12 border-b border-neutral-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
              Boutique Catalog
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
              The Watch Collections
            </h1>
            <p className="text-neutral-500 text-sm mt-3">
              Showing {sortedProducts.length} of {products.length} masterpieces in Vadodara.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-neutral-900 border border-neutral-850 rounded-xl text-sm font-semibold hover:border-neutral-700 text-neutral-300"
            >
              <SlidersHorizontal size={16} className="text-amber-500" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-850 rounded-xl px-3 py-2 text-sm text-neutral-300 w-full sm:w-auto">
              <ArrowUpDown size={14} className="text-amber-500 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-neutral-300 text-xs focus:outline-none w-full cursor-pointer pr-4 uppercase tracking-wider font-semibold"
              >
                <option value="default" className="bg-neutral-900 text-neutral-300">Sort: Default</option>
                <option value="price-low" className="bg-neutral-900 text-neutral-300">Price: Low to High</option>
                <option value="price-high" className="bg-neutral-900 text-neutral-300">Price: High to Low</option>
                <option value="rating" className="bg-neutral-900 text-neutral-300">Popularity (Rating)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block lg:col-span-3 h-fit sticky top-32">
            {renderFilterSidebar()}
          </aside>

          {/* Product Grid - Desktop & Mobile */}
          <main className="lg:col-span-9">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-24 bg-neutral-900/10 rounded-2xl border border-dashed border-neutral-900">
                <p className="text-neutral-400 text-lg">No watches match your active filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-full transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((watch) => {
                  const isWished = wishlist.includes(watch.id);
                  return (
                    <div
                      key={watch.id}
                      className="group bg-neutral-900/20 border border-neutral-900 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 flex flex-col relative hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:-translate-y-1"
                      data-animate="fade-up"
                    >
                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(watch.id)}
                        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-950/60 backdrop-blur-sm border border-neutral-800/55 text-neutral-400 hover:text-rose-500 transition-colors"
                      >
                        <Heart size={16} className={isWished ? "fill-rose-500 text-rose-500" : ""} />
                      </button>

                      {/* Image Link with Glassmorphism Overlay */}
                      <div className="relative overflow-hidden aspect-square block bg-neutral-950">
                        <Link to={`/product/${watch.id}`}>
                          <img
                            src={watch.images[0]}
                            alt={watch.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          />
                        </Link>
                        
                         {/* Glassmorphism Quick Action Hover */}
                         <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2">
                            <button 
                             onClick={(e) => { e.preventDefault(); setQuickViewProduct(watch); }}
                             className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                              <Eye size={14} /> View
                            </button>
                            <button 
                             onClick={(e) => { e.preventDefault(); toggleCompare(watch.id); }}
                             className={`flex-1 backdrop-blur-md border text-[10px] uppercase tracking-widest font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                               compareList.includes(watch.id) ? "bg-amber-500/20 border-amber-500/50 text-amber-500" : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
                             }`}
                            >
                              <Scale size={14} /> Compare
                            </button>
                           <button
                             disabled={watch.stock === 0}
                             onClick={(e) => {
                               e.preventDefault();
                               addToCart(watch.id, 1);
                             }}
                             className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-neutral-950 text-[10px] uppercase tracking-widest font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                           >
                             <ShoppingBag size={14} /> {watch.stock === 0 ? "Out" : "Add"}
                           </button>
                        </div>
                      </div>

                      {/* Info Panel */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] tracking-widest uppercase text-amber-500 font-semibold">
                            {watch.brand}
                          </span>
                          <div className="flex gap-2">
                            {watch.stock === 0 ? (
                              <span className="text-[8px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold uppercase tracking-wider">
                                Sold Out
                              </span>
                            ) : watch.stock <= 3 ? (
                              <span className="text-[8px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold uppercase tracking-wider animate-pulse">
                                Low Stock
                              </span>
                            ) : null}
                            <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-850">
                              {watch.style}
                            </span>
                          </div>
                        </div>
                        
                        <Link
                          to={`/product/${watch.id}`}
                          className="text-base font-serif font-semibold text-neutral-200 mt-2 hover:text-amber-400 transition-colors line-clamp-1"
                        >
                          {watch.name}
                        </Link>
                        
                        <div className="flex items-center gap-1 mt-1.5 mb-0.5">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const rating = watch.rating || 5;
                            if (i < Math.floor(rating)) return <Star key={i} size={10} className="fill-amber-500 text-amber-500" />;
                            if (i === Math.floor(rating) && rating % 1 !== 0) return <StarHalf key={i} size={10} className="fill-amber-500 text-amber-500" />;
                            return <Star key={i} size={10} className="text-neutral-700" />;
                          })}
                          <span className="text-[10px] text-neutral-500 ml-1">({watch.reviews ? watch.reviews.length : 0})</span>
                        </div>
                        
                        <p className="text-xs text-neutral-400 mt-1">
                          {watch.movement} &bull; {watch.category}
                        </p>

                        <p className="text-xs text-neutral-500 mt-3 line-clamp-2 leading-relaxed">
                          {productDescriptionTruncate(watch.description)}
                        </p>
                        
                        {/* Price and Details */}
                        <div className="mt-auto pt-6 flex justify-between items-center border-t border-neutral-900">
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-neutral-100">
                              {formatPrice(watch.price)}
                            </span>
                            {watch.price > 15000 && (
                              <span className="text-[9px] text-neutral-500 uppercase tracking-wider mt-0.5">
                                EMI from {formatPrice(Math.round(watch.price / 12))}/mo
                              </span>
                            )}
                          </div>
                          
                          <Link
                            to={`/product/${watch.id}`}
                            className="text-[10px] font-bold text-amber-500 tracking-widest uppercase flex items-center gap-1 hover:text-amber-400 transition-all group/btn"
                          >
                            <span>Details</span>
                            <X size={10} className="group-hover/btn:translate-x-0.5 transition-transform rotate-180 hidden" />
                            {/* Wait, simple arrow is better */}
                            <span className="text-amber-500 font-bold">&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Overlay Panel */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-neutral-950/85 backdrop-blur-sm transition-opacity"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          <div className="absolute inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-md bg-neutral-950 border-r border-neutral-900 p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-neutral-900 pb-4">
                  <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-200">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1 text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                {renderFilterSidebar()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickView 
        isOpen={!!quickViewProduct} 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
};

// Simple utility function to keep description short in cards
const productDescriptionTruncate = (desc) => {
  if (desc.length > 100) return desc.substring(0, 95) + "...";
  return desc;
};

export default Products;
