import { useState, useContext } from "react";
import { ShieldCheck, QrCode, Search, Award, Download, CheckCircle2, AlertTriangle, Calendar, Award as CertificateIcon, Globe, Mail, Phone } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const year = d.getFullYear();
  
  return `${day} ${month} ${year}`;
};

const getWatchSpecs = (brandName, watchName) => {
  const brand = brandName?.toUpperCase() || "";
  const name = watchName?.toUpperCase() || "";
  
  // Defaults
  let movement = "Automatic Movement";
  let caseMaterial = "Stainless Steel";
  let dialColor = "Black";
  let strap = "Stainless Steel Bracelet";
  let waterResistance = "10 ATM (100 meters)";
  let sku = `CX-${brand.substring(0,3)}-${Math.floor(1000 + Math.random() * 9000)}-BK`;
  
  if (brand.includes("ROLEX")) {
    movement = "Superlative Chronometer (Automatic)";
    strap = "Oystersteel Three-piece Links";
    waterResistance = "30 ATM (300 meters)";
    sku = "CX-RLX-126610LN";
  } else if (brand.includes("OMEGA")) {
    movement = "Co-Axial Master Chronometer";
    strap = "Brushed/Polished Steel";
    waterResistance = "15 ATM (150 meters)";
    sku = "CX-OMG-310304";
  } else if (brand.includes("TISSOT")) {
    movement = "Powermatic 80 (Automatic)";
    strap = "Genuine Embossed Leather";
    waterResistance = "5 ATM (50 meters)";
    sku = "CX-TST-T006407";
  } else if (brand.includes("CASIO") || brand.includes("G-SHOCK")) {
    movement = "Tough Solar Quartz";
    caseMaterial = "Resin / Steel Core";
    strap = "Reinforced Resin Strap";
    waterResistance = "20 ATM (200 meters)";
    sku = "CX-CAS-GA2100";
  }
  
  if (name.includes("BLUE")) dialColor = "Midnight Blue";
  else if (name.includes("GREEN")) dialColor = "Olive Green";
  else if (name.includes("GOLD")) dialColor = "Champagne Gold";
  else if (name.includes("WHITE") || name.includes("SILVER")) dialColor = "Opaline Silver";
  
  return { movement, caseMaterial, dialColor, strap, waterResistance, sku };
};

const WarrantyPortal = () => {
  const { orders, currentUser } = useContext(ShopContext);
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState("idle"); // idle, searching, found, notfound
  const [certData, setCertData] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!serial) return;

    setStatus("searching");

    setTimeout(() => {
      const validSerials = {
        "CHX-DEMO-789": {
          model: "Submariner Date 41",
          brand: "Rolex",
          purchasedOn: "2024-06-08",
          expiresOn: "2026-06-07",
          clientName: "Valued Chronex Client",
          status: "Authentic & Insured",
          certId: "CERT-RLX-90812"
        },
        "CHX-DEMO-123": {
          model: "Speedmaster Professional",
          brand: "Omega",
          purchasedOn: "2024-05-18",
          expiresOn: "2029-05-18",
          clientName: "Valued Chronex Client",
          status: "Authentic & Insured",
          certId: "CERT-OMG-74829"
        },
        "CHX-DEMO-456": {
          model: "Le Locle Powermatic 80",
          brand: "Tissot",
          purchasedOn: "2024-01-05",
          expiresOn: "2026-01-05",
          clientName: "Valued Chronex Client",
          status: "Authentic & Insured",
          certId: "CERT-TST-63821"
        }
      };

      const matchDemo = validSerials[serial.toUpperCase().trim()];
      
      let realMatch = null;
      if (orders) {
        const foundOrder = orders.find(o => o.id === serial.toUpperCase().trim());
        if (foundOrder && foundOrder.items && foundOrder.items.length > 0) {
           const item = foundOrder.items[0];
           const orderDate = new Date(foundOrder.date || Date.now());
           const expiryDate = new Date(orderDate);
           expiryDate.setFullYear(expiryDate.getFullYear() + 2); // 2 Year Standard Warranty from image
           
           const specs = getWatchSpecs(item.brand, item.name);
           
           realMatch = {
             model: item.name,
             brand: item.brand,
             purchasedOn: orderDate.toISOString().split('T')[0],
             expiresOn: expiryDate.toISOString().split('T')[0],
             clientName: foundOrder.customer?.name || currentUser?.name || "Valued Chronex Client",
             status: "Authentic & Insured",
             certId: `CERT-${item.brand.substring(0,3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
             image: item.image,
             ...specs
           };
        }
      }
      
      let match = realMatch || matchDemo;
      
      if (match) {
        if (match === matchDemo) {
          const specs = getWatchSpecs(match.brand, match.model);
          let demoImg = "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=400";
          if (match.brand.toUpperCase().includes("OMEGA")) {
            demoImg = "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=400";
          } else if (match.brand.toUpperCase().includes("TISSOT")) {
            demoImg = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=400";
          }
          
          match = {
            ...match,
            image: demoImg,
            ...specs
          };
        }
        
        const certNo = match.certId ? `CHX/WARRANTY/${new Date(match.purchasedOn).getFullYear()}/${match.certId.split('-')[2] || Math.floor(10000 + Math.random() * 90000)}` : `CHX/WARRANTY/2026/${Math.floor(10000 + Math.random() * 90000)}`;
        
        const pDate = new Date(match.purchasedOn);
        const eDate = new Date(match.expiresOn);
        const diffYears = Math.round((eDate - pDate) / (1000 * 60 * 60 * 24 * 365.25));

        const formattedData = {
          ...match,
          certNo,
          warrantyPeriod: `${diffYears} YEAR${diffYears > 1 ? 'S' : ''}`,
          purchasedOnFormatted: formatDate(match.purchasedOn),
          expiresOnFormatted: formatDate(match.expiresOn),
          serial: serial.toUpperCase().trim()
        };
        
        setCertData(formattedData);
        setStatus("found");
      } else {
        setStatus("notfound");
      }
    }, 1500);
  };

  const handleDownload = () => {
    window.print(); // Simple luxury way to prompt browser print/PDF download
  };

  return (
    <div className="min-h-screen py-32 max-w-4xl mx-auto px-6 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-print, #certificate-print * {
            visibility: visible;
          }
          #certificate-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            border: none !important;
            box-shadow: none !important;
            background-color: #fdfbf7 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}} />
      <div className="flex flex-col gap-8">
        
        {/* Banner */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="p-3.5 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif tracking-wide text-neutral-100">
            Authenticity & Warranty Portal
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
            Every timepiece purchased through Chronex features an encrypted secure serial. Verify your watch authenticity and inspect your active warranty status below.
          </p>
        </div>

        {/* Search Panel */}
        <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-xl max-w-xl mx-auto w-full">
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <label className="text-xs uppercase font-extrabold tracking-widest text-neutral-400">Enter Watch Serial Number</label>
            <div className="flex gap-2">
              <div className="relative grow">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  type="text" 
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  placeholder="e.g. CHX-DEMO-789" 
                  className="w-full pl-12 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-amber-500"
                />
              </div>
              <button 
                type="submit"
                className="px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-all"
              >
                Verify
              </button>
            </div>
            <span className="text-[10px] text-neutral-500 flex items-center gap-1.5 justify-center mt-1">
              <AlertTriangle size={12} className="text-amber-500/50" />
              Try typing "CHX-DEMO-789", "CHX-DEMO-123", or "CHX-DEMO-456" for demo.
            </span>
          </form>
        </div>

        {/* Status: Searching */}
        {status === "searching" && (
          <div className="flex flex-col items-center py-12 gap-4">
            <RefreshIcon className="animate-spin text-amber-500" size={32} />
            <span className="text-sm text-neutral-400">Validating Cryptographic Signatures...</span>
          </div>
        )}

        {/* Status: Not Found */}
        {status === "notfound" && (
          <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/10 text-center max-w-xl mx-auto w-full flex flex-col items-center gap-2">
            <AlertTriangle className="text-rose-500" size={32} />
            <h4 className="font-bold text-neutral-200">Validation Failed</h4>
            <p className="text-xs text-neutral-400">
              The serial number was not found in our authorized dealership ledger. Please inspect spelling or contact customer assistance.
            </p>
          </div>
        )}

        {/* Status: Found Certificate Card */}
        {status === "found" && certData && (
          <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto w-full animate-fade-in print:p-0">
            {/* The Luxury Certificate */}
            <div className="w-full max-w-[800px] border border-amber-500/20 shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:border-none print:m-0 bg-[#fdfbf7] text-neutral-900 font-serif select-none p-10 flex flex-col gap-8 relative text-left" id="certificate-print">
              
              {/* Double line gold borders */}
              <div className="absolute inset-4 border border-[#c8a27b] pointer-events-none opacity-40"></div>
              <div className="absolute inset-5 border-2 border-double border-[#c8a27b] pointer-events-none opacity-80"></div>
              
              {/* Elegant Gold Corner Filigrees */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#c8a27b] pointer-events-none rounded-tl-lg"></div>
              <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#c8a27b] pointer-events-none rounded-tr-lg"></div>
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#c8a27b] pointer-events-none rounded-bl-lg"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#c8a27b] pointer-events-none rounded-br-lg"></div>

              {/* 1. Header block */}
              <div className="flex justify-between items-center text-[10px] text-neutral-500 font-sans tracking-wider border-b border-neutral-200/50 pb-4 relative z-10">
                <div className="flex flex-col">
                  <span>CERTIFICATE NO.</span>
                  <span className="font-bold text-neutral-800 tracking-normal font-mono">{certData.certNo}</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <img src="/favicon.png" alt="Chronex" className="w-5 h-5 object-contain" />
                    <span className="font-sans font-black tracking-[0.25em] text-base text-neutral-900">CHRONEX</span>
                  </div>
                  <span className="text-[6px] tracking-[0.3em] text-neutral-500 font-sans uppercase font-bold">— Time Beyond Ordinary —</span>
                </div>
                <div className="flex flex-col items-end">
                  <span>DATE OF ISSUE</span>
                  <span className="font-bold text-neutral-800 tracking-normal font-mono">{certData.purchasedOnFormatted}</span>
                </div>
              </div>

              {/* 2. Certificate Title */}
              <div className="text-center flex flex-col items-center gap-2 relative z-10">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-[0.15em] text-neutral-900 font-serif uppercase">WARRANTY CERTIFICATE</h2>
                
                {/* SVG Ornament separator */}
                <svg className="w-40 h-4 text-[#c8a27b] opacity-80" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M10 5 H40 M60 5 H90 M40 5 L45 2 L50 5 L55 2 L60 5 M45 8 L50 5 L55 8" fill="none" stroke="#c8a27b" />
                  <circle cx="50" cy="5" r="1.5" fill="#c8a27b" />
                </svg>

                <p className="text-[10px] text-neutral-600 max-w-lg mx-auto italic leading-relaxed font-sans px-4 text-center">
                  This is to certify that the timepiece described below is an original CHRONEX product and is covered under warranty as per the terms and conditions.
                </p>
              </div>

              {/* 3. Grid Details (3 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.1fr_0.8fr] gap-6 items-stretch relative z-10 mt-2">
                
                {/* Column 1: WATCH DETAILS */}
                <div className="border border-neutral-200/50 bg-[#faf8f4]/60 p-4 rounded-xl flex flex-col gap-4">
                  <div className="bg-[#111] text-amber-500 text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded flex items-center gap-1.5 w-max">
                    <ShieldCheck size={12} />
                    <span>Watch Details</span>
                  </div>
                  <div className="flex flex-col gap-2 text-[10px] font-sans text-neutral-600">
                    <div className="grid grid-cols-[90px_10px_1fr] border-b border-neutral-100 pb-1.5">
                      <span>Model Name</span><span>:</span><span className="font-bold text-neutral-800 uppercase">{certData.model}</span>
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] border-b border-neutral-100 pb-1.5">
                      <span>Model Number</span><span>:</span><span className="font-semibold text-neutral-800 uppercase">{certData.sku}</span>
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] border-b border-neutral-100 pb-1.5">
                      <span>Serial Number</span><span>:</span><span className="font-bold text-amber-600 font-mono uppercase">{certData.serial.toUpperCase()}</span>
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] border-b border-neutral-100 pb-1.5">
                      <span>Movement Type</span><span>:</span><span className="font-semibold text-neutral-800">{certData.movement}</span>
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] border-b border-neutral-100 pb-1.5">
                      <span>Case Material</span><span>:</span><span className="font-semibold text-neutral-800">{certData.caseMaterial}</span>
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] border-b border-neutral-100 pb-1.5">
                      <span>Dial Color</span><span>:</span><span className="font-semibold text-neutral-800">{certData.dialColor}</span>
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] border-b border-neutral-100 pb-1.5">
                      <span>Strap Material</span><span>:</span><span className="font-semibold text-neutral-800">{certData.strap}</span>
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] border-b border-neutral-100 pb-1.5">
                      <span>Water Resistance</span><span>:</span><span className="font-semibold text-neutral-800">{certData.waterResistance}</span>
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr] border-b border-neutral-100 pb-1.5">
                      <span>Date of Purchase</span><span>:</span><span className="font-semibold text-neutral-800">{certData.purchasedOnFormatted}</span>
                    </div>
                    <div className="grid grid-cols-[90px_10px_1fr]">
                      <span>Place of Purchase</span><span>:</span><span className="font-semibold text-neutral-800">CHRONEX Official Website</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: WARRANTY INFORMATION */}
                <div className="border border-neutral-200/50 bg-[#faf8f4]/60 p-4 rounded-xl flex flex-col gap-4">
                  <div className="bg-[#111] text-amber-500 text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded flex items-center gap-1.5 w-max">
                    <Award size={12} />
                    <span>Warranty Info</span>
                  </div>
                  <div className="flex flex-col gap-4 text-[10px] font-sans text-neutral-600">
                    
                    <div className="flex gap-3 items-center">
                      <div className="p-1 bg-[#111] text-amber-500 rounded"><Award size={13} /></div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-bold">Warranty Period</span>
                        <span className="font-bold text-neutral-800">{certData.warrantyPeriod} <span className="text-neutral-500 font-normal text-[9px] block md:inline">(From Purchase Date)</span></span>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="p-1 bg-[#111] text-amber-500 rounded"><Calendar size={13} /></div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-bold">Warranty Valid Till</span>
                        <span className="font-bold text-[#c8a27b]">{certData.expiresOnFormatted}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start border-t border-neutral-200/50 pt-3">
                      <div className="p-1 bg-[#111] text-emerald-500 rounded mt-0.5"><CheckCircle2 size={13} /></div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-bold">Coverage</span>
                        <span className="text-neutral-600 leading-normal text-[9px]">Manufacturing defects in material and workmanship.</span>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="p-1 bg-[#111] text-rose-500 rounded mt-0.5"><AlertTriangle size={13} /></div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-bold">Exclusions</span>
                        <span className="text-neutral-600 leading-normal text-[9px]">Damage caused by accident, misuse, unauthorized service or wear and tear.</span>
                      </div>
                    </div>
                    
                  </div>
                </div>

                {/* Column 3: WATCH VISUAL */}
                <div className="flex flex-col items-center justify-center p-4 border border-neutral-200/50 rounded-xl relative overflow-hidden bg-white/40">
                  <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500/5 to-amber-500/10 blur-xl"></div>
                  {certData.image ? (
                    <img src={certData.image} alt={certData.model} className="w-28 h-28 object-contain drop-shadow-xl relative z-10 hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-28 h-28 flex items-center justify-center text-neutral-300 relative z-10 text-3xl">⌚</div>
                  )}
                  <div className="text-center mt-4 relative z-10 w-full">
                    <span className="block text-[9px] font-black text-neutral-800 uppercase tracking-wider truncate">— {certData.model} —</span>
                    <span className="block text-[8px] text-neutral-400 font-mono uppercase mt-0.5 truncate">{certData.sku}</span>
                  </div>
                </div>

              </div>

              {/* 4. Bottom Block (Notes, Seal, Signatures) */}
              <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.8fr_0.9fr] gap-6 items-center border-t border-neutral-200/50 pt-6 relative z-10 mt-2">
                
                {/* Important notes */}
                <div className="border border-neutral-200/50 p-4 rounded-xl bg-[#faf8f4]/60 text-[8px]">
                  <div className="bg-[#111] text-amber-500 text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1.5 w-max mb-3 font-sans">
                    <Award size={10} />
                    <span>Important Notes</span>
                  </div>
                  <ul className="list-disc pl-4 font-sans text-neutral-500 flex flex-col gap-1.5 leading-relaxed">
                    <li>Please keep this certificate safe. It is required for warranty claims.</li>
                    <li>Warranty is valid only if the watch has been purchased from an authorized CHRONEX seller.</li>
                    <li>For any assistance, please contact our support team.</li>
                  </ul>
                </div>

                {/* Gold Seal stamp */}
                <div className="flex justify-center">
                  <div className="relative w-24 h-24 rounded-full border border-dashed border-[#c8a27b] flex items-center justify-center rotate-12 bg-amber-50/10">
                    <div className="w-20 h-20 rounded-full border-2 border-double border-[#c8a27b] flex flex-col items-center justify-center text-[#c8a27b] text-[6px] font-sans font-bold text-center p-2 relative">
                      <span className="absolute top-1 font-bold text-[7px] tracking-wider">CHRONEX</span>
                      <span className="text-[12px] my-1">👑</span>
                      <span className="absolute bottom-1 font-bold text-[5px] tracking-widest">AUTHENTIC ORIGINAL</span>
                    </div>
                  </div>
                </div>

                {/* Signatory & QR */}
                <div className="flex flex-col items-center md:items-end justify-center gap-4 text-center md:text-right">
                  <div className="flex flex-col items-center md:items-end w-full">
                     {/* Signature */}
                     <div className="text-3xl text-neutral-800 -rotate-3 mb-1 pr-4" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>
                       Hetarth Mehta
                     </div>
                     <div className="w-32 border-b border-neutral-300 my-1"></div>
                     <span className="font-bold text-[9px] text-neutral-800 tracking-wide font-sans">HETARTH MEHTA</span>
                     <span className="text-[8px] text-neutral-400 font-sans">Authorized Signatory</span>
                     <span className="text-[8px] text-neutral-500 font-bold font-sans">CHRONEX</span>
                  </div>
                  <div className="flex items-center gap-2 border border-neutral-200/70 rounded-lg p-1.5 bg-white shadow-sm mt-1">
                    <div className="flex items-center text-left font-sans gap-1.5">
                      <div className="flex flex-col">
                        <span className="text-[5px] font-bold text-neutral-400 uppercase tracking-wider">Registry System</span>
                        <span className="text-[8px] font-bold text-neutral-700">SCAN TO VERIFY</span>
                      </div>
                      <QrCode size={24} className="text-neutral-900" />
                    </div>
                  </div>
                </div>

              </div>

              {/* 5. Footer */}
              <div className="border-t border-neutral-200/50 pt-4 flex flex-col gap-3 items-center relative z-10 mt-2">
                <div className="flex justify-between items-center w-full text-[9px] font-sans text-neutral-500 max-w-md mx-auto">
                  <span className="flex items-center gap-1.5"><Globe size={11} className="text-[#c8a27b]" /> www.chronex.in</span>
                  <span className="text-neutral-300">|</span>
                  <span className="flex items-center gap-1.5"><Mail size={11} className="text-[#c8a27b]" /> support@chronex.in</span>
                  <span className="text-neutral-300">|</span>
                  <span className="flex items-center gap-1.5"><Phone size={11} className="text-[#c8a27b]" /> +91 83206 06850</span>
                </div>
                <p className="text-[8px] tracking-widest text-[#c8a27b] uppercase font-bold text-center font-sans mt-1">
                  Thank you for choosing CHRONEX. Time Beyond Ordinary.
                </p>
              </div>

            </div>

            {/* Actions */}
            <button 
              onClick={handleDownload}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold uppercase tracking-widest text-xs rounded-xl flex items-center gap-2 shadow-xl shadow-amber-500/10 border border-amber-500/20 print:hidden mt-4"
            >
              <Download size={14} />
              Print / Save Certificate PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Quick helper component to bypass lucide imports
const RefreshIcon = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export default WarrantyPortal;
