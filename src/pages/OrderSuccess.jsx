import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CheckCircle2, ShieldCheck, Truck, ShoppingBag, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { orders } = useContext(ShopContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const foundOrder = orders.find((o) => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId, orders]);

  if (!order) {
    return (
      <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-40 pb-24 flex flex-col items-center justify-center">
        <p className="text-neutral-400">Locating order invoice...</p>
        <Link to="/collections" className="text-amber-500 hover:underline mt-4">Return to Collections</Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Success Header */}
        <div className="text-center flex flex-col items-center mb-12">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
            <CheckCircle2 size={40} className="animate-bounce" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-neutral-100 tracking-wide leading-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-neutral-400 text-sm mt-3">
            Thank you! Your order is authorized under simulated payment.
          </p>
        </div>

        {/* Order Status Stepper Timeline */}
        <div className="bg-neutral-900/20 border border-neutral-900 p-6 md:p-8 rounded-3xl mb-8 flex flex-col gap-6">
          <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-300">Live Delivery Timeline</h3>
          <div className="flex justify-between items-center relative w-full px-2">
            {/* Background Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-800 z-0"></div>
            {/* Active Highlight Line */}
            <div 
              className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-amber-500 z-0 transition-all duration-500"
              style={{
                width: `${
                  (() => {
                    const statuses = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];
                    const currentIdx = statuses.indexOf(order.orderStatus);
                    return currentIdx >= 0 ? (currentIdx / (statuses.length - 1)) * 90 : 0;
                  })()
                }%`
              }}
            ></div>
            
            {["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"].map((status, index) => {
              const statuses = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];
              const currentIdx = statuses.indexOf(order.orderStatus);
              const isCompleted = index <= currentIdx;
              const isActive = index === currentIdx;

              return (
                <div key={status} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted 
                        ? "bg-amber-500 border-amber-500 text-neutral-950 font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
                        : "bg-neutral-950 border-neutral-850 text-neutral-500"
                    } ${isActive ? "scale-110" : ""}`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider mt-2.5 font-bold whitespace-nowrap text-center ${
                    isCompleted ? "text-amber-500" : "text-neutral-550"
                  }`}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Invoice Grid Details */}
        <div className="bg-neutral-900/20 border border-neutral-900 p-8 rounded-3xl shadow-xl flex flex-col gap-8">
          {/* Order ID & Date */}
          <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Order Identification</span>
              <strong className="text-lg text-neutral-200 font-mono tracking-wide">{order.id}</strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Order Date</span>
              <span className="text-sm text-neutral-300">{new Date(order.date).toLocaleDateString("en-IN")}</span>
            </div>
          </div>

          {/* Items Purchased */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-300 mb-4">Purchased Items</h3>
            <div className="flex flex-col gap-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-neutral-900/40 pb-4 last:border-none last:pb-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-950 shrink-0 border border-neutral-850">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-sm text-neutral-200 truncate">{item.brand} {item.name}</h4>
                    <span className="text-xs text-neutral-500">Qty: {item.quantity} &bull; ₹{item.price.toLocaleString("en-IN")} each</span>
                  </div>
                  <span className="font-semibold text-sm text-neutral-300 shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping details */}
          <div className="border-t border-neutral-900 pt-6">
            <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-300 mb-4">Shipping Destination</h3>
            <div className="text-sm text-neutral-400 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong className="text-neutral-300 block">{order.customer.name}</strong>
                <span>{order.customer.address}</span>
                <span className="block">{order.customer.cityState} - {order.customer.pincode}</span>
              </div>
              <div className="flex flex-col md:text-right">
                <span className="block">Mobile: {order.customer.phone}</span>
                <span className="block">Email: {order.customer.email}</span>
                <span className="text-[10px] text-amber-500 uppercase font-semibold tracking-wider mt-2 block">
                  🛡️ Insured Dispatch: Under Preparation
                </span>
              </div>
            </div>
          </div>

          {/* Payment receipt */}
          <div className="border-t border-neutral-900 pt-6">
            <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-300 mb-4">Simulated Payment Receipt</h3>
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-855 flex flex-col gap-3 font-mono text-[11px] text-neutral-400">
              <div className="flex justify-between border-b border-neutral-900 pb-2 text-neutral-350 font-bold uppercase tracking-wider">
                <span>Payment Method: {order.paymentMethod}</span>
                <span className="text-emerald-400">Authorized & Paid</span>
              </div>
              <div className="flex justify-between">
                <span>Demo Payment ID:</span>
                <span className="text-neutral-200 select-all">{order.paymentDetails.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span>Demo Transaction ID:</span>
                <span className="text-neutral-200 select-all">{order.paymentDetails.transactionId}</span>
              </div>
              {order.pointsRedeemed > 0 && (
                <div className="flex justify-between text-rose-400">
                  <span>Loyalty Points Redeemed:</span>
                  <span>-{order.pointsRedeemed} Points (-₹{(order.pointsRedeemed * 0.5).toLocaleString("en-IN")})</span>
                </div>
              )}
              {order.pointsEarned > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Loyalty Points Earned:</span>
                  <span>+{order.pointsEarned} Points</span>
                </div>
              )}
              {order.emiPlan && (
                <div className="flex justify-between text-amber-500 font-bold">
                  <span>EMI Finance Plan:</span>
                  <span>{order.emiPlan.bank} &bull; {order.emiPlan.months} mos (₹{order.emiPlan.amount.toLocaleString("en-IN")}/mo)</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-neutral-900 pt-3 mt-1 font-sans text-neutral-300">
                <span className="text-xs">Paid Grand Total</span>
                <strong className="text-neutral-100 font-extrabold text-base">₹{order.total.toLocaleString("en-IN")}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            to={`/invoice/${order.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-neutral-100 hover:bg-white text-neutral-900 border border-neutral-300 text-xs font-bold uppercase tracking-widest rounded-xl transition-all text-center flex items-center justify-center gap-2"
          >
            <span>View / Download Invoice</span>
          </Link>
          <Link
            to="/profile"
            className="px-8 py-3.5 bg-neutral-900 border border-neutral-850 hover:border-neutral-750 text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all text-center"
          >
            View Order History
          </Link>
          <Link
            to="/collections"
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
