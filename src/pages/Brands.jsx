import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brandStories } from "../data/brandStories";

const Brands = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen pt-32 pb-24 font-sans text-neutral-100 selection:bg-amber-500/30">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-neutral-100">
          Our Heritage Brands
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Discover the storied histories, groundbreaking innovations, and relentless pursuit of perfection 
          that define the world's finest watchmakers.
        </p>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12 md:gap-24">
        {brandStories.map((brand, index) => (
          <div 
            key={brand.id}
            className={`flex flex-col gap-8 md:gap-16 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                <img 
                  src={brand.image} 
                  alt={`${brand.name} Heritage`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors duration-700"></div>
                {/* Brand Color Accent */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-2"
                  style={{ backgroundColor: brand.color }}
                ></div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-1 rounded-full"
                  style={{ backgroundColor: brand.color }}
                ></div>
                <span className="text-neutral-500 font-bold uppercase tracking-widest text-xs">
                  Est. {brand.founded} &bull; {brand.headquarters}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-100 mb-6">
                {brand.name}
              </h2>
              
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-8">
                {brand.heritage}
              </p>
              
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Signature Collections</h3>
                <div className="flex flex-wrap gap-2">
                  {brand.signatureCollections.map((collection, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-300"
                    >
                      {collection}
                    </span>
                  ))}
                </div>
              </div>
              
              <Link 
                to={`/collections?brand=${encodeURIComponent(brand.name)}`}
                className="group flex items-center gap-3 w-max"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: brand.color, color: brand.color === '#000000' || brand.color === '#1c1c1b' ? '#ffffff' : '#ffffff' }}
                >
                  <ArrowRight size={20} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-200 group-hover:text-amber-500 transition-colors">
                  Shop {brand.name}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
