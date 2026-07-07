import { useState, useContext, useEffect, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { Play, Pause, Volume2, VolumeX, ShoppingBag, Eye, Sparkles, SkipBack, SkipForward } from "lucide-react";
import { Link } from "react-router-dom";

const lookbooks = [
  {
    id: 1,
    title: "The Heritage Collection",
    tagline: "Timepieces built on legacies of precision.",
    youtubeId: "_mHfLAQwm6I",
    productIds: ["rolex-submariner-41", "omega-speedmaster-pro"],
    description: "Chronograph excellence meets Swiss automatic complications."
  },
  {
    id: 2,
    title: "Oceanic Depths",
    tagline: "Uncompromising build quality made for the extreme.",
    youtubeId: "QS11H1TlPX8",
    productIds: ["seiko-prospex-diver", "rado-captain-cook"],
    description: "Featuring high water-resistance ratings and ceramic rotatable bezels."
  },
  {
    id: 3,
    title: "Modern Minimalist",
    tagline: "Sophisticated styling for modern city life.",
    youtubeId: "NE-PAXTBcho",
    productIds: ["titan-edge-ceramic", "tissot-prx-powermatic"],
    description: "Slim profiles, crisp dial geometry, and lightweight materials."
  }
];

const Lookbook = () => {
  const { products } = useContext(ShopContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showDrawer, setShowDrawer] = useState(true);

  const activeLook = lookbooks[activeIndex];

  // Resolve matching product models from database
  const activeProducts = activeLook.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const playerRef = useRef(null);

  useEffect(() => {
    let player;
    const initPlayer = () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Failed to destroy player:", e);
        }
      }

      player = new window.YT.Player('yt-player', {
        videoId: activeLook.youtubeId,
        playerVars: {
          autoplay: 1,
          mute: isMuted ? 1 : 0,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playlist: activeLook.youtubeId,
          modestbranding: 1,
          disablekb: 1,
          vq: 'hd2160', // Force 4K quality stream
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            if (isPlaying) {
              event.target.playVideo();
            } else {
              event.target.pauseVideo();
            }
          }
        }
      });
      playerRef.current = player;
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLook.youtubeId]);

  // Synchronize Play/Pause states
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        if (isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (e) {
        console.error("Error toggling playback status:", e);
      }
    }
  }, [isPlaying]);

  // Synchronize Mute/Unmute states
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.mute === 'function') {
      try {
        if (isMuted) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
        }
      } catch (e) {
        console.error("Error toggling mute status:", e);
      }
    }
  }, [isMuted]);

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between overflow-hidden font-sans">
      {/* Background Video Loop */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] pointer-events-none">
          <div id="yt-player" className="w-full h-full scale-[1.25] md:scale-[1.1]"></div>
        </div>
      </div>

      {/* Center Media Controls (Play, Pause, Prev, Next) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-6 p-4 rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => {
            setActiveIndex((prev) => (prev - 1 + lookbooks.length) % lookbooks.length);
            setIsPlaying(true);
          }}
          className="p-3 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors"
        >
          <SkipBack size={24} />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 rounded-full bg-white text-black hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button 
          onClick={() => {
            setActiveIndex((prev) => (prev + 1) % lookbooks.length);
            setIsPlaying(true);
          }}
          className="p-3 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors"
        >
          <SkipForward size={24} />
        </button>
      </div>

      {/* Top Banner Control HUD */}
      <div className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto w-full mt-24">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase font-extrabold tracking-[0.25em] text-amber-500 flex items-center gap-1.5">
            <Sparkles size={12} className="animate-pulse" /> Cinematic Lookbook
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-serif">{activeLook.title}</h2>
        </div>

        {/* Video HUD Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="p-3 rounded-full bg-neutral-900/60 border border-neutral-800/40 hover:bg-neutral-800 text-neutral-300 transition-all backdrop-blur-md"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

        </div>
      </div>

      {/* Main Info Block & "Shop the Look" Drawer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row justify-between items-end gap-12 pb-16">
        
        {/* Story Intro */}
        <div className="flex flex-col gap-4 max-w-md text-left">
          <h3 className="text-2xl md:text-4xl font-black font-serif tracking-wide leading-snug">
            {activeLook.tagline}
          </h3>
          <p className="text-neutral-400 text-xs leading-relaxed">
            {activeLook.description}
          </p>

          {/* Lookbook Selectors */}
          <div className="flex gap-2 mt-4">
            {lookbooks.map((l, index) => (
              <button
                key={l.id}
                onClick={() => {
                  setActiveIndex(index);
                  setShowDrawer(true);
                }}
                className={`px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-wider border transition-all ${
                  activeIndex === index 
                    ? "bg-amber-500 border-amber-500 text-neutral-950" 
                    : "bg-neutral-950/60 border-neutral-800 hover:bg-neutral-900"
                }`}
              >
                Look {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Shop the Look Drawer panel */}
        {showDrawer && activeProducts.length > 0 && (
          <div className="w-full md:w-80 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-5 backdrop-blur-md shadow-2xl flex flex-col gap-4 animate-fade-in relative z-20">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <span className="text-[10px] uppercase tracking-widest font-black text-amber-500 flex items-center gap-1.5">
                <ShoppingBag size={14} /> Shop this video look
              </span>
              <button 
                onClick={() => setShowDrawer(false)}
                className="text-[9px] uppercase font-bold text-neutral-500 hover:text-neutral-300"
              >
                Hide
              </button>
            </div>

            {/* List products inside Lookbook video */}
            <div className="flex flex-col gap-3">
              {activeProducts.map((p) => (
                <div key={p.id} className="flex gap-3 p-2.5 rounded-xl bg-neutral-950/50 border border-neutral-900 items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
                      <img src={p.images[0]} alt={p.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] uppercase tracking-wider text-amber-500 font-bold">{p.brand}</span>
                      <h5 className="text-[11px] font-extrabold text-neutral-200 line-clamp-1">{p.name}</h5>
                      <span className="text-[11px] font-black text-neutral-100 mt-0.5">₹{p.price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <Link
                    to={`/product/${p.id}`}
                    className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-amber-500 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                  >
                    <Eye size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {!showDrawer && (
          <button 
            onClick={() => setShowDrawer(true)}
            className="px-6 py-3 bg-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2"
          >
            <ShoppingBag size={14} />
            Show Shop the Look drawer
          </button>
        )}

      </div>
    </div>
  );
};

export default Lookbook;
