import { useState, useRef } from "react";
import { RotateCw, Sparkles } from "lucide-react";

const ThreeViewer = ({ product }) => {
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    startPos.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;

    setRotationY((prev) => prev + deltaX * 0.5);
    setRotationX((prev) => Math.max(-30, Math.min(30, prev - deltaY * 0.5))); // Clamp X to avoid flipping

    startPos.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Simulate dynamic metallic glare offset based on rotation
  const glareX = (rotationY % 360) / 3.6;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-neutral-950 border border-neutral-900 rounded-3xl relative overflow-hidden">
      {/* Dynamic BG glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Info Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-amber-500 font-bold uppercase tracking-wider">
        <RotateCw size={12} className="animate-spin" style={{ animationDuration: "6s" }} />
        <span>3D Lookbook Mode</span>
      </div>

      <div 
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="w-full h-80 flex items-center justify-center cursor-grab active:cursor-grabbing select-none perspective-[1000px]"
      >
        {/* Pseudo 3D Container */}
        <div
          style={{
            transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
            transformStyle: "preserve-3d",
            transition: isDragging ? "none" : "transform 0.4s ease-out"
          }}
          className="relative w-64 h-64 flex items-center justify-center"
        >
          {/* Watch Image */}
          <img 
            src={product.images[0]} 
            alt="3D product" 
            className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] pointer-events-none"
            style={{ transform: "translateZ(30px)" }}
          />

          {/* Reflections Overlay */}
          <div 
            style={{
              background: `linear-gradient(${135 + rotationY}deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)`,
              mixBlendMode: "overlay",
              transform: "translateZ(35px)",
              pointerEvents: "none"
            }}
            className="absolute inset-0 rounded-full"
          />

          {/* Watch Shadow */}
          <div 
            style={{
              transform: `translateY(110px) rotateX(90deg) translateZ(-40px) scale(${1 - Math.abs(rotationX)/100})`,
              filter: "blur(20px)",
              background: "rgba(0,0,0,0.6)"
            }}
            className="absolute w-44 h-12 rounded-full"
          />
        </div>
      </div>

      {/* Drag Hint */}
      <div className="flex flex-col items-center gap-1 mt-2 text-center relative z-10">
        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Drag to rotate timepiece</span>
        <span className="text-[9px] text-neutral-600 flex items-center gap-1"><Sparkles size={10} className="text-amber-500/60" /> Immersive studio lighting & shadow mapping active</span>
      </div>
    </div>
  );
};

export default ThreeViewer;
