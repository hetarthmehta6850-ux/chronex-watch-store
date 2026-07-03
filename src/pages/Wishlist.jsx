import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Heart, Trash2, MessageSquare, ArrowRight } from "lucide-react";

const Wishlist = () => {
  const { products, wishlist, toggleWishlist, getWhatsAppLink } = useContext(ShopContext);

  // Filter products in the wishlist
  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-12 border-b border-neutral-900 pb-8">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
            Your Selection
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
            My Wishlist
          </h1>
          <p className="text-neutral-500 text-sm mt-3">
            Saved {wishedProducts.length} watch{wishedProducts.length !== 1 ? "es" : ""} for future showroom viewing.
          </p>
          {wishedProducts.length > 0 && (
            <a 
              href={(() => {
                const phone = "918320606850";
                let listText = "";
                wishedProducts.forEach((watch, idx) => {
                  listText += `${idx + 1}. *${watch.brand}* - ${watch.name} (₹${watch.price.toLocaleString("en-IN")})\n`;
                });
                const msg = `Namaste Chronex Vadodara! I have compiled my wishlist of luxury watches. I would love to check their availability and schedule a consultation slot at your showroom:\n\n${listText}\nPlease let me know when is a good time to visit!`;
                return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
              })()}
              target="_blank"
              rel="noreferrer"
              className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-550 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all inline-flex items-center gap-2"
            >
              <MessageSquare size={14} />
              <span>Share Wishlist on WhatsApp</span>
            </a>
          )}
        </div>

        {/* Wishlist Grid */}
        {wishedProducts.length === 0 ? (
          <div className="text-center py-24 bg-neutral-900/10 rounded-3xl border border-dashed border-neutral-900 max-w-2xl mx-auto">
            <Heart size={48} className="text-neutral-700 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-neutral-300">Your wishlist is empty</h3>
            <p className="text-xs text-neutral-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Explore our collections, find timepieces you love, and tap the heart icon to save them for your showroom visit.
            </p>
            <Link
              to="/collections"
              className="mt-6 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all inline-flex items-center gap-2"
            >
              <span>Explore Collections</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {wishedProducts.map((watch) => (
              <div
                key={watch.id}
                className="flex gap-5 p-5 bg-neutral-900/20 border border-neutral-900 rounded-2xl relative group"
              >
                {/* Image Link */}
                <Link to={`/product/${watch.id}`} className="w-28 h-28 rounded-xl overflow-hidden bg-neutral-950 shrink-0">
                  <img src={watch.images[0]} alt={watch.name} className="w-full h-full object-cover" />
                </Link>

                {/* Details Panel */}
                <div className="flex flex-col justify-between py-0.5 flex-grow">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold">
                      {watch.brand}
                    </span>
                    <Link
                      to={`/product/${watch.id}`}
                      className="text-base font-serif font-bold text-neutral-200 mt-0.5 hover:text-amber-400 transition-colors line-clamp-1 block"
                    >
                      {watch.name}
                    </Link>
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      {watch.movement} &bull; {watch.style}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-900/50 flex justify-between items-center">
                    <span className="text-sm font-bold text-neutral-100">
                      ₹{watch.price.toLocaleString("en-IN")}
                    </span>
                    
                    <a
                      href={getWhatsAppLink(watch.name, watch.price, watch.brand)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-900/40 hover:border-emerald-600 text-emerald-500 hover:text-white rounded-lg transition-all flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-wider"
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare size={12} />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => toggleWishlist(watch.id)}
                  className="absolute top-4 right-4 text-neutral-600 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-950/15 transition-all"
                  title="Remove watch"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
