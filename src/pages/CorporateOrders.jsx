import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Briefcase, Building, FileText, Calculator, ArrowLeft, CheckCircle2, Phone, Mail, Users } from "lucide-react";

const CorporateOrders = () => {
  const { theme, submitCorporateInquiry } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    gstNumber: "",
    quantity: "",
    budgetPerWatch: "",
    requirements: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCorporateInquiry(formData);
    setSubmitted(true);
  };

  // Discount calculator logic
  const getExpectedDiscount = (qty) => {
    const q = Number(qty);
    if (!q || q < 10) return "0%";
    if (q >= 50) return "15%";
    if (q >= 25) return "10%";
    return "5%";
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <Link to="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-amber-500 transition-colors mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mb-6">
          <Briefcase size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-6 leading-tight">
          Corporate & Bulk Gifting
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Reward your employees, partners, and top clients with the timeless gift of a luxury timepiece. Exclusive pricing, GST benefits, and personalized service for bulk orders.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Benefits & Calculator */}
        <div className="lg:col-span-1 space-y-8">
          <div className={`p-8 rounded-3xl border ${theme === 'light' ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-neutral-800'}`}>
            <h3 className="text-lg font-serif text-amber-500 mb-6 flex items-center gap-2">
              <Calculator size={20} /> Volume Pricing
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-300 font-bold">10 - 24 Watches</span>
                <span className="text-amber-500 font-bold">5% OFF</span>
              </li>
              <li className="flex justify-between items-center p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-300 font-bold">25 - 49 Watches</span>
                <span className="text-amber-500 font-bold">10% OFF</span>
              </li>
              <li className="flex justify-between items-center p-3 rounded-xl bg-neutral-950 border border-neutral-800 border-l-4 border-l-amber-500">
                <span className="text-neutral-300 font-bold">50+ Watches</span>
                <span className="text-amber-500 font-bold">15% OFF</span>
              </li>
            </ul>
          </div>

          <div className={`p-8 rounded-3xl border ${theme === 'light' ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-neutral-800'}`}>
            <h3 className="text-lg font-serif text-amber-500 mb-6">Corporate Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-neutral-200 mb-1">GST Input Tax Credit</span>
                  <span className="text-xs text-neutral-500 leading-relaxed">Valid B2B GST invoices provided for all corporate purchases.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-neutral-200 mb-1">Dedicated Account Manager</span>
                  <span className="text-xs text-neutral-500 leading-relaxed">Single point of contact from curation to final delivery.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-neutral-200 mb-1">Custom Engraving</span>
                  <span className="text-xs text-neutral-500 leading-relaxed">Personalize case backs with employee names or company logos (MOQ applies).</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-center">
            <h4 className="text-amber-500 font-bold mb-4">Contact Sales Directly</h4>
            <div className="flex flex-col gap-3 text-sm text-neutral-300">
              <a href="tel:+918320606850" className="flex items-center justify-center gap-2 hover:text-amber-500 transition-colors">
                <Phone size={16} /> +91 83206 06850
              </a>
              <a href="mailto:corporate@chronex.in" className="flex items-center justify-center gap-2 hover:text-amber-500 transition-colors">
                <Mail size={16} /> corporate@chronex.in
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className={`lg:col-span-2 p-8 md:p-12 rounded-3xl border ${theme === 'light' ? 'bg-white border-neutral-200' : 'bg-neutral-900 border-neutral-800'}`}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center min-h-[400px]">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-serif text-neutral-100 mb-4">Inquiry Submitted</h2>
              <p className="text-neutral-400 max-w-md mx-auto mb-8">
                Thank you for your interest in Chronex Corporate Gifting. Our B2B specialist will contact you within 24 hours with a customized proposal.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-amber-500 font-bold hover:text-amber-400 transition-colors"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-serif text-amber-500 mb-2">Request a Quote</h2>
              <p className="text-neutral-400 mb-8">Fill out the details below and we'll get back to you with the best corporate pricing.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <Building size={14} /> Company Name *
                    </label>
                    <input 
                      type="text" 
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <Users size={14} /> Contact Person *
                    </label>
                    <input 
                      type="text" 
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                    <FileText size={14} /> GST Number (Optional)
                  </label>
                  <input 
                    type="text" 
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 outline-none"
                    placeholder="Enter GSTIN for B2B Invoice"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex justify-between">
                      <span>Estimated Quantity *</span>
                      <span className="text-amber-500">{getExpectedDiscount(formData.quantity)} Discount</span>
                    </label>
                    <input 
                      type="number" 
                      name="quantity"
                      min="5"
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 outline-none"
                      placeholder="Minimum 10 for discount"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Budget Per Watch (₹) *</label>
                    <select 
                      name="budgetPerWatch"
                      required
                      value={formData.budgetPerWatch}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 outline-none appearance-none"
                    >
                      <option value="">Select Budget Range</option>
                      <option value="10k-25k">₹10,000 - ₹25,000</option>
                      <option value="25k-50k">₹25,000 - ₹50,000</option>
                      <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                      <option value="1L+">Above ₹1,00,000</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Additional Requirements</label>
                  <textarea 
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 outline-none resize-none"
                    placeholder="Specific brand preferences, engraving needs, delivery timeline..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-500 text-neutral-950 font-bold py-4 rounded-xl hover:bg-amber-400 transition-colors mt-4"
                >
                  Submit Inquiry
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateOrders;
