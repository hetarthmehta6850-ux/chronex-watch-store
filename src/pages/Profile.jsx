import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Clock, Box, CreditCard, ChevronRight, User, Award, LogOut, Key, Gift, Package, Calendar, RefreshCw, Landmark, QrCode } from "lucide-react";

const getOrderTimeline = (status) => {
  if (status === "Cancelled" || status === "Rejected") {
    return (
      <div className="flex items-center w-full mt-4 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
        <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(243,24,96,0.8)] animate-pulse mr-3"></div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-rose-500">Order {status}</span>
      </div>
    );
  }
  
  const steps = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];
  let currentIndex = steps.indexOf(status);
  if (currentIndex === -1) currentIndex = 0;

  return (
    <div className="flex flex-col w-full mt-6 mb-2 select-none">
      <div className="flex justify-between relative z-10 w-full px-1 sm:px-2">
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <div key={step} className="flex flex-col items-center gap-2 w-1/5 relative z-10">
              <div className={`w-3.5 h-3.5 rounded-full border-[2px] transition-all duration-700 z-10 ${
                isCompleted ? 'bg-amber-500 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]' : 'bg-neutral-900 border-neutral-700'
              } ${isCurrent ? 'scale-125 ring-4 ring-amber-500/20' : ''}`}>
              </div>
              <span className={`text-[7px] sm:text-[8px] uppercase font-bold tracking-widest text-center transition-colors duration-500 ${
                isCurrent ? 'text-amber-500' : isCompleted ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-0.5 bg-neutral-800 rounded-full mx-6 sm:mx-8 -mt-[24px] sm:-mt-[25px] relative z-0 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />
      </div>
      <div className="h-6"></div>
    </div>
  );
};

const Profile = () => {
  const { 
    orders, currentUser, loyaltyPoints, login, register, logout, subscription, referrals,
    serviceRequests, appointments, tradeInRequests, returnRequests, walletBalance,
    cancelOrder, cancelAppointment, cancelServiceRequest, submitReturnRequest, updateTradeInStatus,
    savedAddresses, addSavedAddress, deleteSavedAddress,
    formatPrice
  } = useContext(ShopContext);

  const [authMode, setAuthMode] = useState("login"); // login, register
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [referralCodeInput, setReferralCodeInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState("orders"); // orders, services, appointments, tradeins, returns, wallet, addresses, loyalty-card

  // Return Modal State
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState("");
  const [returnReason, setReturnReason] = useState("Design choice / preference");
  const [returnNotes, setReturnNotes] = useState("");
  const [returnModalSuccess, setReturnModalSuccess] = useState(false);

  // Address Form State
  const [addrName, setAddrName] = useState("Home");
  const [addrReceiver, setAddrReceiver] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrDetail, setAddrDetail] = useState("");
  const [addrCityState, setAddrCityState] = useState("");
  const [addrPincode, setAddrPincode] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Check URL query parameters for referral link (e.g., ?ref=CHX-XXXX-XXXX)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get("ref");
    if (refParam) {
      setReferralCodeInput(refParam.startsWith("ref=") ? refParam : `ref=${refParam}`);
      setAuthMode("register");
    }
  }, []);

  const getStatusColor = (status) => {
    if (status === "Delivered" || status === "Approved" || status === "Completed" || status === "Accepted") return "text-emerald-400 bg-emerald-950/25 border-emerald-900/30";
    if (status === "Shipped" || status === "Out for Delivery" || status === "In Repair" || status === "Diagnosing") return "text-blue-400 bg-blue-950/25 border-blue-900/30";
    if (status === "Cancelled" || status === "Rejected") return "text-rose-400 bg-rose-950/25 border-rose-900/30";
    return "text-amber-400 bg-amber-950/25 border-amber-900/30"; // Processing / Pending
  };

  const getLoyaltyTier = (points) => {
    if (points >= 2500) return { name: "Platinum VIP", color: "text-neutral-100 bg-neutral-900 border-neutral-700" };
    if (points >= 1000) return { name: "Gold Circle", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    if (points >= 500) return { name: "Silver Elite", color: "text-neutral-300 bg-neutral-800 border-neutral-700" };
    return { name: "Bronze Club", color: "text-amber-700 bg-amber-700/10 border-amber-700/25" };
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate email format strictly (e.g., must contain a domain extension like .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address (e.g. name@example.com)");
      return;
    }

    if (authMode === "login") {
      const res = login(email, password);
      if (!res.success) setErrorMsg(res.message);
    } else {
      const res = register(name, email, password, referralCodeInput);
      if (!res.success) setErrorMsg(res.message);
    }
  };

  const triggerReturnModal = (orderId) => {
    setReturnOrderId(orderId);
    setReturnReason("Design choice / preference");
    setReturnNotes("");
    setReturnModalSuccess(false);
    setShowReturnModal(true);
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    const orderItem = orders.find(o => o.id === returnOrderId);
    if (!orderItem) return;

    submitReturnRequest({
      orderId: returnOrderId,
      email: currentUser.email,
      reason: returnReason,
      notes: returnNotes,
      items: orderItem.items,
      total: orderItem.total
    });

    setReturnModalSuccess(true);
    setTimeout(() => {
      setShowReturnModal(false);
      setActiveTab("returns");
    }, 2000);
  };

  // If not logged in, show Auth Gate
  if (!currentUser) {
    return (
      <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 flex items-center justify-center font-sans">
        <div className="w-full max-w-md p-8 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col gap-6 text-center">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full w-fit mx-auto">
              <Key size={24} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-bold font-serif text-neutral-200">Chronex Membership</h2>
              <p className="text-xs text-neutral-500">Access exclusive loyalty points and order history</p>
            </div>

            {errorMsg && (
              <span className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs rounded-xl font-bold animate-pulse">
                {errorMsg}
              </span>
            )}

            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 text-left">
              {authMode === "register" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Full Name</label>
                  <input
                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Mehta"
                    className="w-full px-4 py-3 bg-neutral-955 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-700 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Email Address</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. client@chronex.in"
                  className="w-full px-4 py-3 bg-neutral-955 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-700 outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Password</label>
                <input
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-neutral-955 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-700 outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              {authMode === "register" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Referral Code (Optional)</label>
                  <input
                    type="text" value={referralCodeInput} onChange={(e) => setReferralCodeInput(e.target.value)}
                    placeholder="e.g. ref=CHX-GAUR-2932"
                    className="w-full px-4 py-3 bg-neutral-955 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-700 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-amber-500/10"
              >
                {authMode === "login" ? "Login to Profile" : "Register Membership"}
              </button>
            </form>

            <div className="border-t border-neutral-800 pt-4 text-center">
              <button
                onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                className="text-xs text-amber-500 hover:underline font-bold"
              >
                {authMode === "login" ? "New client? Register here" : "Already a member? Login"}
              </button>
            </div>

            <span className="text-[9px] text-neutral-600 italic">
              Note: Typing any valid email like "test@demo.com" automatically signs you in for demo.
            </span>
          </div>
        </div>
      </div>
    );
  }

  const activeTier = getLoyaltyTier(loyaltyPoints);

  // Filter user's specific items
  const userOrders = orders.filter((o) => {
    const customerEmail = (o.customer?.email || o.customerDetails?.email || "").toLowerCase().trim();
    const currentUserEmail = (currentUser?.email || "").toLowerCase().trim();
    return customerEmail === currentUserEmail && currentUserEmail !== "";
  });
  const userServices = serviceRequests.filter(s => s.phone === currentUser.phone || s.name?.toLowerCase() === currentUser.name?.toLowerCase());
  const userAppointments = appointments.filter(a => a.phone === currentUser.phone || a.name?.toLowerCase() === currentUser.name?.toLowerCase());
  const userValuations = tradeInRequests.filter(t => t.email === currentUser.email);
  const userReturns = returnRequests.filter(r => r.email === currentUser.email);

  return (
    <div className="bg-neutral-955 text-neutral-100 min-h-screen pt-32 pb-24 font-sans text-left">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-10">
        
        {/* User Card HUD */}
        <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-900 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex gap-4 items-center">
            <div className="p-4 bg-amber-500/10 text-amber-500 rounded-2xl border border-amber-500/20">
              <User size={32} />
            </div>
            <div className="flex flex-col text-left gap-1">
              <h2 className="text-xl md:text-2xl font-serif font-black text-neutral-100 capitalize">{currentUser.name}</h2>
              <span className="text-xs text-neutral-500">{currentUser.email}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-start sm:items-end text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-neutral-900 pt-4 sm:pt-0">
            <span className="text-[9px] uppercase tracking-widest text-neutral-550 font-bold">Chronex Club points</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-amber-500 font-sans">{loyaltyPoints}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider border ${activeTier.color}`}>
                {activeTier.name}
              </span>
            </div>
            <button 
              onClick={logout}
              className="text-[10px] uppercase font-bold text-neutral-550 hover:text-rose-500 flex items-center gap-1 mt-1 transition-colors"
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </div>

        {/* Business Features Actions Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/referral" className="p-6 rounded-2xl bg-neutral-900 border border-neutral-900 hover:border-amber-500/30 transition-all group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                <Gift size={24} />
              </div>
              <div>
                <h3 className="font-bold text-neutral-200">Refer & Earn</h3>
                <p className="text-xs text-neutral-500">{referrals?.length || 0} Successful Referrals</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-neutral-600 group-hover:text-amber-500 transition-colors" />
          </Link>

          <Link to="/subscription" className="p-6 rounded-2xl bg-neutral-900 border border-neutral-900 hover:border-amber-500/30 transition-all group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                <Package size={24} />
              </div>
              <div>
                <h3 className="font-bold text-neutral-200">Collector's Box</h3>
                <p className="text-xs text-neutral-500">
                  {subscription?.status === 'Active' ? `${subscription.plan} Tier Active` : 'Subscribe for monthly accessories'}
                </p>
              </div>
            </div>
            <ChevronRight size={20} className="text-neutral-600 group-hover:text-amber-500 transition-colors" />
          </Link>
        </div>

        {/* Dashboard Tabs bar */}
        <div className="flex border-b border-neutral-900 overflow-x-auto gap-2 pb-1">
          {[
            { id: "orders", label: "My Orders", count: userOrders.length },
            { id: "services", label: "Service Tickets", count: userServices.length },
            { id: "appointments", label: "Appointments", count: userAppointments.length },
            { id: "tradeins", label: "Trade-In Valuations", count: userValuations.length },
            { id: "returns", label: "Return Tickets", count: userReturns.length },
            { id: "wallet", label: "My Wallet", count: null },
            { id: "addresses", label: "Saved Addresses", count: savedAddresses?.length || 0 },
            { id: "loyalty-card", label: "Loyalty Card", count: null }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 border-b-2 text-xs uppercase tracking-wider font-extrabold whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? "border-amber-500 text-amber-500 bg-amber-500/5" 
                  : "border-transparent text-neutral-450 hover:text-neutral-200"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[9px] text-neutral-400">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: Orders Listing */}
        {activeTab === "orders" && (
          <div className="flex flex-col gap-6">
            {userOrders.length === 0 ? (
              <div className="text-center py-16 bg-neutral-900 rounded-3xl border border-neutral-850">
                <Clock size={36} className="text-neutral-700 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-neutral-300">No orders placed</h3>
                <p className="text-xs text-neutral-550 mt-1 max-w-sm mx-auto leading-relaxed">
                  You haven't simulated any purchases yet. Add watches to your cart and complete mock checkout!
                </p>
              </div>
            ) : (
              userOrders.map((order) => {
                const canCancel = order.orderStatus === "Processing";
                const canReturn = order.orderStatus === "Delivered";
                
                return (
                  <div key={order.id} className="bg-neutral-900 border border-neutral-850 rounded-3xl p-6 md:p-8 flex flex-col gap-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-850 pb-4">
                      <div>
                        <span className="text-[9px] text-neutral-500 uppercase tracking-widest block">Order ID</span>
                        <strong className="text-sm text-neutral-200 font-mono tracking-wide">{order.id}</strong>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 text-xs">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover border border-neutral-800 bg-neutral-950" />
                          <div className="flex-grow min-w-0">
                            <h4 className="font-semibold text-neutral-250 truncate">{item.brand} {item.name}</h4>
                            <span className="text-neutral-500">Qty: {item.quantity} &bull; {formatPrice(item.price)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stepper Timeline for orders */}
                    <div className="border-t border-neutral-850 pt-2">
                      {getOrderTimeline(order.orderStatus)}
                    </div>

                    {/* Total & Action Footer */}
                    <div className="border-t border-neutral-850 pt-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 text-xs">
                      <div className="flex flex-wrap gap-4 text-neutral-500">
                        <span>Paid: <strong className="text-neutral-250">{formatPrice(order.total)}</strong></span>
                        {order.emiPlan && (
                          <span className="text-amber-500 font-mono">EMI Plan Active ({order.emiPlan.months} Mos)</span>
                        )}
                      </div>
                      
                      <div className="flex gap-2.5">
                        <Link to={`/invoice/${order.id}`} target="_blank" className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-750 text-[10px] uppercase font-bold tracking-wider rounded-lg transition-colors text-center">
                          Invoice
                        </Link>
                        {canCancel && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 text-[10px] uppercase font-bold tracking-wider rounded-lg transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                        {canReturn && (
                          <button
                            onClick={() => triggerReturnModal(order.id)}
                            className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/25 text-[10px] uppercase font-bold tracking-wider rounded-lg transition-colors"
                          >
                            Return / Exchange
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: Service Tickets Tracker */}
        {activeTab === "services" && (
          <div className="flex flex-col gap-6">
            {userServices.length === 0 ? (
              <div className="text-center py-16 bg-neutral-900 rounded-3xl border border-neutral-850">
                <Clock size={36} className="text-neutral-700 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-neutral-300">No repair tickets logged</h3>
                <p className="text-xs text-neutral-550 mt-1 max-w-sm mx-auto">
                  Need care for your watch? Lodge a request in our <Link to="/service" className="text-amber-500 underline">Service Lab</Link>!
                </p>
              </div>
            ) : (
              userServices.map(ticket => (
                <div key={ticket.id} className="bg-neutral-900 border border-neutral-850 rounded-3xl p-6 md:p-8 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 block">Ticket ID</span>
                      <strong className="text-sm text-neutral-250 font-mono">{ticket.id}</strong>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider border ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-300 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                    <span><strong>Watch:</strong> {ticket.watchBrand} {ticket.watchModel || ""}</span>
                    <span><strong>Service Needed:</strong> {ticket.serviceType}</span>
                    <span className="sm:col-span-2 text-neutral-450 mt-1"><strong>Issue Description:</strong> "{ticket.issueDescription}"</span>
                  </div>

                  {/* Stepper repair status pipeline */}
                  {ticket.status !== "Cancelled" && (
                    <div className="border-t border-neutral-850 pt-5 mt-2">
                      <div className="flex justify-between items-center relative w-full px-2">
                        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-850 z-0"></div>
                        <div 
                          className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-amber-500 z-0 transition-all duration-500"
                          style={{
                            width: `${
                              (() => {
                                const steps = ["Received", "Diagnosing", "In Repair", "Ready", "Delivered"];
                                const currentIdx = steps.indexOf(ticket.status);
                                return currentIdx >= 0 ? (currentIdx / (steps.length - 1)) * 90 : 0;
                              })()
                            }%`
                          }}
                        ></div>
                        {["Received", "Diagnosing", "In Repair", "Ready", "Delivered"].map((status, index) => {
                          const steps = ["Received", "Diagnosing", "In Repair", "Ready", "Delivered"];
                          const currentIdx = steps.indexOf(ticket.status);
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
                  )}

                  {ticket.status !== "Cancelled" && ticket.status !== "Delivered" && (
                    <div className="border-t border-neutral-850 pt-3 flex justify-end">
                      <button
                        onClick={() => cancelServiceRequest(ticket.id)}
                        className="px-3 py-1 bg-neutral-950 hover:bg-rose-500/10 text-neutral-500 hover:text-rose-500 border border-neutral-850 text-[9px] uppercase tracking-widest font-bold rounded-lg transition-all"
                      >
                        Cancel Ticket
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: Appointments */}
        {activeTab === "appointments" && (
          <div className="flex flex-col gap-6">
            {userAppointments.length === 0 ? (
              <div className="text-center py-16 bg-neutral-900 rounded-3xl border border-neutral-850">
                <Calendar size={36} className="text-neutral-700 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-neutral-300">No showroom bookings logged</h3>
                <p className="text-xs text-neutral-550 mt-1 max-w-sm mx-auto">
                  Book a private viewing slot at our showrooms via the <Link to="/showroom-locator" className="text-amber-500 underline">Showroom Locator</Link>!
                </p>
              </div>
            ) : (
              userAppointments.map(app => (
                <div key={app.id} className="bg-neutral-900 border border-neutral-850 rounded-3xl p-6 md:p-8 flex justify-between items-center gap-6">
                  <div className="flex flex-col gap-1.5 text-xs text-left">
                    <span className="font-mono text-[9px] text-neutral-500">BOOKING ID: {app.id}</span>
                    <h4 className="text-sm font-serif font-bold text-neutral-200">{app.purpose}</h4>
                    <span className="text-neutral-450 mt-0.5"><strong>Date:</strong> {app.date} &bull; <strong>Time:</strong> {app.time}</span>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    {app.status === "Pending" && (
                      <button
                        onClick={() => cancelAppointment(app.id)}
                        className="text-[9px] uppercase font-bold text-neutral-500 hover:text-rose-500 mt-1.5 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: Trade-In Valuations */}
        {activeTab === "tradeins" && (
          <div className="flex flex-col gap-6">
            {userValuations.length === 0 ? (
              <div className="text-center py-16 bg-neutral-900 rounded-3xl border border-neutral-850">
                <RefreshCw size={36} className="text-neutral-700 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-neutral-300">No valuations filed</h3>
                <p className="text-xs text-neutral-550 mt-1 max-w-sm mx-auto">
                  Trade-in your vintage watch to earn credits! Use our <Link to="/trade-in" className="text-amber-500 underline">Trade-in Estimator</Link>.
                </p>
              </div>
            ) : (
              userValuations.map(val => (
                <div key={val.id} className="bg-neutral-900 border border-neutral-850 rounded-3xl p-6 md:p-8 flex flex-col gap-4 text-left text-xs">
                  <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
                    <div>
                      <span className="text-[9px] text-neutral-500 block uppercase">VALUATION REF</span>
                      <strong className="text-sm font-mono text-neutral-250">{val.id}</strong>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold border ${getStatusColor(val.status)}`}>
                      {val.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-350">
                    <span><strong>Watch:</strong> {val.brand} {val.model} ({val.purchaseYear})</span>
                    <span><strong>Condition:</strong> {val.condition} &bull; {val.boxPapers}</span>
                    <span><strong>Estimated Range:</strong> {val.estimatedRange}</span>
                    {val.notes && <span className="sm:col-span-2 text-neutral-500"><strong>Notes:</strong> "{val.notes}"</span>}
                  </div>

                  {val.status === "Counter-Offered" && (
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                      <div>
                        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block">Official Chronex Offer</span>
                        <strong className="text-lg text-neutral-100 font-sans">₹{val.counterOffer.toLocaleString("en-IN")}</strong>
                        <p className="text-[9px] text-neutral-500 leading-normal mt-0.5">Accepting will grant a ₹{val.counterOffer.toLocaleString("en-IN")} discount code + 1000 Loyalty points credit.</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => updateTradeInStatus(val.id, "Rejected")}
                          className="flex-grow sm:flex-none px-4 py-2 border border-neutral-850 text-neutral-400 hover:text-rose-500 hover:border-rose-500/20 text-[10px] uppercase font-bold tracking-widest rounded-lg transition-colors"
                        >
                          Decline Offer
                        </button>
                        <button
                          onClick={() => updateTradeInStatus(val.id, "Accepted")}
                          className="flex-grow sm:flex-none px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[10px] uppercase font-bold tracking-widest rounded-lg transition-colors"
                        >
                          Accept Offer
                        </button>
                      </div>
                    </div>
                  )}

                  {val.status === "Accepted" && (
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl text-emerald-400 font-semibold text-[10px] uppercase tracking-wider">
                      ✓ Offer Accepted! Voucher worth ₹{val.counterOffer?.toLocaleString("en-IN") || "appraised value"} sent to your email. +1000 Loyalty Points credited to wallet!
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 5: Returns */}
        {activeTab === "returns" && (
          <div className="flex flex-col gap-6">
            {userReturns.length === 0 ? (
              <div className="text-center py-16 bg-neutral-900 rounded-3xl border border-neutral-850">
                <Box size={36} className="text-neutral-700 mx-auto mb-3" />
                <h3 className="text-base font-serif font-bold text-neutral-300">No return requests filed</h3>
                <p className="text-xs text-neutral-550 mt-1 max-w-sm mx-auto">
                  You can file return requests on delivered orders under the orders tab within 7 days of shipment.
                </p>
              </div>
            ) : (
              userReturns.map(ret => (
                <div key={ret.id} className="bg-neutral-900 border border-neutral-850 rounded-3xl p-6 md:p-8 flex flex-col gap-4 text-left text-xs">
                  <div className="flex justify-between items-center border-b border-neutral-850 pb-3">
                    <div>
                      <span className="text-[9px] text-neutral-500 block uppercase">RETURN ID</span>
                      <strong className="text-sm font-mono text-neutral-250">{ret.id}</strong>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold border ${getStatusColor(ret.status)}`}>
                      {ret.status}
                    </span>
                  </div>

                  <div className="text-neutral-350 flex flex-col gap-1">
                    <span><strong>Order ID:</strong> {ret.orderId}</span>
                    <span><strong>Reason:</strong> {ret.reason}</span>
                    {ret.notes && <span><strong>Comments:</strong> "{ret.notes}"</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 6: My Wallet */}
        {activeTab === "wallet" && (() => {
          const getNextTierInfo = (pts) => {
            if (pts >= 2500) return { next: "Max Tier", req: 0, percent: 100 };
            if (pts >= 1000) return { next: "Platinum VIP", req: 2500 - pts, percent: Math.round(((pts - 1000) / 1500) * 100) };
            if (pts >= 500) return { next: "Gold Circle", req: 1000 - pts, percent: Math.round(((pts - 500) / 500) * 100) };
            return { next: "Silver Elite", req: 500 - pts, percent: Math.round((pts / 500) * 100) };
          };
          const nextTier = getNextTierInfo(loyaltyPoints);

          return (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 text-left">
              {/* Store Credit card */}
              <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-850 flex flex-col justify-between aspect-video relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Store Credit</span>
                    <p className="text-xs text-neutral-450 mt-0.5">Wallet Balance</p>
                  </div>
                  <Landmark size={24} className="text-emerald-500" />
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">Available Funds</span>
                  <span className="text-3xl font-black text-emerald-500 font-sans">{formatPrice(walletBalance || 0)}</span>
                  <span className="text-[10px] text-neutral-500 block mt-1">Ready to use on your next purchase</span>
                </div>
              </div>
              {/* Loyalty points card */}
              <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-850 flex flex-col justify-between aspect-video relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Chronex VIP Membership</span>
                    <p className="text-xs text-neutral-450 mt-0.5">{activeTier.name}</p>
                  </div>
                  <Award size={24} className="text-amber-500" />
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">Available Points Balance</span>
                  <span className="text-3xl font-black text-amber-500 font-sans">{loyaltyPoints} pts</span>
                  <span className="text-[10px] text-neutral-500 block mt-1">Estimated Value: ₹{(loyaltyPoints * 0.5).toLocaleString("en-IN")} discount credits</span>
                </div>
              </div>

              {/* Gift vouchers card */}
              <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-850 flex flex-col justify-between aspect-video relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Collector Box Credits</span>
                    <p className="text-xs text-neutral-450 mt-0.5">Active Gift Vouchers</p>
                  </div>
                  <CreditCard size={24} className="text-amber-500" />
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">Active Vouchers</span>
                  <span className="text-lg font-bold text-neutral-200">CHRONEXVIP</span>
                  <span className="text-[10px] text-neutral-500 block mt-1">Apply this coupon code at checkout to get flat ₹10,000 off on order size ₹1,00,000+!</span>
                </div>
              </div>

              {/* VIP Tiers Progression Card */}
              <div className="md:col-span-2 p-6 rounded-3xl bg-neutral-900 border border-neutral-850 flex flex-col gap-4 mt-2">
                <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">Chronex Club Tiers & Benefits</h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-neutral-955 rounded-xl border border-neutral-850 text-center">
                    <span className="block font-bold text-amber-700">Bronze Club</span>
                    <span className="text-[10px] text-neutral-500">0 - 499 pts</span>
                    <span className="block text-[9px] text-neutral-600 mt-1">1% Points-Back</span>
                  </div>
                  <div className="p-3 bg-neutral-955 rounded-xl border border-neutral-850 text-center">
                    <span className="block font-bold text-neutral-300">Silver Elite</span>
                    <span className="text-[10px] text-neutral-500">500 - 999 pts</span>
                    <span className="block text-[9px] text-neutral-600 mt-1">Priority Delivery</span>
                  </div>
                  <div className="p-3 bg-neutral-955 rounded-xl border border-neutral-850 text-center">
                    <span className="block font-bold text-amber-500">Gold Circle</span>
                    <span className="text-[10px] text-neutral-500">1000 - 2499 pts</span>
                    <span className="block text-[9px] text-neutral-600 mt-1">Early Releases Access</span>
                  </div>
                  <div className="p-3 bg-neutral-955 rounded-xl border border-neutral-850 text-center text-neutral-100">
                    <span className="block font-bold">Platinum VIP</span>
                    <span className="text-[10px] text-neutral-500">2500+ pts</span>
                    <span className="block text-[9px] text-neutral-600 mt-1">Concierge Service Lab</span>
                  </div>
                </div>

                {loyaltyPoints < 2500 && (
                  <div className="mt-2 bg-neutral-955 p-4 rounded-2xl border border-neutral-850 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400">Next Target: <strong className="text-amber-500">{nextTier.next}</strong></span>
                      <span className="text-neutral-500">Need <strong className="text-neutral-300">{nextTier.req} pts</strong></span>
                    </div>
                    <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-850">
                      <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${nextTier.percent}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* TAB 7: Saved Addresses */}
        {activeTab === "addresses" && (
          <div className="flex flex-col gap-6 text-left">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-serif font-bold text-neutral-100">Saved Addresses</h3>
                <p className="text-xs text-neutral-550 mt-0.5">Manage your shipping destinations for faster checkouts.</p>
              </div>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                {showAddressForm ? "View Addresses" : "Add Address"}
              </button>
            </div>

            {showAddressForm ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!addrReceiver || !addrPhone || !addrDetail || !addrCityState || !addrPincode) return;
                  addSavedAddress({
                    name: addrName,
                    receiverName: addrReceiver,
                    phone: addrPhone,
                    address: addrDetail,
                    cityState: addrCityState,
                    pincode: addrPincode
                  });
                  setAddrReceiver("");
                  setAddrPhone("");
                  setAddrDetail("");
                  setAddrCityState("");
                  setAddrPincode("");
                  setShowAddressForm(false);
                }}
                className="p-6 bg-neutral-900 border border-neutral-850 rounded-3xl flex flex-col gap-4 max-w-xl"
              >
                <h4 className="text-xs font-serif font-bold text-neutral-200 border-b border-neutral-850 pb-2">Add New Delivery Address</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 col-span-2">
                    <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Address Label</label>
                    <select
                      value={addrName} onChange={(e) => setAddrName(e.target.value)}
                      className="bg-neutral-950 border border-neutral-850 rounded-xl py-2 px-3 text-xs text-neutral-300 focus:outline-none"
                    >
                      <option value="Home">Home</option>
                      <option value="Work / Office">Work / Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Receiver's Name</label>
                    <input
                      type="text" required placeholder="e.g. Amit Patel"
                      value={addrReceiver} onChange={(e) => setAddrReceiver(e.target.value)}
                      className="bg-neutral-955 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 placeholder-neutral-750 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Phone Number</label>
                    <input
                      type="text" required placeholder="e.g. +91 83206 06850"
                      value={addrPhone} onChange={(e) => setAddrPhone(e.target.value)}
                      className="bg-neutral-955 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 placeholder-neutral-750 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 col-span-2">
                    <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Street Address</label>
                    <textarea
                      required rows="2" placeholder="e.g. Flat 104, Royal Palms, Alkapuri"
                      value={addrDetail} onChange={(e) => setAddrDetail(e.target.value)}
                      className="bg-neutral-955 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 placeholder-neutral-750 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-neutral-550 uppercase tracking-widest font-bold">City, State</label>
                    <input
                      type="text" required placeholder="e.g. Vadodara, Gujarat"
                      value={addrCityState} onChange={(e) => setAddrCityState(e.target.value)}
                      className="bg-neutral-955 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 placeholder-neutral-750 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-neutral-555 uppercase tracking-widest font-bold">Pincode</label>
                    <input
                      type="text" required placeholder="e.g. 390007"
                      value={addrPincode} onChange={(e) => setAddrPincode(e.target.value)}
                      className="bg-neutral-955 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 placeholder-neutral-755 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all mt-2"
                >
                  Save Address
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedAddresses.length === 0 ? (
                  <div className="text-center py-12 bg-neutral-900 border border-neutral-850 rounded-3xl col-span-2">
                    <p className="text-xs text-neutral-500">No saved addresses found. Please add a shipping address.</p>
                  </div>
                ) : (
                  savedAddresses.map(addr => (
                    <div key={addr.id} className="p-6 bg-neutral-900 border border-neutral-850 rounded-3xl flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1.5 text-xs text-neutral-350">
                        <div className="flex items-center gap-2">
                          <strong className="text-neutral-250">{addr.receiverName}</strong>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[#d4af37] text-[8px] font-bold uppercase tracking-wider">
                            {addr.name}
                          </span>
                        </div>
                        <span>Phone: {addr.phone}</span>
                        <span>{addr.address}</span>
                        <span>{addr.cityState} - {addr.pincode}</span>
                      </div>
                      <button
                        onClick={() => deleteSavedAddress(addr.id)}
                        className="text-[9px] uppercase tracking-widest font-extrabold text-neutral-550 hover:text-rose-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: Loyalty Card (Premium design with QR code) */}
        {activeTab === "loyalty-card" && (
          <div className="flex flex-col items-center gap-8 text-center text-xs">
            <div>
              <h3 className="text-base font-serif font-bold text-neutral-100">Your VIP Membership Card</h3>
              <p className="text-xs text-neutral-550 mt-0.5">Scan this membership details bar at check-in desks at Alkapuri showroom.</p>
            </div>

            {/* Digital Premium Loyalty Card */}
            <div className={`w-[360px] h-[210px] rounded-3xl border relative overflow-hidden flex flex-col justify-between p-6 shadow-2xl transition-all ${
              loyaltyPoints >= 2500 
                ? "bg-gradient-to-br from-neutral-900 via-neutral-955 to-neutral-900 border-neutral-800 text-neutral-100" 
                : loyaltyPoints >= 1000 
                  ? "bg-gradient-to-br from-[#1c1404] via-black to-[#2c1d04] border-[#d4af37]/30 text-[#d4af37]"
                  : loyaltyPoints >= 500
                    ? "bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 border-neutral-700 text-neutral-200"
                    : "bg-gradient-to-br from-[#180a04] via-[#0c0402] to-[#180a04] border-amber-900/30 text-amber-700"
            }`}>
              {/* Subtle light reflect strip */}
              <div className="absolute top-0 left-0 w-full h-[150%] bg-gradient-to-br from-white/5 via-transparent to-transparent -rotate-12 pointer-events-none"></div>

              {/* Logo / Tier */}
              <div className="flex justify-between items-start z-10">
                <div>
                  <h4 className="text-[7px] uppercase tracking-[0.3em] font-black opacity-80">Chronex Watch Club</h4>
                  <span className="text-lg font-serif font-bold tracking-wider leading-none mt-1 block capitalize">{activeTier.name}</span>
                </div>
                <span className="text-xl">♛</span>
              </div>

              {/* Holographic Chip & QR */}
              <div className="flex justify-between items-end z-10">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[7px] uppercase tracking-widest opacity-60">Cardholder</span>
                  <strong className="text-sm font-semibold capitalize tracking-wide text-neutral-250">{currentUser.name}</strong>
                  <span className="text-[9px] font-mono opacity-80 mt-1">MEMBERSHIP ID: CHX-CLUB-{(currentUser.email || "guest").slice(0,4).toUpperCase()}-{loyaltyPoints}</span>
                </div>

                {/* QR Code Container */}
                <div className="bg-white p-1.5 rounded-lg border border-neutral-800/20">
                  <QrCode size={45} strokeWidth={1.5} className="text-neutral-900" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-850 rounded-2xl max-w-sm">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-1">Redeem Rewards In-Store</span>
              <p className="text-[10px] text-neutral-450 leading-relaxed">Present this QR code during billing at Alkapuri showroom to apply your VIP membership credits, get free service prioritizations, or claim custom collection pre-orders.</p>
            </div>
          </div>
        )}
      </div>

      {/* RETURN MODAL OVERLAY */}
      {showReturnModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-md p-8 shadow-2xl relative text-left">
            <h3 className="text-lg font-serif font-bold text-neutral-100">Return / Exchange Request</h3>
            <p className="text-[10px] text-neutral-500 mt-1">Order Identification: <strong className="font-mono text-amber-500">{returnOrderId}</strong></p>

            {returnModalSuccess ? (
              <div className="py-8 text-center text-emerald-400 font-semibold uppercase text-xs animate-pulse">
                ✓ Return Request Submitted Successfully!
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="flex flex-col gap-4 mt-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Reason for return</label>
                  <select
                    value={returnReason} onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-300 focus:outline-none cursor-pointer"
                  >
                    <option value="Design choice / preference" className="bg-neutral-950">Design choice / preference</option>
                    <option value="Size / case diameter fit issue" className="bg-neutral-950">Size / case diameter fit issue</option>
                    <option value="Minor visual defect" className="bg-neutral-950">Minor visual defect</option>
                    <option value="Other comments" className="bg-neutral-950">Other comments</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Additional Comments</label>
                  <textarea
                    required rows="3" placeholder="Describe the reason for returning this timepiece..."
                    value={returnNotes} onChange={(e) => setReturnNotes(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <button type="button" onClick={() => setShowReturnModal(false)} className="flex-1 py-3 border border-neutral-850 text-neutral-400 text-xs font-bold uppercase rounded-xl transition-colors">
                    Close
                  </button>
                  <button type="submit" className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase rounded-xl transition-colors">
                    File Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
