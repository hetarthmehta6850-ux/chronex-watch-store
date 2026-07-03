import { useState, useEffect } from "react";
import { X, ShieldCheck, CreditCard, Smartphone, Building, Wallet, CheckCircle, RefreshCw } from "lucide-react";

const RazorpayModal = ({ amount, orderId, onSuccess, onClose }) => {
  const [activeTab, setActiveTab] = useState("upi");
  const [step, setStep] = useState("select"); // select, processing, success
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [qrTimer, setQrTimer] = useState(120);

  useEffect(() => {
    if (activeTab === "upi" && step === "select") {
      const interval = setInterval(() => {
        setQrTimer((prev) => (prev > 0 ? prev - 1 : 120));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTab, step]);

  const handlePay = (method) => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        onSuccess({
          gateway: "Razorpay (Simulated)",
          paymentId: `pay_${Math.random().toString(36).substring(2, 16).toUpperCase()}`,
          method,
          time: new Date().toISOString()
        });
      }, 1500);
    }, 2000);
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white text-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans">
        
        {/* Header */}
        <div className="bg-[#0f2c59] text-white p-6 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#a8b8d0]">Razorpay Checkout</span>
            <h3 className="font-extrabold text-lg tracking-wide">Chronex Vadodara</h3>
            <span className="text-xs text-[#a8b8d0]">Order ID: {orderId}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-sm font-bold text-[#a8b8d0]">Amount to Pay</span>
            <span className="text-2xl font-black">₹{amount.toLocaleString("en-IN")}</span>
            <button onClick={onClose} className="absolute top-4 right-4 p-1 text-white/70 hover:text-white rounded-full bg-white/10">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Step: Select / Pay */}
        {step === "select" && (
          <div className="flex grow min-h-75">
            {/* Left Nav */}
            <div className="w-1/3 bg-neutral-50 border-r border-neutral-100 flex flex-col">
              {[
                { id: "upi", label: "UPI / QR", icon: Smartphone },
                { id: "card", label: "Cards", icon: CreditCard },
                { id: "netbanking", label: "Netbanking", icon: Building },
                { id: "wallet", label: "Wallets", icon: Wallet }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`p-4 text-left text-xs font-bold flex items-center gap-2 border-b border-neutral-100 transition-colors ${
                      activeTab === tab.id ? "bg-white text-[#2b6cb0]" : "text-neutral-500 hover:bg-neutral-100"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Pane */}
            <div className="w-2/3 p-6 flex flex-col justify-between">
              {activeTab === "upi" && (
                <div className="flex flex-col items-center justify-center text-center gap-4">
                  <span className="text-xs font-bold text-neutral-500">Scan QR Code to Pay</span>
                  <div className="p-3 bg-neutral-100 border border-neutral-200 rounded-xl relative shadow-inner">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=chronex@upi%26am=${amount}`}
                      alt="Payment QR" 
                      className="w-28 h-28 mix-blend-multiply"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-black text-neutral-700">QR Code expires in {formatTimer(qrTimer)}</span>
                    <button 
                      onClick={() => handlePay("UPI QR")}
                      className="mt-3 px-4 py-2 bg-[#2b6cb0] hover:bg-[#2b5c8f] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle size={14} />
                      Simulate Scanner Success
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "card" && (
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold text-neutral-500">Enter Card details</span>
                  <div className="flex flex-col gap-3">
                    <input 
                      type="text" 
                      maxLength="19"
                      value={cardNumber.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim()}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number (XXXX XXXX XXXX XXXX)" 
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-xs outline-none focus:border-[#2b6cb0]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        maxLength="5"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY" 
                        className="px-3 py-2 border border-neutral-200 rounded-lg text-xs outline-none focus:border-[#2b6cb0]"
                      />
                      <input 
                        type="password" 
                        maxLength="3"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="CVV" 
                        className="px-3 py-2 border border-neutral-200 rounded-lg text-xs outline-none focus:border-[#2b6cb0]"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => handlePay("Credit Card")}
                    disabled={!cardNumber}
                    className="w-full mt-2 py-3 bg-[#2b6cb0] hover:bg-[#2c5282] disabled:bg-neutral-200 disabled:text-neutral-400 text-white text-xs font-extrabold rounded-lg transition-colors"
                  >
                    Pay ₹{amount.toLocaleString("en-IN")}
                  </button>
                </div>
              )}

              {activeTab === "netbanking" && (
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold text-neutral-500">Popular Banks</span>
                  <div className="grid grid-cols-2 gap-2">
                    {["SBI", "HDFC", "ICICI", "Axis"].map((bank) => (
                      <button 
                        key={bank}
                        onClick={() => handlePay(`Netbanking (${bank})`)}
                        className="p-3 border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50 rounded-lg text-xs font-bold text-neutral-700 text-left"
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "wallet" && (
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold text-neutral-500">Select Wallet</span>
                  <div className="flex flex-col gap-2">
                    {["Paytm", "PhonePe Wallet", "Amazon Pay", "Mobikwik"].map((wallet) => (
                      <button 
                        key={wallet}
                        onClick={() => handlePay(`Wallet (${wallet})`)}
                        className="p-3 border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50 rounded-lg text-xs font-bold text-neutral-700 text-left"
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step: Processing */}
        {step === "processing" && (
          <div className="min-h-75 flex flex-col items-center justify-center p-8 text-center gap-4">
            <RefreshCw size={48} className="animate-spin text-[#2b6cb0]" />
            <h4 className="font-extrabold text-neutral-800">Processing Payment...</h4>
            <p className="text-xs text-neutral-500 max-w-xs">
              Communicating with bank. Please do not refresh this page or press back button.
            </p>
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="min-h-75 flex flex-col items-center justify-center p-8 text-center gap-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#48bb78]/10 text-[#48bb78] flex items-center justify-center">
              <CheckCircle size={40} className="fill-[#48bb78] text-white" />
            </div>
            <h4 className="font-black text-lg text-neutral-800">Payment Successful</h4>
            <p className="text-xs text-neutral-500">
              Your transaction was successfully processed. Preparing order parameters...
            </p>
          </div>
        )}

        {/* Footer info bar */}
        <div className="bg-neutral-50 border-t border-neutral-100 p-4 flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 font-semibold">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Secured by Razorpay. 100% Insured Encrypted Safe Channels.</span>
        </div>
      </div>
    </div>
  );
};

export default RazorpayModal;
