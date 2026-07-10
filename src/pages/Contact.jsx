import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageSquare, Calendar } from "lucide-react";

const Contact = () => {
  const { addAppointment, currentUser } = useContext(ShopContext);

  // Booking Form State
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("11:00");
  const [purpose, setPurpose] = useState("Bespoke Buying Consultation");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (!name) setName(currentUser.name || "");
      if (!phone) setPhone(currentUser.phone || "");
    }
  }, [currentUser]);

  // General Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      name,
      phone,
      date,
      time,
      purpose,
      email: currentUser?.email || ""
    };

    // 1. Log booking to local database (ShopContext)
    addAppointment(bookingData);

    setBookingSuccess(true);

    setTimeout(() => {
      setBookingSuccess(false);
      setName("");
      setPhone("");
      setDate("");
    }, 3000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);

    // In a real app, this would send an email or log to DB
    setTimeout(() => {
      setContactSuccess(false);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
    }, 3000);
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
            Visit Our Boutique
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
            Showroom & Consultations
          </h1>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
          <p className="text-neutral-400 text-sm mt-4 leading-relaxed">
            Drop by our showroom in Alkapuri, Vadodara, for a luxury viewing session. Or, book a dedicated one-on-one consultation with our horological directors below.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* Showroom Details Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-neutral-900/20 border border-neutral-900 p-8 rounded-3xl">
              <h3 className="text-lg font-serif font-bold text-neutral-200 mb-6 border-b border-neutral-850 pb-3">
                Contact Details
              </h3>
              
              <ul className="flex flex-col gap-6 text-sm text-neutral-400">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    GF-12, Ivory Plaza,
                    <br />
                    Opp. Welcome Hotel, Alkapuri,
                    <br />
                    Vadodara, Gujarat - 390007
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-amber-500 shrink-0" />
                  <a href="tel:+918320606850" className="hover:text-amber-400 transition-colors">
                    +91 83206 06850
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-amber-500 shrink-0" />
                  <a href="mailto:info@chronexvadodara.com" className="hover:text-amber-400 transition-colors">
                    info@chronexvadodara.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-neutral-900/20 border border-neutral-900 p-8 rounded-3xl">
              <h3 className="text-lg font-serif font-bold text-neutral-200 mb-6 border-b border-neutral-850 pb-3">
                Showroom Hours
              </h3>
              
              <ul className="flex flex-col gap-4 text-sm text-neutral-400">
                <li className="flex items-center gap-3">
                  <Clock size={16} className="text-amber-500 shrink-0" />
                  <span>Mon - Sat: 10:30 AM - 08:30 PM</span>
                </li>
                <li className="flex items-center gap-3 text-rose-500">
                  <Clock size={16} className="text-neutral-600 shrink-0" />
                  <span>Sunday: Closed (Weekly Rest)</span>
                </li>
                <li className="mt-2 border-t border-neutral-855 pt-4 text-xs text-neutral-500 leading-relaxed">
                  <strong>Parking Information:</strong> Free valet and dedicated customer parking spaces are situated directly in front of the Ivory Plaza entrance.
                </li>
              </ul>
            </div>
          </div>

          {/* Map & Booking Columns */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Map Placeholder */}
            <div className="h-72 rounded-3xl overflow-hidden border border-neutral-900 bg-neutral-900/10 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-neutral-950/40 z-10">
                <MapPin size={32} className="text-amber-500 animate-bounce mb-2" />
                <h4 className="text-base font-serif font-bold text-neutral-200">Chronex Watch Boutique, Vadodara</h4>
                <p className="text-xs text-neutral-400 mt-1">Ivory Plaza, Opposite Welcome Hotel, Alkapuri</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 px-5 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 text-[10px] uppercase tracking-widest rounded-lg font-bold transition-all"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="absolute inset-0 bg-neutral-955 opacity-70"></div>
              <div className="w-full h-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>

            {/* Appointment Booking Panel */}
            <div className="bg-neutral-900/20 border border-neutral-900 p-8 rounded-3xl shadow-xl relative overflow-hidden">
              {bookingSuccess ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <CheckCircle2 size={56} className="text-emerald-500 animate-bounce mb-4" />
                  <h3 className="text-xl font-serif font-bold text-neutral-100">Message Sent!</h3>
                  <p className="text-xs text-neutral-400 mt-2 max-w-xs">
                    Thank you for reaching out. Our team will get back to you soon.
                  </p>
                  <div className="w-10 h-1 border-t-2 border-emerald-500 animate-spin rounded-full mt-6"></div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-serif font-bold text-neutral-100 mb-6 border-b border-neutral-900 pb-3 flex items-center gap-2">
                    <Calendar size={18} className="text-amber-500" />
                    <span>Book In-Store Consultation</span>
                  </h3>
                  
                  <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                    {/* Date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-neutral-955 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-350 focus:outline-none transition-colors cursor-pointer"
                      />
                    </div>

                    {/* Time */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Preferred Time</label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-neutral-955 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-300 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="11:00" className="bg-neutral-900 text-neutral-300">11:00 AM</option>
                        <option value="12:30" className="bg-neutral-900 text-neutral-300">12:30 PM</option>
                        <option value="14:00" className="bg-neutral-900 text-neutral-300">02:00 PM</option>
                        <option value="15:30" className="bg-neutral-900 text-neutral-300">03:30 PM</option>
                        <option value="17:00" className="bg-neutral-900 text-neutral-300">05:00 PM</option>
                        <option value="18:30" className="bg-neutral-900 text-neutral-300">06:30 PM</option>
                        <option value="20:00" className="bg-neutral-900 text-neutral-300">08:00 PM</option>
                      </select>
                    </div>

                    {/* Purpose */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Purpose of Visit</label>
                      <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="bg-neutral-955 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-300 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Bespoke Buying Consultation" className="bg-neutral-900 text-neutral-300">Bespoke Buying Consultation</option>
                        <option value="Gifting Consultation" className="bg-neutral-900 text-neutral-300">Milestone / Gifting Consultation</option>
                        <option value="Corporate Order Discussion" className="bg-neutral-900 text-neutral-300">Corporate Bulk Order Discussion</option>
                        <option value="Restoration / Repair Assessment" className="bg-neutral-900 text-neutral-300">Restoration / Repair Assessment</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="sm:col-span-2 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 mt-2"
                    >
                      <MessageSquare size={16} />
                      <span>Confirm Appointment</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Secondary Query Form */}
        <div className="max-w-3xl mx-auto border-t border-neutral-900 pt-24">
          <div className="bg-neutral-900/10 border border-neutral-900 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            {contactSuccess ? (
              <div className="py-8 flex flex-col items-center text-center">
                <CheckCircle2 size={48} className="text-emerald-500 animate-bounce mb-3" />
                <h4 className="text-base font-serif font-bold text-neutral-100">Message Shared!</h4>
                <p className="text-xs text-neutral-400 mt-1">Thank you for reaching out.</p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-200 mb-6 border-b border-neutral-855 pb-3 text-center">
                  Have an Enquiry? Message Us
                </h3>
                
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="Enter email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider">Your Message</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Write your message or question here..."
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="py-4 bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <MessageSquare size={16} />
                    <span>Send Message</span>
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

export default Contact;
