import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { ShoppingBag, Truck, CreditCard, ShieldCheck, CheckCircle2, QrCode, ArrowLeft, Loader2, Landmark, Tag } from "lucide-react";
import RazorpayModal from "../components/RazorpayModal";

const Checkout = () => {
  const { cartItems, products, getCartTotal, placeOrder, coupons, giftCards, loyaltyPoints, currentUser } = useContext(ShopContext);
  const navigate = useNavigate();

  const [usePoints, setUsePoints] = useState(false);
  const [selectedEmi, setSelectedEmi] = useState(() => {
    return JSON.parse(sessionStorage.getItem("chronex_selected_emi") || "null");
  });

  // Coupon / Gift Card inputs and application states
  const [couponInput, setCouponInput] = useState("");
  const [gcInput, setGcInput] = useState("");
  
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [appliedGC, setAppliedGC] = useState(null);
  
  const [couponError, setCouponError] = useState("");
  const [gcError, setGcError] = useState("");
  
  const [couponSuccess, setCouponSuccess] = useState("");
  const [gcSuccess, setGcSuccess] = useState("");

  // Checkout Step: 'shipping' -> 'payment'
  const [step, setStep] = useState("shipping");
  const [showRazorpay, setShowRazorpay] = useState(false);

  // Shipping details state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cityState, setCityState] = useState("");
  const [pincode, setPincode] = useState("");

  // Payment method selection: 'upi' | 'card' | 'netbanking' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Card Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState("");

  // Simulation Overlay States
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("loading"); // 'loading' | 'success'
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  const cartTotal = getCartTotal();

  // Recalculate Totals
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      couponDiscount = cartTotal * (appliedCoupon.value / 100);
    } else {
      couponDiscount = appliedCoupon.value;
    }
  }

  let gcDiscount = 0;
  if (appliedGC) {
    gcDiscount = Math.min(appliedGC.value, cartTotal - couponDiscount);
  }

  let pointsDiscount = 0;
  if (usePoints && loyaltyPoints > 0) {
    const potentialDiscount = loyaltyPoints * 0.5;
    const remainingTotal = cartTotal - couponDiscount - gcDiscount;
    pointsDiscount = Math.min(potentialDiscount, remainingTotal);
  }

  const baseAmount = Math.max(0, cartTotal - couponDiscount - gcDiscount - pointsDiscount);
  const gstAmount = Math.round(baseAmount * 0.18);
  const grandTotal = baseAmount + gstAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const found = coupons.find(c => c.code === code);
    if (!found) {
      setCouponError("Invalid coupon code.");
      setAppliedCoupon(null);
      return;
    }
    if (cartTotal < found.minOrder) {
      setCouponError(`Min order value for this coupon is ₹${found.minOrder.toLocaleString("en-IN")}`);
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(found);
    setCouponSuccess(`Coupon '${code}' applied successfully!`);
  };

  const applyDirectCoupon = (found) => {
    setCouponError("");
    setCouponSuccess("");
    if (cartTotal < found.minOrder) {
      setCouponError(`Min order value for ${found.code} is ₹${found.minOrder.toLocaleString("en-IN")}`);
      setAppliedCoupon(null);
      return;
    }
    setCouponInput(found.code);
    setAppliedCoupon(found);
    setCouponSuccess(`Coupon '${found.code}' applied successfully!`);
  };

  const handleApplyGC = (e) => {
    e.preventDefault();
    setGcError("");
    setGcSuccess("");
    const code = gcInput.trim().toUpperCase();
    if (!code) return;

    const found = giftCards.find(g => g.code === code);
    if (!found) {
      setGcError("Invalid voucher code.");
      setAppliedGC(null);
      return;
    }
    if (found.isRedeemed) {
      setGcError("This voucher has already been redeemed.");
      setAppliedGC(null);
      return;
    }
    setAppliedGC(found);
    setGcSuccess(`Gift voucher applied successfully!`);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep("payment");
  };

  const startPaymentSimulation = (razorpayDetails = null) => {
    if (paymentMethod !== "cod" && !razorpayDetails) {
      setShowRazorpay(true);
      return;
    }

    setIsProcessing(true);
    setProcessingStep("loading");

    setTimeout(() => {
      const fakePaymentId = razorpayDetails?.paymentId || `pay_DEMO_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const fakeTxnId = `txn_DEMO_${Math.floor(100000000 + Math.random() * 900000000)}`;
      const now = new Date();

      const receipt = {
        paymentId: fakePaymentId,
        transactionId: fakeTxnId,
        time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        status: paymentMethod === "cod" ? "Pending (COD)" : "Paid"
      };

      setGeneratedReceipt(receipt);
      setProcessingStep("success");

      const customerDetails = { name, phone, email, address, cityState, pincode };
      const pointsToRedeem = usePoints ? loyaltyPoints : 0;
      const emiVal = paymentMethod === "emi" && selectedEmi ? selectedEmi : null;

      const orderId = placeOrder(
        customerDetails, 
        paymentMethod.toUpperCase(), 
        {
          paymentId: receipt.paymentId,
          transactionId: receipt.transactionId,
          status: receipt.status
        },
        appliedCoupon?.code,
        appliedGC?.code,
        pointsToRedeem,
        emiVal
      );

      sessionStorage.removeItem("chronex_selected_emi");

      setTimeout(() => {
        setIsProcessing(false);
        navigate(`/order-success/${orderId}`);
      }, 2200);
    }, 1500);
  };

  if (cartTotal === 0 && step !== "success") {
    return (
      <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-40 pb-24 flex flex-col items-center justify-center">
        <ShoppingBag size={48} className="text-neutral-800 mb-4" />
        <h2 className="text-xl font-serif font-bold text-neutral-300">Your cart is empty</h2>
        <p className="text-xs text-neutral-500 mt-1 max-w-sm text-center leading-relaxed">
          Add luxury timepieces to your cart first before proceeding to checkout.
        </p>
        <Link
          to="/collections"
          className="mt-6 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  // Vector SVG Fake QR Code Generator
  const FakeQRCode = () => (
    <svg className="w-40 h-40 bg-white p-2 rounded-xl border border-neutral-200 shadow-inner" viewBox="0 0 100 100">
      {/* Outer borders and positioning boxes */}
      <rect x="5" y="5" width="20" height="20" fill="black" />
      <rect x="8" y="8" width="14" height="14" fill="white" />
      <rect x="11" y="11" width="8" height="8" fill="black" />

      <rect x="75" y="5" width="20" height="20" fill="black" />
      <rect x="78" y="8" width="14" height="14" fill="white" />
      <rect x="81" y="81" width="8" height="8" fill="black" /> {/* Typo check: this is for bottom check box */}

      <rect x="5" y="75" width="20" height="20" fill="black" />
      <rect x="8" y="78" width="14" height="14" fill="white" />
      <rect x="11" y="81" width="8" height="8" fill="black" />

      <rect x="75" y="75" width="20" height="20" fill="black" />
      <rect x="78" y="78" width="14" height="14" fill="white" />
      
      {/* Random blocks simulating QR data */}
      <rect x="35" y="10" width="10" height="5" fill="black" />
      <rect x="30" y="25" width="5" height="15" fill="black" />
      <rect x="50" y="5" width="15" height="10" fill="black" />
      <rect x="60" y="20" width="5" height="25" fill="black" />
      <rect x="40" y="40" width="15" height="5" fill="black" />
      <rect x="10" y="40" width="15" height="10" fill="black" />
      <rect x="5" y="60" width="15" height="5" fill="black" />
      
      <rect x="35" y="55" width="25" height="8" fill="black" />
      <rect x="70" y="45" width="8" height="15" fill="black" />
      <rect x="85" y="35" width="10" height="10" fill="black" />
      <rect x="50" y="70" width="10" height="12" fill="black" />
      <rect x="35" y="80" width="15" height="5" fill="black" />
      <rect x="65" y="85" width="5" height="10" fill="black" />
      
      {/* Small center logo block to make it look highly authentic */}
      <rect x="42" y="42" width="16" height="16" fill="black" rx="2" />
      <text x="50" y="52" fill="#d4af37" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="serif">C</text>
    </svg>
  );

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans relative">
      
      {/* Subtle Top Portfolio Banner Notice */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-6 text-center text-[11px] font-semibold text-amber-500 tracking-wider uppercase">
        ⚡ Demo Checkout — No real payment will be processed. This payment flow is for portfolio demonstration purposes only.
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10">
        
        {/* Step Breadcrumb indicator */}
        <div className="mb-8 flex justify-center items-center gap-4 text-xs uppercase tracking-widest font-semibold">
          <span className={step === "shipping" ? "text-amber-500" : "text-neutral-500"}>1. Shipping</span>
          <span className="text-neutral-700">&bull;&bull;&bull;</span>
          <span className={step === "payment" ? "text-amber-500" : "text-neutral-500"}>2. Simulated Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT CONTAINER: SHIPPING OR PAYMENT DETAILS */}
          <div className="lg:col-span-7">
            
            {/* STEP 1: SHIPPING DETAILS FORM */}
            {step === "shipping" && (
              <div className="bg-neutral-900/10 border border-neutral-900 p-8 rounded-3xl shadow-xl">
                <h2 className="text-xl font-serif font-bold text-neutral-200 mb-6 border-b border-neutral-900 pb-3 flex items-center gap-2">
                  <Truck size={18} className="text-amber-500" />
                  <span>Shipping Address</span>
                </h2>

                <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 83206 06850"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Apartment, building, house number, street address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">City / State</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vadodara, Gujarat"
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                      className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">6-Digit Pincode</label>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      placeholder="e.g. 390007"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-3 px-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="sm:col-span-2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowLeft size={16} className="rotate-180" />
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: SIMULATED PAYMENT METHOD CHOICES */}
            {step === "payment" && (
              <div className="bg-neutral-900/10 border border-neutral-900 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8">
                
                {/* Payment Options Menu Tabs */}
                <div className="flex flex-row md:flex-col gap-2 w-full md:w-1/3 shrink-0 overflow-x-auto pb-3 md:pb-0 border-b md:border-b-0 md:border-r border-neutral-900 pr-0 md:pr-4">
                  {[
                    { key: "upi", label: "UPI / QR Pay" },
                    { key: "card", label: "Credit/Debit Card" },
                    { key: "netbanking", label: "Net Banking" },
                    { key: "emi", label: "Easy EMIs" },
                    { key: "cod", label: "Cash on Delivery" }
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setPaymentMethod(option.key)}
                      className={`py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold text-left whitespace-nowrap transition-all ${
                        paymentMethod === option.key
                          ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/5"
                          : "bg-transparent text-neutral-400 hover:text-neutral-250 hover:bg-neutral-900/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-grow">
                  
                  {/* UPI PAY CONTENT */}
                  {paymentMethod === "upi" && (
                    <div className="flex flex-col items-center text-center gap-6">
                      <div className="flex flex-col items-center">
                        <FakeQRCode />
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 mt-2 font-semibold">
                          Demo BHIM UPI QR Code
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400">Scan this QR or send to the demo UPI ID below:</p>
                        <strong className="text-neutral-200 block text-lg font-mono tracking-wider bg-neutral-950 p-3 rounded-xl border border-neutral-900 mt-3 select-all">
                          chronex.demo@upi
                        </strong>
                      </div>
                      
                      <div className="w-full pt-4 border-t border-neutral-900 flex flex-col gap-4">
                        <div className="flex justify-between items-center text-sm text-neutral-300">
                          <span>Payable Amount:</span>
                          <span className="font-bold text-lg text-neutral-100">₹{cartTotal.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setStep("shipping")}
                            className="w-1/2 py-3 bg-neutral-950 border border-neutral-855 text-neutral-400 text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-900 transition-all"
                          >
                            Go Back
                          </button>
                          <button
                            onClick={startPaymentSimulation}
                            className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                          >
                            Simulate Payment
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CREDIT/DEBIT CARD CONTENT */}
                  {paymentMethod === "card" && (
                    <div className="flex flex-col gap-6">
                      {/* Virtual Card Graphic */}
                      <div className="w-full aspect-[1.58/1] max-w-[320px] mx-auto bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-850 rounded-2xl p-6 shadow-2xl relative flex flex-col justify-between text-neutral-300 overflow-hidden font-mono select-none">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full"></div>
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-amber-500 font-bold">CHRONEX BOUTIQUE</span>
                            <span className="text-[7px] text-neutral-500 uppercase tracking-widest mt-0.5">Premium Card</span>
                          </div>
                          <Landmark size={22} className="text-neutral-600" />
                        </div>

                        {/* Card Number display */}
                        <div className="text-base md:text-lg tracking-[0.18em] text-neutral-100 mt-6 truncate">
                          {cardNumber ? cardNumber.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• •••• ••••"}
                        </div>

                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <span className="text-[7px] text-neutral-500 uppercase block tracking-wider">Cardholder</span>
                            <span className="text-xs text-neutral-300 uppercase tracking-wide truncate max-w-[150px] block mt-0.5">
                              {cardName || "YOUR NAME"}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <div>
                              <span className="text-[7px] text-neutral-500 uppercase block tracking-wider">Expiry</span>
                              <span className="text-xs text-neutral-300 block mt-0.5">{cardExpiry || "MM/YY"}</span>
                            </div>
                            <div>
                              <span className="text-[7px] text-neutral-500 uppercase block tracking-wider">CVV</span>
                              <span className="text-xs text-neutral-300 block mt-0.5">{cardCvv || "•••"}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Form Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-[10px] text-neutral-450 uppercase tracking-widest">Card Number</label>
                          <input
                            type="text"
                            maxLength="16"
                            placeholder="Enter 16-digit card number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                            className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-[10px] text-neutral-450 uppercase tracking-widest">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="Name on card"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-neutral-450 uppercase tracking-widest">Expiry Date</label>
                          <input
                            type="text"
                            maxLength="5"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, "");
                              if (val.length > 2) {
                                val = val.substring(0, 2) + "/" + val.substring(2, 4);
                              }
                              setCardExpiry(val);
                            }}
                            className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none text-center"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-neutral-450 uppercase tracking-widest">CVV</label>
                          <input
                            type="password"
                            maxLength="3"
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                            className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none text-center"
                          />
                        </div>
                      </div>

                      <div className="w-full pt-4 border-t border-neutral-900 flex gap-4">
                        <button
                          onClick={() => setStep("shipping")}
                          className="w-1/2 py-3 bg-neutral-950 border border-neutral-855 text-neutral-400 text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-900 transition-all"
                        >
                          Go Back
                        </button>
                        <button
                          onClick={startPaymentSimulation}
                          disabled={cardNumber.length < 12 || !cardName || cardExpiry.length < 5 || cardCvv.length < 3}
                          className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                        >
                          Simulate Payment
                        </button>
                      </div>
                    </div>
                  )}

                  {/* NET BANKING CONTENT */}
                  {paymentMethod === "netbanking" && (
                    <div className="flex flex-col gap-6">
                      <p className="text-sm text-neutral-450 text-center">Select one of the popular Indian retail banks:</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          "SBI (State Bank of India)",
                          "HDFC Bank",
                          "ICICI Bank",
                          "Axis Bank",
                          "Kotak Mahindra Bank"
                        ].map((bank) => (
                          <button
                            key={bank}
                            onClick={() => setSelectedBank(bank)}
                            className={`p-4 rounded-xl border text-left text-xs uppercase font-bold tracking-wide transition-all ${
                              selectedBank === bank
                                ? "border-amber-500 bg-amber-500/5 text-amber-400 shadow-inner"
                                : "border-neutral-900 bg-neutral-950/60 hover:border-neutral-800 text-neutral-300"
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>

                      <div className="w-full pt-4 border-t border-neutral-900 flex gap-4">
                        <button
                          onClick={() => setStep("shipping")}
                          className="w-1/2 py-3 bg-neutral-950 border border-neutral-855 text-neutral-400 text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-900 transition-all"
                        >
                          Go Back
                        </button>
                        <button
                          onClick={startPaymentSimulation}
                          disabled={!selectedBank}
                          className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                        >
                          Simulate Payment
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CASH ON DELIVERY */}
                  {paymentMethod === "emi" && (
                    <div className="flex flex-col gap-5 w-full">
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
                        <Landmark size={20} className="text-amber-500 shrink-0 mt-0.5" />
                        <div className="text-left">
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-neutral-200">Selected EMI Plan</h4>
                          {selectedEmi ? (
                            <p className="text-xs text-neutral-400 mt-1 font-mono">
                              {selectedEmi.bank} &bull; {selectedEmi.months} Months Plan (₹{selectedEmi.amount.toLocaleString("en-IN")}/mo)
                            </p>
                          ) : (
                            <p className="text-xs text-neutral-400 mt-1 font-sans">
                              No EMI plan selected. You can select one on the product page or use standard checkout.
                            </p>
                          )}
                        </div>
                      </div>

                      {selectedEmi ? (
                        <div className="flex flex-col gap-4 text-center">
                          <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-xl">
                            <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Estimated Interest Rate</span>
                            <span className="text-sm font-extrabold text-neutral-350">13% - 15% APR (Calculated by Bank)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => startPaymentSimulation({ paymentId: `pay_EMI_${Math.random().toString(36).substring(2,8).toUpperCase()}` })}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                          >
                            Authorize EMI Purchase
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 border border-dashed border-neutral-800 rounded-xl text-center">
                          <p className="text-xs text-neutral-500 font-sans">Please select an EMI plan from the watch details page to authorize EMI checkout.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="flex flex-col gap-6 text-center py-6">
                      <div className="p-4 bg-neutral-950 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-neutral-900">
                        <Truck size={28} className="text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-base font-serif font-bold text-neutral-200">Cash / Pay on Delivery</h4>
                        <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-2 leading-relaxed font-sans">
                          Pay securely at your doorstep using Cash, UPI QR scanner, or Cards upon receiving the parcel from our insured courier partner.
                        </p>
                      </div>
                      
                      <div className="w-full pt-6 border-t border-neutral-900 flex gap-4">
                        <button
                          onClick={() => setStep("shipping")}
                          className="w-1/2 py-3 bg-neutral-950 border border-neutral-855 text-neutral-400 text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-900 transition-all"
                        >
                          Go Back
                        </button>
                        <button
                          onClick={startPaymentSimulation}
                          className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                        >
                          Confirm COD Order
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>

          {/* RIGHT CONTAINER: INVOICE ORDER SUMMARY */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-32">
            <div className="bg-neutral-900/20 border border-neutral-900 p-8 rounded-3xl">
              <h3 className="text-base font-serif font-bold text-neutral-200 mb-6 border-b border-neutral-950 pb-3 uppercase tracking-wider">
                Order Invoice
              </h3>

              <div className="flex flex-col gap-4 max-h-60 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                {Object.keys(cartItems).map((productId) => {
                  const product = products.find((p) => p.id === productId);
                  if (!product) return null;
                  const qty = cartItems[productId];
                  return (
                    <div key={productId} className="flex justify-between items-center gap-4 text-sm border-b border-neutral-900/50 pb-3">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-neutral-300 truncate">{product.brand} {product.name}</h4>
                        <span className="text-xs text-neutral-500">Qty: {qty} &bull; ₹{product.price.toLocaleString("en-IN")} each</span>
                      </div>
                      <span className="font-semibold text-neutral-200 shrink-0">
                        ₹{(product.price * qty).toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Pricing totals */}
              <div className="flex flex-col gap-3.5 text-sm border-t border-neutral-900 pt-6">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-amber-500 font-semibold">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span>- ₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {gcDiscount > 0 && (
                  <div className="flex justify-between text-amber-500 font-semibold">
                    <span>Gift Card Discount ({appliedGC.code})</span>
                    <span>- ₹{gcDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {pointsDiscount > 0 && (
                  <div className="flex justify-between text-amber-500 font-semibold">
                    <span>Points Discount ({Math.round(pointsDiscount * 2)} Points)</span>
                    <span>- ₹{pointsDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400 items-center">
                  <span className="flex items-center gap-1.5">
                    <Truck size={14} className="text-amber-500" />
                    <span>Insured Pan-India Shipping</span>
                  </span>
                  <span className="text-emerald-400 font-semibold uppercase text-xs">FREE</span>
                </div>
                <div className="flex justify-between text-neutral-400 items-center">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-amber-500" />
                    <span>Transit Insurance</span>
                  </span>
                  <span className="text-emerald-400 font-semibold uppercase text-xs">COMPLIMENTARY</span>
                </div>
                
                <div className="flex justify-between text-neutral-400 items-center mt-1 pt-2 border-t border-neutral-900 border-dashed">
                  <span className="font-semibold">GST (18%)</span>
                  <span className="font-semibold">₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-neutral-100 font-bold text-base border-t border-neutral-900 pt-4 mt-2">
                  <span>Grand Total</span>
                  <span className="font-sans">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              
              {currentUser && loyaltyPoints > 0 && (
                 <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between bg-neutral-950/40 p-4 rounded-xl border border-neutral-900">
                   <div className="flex flex-col gap-0.5 text-left">
                     <span className="text-xs font-semibold text-neutral-300">Redeem Loyalty Points</span>
                     <span className="text-[10px] text-neutral-500">You have {loyaltyPoints} points (Worth ₹{(loyaltyPoints * 0.5).toLocaleString("en-IN")})</span>
                   </div>
                   <input
                     type="checkbox"
                     checked={usePoints}
                     onChange={(e) => setUsePoints(e.target.checked)}
                     className="w-4 h-4 rounded border-neutral-800 text-amber-500 focus:ring-amber-500 cursor-pointer"
                   />
                 </div>
               )}

              {/* Coupon / Voucher inputs */}
              <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col gap-6">

                {/* Best Offers Section */}
                {coupons && coupons.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                      <Tag size={14} /> Best Offers For You
                    </h3>
                    <div className="flex flex-col gap-3">
                      {coupons.map((coupon, idx) => {
                        const isEligible = cartTotal >= coupon.minOrder;
                        const isApplied = appliedCoupon?.code === coupon.code;
                        return (
                          <div key={idx} className={`relative overflow-hidden rounded-xl border ${isApplied ? 'border-amber-500 bg-amber-500/5' : 'border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900'} p-4 transition-colors`}>
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <span className="border border-neutral-700 border-dashed rounded px-2 py-1 text-xs font-mono text-neutral-300 font-bold bg-neutral-950">
                                  {coupon.code}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-emerald-400 font-bold text-sm">
                                  {coupon.type === 'percentage' ? `Save ${coupon.value}%` : `Save ₹${coupon.value.toLocaleString("en-IN")}`}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-end mt-4">
                              <span className="text-[10px] text-neutral-500">
                                {isEligible ? "Yay! You unlocked this offer" : `Add ₹${(coupon.minOrder - cartTotal).toLocaleString("en-IN")} more to unlock`}
                              </span>
                              <button
                                type="button"
                                onClick={() => applyDirectCoupon(coupon)}
                                disabled={!isEligible || isApplied}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  isApplied 
                                    ? "bg-amber-500 text-neutral-950" 
                                    : isEligible 
                                      ? "bg-neutral-800 text-amber-500 hover:bg-neutral-700" 
                                      : "bg-neutral-900 text-neutral-600 cursor-not-allowed"
                                }`}
                              >
                                {isApplied ? "Applied" : "Apply"}
                              </button>
                            </div>
                            {/* Cutout details for ticket look */}
                            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-neutral-950 rounded-full transform -translate-y-1/2 border-r border-neutral-800"></div>
                            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-neutral-950 rounded-full transform -translate-y-1/2 border-l border-neutral-800"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Apply Coupon Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. WELCOME10"
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none flex-grow"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-500 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-rose-500 font-semibold mt-0.5">{couponError}</p>}
                  {couponSuccess && <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">{couponSuccess}</p>}
                </form>

                {/* Gift Card Input */}
                <form onSubmit={handleApplyGC} className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Apply E-Gift Card</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={gcInput}
                      onChange={(e) => setGcInput(e.target.value)}
                      placeholder="e.g. GC-XXXXXX"
                      className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none flex-grow"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-500 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {gcError && <p className="text-[10px] text-rose-500 font-semibold mt-0.5">{gcError}</p>}
                  {gcSuccess && <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">{gcSuccess}</p>}
                </form>
              </div>
            </div>

            <Link
              to="/collections"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-amber-400 transition-colors mx-auto"
            >
              <ArrowLeft size={14} />
              <span>Return to collections</span>
            </Link>
          </div>
        </div>
      </div>

      {/* OVERLAY: PROCESSING SIMULATED PAYMENT */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-sm"></div>
          
          <div className="relative bg-neutral-900 border border-neutral-850 p-10 rounded-3xl w-full max-w-md shadow-2xl text-center flex flex-col items-center">
            {processingStep === "loading" ? (
              <div className="py-8 flex flex-col items-center">
                <Loader2 size={56} className="text-amber-500 animate-spin mb-6" />
                <h3 className="text-xl font-serif font-bold text-neutral-100 tracking-wide">Processing Payment...</h3>
                <p className="text-xs text-neutral-400 mt-2 max-w-[280px] leading-relaxed">
                  Communicating securely with the bank simulator. Please do not refresh the browser page.
                </p>
              </div>
            ) : (
              <div className="py-4 flex flex-col items-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle2 size={40} className="animate-bounce" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutral-100 tracking-wide">Payment Successful</h3>
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold mt-1">Order Authorized</span>
                
                {/* Mock Receipt display */}
                {generatedReceipt && (
                  <div className="w-full mt-8 p-5 rounded-2xl bg-neutral-950 border border-neutral-855 text-left flex flex-col gap-3 font-mono text-[11px] text-neutral-400">
                    <div className="flex justify-between border-b border-neutral-900 pb-2 text-neutral-350 font-bold uppercase tracking-wider">
                      <span>Mock Receipt</span>
                      <span className="text-emerald-400">{generatedReceipt.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span className="text-neutral-200 select-all">{generatedReceipt.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment ID:</span>
                      <span className="text-neutral-200 select-all">{generatedReceipt.paymentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Authorization Time:</span>
                      <span className="text-neutral-200">{generatedReceipt.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total debited:</span>
                      <strong className="text-neutral-100 font-sans text-xs">₹{cartTotal.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                )}
                
                <p className="text-[10px] text-neutral-500 tracking-wide mt-6 uppercase animate-pulse">
                  Saving details & redirecting...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {showRazorpay && (
        <RazorpayModal
          amount={grandTotal}
          orderId={`order_demo_${Math.floor(100000 + Math.random() * 900000)}`}
          onSuccess={(details) => {
            setShowRazorpay(false);
            startPaymentSimulation(details);
          }}
          onClose={() => setShowRazorpay(false)}
        />
      )}
    </div>
  );
};

export default Checkout;
