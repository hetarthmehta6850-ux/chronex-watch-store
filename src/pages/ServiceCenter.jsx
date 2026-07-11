import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Wrench, Battery, ShieldAlert, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";

const ServiceCenter = () => {
  const { addServiceRequest, serviceRequests, currentUser } = useContext(ShopContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [watchBrand, setWatchBrand] = useState("");
  const [watchModel, setWatchModel] = useState("");
  const [serviceType, setServiceType] = useState("Battery Replacement");
  const [issueDescription, setIssueDescription] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    if (currentUser) {
      if (!name) setName(currentUser.name || "");
      if (!phone) setPhone(currentUser.phone || "");
    }
  }, [currentUser]);
  
  // Guest tracker state
  const [searchTicketId, setSearchTicketId] = useState("");
  const [searchedTicket, setSearchedTicket] = useState(null);
  const [searchError, setSearchError] = useState(false);

  const services = [
    {
      title: "Battery Replacement",
      icon: <Battery className="text-amber-500" size={24} />,
      description: "Quick 10-minute replacement with original Swiss/Japanese cells, including fresh rubber gasket lubrication.",
      price: "From ₹350"
    },
    {
      title: "Strap & Bracelet Swap",
      icon: <Sparkles className="text-amber-500" size={24} />,
      description: "Upgrade or replace your strap. Choose from premium Italian leather, steel link resizing, or sporty silicone bands.",
      price: "From ₹499"
    },
    {
      title: "Ultrasonic Deep Clean",
      icon: <Wrench className="text-amber-500" size={24} />,
      description: "Full case and metal bracelet disassembly, deep ultrasonic wash to remove dirt, and precise polishing to restore shine.",
      price: "From ₹999"
    },
    {
      title: "Waterproof Sealing",
      icon: <ShieldAlert className="text-amber-500" size={24} />,
      description: "Replacement of worn-out rubber o-rings and high-tech vacuum pressure testing to verify depth resistance ratings.",
      price: "From ₹750"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      name,
      phone,
      watchBrand,
      watchModel,
      serviceType,
      issueDescription,
      email: currentUser?.email || ""
    };

    const tId = addServiceRequest(requestData);
    setTicketId(tId);
    setFormSuccess(true);
  };

  const handleResetForm = () => {
    setFormSuccess(false);
    setTicketId("");
    setName("");
    setPhone("");
    setWatchBrand("");
    setWatchModel("");
    setIssueDescription("");
  };

  const handleTrackTicket = (e) => {
    e.preventDefault();
    setSearchError(false);
    const found = serviceRequests.find(s => s.id?.toUpperCase() === searchTicketId.trim().toUpperCase());
    if (found) {
      setSearchedTicket(found);
    } else {
      setSearchedTicket(null);
      setSearchError(true);
    }
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
            Authorized Service Lab
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
            Watch Care & Service Center
          </h1>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
          <p className="text-neutral-400 text-sm mt-4 leading-relaxed">
            Timepieces are intricate engineering marvels. Our in-house service lab in Alkapuri, Vadodara, is equipped with precise calibration and testing rigs to restore your watch to absolute factory specifications.
          </p>
        </div>


        {/* Guest Repair Tracker widget */}
        <div className="max-w-2xl mx-auto p-6 bg-neutral-900/30 border border-neutral-900 rounded-3xl mb-16 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></div>
          
          <h3 className="text-sm font-serif font-bold text-neutral-200 text-center mb-4 uppercase tracking-wider">
            Quick Guest Repair Status Tracker
          </h3>
          
          <form onSubmit={handleTrackTicket} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" required placeholder="Enter ticket number (e.g. TKT-123456)"
              value={searchTicketId} onChange={(e) => setSearchTicketId(e.target.value)}
              className="flex-grow bg-neutral-955 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Check Status
            </button>
          </form>

          {searchError && (
            <p className="text-[11px] text-rose-500 text-center mt-3 font-semibold animate-pulse">
              ⚠️ Repair ticket not found. Please verify the ID format (SRV-XXXXXX).
            </p>
          )}

          {searchedTicket && (
            <div className="mt-6 p-5 bg-neutral-955 border border-neutral-850 rounded-2xl flex flex-col gap-4 text-left animate-fade-in">
              <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 block">Watch Client</span>
                  <strong className="text-xs text-neutral-200 capitalize">{searchedTicket.name}</strong>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${
                  searchedTicket.status === "Delivered" || searchedTicket.status === "Ready" ? "text-emerald-400 border-emerald-900 bg-emerald-950/20" : "text-amber-400 border-amber-900 bg-amber-950/20"
                }`}>
                  {searchedTicket.status}
                </span>
              </div>
              <div className="text-xs text-neutral-450 grid grid-cols-2 gap-2">
                <span><strong>Watch Brand:</strong> {searchedTicket.watchBrand}</span>
                <span><strong>Watch Model:</strong> {searchedTicket.watchModel || "—"}</span>
                <span className="col-span-2"><strong>Issue Description:</strong> "{searchedTicket.issueDescription}"</span>
              </div>

              {/* Status stepper pipeline */}
              <div className="border-t border-neutral-850 pt-5 mt-2">
                <div className="flex justify-between items-center relative w-full px-2">
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-850 z-0"></div>
                  <div 
                    className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-amber-500 z-0 transition-all duration-500"
                    style={{
                      width: `${
                        (() => {
                          const steps = ["Received", "Diagnosing", "In Repair", "Ready", "Delivered"];
                          const currentIdx = steps.indexOf(searchedTicket.status);
                          return currentIdx >= 0 ? (currentIdx / (steps.length - 1)) * 90 : 0;
                        })()
                      }%`
                    }}
                  ></div>
                  {["Received", "Diagnosing", "In Repair", "Ready", "Delivered"].map((status, index) => {
                    const steps = ["Received", "Diagnosing", "In Repair", "Ready", "Delivered"];
                    const currentIdx = steps.indexOf(searchedTicket.status);
                    const isDone = index <= currentIdx;
                    return (
                      <div key={status} className="flex flex-col items-center relative z-10">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[8px] font-bold ${
                          isDone ? "bg-amber-500 border-amber-500 text-neutral-950" : "bg-neutral-950 border-neutral-850 text-neutral-500"
                        }`}>{isDone ? "✓" : index + 1}</div>
                        <span className={`text-[7px] uppercase tracking-wider font-extrabold mt-1 hidden sm:block ${isDone ? "text-amber-500" : "text-neutral-550"}`}>{status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 bg-neutral-900/30 border border-neutral-900 hover:border-neutral-850 rounded-2xl flex gap-6 items-start transition-all"
            >
              <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl shrink-0">
                {service.icon}
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-serif font-bold text-neutral-200">{service.title}</h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{service.description}</p>
                </div>
                <span className="text-amber-500 text-xs uppercase tracking-wider font-semibold mt-4 block">
                  Estimates: {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Trust points */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-amber-500 text-xs tracking-[0.2em] uppercase font-semibold">
              Boutique Standards
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-neutral-100 tracking-wide">
              Why Service With Us?
            </h2>
            
            <ul className="flex flex-col gap-4 text-sm text-neutral-400 mt-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Original spare parts, batteries, and luxury straps exclusively.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Pressure checking and sealing on every battery change.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Fully transparent upfront pricing. No surprise service charges.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Experienced horologists handling all major Swiss and Japanese brands.</span>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-900 text-xs text-neutral-500 mt-4 leading-relaxed">
              <strong>Walk-in Service:</strong> Quick repairs like sizing, resizing, and battery fittings can be completed on a walk-in basis at our Alkapuri, Vadodara boutique. No appointment required.
            </div>
          </div>

          {/* Service Request Form Panel */}
          <div className="lg:col-span-7 bg-neutral-900/20 border border-neutral-900 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            {formSuccess ? (
              <div className="py-12 flex flex-col items-center text-center gap-5">
                <CheckCircle2 size={56} className="text-emerald-500 animate-bounce" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-neutral-100">Service Request Logged!</h3>
                  <p className="text-xs text-neutral-450 mt-2 max-w-sm mx-auto leading-relaxed">
                    Your watch care request has been successfully registered. Your service tracking ticket ID is: <strong className="font-mono text-amber-500 select-all">{ticketId}</strong>
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-2">
                    Use this ID to track repair status or communicate with our technician lab.
                  </p>
                </div>
                
                <div className="flex gap-4 mt-4 w-full justify-center">
                  <Link
                    to="/profile"
                    className="px-6 py-3 bg-neutral-850 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                  >
                    Track in Profile
                  </Link>
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                  >
                    File Another Request
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-100 mb-6 border-b border-neutral-900 pb-3">
                  Schedule a Service / Repair
                </h3>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 83206 06850"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Watch Brand */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Watch Brand</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Titan, Tissot, Seiko"
                      value={watchBrand}
                      onChange={(e) => setWatchBrand(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Watch Model */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Model / Serial (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. PRX, G-Shock DW5600"
                      value={watchModel}
                      onChange={(e) => setWatchModel(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Service Type Selection */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Service Needed</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-300 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Battery Replacement" className="bg-neutral-900 text-neutral-300">Battery Replacement</option>
                      <option value="Strap Swapping / Sizing" className="bg-neutral-900 text-neutral-300">Strap Swapping / Sizing</option>
                      <option value="Ultrasonic Deep Cleaning" className="bg-neutral-900 text-neutral-300">Ultrasonic Deep Cleaning</option>
                      <option value="Waterproofing & Sealing" className="bg-neutral-900 text-neutral-300">Waterproofing & Sealing</option>
                      <option value="Glass Replacement" className="bg-neutral-900 text-neutral-300">Glass Replacement / Polishing</option>
                      <option value="Mechanical Movement Overhaul" className="bg-neutral-900 text-neutral-300">Mechanical Movement Overhaul</option>
                    </select>
                  </div>

                  {/* Issue Description */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Describe the issue</label>
                    <textarea
                      rows="3"
                      placeholder="Describe how the watch is behaving or what needs repair..."
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="sm:col-span-2 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 mt-2"
                  >
                    <MessageSquare size={16} />
                    <span>Submit Request</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCenter;
