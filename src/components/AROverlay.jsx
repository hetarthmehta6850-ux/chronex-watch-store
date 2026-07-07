import { useState, useRef, useEffect } from "react";
import { Camera, X, RotateCw, ZoomIn, ZoomOut, Download, AlertCircle } from "lucide-react";

const AROverlay = ({ product, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Initialize camera stream
  useEffect(() => {
    let stream = null;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn("navigator.mediaDevices.getUserMedia is not supported or requires secure context (HTTPS)");
      setHasPermission(false);
      return;
    }

    const startCamera = async () => {
      const constraintsList = [
        { video: { facingMode: { exact: "environment" } } },
        { video: { facingMode: "environment" } },
        { video: { facingMode: "user" } },
        { video: true }
      ];

      for (const constraints of constraintsList) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Explicitly play on metadata load to avoid mobile freeze
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play().catch(e => console.warn("Video play interrupted", e));
            };
          }
          setHasPermission(true);
          return;
        } catch (e) {
          console.warn(`Camera constraints failed:`, constraints, e.message);
        }
      }
      setHasPermission(false);
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const isTouch = e.touches && e.touches.length > 0;
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    dragStart.current = {
      x: (clientX - rect.left) - position.x,
      y: (clientY - rect.top) - position.y,
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const isTouch = e.touches && e.touches.length > 0;
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: (clientX - rect.left) - dragStart.current.x,
      y: (clientY - rect.top) - dragStart.current.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // 1. Draw camera video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 2. Draw watch graphic on top (calculating corresponding scale/pos relative to canvas size)
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const scaleX = canvas.width / containerRect.width;
      const scaleY = canvas.height / containerRect.height;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = product.images[0];
      img.onload = () => {
        ctx.save();
        const renderX = position.x * scaleX;
        const renderY = position.y * scaleY;
        const watchSize = 180 * scale * scaleX;

        ctx.translate(renderX, renderY);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -watchSize / 2, -watchSize / 2, watchSize, watchSize);
        ctx.restore();

        // Download trigger
        const link = document.createElement("a");
        link.download = `Chronex_AR_${product.name.replace(/\s+/g, "_")}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      };
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
          <div>
            <h3 className="font-bold font-serif text-amber-500 text-lg">AR Virtual Try-On</h3>
            <p className="text-xs text-neutral-400">Position the timepiece on your wrist</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400">
            <X size={20} />
          </button>
        </div>

        {/* Camera stream panel */}
        <div 
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className="relative w-full h-[400px] bg-black overflow-hidden cursor-move select-none"
        >
          {hasPermission === false ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-neutral-900 text-neutral-350 z-20">
              <AlertCircle size={48} className="text-rose-500 mb-3" />
              <p className="font-bold text-sm text-neutral-200">Camera Access Not Enabled</p>
              <p className="text-xs text-neutral-500 mt-2 max-w-xs leading-relaxed">
                Please allow camera access in browser permissions.
                <br /><br />
                <strong className="text-amber-500/80">⚠️ Mobile Developers Note:</strong> Web camera streams require a secure **HTTPS** connection (or localhost) on mobile devices to initialize.
              </p>
            </div>
          ) : (
            <>
              {hasPermission === null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 bg-neutral-950 z-10">
                  <Camera size={48} className="animate-pulse text-amber-500/50 mb-3" />
                  <p className="text-sm">Initiating Camera Stream...</p>
                </div>
              )}
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover animate-fade-in"
              />
              {/* Floating Watch Graphic */}
              <div
                style={{
                  position: "absolute",
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
                  width: "160px",
                  height: "160px",
                  pointerEvents: "none"
                }}
                className="transition-transform duration-75"
              >
                <img 
                  src={product.images[0]} 
                  alt="AR Watch Graphic" 
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)]"
                />
              </div>
            </>
          )}
        </div>

        {/* Hidden Canvas for captures */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Controls Overlay Footer */}
        <div className="p-6 bg-neutral-950 border-t border-neutral-800 flex flex-col gap-5">
          {/* Controls Sliders */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-bold flex justify-between">
                <span>Scale Size</span>
                <span>{Math.round(scale * 100)}%</span>
              </span>
              <div className="flex items-center gap-2">
                <ZoomOut size={14} className="text-neutral-500" />
                <input 
                  type="range" 
                  min="0.5" 
                  max="2" 
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
                <ZoomIn size={14} className="text-neutral-500" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-bold flex justify-between">
                <span>Rotation</span>
                <span>{rotation}°</span>
              </span>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="-180" 
                  max="180" 
                  step="5"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
                <RotateCw size={14} className="text-neutral-500" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={capturePhoto}
              disabled={!hasPermission}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-neutral-800 disabled:to-neutral-800 disabled:text-neutral-600 text-neutral-950 font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl"
            >
              <Download size={16} />
              Capture & Download Try-On
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AROverlay;
