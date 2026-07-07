import { useState, useContext } from "react";
import { Clock, Phone, Map, Compass, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ShowroomLocator = () => {
  const { showrooms } = useContext(ShopContext);
  const [selectedId, setSelectedId] = useState("");

  const currentSelectedId = selectedId || (showrooms && showrooms.length > 0 ? showrooms[0].id : "");
  const activeShowroom = showrooms.find((s) => s.id === currentSelectedId) || showrooms[0];

  return (
    <div className="min-h-screen py-32 max-w-6xl mx-auto px-6 font-sans">
      <div className="flex flex-col gap-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="p-3.5 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
            <Compass size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif tracking-wide text-neutral-100">
            Our Boutique Showrooms
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
            Experience the weight and details of luxury horology in person. Visit one of our authorized locations for private tours and bespoke adjustments.
          </p>
        </div>

        {/* Map & List Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left: Showroom List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-neutral-500">Authorized Locations</span>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2">
              {showrooms.length > 0 ? (
                showrooms.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                    className={`p-6 rounded-2xl text-left border transition-all flex flex-col gap-2 ${
                      selectedId === s.id 
                        ? "bg-neutral-900 border-amber-500 shadow-xl" 
                        : "bg-neutral-950 border-neutral-900 hover:border-neutral-800"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-xs text-amber-500 font-extrabold uppercase tracking-wider">{s.city}</span>
                      {selectedId === s.id && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1 font-bold">
                          <Sparkles size={10} /> Active Selection
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-neutral-200 text-base">{s.name}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">{s.address}</p>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-neutral-500 bg-neutral-950 border border-neutral-900 rounded-2xl text-sm font-semibold">
                  No showrooms registered.
                </div>
              )}
            </div>
          </div>

          {/* Right: Premium Interactive Visual Vector Map */}
          <div className="w-full lg:w-1/2 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 min-h-[400px] flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* BG Map Grid Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            <div className="flex justify-between items-center border-b border-neutral-800 pb-4 relative z-10">
              <span className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
                <Map size={16} className="text-amber-500" />
                Boutique Details
              </span>
              <span className="text-[10px] font-semibold text-neutral-500">Chronex India Map Network</span>
            </div>

            {/* Interactive Vector Map Screen */}
            <div className="grow relative min-h-[260px] my-6 flex items-center justify-center border border-neutral-800/50 rounded-2xl bg-neutral-950/60 backdrop-blur-sm overflow-hidden">
              {/* Mock India Boundary Canvas Lines */}
              <svg className="absolute inset-0 w-full h-full stroke-neutral-800/40 fill-none stroke-[1.5]" viewBox="0 0 100 100">
                <path d="M45 10 L55 20 L58 35 L70 45 L62 55 L58 75 L45 90 L38 85 L35 70 L30 55 L38 35 Z" className="stroke-dashed animate-[pulse_3s_infinite]" />
              </svg>

              {/* Showroom Plot Pins */}
              {showrooms.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  style={{ left: `${s.coords?.x || 50}%`, top: `${s.coords?.y || 50}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                >
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-transform ${
                    selectedId === s.id ? "scale-125" : "hover:scale-110"
                  }`}>
                    {/* Ring Pulse */}
                    {selectedId === s.id && (
                      <span className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-500/60 animate-ping" />
                    )}
                    <div className={`w-3.5 h-3.5 rounded-full border border-neutral-950 flex items-center justify-center ${
                      selectedId === s.id ? "bg-amber-500 shadow-lg shadow-amber-500/40" : "bg-neutral-700 group-hover:bg-amber-400"
                    }`} />
                  </div>
                  <span className={`absolute top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 border text-[8px] font-bold uppercase tracking-wider text-neutral-300 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity ${
                    selectedId === s.id ? "border-amber-500 text-amber-500 opacity-100" : "border-neutral-800"
                  }`}>
                    {s.city}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Showroom Info Panel */}
            {activeShowroom ? (
              <div className="flex flex-col gap-4 border-t border-neutral-800 pt-6 relative z-10">
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif font-bold text-neutral-200 text-lg">{activeShowroom.name}</h3>
                  <p className="text-xs text-neutral-500">{activeShowroom.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 my-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Clock size={16} className="text-amber-500 shrink-0" />
                    <span>{activeShowroom.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Phone size={16} className="text-amber-500 shrink-0" />
                    <span>{activeShowroom.phone}</span>
                  </div>
                </div>

                <Link
                  to="/service"
                  className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-bold uppercase tracking-widest text-amber-500 text-center flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar size={14} />
                  Book Showroom Consultation slot
                </Link>
              </div>
            ) : (
              <div className="text-center py-6 text-neutral-500 text-xs font-semibold">
                No showroom details to display.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ShowroomLocator;
