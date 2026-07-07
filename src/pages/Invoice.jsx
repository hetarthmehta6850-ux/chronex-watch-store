import { useState, useContext, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { MapPin, Mail, Globe, Phone, QrCode, Truck, User, ShieldCheck, Download, Printer, ArrowLeft } from "lucide-react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { numberToWords } from "../utils/numberToWords";

const Invoice = () => {
  const { orderId } = useParams();
  const { orders } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const invoiceRef = useRef(null);

  const order = useMemo(() => {
    return orders.find((o) => o.id === orderId);
  }, [orderId, orders]);

  const { subtotal, couponDiscount, gst, grandTotal, amountInWords } = useMemo(() => {
    if (!order) return { subtotal: 0, couponDiscount: 0, gst: 0, grandTotal: 0, amountInWords: "" };
    const sub = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || order.total;
    const discount = sub - order.total;
    const base = order.total;
    const tax = Math.round(base * 0.18);
    const total = base + tax;
    const words = numberToWords(total);
    return { subtotal: sub, couponDiscount: discount, baseAmount: base, gst: tax, grandTotal: total, amountInWords: words };
  }, [order]);

  const cbTimestamp = "chronex-cors-bypass";

  const { paymentMethod, paymentId, transactionId, trackingId, formattedDelivery } = useMemo(() => {
    if (!order) {
      return {
        paymentMethod: "",
        paymentId: "",
        transactionId: "",
        trackingId: "",
        formattedDelivery: ""
      };
    }
    const method = order.paymentMethod || "UPI (Demo Payment)";
    let hash = 0;
    for (let i = 0; i < order.id.length; i++) {
      hash = order.id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const seed = Math.abs(hash);
    const payId = order.paymentDetails?.paymentId || `CHXPAY${100000000 + (seed % 900000000)}`;
    const txId = order.paymentDetails?.transactionId || `CHXTXN${100000000 + ((seed * 7) % 900000000)}`;
    const trackId = `123456${100000 + ((seed * 13) % 900000)}`;
    const orderDate = new Date(order.date);
    const estDate = new Date(orderDate);
    estDate.setDate(estDate.getDate() + 4);
    const formatted = estDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    return {
      paymentMethod: method,
      paymentId: payId,
      transactionId: txId,
      trackingId: trackId,
      formattedDelivery: formatted
    };
  }, [order]);

  const orderDate = useMemo(() => {
    return order ? new Date(order.date) : new Date();
  }, [order]);

  const formattedDate = useMemo(() => {
    return orderDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }, [orderDate]);

  const getSafeImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("data:")) return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}cb=chronex-cors-${cbTimestamp}`;
  };

  if (!order) {
    return (
      <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-40 pb-24 flex flex-col items-center justify-center font-sans">
        <p className="text-neutral-400 text-lg">Invoice not found or loading...</p>
        <Link to="/collections" className="text-amber-500 hover:underline mt-4">Return to Collections</Link>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    setIsGeneratingPDF(true);
    
    try {
      const element = invoiceRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });
      
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      
      const pdfWidth = 210; // Standard A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });
      
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Chronex_Invoice_${order.id}.pdf`);
      
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF: " + (error.message || error) + ". You can also try using Ctrl+P to print.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleBack = () => {
    const isAdmin = localStorage.getItem("chronex_admin_auth") === "true";
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate(`/order-success/${order.id}`);
    }
  };

  return (
    <div className="bg-neutral-900 min-h-screen pb-24 print:pb-0 print:bg-white font-sans text-neutral-900 selection:bg-amber-500/30">
      <style>{`
        .invoice-print-container,
        .invoice-print-container * {
          --color-neutral-50: #fafafa !important;
          --color-neutral-100: #f5f5f5 !important;
          --color-neutral-200: #e5e5e5 !important;
          --color-neutral-300: #d4d4d4 !important;
          --color-neutral-400: #a3a3a3 !important;
          --color-neutral-500: #737373 !important;
          --color-neutral-600: #525252 !important;
          --color-neutral-700: #404040 !important;
          --color-neutral-800: #262626 !important;
          --color-neutral-900: #171717 !important;
          --color-neutral-950: #0a0a0a !important;
          --color-emerald-500: #10b981 !important;
          --color-emerald-600: #059669 !important;
          --color-amber-500: #f59e0b !important;
          --color-amber-600: #d97706 !important;
        }

        @media print {
          @page {
            margin: 0;
            size: A4 portrait;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: white !important;
          }
          .invoice-print-container {
            zoom: 0.72;
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
          }
        }
      `}</style>
      
      {/* Top Action Bar (Hidden in Print) */}
      <div className="bg-neutral-950 border-b border-neutral-800 p-4 sticky top-0 z-50 print:hidden flex justify-between items-center shadow-lg">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4">
          <button onClick={handleBack} className="text-neutral-400 hover:text-amber-500 transition-colors flex items-center gap-2 text-sm font-semibold uppercase tracking-widest cursor-pointer border-none bg-transparent p-0">
            <ArrowLeft size={16} /> Back to Page
          </button>
          <div className="flex gap-4">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
            >
              <Printer size={16} /> Print
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-50"
            >
              <Download size={16} /> {isGeneratingPDF ? "Generating..." : "Download PDF"}
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Container */}
      <div className="flex justify-center pt-8 print:pt-0">
        <div 
          ref={invoiceRef}
          className="bg-white w-[800px] max-w-full shadow-2xl overflow-hidden print:shadow-none print:w-full print:max-w-full relative shrink-0 text-[11px] font-sans invoice-print-container"
        >
          {/* 1. Header (Black) */}
          <div className="bg-[#0a0a0a] text-white p-6 print:p-4 flex justify-between items-center relative overflow-hidden">
            {/* Subtle background texture for premium feel */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #d4af37 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10 flex flex-col items-start">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[#d4af37] text-3xl font-serif leading-none">♚</span>
                <h1 className="text-4xl font-serif tracking-[0.2em] font-bold text-[#d4af37] leading-none m-0 p-0">CHRONEX</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-px bg-[#d4af37]"></div>
                  <span className="text-[7px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold whitespace-nowrap">PREMIUM WATCH MARKETPLACE</span>
                  <div className="w-8 h-px bg-[#d4af37]"></div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-end gap-3">
              <h2 className="text-4xl font-serif tracking-widest text-white m-0">INVOICE</h2>
              <div className="border border-[#d4af37] px-4 py-1.5 rounded-sm bg-[#111]">
                <span className="text-[#d4af37] font-mono font-bold text-sm tracking-widest">{order.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-[#d4af37]/50"></div>
                <span className="text-[#d4af37] text-[8px] uppercase tracking-[0.2em] font-bold">ORIGINAL FOR RECIPIENT</span>
                <div className="w-6 h-px bg-[#d4af37]/50"></div>
              </div>
            </div>
          </div>

          {/* 2. Company & Order Details */}
          <div className="p-6 print:p-4 border-b-2 border-neutral-100 flex gap-6 relative bg-white">
            {/* Faint Crown Watermark */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-50/80 text-[200px] pointer-events-none select-none font-serif leading-none">♚</div>

            {/* Left: Company Details */}
            <div className="w-1/3 flex flex-col gap-3 relative z-10">
              <h3 className="font-bold text-sm tracking-wide text-neutral-800">CHRONEX RETAIL PRIVATE LIMITED</h3>
              <div className="flex flex-col gap-2.5 text-neutral-600 mt-1">
                <div className="flex gap-3">
                  <MapPin size={12} className="shrink-0 mt-0.5 text-neutral-400" />
                  <span className="leading-tight">401, Luxuria Tower, SG Highway,<br/>Ahmedabad, Gujarat - 380051, India</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail size={12} className="shrink-0 text-neutral-400" />
                  <span>support@chronex.in</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Globe size={12} className="shrink-0 text-neutral-400" />
                  <span>www.chronex.in</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone size={12} className="shrink-0 text-neutral-400" />
                  <span>+91 83206 06850</span>
                </div>
              </div>
              <div className="mt-2 font-mono font-semibold text-neutral-700">
                GSTIN: 24AABCC1234D1Z5
              </div>
            </div>

            {/* Middle: Order Meta */}
            <div className="w-1/3 flex flex-col justify-center gap-3 relative z-10 pl-6 border-l border-neutral-100">
              <div className="grid grid-cols-[100px_10px_1fr] items-center text-[10px]">
                <span className="font-bold text-neutral-700 uppercase tracking-wider">INVOICE DATE</span>
                <span className="text-neutral-400">:</span>
                <span className="text-neutral-800 font-medium">{formattedDate}</span>
              </div>
              <div className="grid grid-cols-[100px_10px_1fr] items-center text-[10px]">
                <span className="font-bold text-neutral-700 uppercase tracking-wider">ORDER ID</span>
                <span className="text-neutral-400">:</span>
                <span className="text-neutral-800 font-mono font-medium">{order.id}</span>
              </div>
              <div className="grid grid-cols-[100px_10px_1fr] items-center text-[10px]">
                <span className="font-bold text-neutral-700 uppercase tracking-wider">PAYMENT STATUS</span>
                <span className="text-neutral-400">:</span>
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider w-fit">PAID</span>
              </div>
              <div className="grid grid-cols-[100px_10px_1fr] items-center text-[10px]">
                <span className="font-bold text-neutral-700 uppercase tracking-wider">PAYMENT METHOD</span>
                <span className="text-neutral-400">:</span>
                <span className="text-neutral-800 font-medium">{paymentMethod}</span>
              </div>
              <div className="grid grid-cols-[100px_10px_1fr] items-center text-[10px]">
                <span className="font-bold text-neutral-700 uppercase tracking-wider">TRANSACTION ID</span>
                <span className="text-neutral-400">:</span>
                <span className="text-neutral-800 font-mono font-medium">{transactionId}</span>
              </div>
              <div className="grid grid-cols-[100px_10px_1fr] items-center text-[10px]">
                <span className="font-bold text-neutral-700 uppercase tracking-wider">PAYMENT ID</span>
                <span className="text-neutral-400">:</span>
                <span className="text-neutral-800 font-mono font-medium">{paymentId}</span>
              </div>
            </div>

            {/* Right: QR Code */}
            <div className="w-1/3 flex justify-end items-center relative z-10">
              <div className="border border-[#d4af37]/40 rounded-lg p-3 flex flex-col items-center bg-amber-50/30 text-center w-36">
                <span className="text-[#d4af37] text-[8px] font-bold tracking-widest uppercase mb-2">SCAN TO VERIFY</span>
                <div className="bg-white p-1 rounded-md border border-neutral-200">
                  <QrCode size={70} strokeWidth={1} className="text-neutral-800" />
                </div>
                <span className="text-[7px] text-neutral-500 mt-2 leading-tight">Verify this invoice on our website <strong className="text-[#d4af37] block">chronex.in/verify</strong></span>
              </div>
            </div>
          </div>

          {/* 3. Bill To / Ship To */}
          <div className="px-8 py-4 print:py-2 flex bg-white gap-8 border-b-2 border-neutral-100">
            {/* Bill To */}
            <div className="w-1/2 bg-neutral-50 p-5 rounded-xl border border-neutral-100 flex flex-col gap-3 relative">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <User size={12} />
                </div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-800">BILL TO</h4>
              </div>
              <h5 className="font-bold text-sm text-neutral-900">{order.customer?.name || "Guest User"}</h5>
              <div className="flex flex-col gap-1.5 text-neutral-600">
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-neutral-400" /> <span>{order.customer?.email || "guest@chronex.in"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-neutral-400" /> <span>{order.customer?.phone || "N/A"}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="text-neutral-400 shrink-0 mt-0.5" /> 
                  <span className="leading-snug">{order.customer?.address || "Address not provided"}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-neutral-200/60">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[7px] uppercase tracking-wider font-bold text-neutral-400">CITY</span>
                  <span className="text-[9px] font-semibold text-neutral-700 truncate">{order.customer?.cityState?.split(",")[0] || "Vadodara"}</span>
                </div>
                <div className="flex flex-col gap-0.5 border-l border-neutral-200/60 pl-2">
                  <span className="text-[7px] uppercase tracking-wider font-bold text-neutral-400">STATE</span>
                  <span className="text-[9px] font-semibold text-neutral-700 truncate">{order.customer?.cityState?.split(",")[1] || "Gujarat"}</span>
                </div>
                <div className="flex flex-col gap-0.5 border-l border-neutral-200/60 pl-2">
                  <span className="text-[7px] uppercase tracking-wider font-bold text-neutral-400">PINCODE</span>
                  <span className="text-[9px] font-semibold text-neutral-700">{order.customer?.pincode || "390007"}</span>
                </div>
                <div className="flex flex-col gap-0.5 border-l border-neutral-200/60 pl-2">
                  <span className="text-[7px] uppercase tracking-wider font-bold text-neutral-400">COUNTRY</span>
                  <span className="text-[9px] font-semibold text-neutral-700">India</span>
                </div>
              </div>
            </div>

            {/* Ship To */}
            <div className="w-1/2 bg-neutral-50 p-5 rounded-xl border border-neutral-100 flex flex-col gap-3 relative">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Truck size={12} />
                </div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-800">SHIP TO</h4>
              </div>
              <h5 className="font-bold text-sm text-neutral-900">{order.customer?.name || "Guest User"}</h5>
              <div className="flex flex-col gap-1.5 text-neutral-600">
                <div className="flex items-center gap-2 opacity-0 select-none">
                  <Mail size={12} /> <span>placeholder</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-neutral-400" /> <span>{order.customer?.phone || "N/A"}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="text-neutral-400 shrink-0 mt-0.5" /> 
                  <span className="leading-snug">{order.customer?.address || "Address not provided"}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-neutral-200/60">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[7px] uppercase tracking-wider font-bold text-neutral-400">CITY</span>
                  <span className="text-[9px] font-semibold text-neutral-700 truncate">{order.customer?.cityState?.split(",")[0] || "Vadodara"}</span>
                </div>
                <div className="flex flex-col gap-0.5 border-l border-neutral-200/60 pl-2">
                  <span className="text-[7px] uppercase tracking-wider font-bold text-neutral-400">STATE</span>
                  <span className="text-[9px] font-semibold text-neutral-700 truncate">{order.customer?.cityState?.split(",")[1] || "Gujarat"}</span>
                </div>
                <div className="flex flex-col gap-0.5 border-l border-neutral-200/60 pl-2">
                  <span className="text-[7px] uppercase tracking-wider font-bold text-neutral-400">PINCODE</span>
                  <span className="text-[9px] font-semibold text-neutral-700">{order.customer?.pincode || "390007"}</span>
                </div>
                <div className="flex flex-col gap-0.5 border-l border-neutral-200/60 pl-2">
                  <span className="text-[7px] uppercase tracking-wider font-bold text-neutral-400">COUNTRY</span>
                  <span className="text-[9px] font-semibold text-neutral-700">India</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Table */}
          <div className="px-8 py-4 print:py-2 bg-white min-h-[180px] print:min-h-[100px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#111] text-[#d4af37] uppercase text-[9px] tracking-widest">
                  <th className="py-3 px-4 font-bold rounded-tl-sm w-12 text-center">#</th>
                  <th className="py-3 px-2 font-bold w-48">PRODUCT</th>
                  <th className="py-3 px-2 font-bold">BRAND</th>
                  <th className="py-3 px-2 font-bold">MODEL</th>
                  <th className="py-3 px-2 font-bold">COLOR</th>
                  <th className="py-3 px-2 font-bold text-center">QTY.</th>
                  <th className="py-3 px-2 font-bold text-right">UNIT PRICE (₹)</th>
                  <th className="py-3 px-4 font-bold text-right rounded-tr-sm">TOTAL PRICE (₹)</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50/50">
                    <td className="py-4 px-4 font-bold text-neutral-800 text-center">{index + 1}</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded flex items-center justify-center p-1 border border-neutral-200 mix-blend-multiply">
                           {item.image ? (
                             <img src={getSafeImageUrl(item.image)} alt={item.name} crossOrigin="anonymous" className="max-w-full max-h-full object-contain drop-shadow-sm" />
                           ) : (
                             <span className="text-lg">⌚</span>
                           )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-neutral-900 leading-tight">{item.brand} {item.name.split(" ")[0]} {item.name.split(" ")[1] || ""}</span>
                          <span className="text-[9px] text-neutral-500 font-mono tracking-wider">SKU: {item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-neutral-700 font-medium">{item.brand}</td>
                    <td className="py-4 px-2 text-neutral-600 text-[10px] leading-tight pr-4">
                       {item.name}
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full border border-neutral-300 ${item.name.toLowerCase().includes('green') ? 'bg-emerald-700' : item.name.toLowerCase().includes('blue') ? 'bg-blue-800' : 'bg-neutral-900'}`}></div>
                        <span className="text-neutral-700 capitalize text-[10px]">
                           {item.name.toLowerCase().includes('green') ? 'Green' : item.name.toLowerCase().includes('blue') ? 'Blue' : 'Black'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center text-neutral-800 font-semibold">{item.quantity}</td>
                    <td className="py-4 px-2 text-right text-neutral-700">₹{item.price.toLocaleString("en-IN")}</td>
                    <td className="py-4 px-4 text-right font-bold text-neutral-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5. Summary Grid */}
          <div className="px-8 pb-6 pt-2 print:pb-3 print:gap-3 grid grid-cols-[1fr_1fr_1fr] gap-6 bg-white">
            
            {/* ORDER SUMMARY */}
            <div className="border border-neutral-200 rounded-lg p-5 flex flex-col h-full bg-neutral-50/50">
              <div className="flex items-center gap-2 mb-4 border-b border-neutral-200 pb-2">
                <span className="text-amber-600 font-serif text-lg">📄</span>
                <h4 className="font-bold text-[10px] uppercase tracking-widest text-neutral-900">ORDER SUMMARY</h4>
              </div>
              <div className="flex flex-col gap-2.5 text-[10px] flex-grow">
                <div className="flex justify-between items-center text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-800">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-600">
                  <span>Shipping Charges</span>
                  <span className="font-semibold text-neutral-800">₹0</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between items-center text-neutral-600">
                    <span>Coupon Discount {order.couponApplied ? `(${order.couponApplied})` : ''}</span>
                    <span className="font-semibold text-neutral-800">-₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-neutral-800 font-semibold mt-1 pt-2 border-t border-neutral-200 border-dashed">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className="flex justify-between items-end mt-4 pt-3 border-t border-neutral-200 font-bold">
                <span className="text-xs uppercase tracking-widest text-neutral-900">GRAND TOTAL</span>
                <span className="text-2xl font-bold text-[#d4af37] leading-none">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200 border-dashed">
                 <span className="block text-[8px] font-bold text-neutral-800 tracking-wide">(Total Amount in Words)</span>
                 <span className="block text-[9px] text-neutral-600 mt-1 capitalize leading-tight font-semibold">
                   {amountInWords}
                 </span>
              </div>
            </div>

            {/* PAYMENT INFORMATION */}
            <div className="border border-neutral-200 rounded-lg p-5 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4 border-b border-neutral-200 pb-2">
                <span className="text-amber-600 font-serif text-lg">💳</span>
                <h4 className="font-bold text-[10px] uppercase tracking-widest text-neutral-900">PAYMENT INFORMATION</h4>
              </div>
              <div className="flex flex-col gap-3 text-[9px] flex-grow">
                <div className="grid grid-cols-[80px_10px_1fr]">
                  <span className="text-neutral-500">Payment Status</span>
                  <span>:</span>
                  <span className="font-bold text-emerald-600">Paid</span>
                </div>
                <div className="grid grid-cols-[80px_10px_1fr]">
                  <span className="text-neutral-500">Payment Method</span>
                  <span>:</span>
                  <span className="font-medium text-neutral-800">{paymentMethod}</span>
                </div>
                <div className="grid grid-cols-[80px_10px_1fr]">
                  <span className="text-neutral-500">Payment ID</span>
                  <span>:</span>
                  <span className="font-mono text-neutral-800">{paymentId}</span>
                </div>
                <div className="grid grid-cols-[80px_10px_1fr]">
                  <span className="text-neutral-500">Transaction ID</span>
                  <span>:</span>
                  <span className="font-mono text-neutral-800">{transactionId}</span>
                </div>
                <div className="grid grid-cols-[80px_10px_1fr]">
                  <span className="text-neutral-500">Payment Date</span>
                  <span>:</span>
                  <span className="font-medium text-neutral-800">{formattedDate}</span>
                </div>
              </div>
              <div className="mt-4 bg-neutral-50 border border-neutral-200 rounded-lg p-3 flex gap-3 items-start">
                <ShieldCheck size={18} className="shrink-0 text-neutral-800 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-[9px] text-neutral-900 uppercase">DEMO PAYMENT COMPLETED</span>
                  <span className="text-[8px] text-neutral-500 mt-0.5 leading-tight">This is a demo transaction.<br/>No real payment has been processed.</span>
                </div>
              </div>
            </div>

            {/* SHIPPING INFORMATION */}
            <div className="border border-neutral-200 rounded-lg p-5 flex flex-col h-full relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-neutral-200 pb-2">
                <Truck size={14} className="text-amber-600 shrink-0" />
                <h4 className="font-bold text-[10px] uppercase tracking-widest text-neutral-900">SHIPPING INFORMATION</h4>
              </div>
              <div className="flex flex-col gap-3 text-[9px]">
                <div className="grid grid-cols-[80px_10px_1fr]">
                  <span className="text-neutral-500">Courier Partner</span>
                  <span>:</span>
                  <span className="font-medium text-neutral-800">Delhivery</span>
                </div>
                <div className="grid grid-cols-[80px_10px_1fr]">
                  <span className="text-neutral-500">Tracking ID</span>
                  <span>:</span>
                  <span className="font-mono text-neutral-800 font-medium">{trackingId}</span>
                </div>
                <div className="grid grid-cols-[80px_10px_1fr]">
                  <span className="text-neutral-500">Estimated Delivery</span>
                  <span>:</span>
                  <span className="font-medium text-neutral-800">{formattedDelivery}</span>
                </div>
                <div className="grid grid-cols-[80px_10px_1fr]">
                  <span className="text-neutral-500">Order Status</span>
                  <span>:</span>
                  <span className="font-bold text-emerald-600">Confirmed</span>
                </div>
              </div>
              
              <div className="mt-auto pt-6 flex flex-col items-center">
                {/* Simulated Barcode */}
                <div className="flex items-end h-8 gap-[1px] opacity-80 w-full justify-center">
                  {[...Array(40)].map((_, i) => {
                    const hash = (i * 3 + (order.id.charCodeAt(i % order.id.length) || 0)) % 10;
                    return (
                      <div key={i} className="bg-black" style={{ width: hash > 5 ? '2px' : '1px', height: hash > 2 ? '100%' : '80%' }}></div>
                    );
                  })}
                </div>
                <span className="text-[8px] font-mono mt-1 font-bold tracking-wider">{order.id}</span>
              </div>
            </div>

          </div>

          {/* 6. Footer Signature Block (Black) */}
          <div className="bg-[#0a0a0a] text-white flex">
            
            <div className="flex-1 py-6 px-6 print:py-3 print:gap-3 grid grid-cols-3 gap-6 items-center">
              <div className="flex flex-col gap-2 border-r border-[#222] pr-6">
                <h4 className="text-[#d4af37] font-bold text-[9px] uppercase tracking-widest mb-1">THANK YOU FOR<br/>SHOPPING WITH CHRONEX.</h4>
                <p className="text-[8px] text-neutral-400 leading-tight">Every second counts.<br/>Every watch tells a story.</p>
                <div className="font-serif text-[#d4af37] text-xl mt-2 italic">Chronex Team</div>
              </div>
              
              <div className="flex flex-col gap-3 pl-2 border-r border-[#222] pr-6">
                 <h4 className="text-[#d4af37] font-bold text-[9px] uppercase tracking-widest">NEED HELP?</h4>
                 <div className="flex flex-col gap-2 text-[8px] text-neutral-300">
                    <div className="flex items-center gap-2"><Mail size={10} className="text-[#d4af37]"/> support@chronex.in</div>
                    <div className="flex items-center gap-2"><Phone size={10} className="text-[#d4af37]"/> +91 83206 06850</div>
                    <div className="flex items-center gap-2"><Globe size={10} className="text-[#d4af37]"/> www.chronex.in</div>
                    <div className="flex items-start gap-2"><MapPin size={10} className="text-[#d4af37] shrink-0"/> <span className="leading-tight">Ahmedabad, Gujarat, India</span></div>
                 </div>
              </div>

              <div className="flex flex-col items-start relative pl-2">
                 <h4 className="text-[#d4af37] font-bold text-[9px] uppercase tracking-widest mb-2">AUTHORISED SIGNATORY</h4>
                 {/* Fake Signature */}
                 <div className="font-serif italic text-white text-3xl opacity-90 -rotate-3 my-2" style={{ fontFamily: '"Playfair Display", serif' }}>H. Mehta</div>
                 <div className="flex flex-col mt-1">
                   <span className="font-bold text-white text-[9px]">Hetarth Mehta</span>
                   <span className="text-[8px] text-neutral-400">Director</span>
                   <span className="text-[8px] text-neutral-500">Chronex Retail Private Limited</span>
                 </div>
                 
                 {/* Gold Stamp */}
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-dashed border-[#d4af37] flex items-center justify-center opacity-80 rotate-12">
                   <div className="w-14 h-14 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] text-2xl font-serif">
                     C
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* 7. Bottom Trust Strip */}
          <div className="bg-[#050505] border-t border-[#222] border-b-2 border-[#d4af37] px-8 py-4 flex justify-between items-center text-[7px] uppercase tracking-widest text-neutral-400 font-bold">
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37] text-sm">⏱</span>
              <div className="flex flex-col leading-tight"><span className="text-white">100% AUTHENTIC WATCHES</span><span>Original. Certified. Guaranteed.</span></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37] text-sm">🔒</span>
              <div className="flex flex-col leading-tight"><span className="text-white">SECURE PAYMENT</span><span>Your transactions are safe with us.</span></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37] text-sm">🎁</span>
              <div className="flex flex-col leading-tight"><span className="text-white">PREMIUM PACKAGING</span><span>Luxury packaging for every order.</span></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37] text-sm">↻</span>
              <div className="flex flex-col leading-tight"><span className="text-white">7 DAY EASY RETURNS</span><span>Hassle-free return policy.</span></div>
            </div>
          </div>
          
          <div className="bg-[#050505] text-center text-[8px] tracking-[0.4em] font-bold text-[#d4af37] py-2">
            W W W . C H R O N E X . I N
          </div>

        </div>
      </div>
    </div>
  );
};

export default Invoice;
