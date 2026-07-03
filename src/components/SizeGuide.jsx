import { X, Check } from "lucide-react";

const SizeGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-serif font-bold text-neutral-100">Watch Size Guide</h2>
            <p className="text-neutral-500 text-sm mt-1">Find the perfect case diameter for your wrist</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-12">
          
          {/* How to measure */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-bold text-neutral-200 mb-4 font-serif">How to measure your wrist</h3>
              <ul className="flex flex-col gap-4 text-sm text-neutral-400">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 font-bold">1</div>
                  <p>Take a flexible measuring tape or a piece of string.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 font-bold">2</div>
                  <p>Wrap it around your wrist where you would normally wear a watch.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 font-bold">3</div>
                  <p>If using string, mark where the ends meet and measure it flat against a ruler.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 font-bold">4</div>
                  <p><strong className="text-neutral-200">The One Finger Rule:</strong> A well-fitted watch strap should allow you to snugly fit one index finger between your wrist and the strap.</p>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center aspect-video relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-neutral-950 to-neutral-950"></div>
              {/* Abstract Illustration of measuring wrist */}
              <div className="relative w-32 h-16 border-4 border-b-0 border-neutral-700 rounded-t-full mb-2 z-10">
                <div className="absolute -left-2 top-8 w-4 h-24 bg-neutral-600 rounded-full rotate-12"></div>
                <div className="absolute -right-2 top-8 w-4 h-24 bg-neutral-600 rounded-full -rotate-12"></div>
                
                {/* Tape measure overlay */}
                <div className="absolute -left-6 top-8 w-44 h-3 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] z-20 flex items-center justify-around px-2">
                  <div className="w-0.5 h-1.5 bg-neutral-950"></div>
                  <div className="w-0.5 h-1.5 bg-neutral-950"></div>
                  <div className="w-0.5 h-1.5 bg-neutral-950"></div>
                  <div className="w-0.5 h-1.5 bg-neutral-950"></div>
                  <div className="w-0.5 h-1.5 bg-neutral-950"></div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-neutral-800" />

          {/* Size Categories */}
          <div>
            <h3 className="text-xl font-bold text-neutral-200 mb-6 font-serif text-center">Case Diameter Categories</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Small */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center">
                <div className="h-24 flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-neutral-600 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-1 h-3 bg-neutral-500 rounded-r"></div>
                  </div>
                </div>
                <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1">Small</h4>
                <div className="text-2xl font-bold text-neutral-100 mb-2">&le; 36mm</div>
                <p className="text-xs text-neutral-500">Perfect for smaller wrists (under 6.5") or those who prefer a classic, understated vintage look.</p>
              </div>

              {/* Medium */}
              <div className="bg-neutral-900 border-2 border-neutral-800 rounded-xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-neutral-950 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-bl-lg">Most Popular</div>
                <div className="h-24 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-neutral-400 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-1 h-3 bg-neutral-400 rounded-r"></div>
                  </div>
                </div>
                <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1">Medium / Standard</h4>
                <div className="text-2xl font-bold text-neutral-100 mb-2">38mm - 42mm</div>
                <p className="text-xs text-neutral-500">The modern sweet spot. Fits the vast majority of wrists (6.5" - 7.5") perfectly.</p>
              </div>

              {/* Large */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center">
                <div className="h-24 flex items-center justify-center mb-4">
                  <div className="w-20 h-20 rounded-full border-2 border-neutral-600 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-1.5 h-4 bg-neutral-500 rounded-r"></div>
                  </div>
                </div>
                <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1">Large / Oversized</h4>
                <div className="text-2xl font-bold text-neutral-100 mb-2">44mm +</div>
                <p className="text-xs text-neutral-500">Ideal for larger wrists (over 7.5"), sports watches, or those wanting to make a bold statement.</p>
              </div>

            </div>
          </div>

        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-900/50 flex justify-center">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
          >
            Got it, Back to Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default SizeGuide;
