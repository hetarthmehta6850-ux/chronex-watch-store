import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { 
  IndianRupee, ShieldCheck, Box, RefreshCw, Layers, 
  ClipboardList, Check, Plus, Edit3, Trash2, Eye, Key, User, 
  Calendar, Wrench, Package, BarChart3, Building2, Users, Award, TrendingUp, Gift, Search, Mail,
  Scale, MessageSquare, MapPin, Megaphone, Menu, X
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import AnalyticsChart from '../components/AnalyticsChart';

const AdminDashboard = () => {
  const { 
    promoBanner, updatePromoBanner,
    orders, updateOrderStatus, products, addProduct, editProduct, deleteProduct,
    serviceRequests, updateServiceStatus, appointments, updateAppointmentStatus,
    newsletterSubscribers,
    coupons, addCoupon, deleteCoupon, restockAlerts, blogPosts, addBlogPost, deleteBlogPost,
    referrals, corporateInquiries,
    usersList, updateUserLoyaltyPoints, cancelUserSubscription, removeNewsletterSubscriber,
    tradeInRequests, updateTradeInStatus, returnRequests, updateReturnStatus, processRefund, approveReview, rejectReview, updateProductStock,
    showrooms, addShowroom, updateShowroom, deleteShowroom, resetShowrooms,
    warrantyLedger, mintWarrantyCertificate,
    refreshDbData
  } = useContext(ShopContext);

  // 1. Simulated Auth States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('chronex_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // New States for Phase 3 forms
  const [newCoupCode, setNewCoupCode] = useState("");
  const [newCoupType, setNewCoupType] = useState("percentage");
  const [newCoupValue, setNewCoupValue] = useState("");
  const [newCoupMinOrder, setNewCoupMinOrder] = useState("");

  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("Guides");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogImage, setNewBlogImage] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");

  // Showrooms Manager Form States
  const [showroomCity, setShowroomCity] = useState("");
  const [showroomName, setShowroomName] = useState("");
  const [showroomAddress, setShowroomAddress] = useState("");
  const [showroomHours, setShowroomHours] = useState("10:30 AM - 8:30 PM (Daily)");
  const [showroomPhone, setShowroomPhone] = useState("");
  const [showroomEmail, setShowroomEmail] = useState("");
  const [showroomCoordX, setShowroomCoordX] = useState(50);
  const [showroomCoordY, setShowroomCoordY] = useState(50);
  const [editingShowroomId, setEditingShowroomId] = useState(null);

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("chronex_admin_tab") || "overview";
  });

  useEffect(() => {
    localStorage.setItem("chronex_admin_tab", activeTab);
  }, [activeTab]);

  // Force authentication login page on every mount (new tab or fresh load) and default to overview tab
  useEffect(() => {
    sessionStorage.removeItem('chronex_admin_auth');
    setIsAuthenticated(false);
    setActiveTab("overview");
    localStorage.setItem("chronex_admin_tab", "overview");
  }, []);

  // Sync database data on mount and poll every 15 seconds for real-time order updates
  useEffect(() => {
    refreshDbData();
    const interval = setInterval(() => {
      refreshDbData();
    }, 15000);
    return () => clearInterval(interval);
  }, [refreshDbData]);

  // Search & Filter States
  const [prodSearch, setProdSearch] = useState("");
  const [prodBrandFilter, setProdBrandFilter] = useState("All");
  const [prodCatFilter, setProdCatFilter] = useState("All");

  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

  const [customerSearch, setCustomerSearch] = useState("");
  const [referralSearch, setReferralSearch] = useState("");
  const [subscriptionSearch, setSubscriptionSearch] = useState("");
  const [subscriberSearch, setSubscriberSearch] = useState(""); // Newsletter search

  // Admin Logs State
  const [adminLogs, setAdminLogs] = useState(() => {
    const saved = sessionStorage.getItem("chronex_admin_logs");
    return saved ? JSON.parse(saved) : [
      { id: 1, action: "Admin Session Initiated", time: new Date().toLocaleTimeString() }
    ];
  });
  const getStatusColor = (status) => {
    if (status === "Delivered" || status === "Approved" || status === "Completed" || status === "Accepted" || status === "Refunded") return "text-emerald-400 bg-emerald-950/25 border-emerald-900/30";
    if (status === "Shipped" || status === "Out for Delivery" || status === "In Repair" || status === "Diagnosing") return "text-blue-400 bg-blue-950/25 border-blue-900/30";
    if (status === "Processing" || status === "Packed" || status === "Pending" || status === "Scheduled") return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    if (status === "Cancelled" || status === "Rejected") return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    return "text-neutral-400 bg-neutral-900 border-neutral-800";
  };

  const logAdminAction = (action) => {
    const newLog = { id: `log_${adminLogs.length + 1}`, action, time: new Date().toLocaleTimeString() };
    const updated = [newLog, ...adminLogs];
    setAdminLogs(updated);
    sessionStorage.setItem("chronex_admin_logs", JSON.stringify(updated));
  };

  // Phase 4 States
  const [whatsappLogs, setWhatsappLogs] = useState(() => {
    const saved = localStorage.getItem("chronex_whatsapp_logs");
    return saved ? JSON.parse(saved) : [
      { id: 1, recipient: "+91 83206 06850", template: "order_confirmation", time: "2026-06-27 10:12 AM", status: "Read" },
      { id: 2, recipient: "+91 87654 32109", template: "shipping_update", time: "2026-06-27 11:30 AM", status: "Delivered" },
      { id: 3, recipient: "+91 76543 21098", template: "welcome_club", time: "2026-06-27 12:45 PM", status: "Sent" }
    ];
  });
  const [waRecipient, setWaRecipient] = useState("");
  const [waTemplate, setWaTemplate] = useState("order_confirmation");

  const [newSerial, setNewSerial] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newClient, setNewClient] = useState("");

  // 3. Modals and Forms States for Product CRUD
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Product Form Fields
  const [prodName, setProdName] = useState("");
  const [prodBrand, setProdBrand] = useState("Titan");
  const [prodPrice, setProdPrice] = useState("");
  const [prodCategory, setProdCategory] = useState("Men");
  const [prodStyle, setProdStyle] = useState("Luxury");
  const [prodMovement, setProdMovement] = useState("Automatic");
  const [prodDescription, setProdDescription] = useState("");
  const [prodImageUrl, setProdImageUrl] = useState("");
  
  // Product Specs Fields
  const [specMovement, setSpecMovement] = useState("");
  const [specDiameter, setSpecDiameter] = useState("");
  const [specMaterial, setSpecMaterial] = useState("");
  const [specStrap, setSpecStrap] = useState("");
  const [specWater, setSpecWater] = useState("");
  const [specGlass, setSpecGlass] = useState("");
  const [specWarranty, setSpecWarranty] = useState("");
  const [productStock, setProductStock] = useState(10);

  // Toast alerts
  const [successToast, setSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === "admin@chronex.com" && loginPassword === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem('chronex_admin_auth', 'true');
      setLoginError(false);
      setActiveTab("overview");
      localStorage.setItem("chronex_admin_tab", "overview");
    } else {
      setLoginError(true);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    triggerToast(`Order #${orderId} status updated to ${newStatus}`);
    logAdminAction(`Updated Order #${orderId} status to ${newStatus}`);
  };

  const triggerToast = (message) => {
    setToastMessage(message);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2200);
  };

  const handleAddShowroom = (e) => {
    e.preventDefault();
    if (!showroomCity || !showroomName || !showroomAddress) {
      triggerToast("Please fill in City, Name, and Address.");
      return;
    }

    const showroomData = {
      city: showroomCity,
      name: showroomName,
      address: showroomAddress,
      hours: showroomHours,
      phone: showroomPhone,
      email: showroomEmail,
      coords: { x: Number(showroomCoordX), y: Number(showroomCoordY) }
    };

    if (editingShowroomId) {
      updateShowroom(editingShowroomId, showroomData);
      logAdminAction(`Updated showroom boutique: ${showroomName}`);
      triggerToast("Showroom updated successfully!");
      setEditingShowroomId(null);
    } else {
      addShowroom(showroomData);
      logAdminAction(`Added showroom boutique: ${showroomName}`);
      triggerToast("Showroom added successfully!");
    }

    // Reset Form
    setShowroomCity("");
    setShowroomName("");
    setShowroomAddress("");
    setShowroomHours("10:30 AM - 8:30 PM (Daily)");
    setShowroomPhone("");
    setShowroomEmail("");
    setShowroomCoordX(50);
    setShowroomCoordY(50);
  };

  const handleEditShowroom = (showroom) => {
    setEditingShowroomId(showroom.id);
    setShowroomCity(showroom.city);
    setShowroomName(showroom.name);
    setShowroomAddress(showroom.address);
    setShowroomHours(showroom.hours);
    setShowroomPhone(showroom.phone);
    setShowroomEmail(showroom.email);
    setShowroomCoordX(showroom.coords?.x || 50);
    setShowroomCoordY(showroom.coords?.y || 50);
    triggerToast(`Editing ${showroom.name}`);
  };

  // Reset Product Forms
  const resetProductForm = () => {
    setProdName("");
    setProdBrand("Titan");
    setProdPrice("");
    setProdCategory("Men");
    setProdStyle("Luxury");
    setProdMovement("Automatic");
    setProdDescription("");
    setProdImageUrl("");
    
    setSpecMovement("");
    setSpecDiameter("");
    setSpecMaterial("");
    setSpecStrap("");
    setSpecWater("");
    setSpecGlass("");
    setSpecWarranty("");
    setProductStock(10);
  };

  // Handle Add Product Submit
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name: prodName,
      brand: prodBrand,
      price: Number(prodPrice),
      category: prodCategory,
      style: prodStyle,
      movement: prodMovement,
      description: prodDescription,
      imageUrl: prodImageUrl,
      rating: 4.8,
      stock: Number(productStock),
      specs: {
        movement: specMovement || "Japanese Quartz",
        caseDiameter: specDiameter || "40 mm",
        caseMaterial: specMaterial || "Stainless Steel",
        strapMaterial: specStrap || "Leather Strap",
        waterResistance: specWater || "50 meters",
        glass: specGlass || "Mineral Glass",
        warranty: specWarranty || "2 Years Brand Warranty"
      }
    };

    addProduct(productData);
    setShowAddModal(false);
    resetProductForm();
    triggerToast("Timepiece added to inventory successfully!");
    logAdminAction(`Added new timepiece "${productData.brand} ${productData.name}"`);
  };

  // Trigger Edit Modal
  const openEditModal = (product) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdBrand(product.brand);
    setProdPrice(product.price);
    setProdCategory(product.category);
    setProdStyle(product.style);
    setProdMovement(product.movement);
    setProdDescription(product.description);
    setProdImageUrl(product.images[0]);
    
    setSpecMovement(product.specs.movement);
    setSpecDiameter(product.specs.caseDiameter);
    setSpecMaterial(product.specs.caseMaterial || "Stainless Steel");
    setSpecStrap(product.specs.strapMaterial);
    setSpecWater(product.specs.waterResistance);
    setSpecGlass(product.specs.glass);
    setSpecWarranty(product.specs.warranty);
    setProductStock(product.stock !== undefined ? product.stock : 10);
    
    setShowEditModal(true);
  };

  // Handle Edit Product Submit
  const handleEditProductSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name: prodName,
      brand: prodBrand,
      price: Number(prodPrice),
      category: prodCategory,
      style: prodStyle,
      movement: prodMovement,
      description: prodDescription,
      images: [prodImageUrl],
      stock: Number(productStock),
      specs: {
        movement: specMovement,
        caseDiameter: specDiameter,
        caseMaterial: specMaterial,
        strapMaterial: specStrap,
        waterResistance: specWater,
        glass: specGlass,
        warranty: specWarranty
      }
    };

    editProduct(editingProductId, updatedData);
    setShowEditModal(false);
    resetProductForm();
    triggerToast("Timepiece details modified successfully!");
    logAdminAction(`Modified timepiece "${updatedData.brand} ${updatedData.name}"`);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this watch from the collections?")) {
      deleteProduct(productId);
      triggerToast("Timepiece deleted from inventory.");
      logAdminAction(`Deleted timepiece (ID: ${productId})`);
    }
  };

  const handleResetDatabase = () => {
    if (window.confirm("Warning: This will delete all mock orders, service tickets, and appointments from local storage. Proceed?")) {
      localStorage.removeItem("chronex_orders");
      localStorage.removeItem("chronex_services");
      localStorage.removeItem("chronex_appointments");
      logAdminAction("Database reset performed");
      window.location.reload();
    }
  };

  // Calculate Overview Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const activePipelines = orders.filter((o) => o.orderStatus !== "Delivered").length;
  const totalServices = serviceRequests.length;
  const activeServices = serviceRequests.filter((s) => s.status !== "Delivered").length;
  const totalAppointments = appointments.length;

  // Dynamic brand distribution for SVG Donut Chart
  const brandCounts = products.reduce((acc, p) => {
    acc[p.brand] = (acc[p.brand] || 0) + 1;
    return acc;
  }, {});
  
  const totalProducts = products.length;
  const brandStats = Object.entries(brandCounts)
    .map(([name, count]) => ({ name, count, percentage: Math.round((count / (totalProducts || 1)) * 100) }))
    .sort((a, b) => b.count - a.count);

  const r = 36;
  const circ = 2 * Math.PI * r; // ~226.2
  
  const donutSegments = brandStats.reduce((acc, brand, idx) => {
    if (idx < 5) {
      const percentage = (brand.count / (totalProducts || 1)) * 100;
      const strokeLength = (brand.count / (totalProducts || 1)) * circ;
      const currentAccumulated = acc.reduce((sum, item) => sum + item.originalPercentage, 0);
      const strokeOffset = circ - ((currentAccumulated / 100) * circ);
      
      const colors = ["#d4af37", "#a1a1aa", "#3b82f6", "#10b981", "#f43f5e"];
      
      acc.push({
        ...brand,
        originalPercentage: percentage,
        strokeLength,
        strokeOffset,
        color: colors[idx % colors.length]
      });
    } else if (idx === 5) {
      const otherCount = brandStats.slice(5).reduce((sum, b) => sum + b.count, 0);
      const otherPercentage = (otherCount / (totalProducts || 1)) * 100;
      const strokeLength = (otherCount / (totalProducts || 1)) * circ;
      const currentAccumulated = acc.reduce((sum, item) => sum + item.originalPercentage, 0);
      const strokeOffset = circ - ((currentAccumulated / 100) * circ);
      
      acc.push({
        name: "Others",
        count: otherCount,
        percentage: Math.round(otherPercentage),
        originalPercentage: otherPercentage,
        strokeLength,
        strokeOffset,
        color: "#52525b" // Zinc-600
      });
    }
    return acc;
  }, []);

  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const fulfillmentRate = totalOrders > 0 ? Math.round((orders.filter(o => o.orderStatus === "Delivered").length / totalOrders) * 100) : 0;
  const confirmedAppointments = appointments.filter(a => a.status === "Confirmed" || a.status === "Completed").length;

  const getOrderStatusColor = (status) => {
    if (status === "Delivered") return "text-emerald-400 bg-emerald-950/25 border-emerald-900/30";
    if (status === "Out for Delivery") return "text-indigo-400 bg-indigo-950/25 border-indigo-900/30";
    if (status === "Shipped") return "text-blue-400 bg-blue-950/25 border-blue-900/30";
    if (status === "Packed") return "text-purple-400 bg-purple-950/25 border-purple-900/30";
    return "text-amber-400 bg-amber-950/25 border-amber-900/30";
  };

  const getServiceStatusColor = (status) => {
    if (status === "Delivered") return "text-emerald-400 bg-emerald-950/25 border-emerald-900/30";
    if (status === "Ready") return "text-teal-400 bg-teal-950/25 border-teal-900/30";
    if (status === "In Repair") return "text-amber-400 bg-amber-950/25 border-amber-900/30";
    return "text-neutral-400 bg-neutral-900/45 border-neutral-800"; // Received / Diagnosing
  };

  const getBkgStatusColor = (status) => {
    if (status === "Completed") return "text-emerald-400 bg-emerald-950/25 border-emerald-900/30";
    if (status === "Confirmed") return "text-blue-400 bg-blue-950/25 border-blue-900/30";
    return "text-amber-400 bg-amber-950/25 border-amber-900/30"; // Pending
  };

  // Simulated Login Stage
  if (!isAuthenticated) {
    return (
      <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-12 pb-24 flex items-center justify-center font-sans">
        <div className="w-full max-w-md p-8 bg-neutral-900/20 border border-neutral-900 rounded-3xl shadow-2xl relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-4 bg-amber-500 text-neutral-950 rounded-full shadow-lg">
            <Key size={32} />
          </div>
          
          <div className="text-center mt-6 mb-8">
            <h2 className="text-2xl font-serif font-bold text-neutral-100">Boutique Console</h2>
            <p className="text-xs text-neutral-500 mt-2">Enter credentials to unlock the administrative dashboards.</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold text-center">
              Invalid credentials. Please review the demo details below.
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-neutral-450">Admin Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@chronex.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 pl-11 text-sm text-neutral-100 placeholder-neutral-750 focus:outline-none"
                />
                <User size={16} className="absolute left-4 top-3.5 text-neutral-600" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-neutral-455">Secure Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-3 px-4 pl-11 text-sm text-neutral-100 placeholder-neutral-750 focus:outline-none"
                />
                <Key size={16} className="absolute left-4 top-3.5 text-neutral-600" />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10"
            >
              Unlock Console
            </button>
          </form>

          {/* Demo details helper card */}
          <div className="mt-8 pt-6 border-t border-neutral-900 text-left">
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block mb-2">💡 Demo Credentials</span>
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-855 text-[11px] text-neutral-400 flex flex-col gap-1 font-mono">
              <div>Email: <strong className="text-neutral-200 select-all">admin@chronex.com</strong></div>
              <div>Password: <strong className="text-neutral-200 select-all">admin123</strong></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-12 pb-24 font-sans relative">
      
      {/* Global Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 border border-emerald-500 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-white text-xs font-bold uppercase tracking-wider">
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Dashboard Header */}
        <div className="mb-10 border-b border-neutral-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
              Chronex Control Console
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
              Showroom Command Center
            </h1>
            <p className="text-neutral-500 text-sm mt-3">
              Fulfill sales, update timepiece inventory, schedule consultations, and log repair tickets.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleResetDatabase}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-400 hover:text-rose-500 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={12} />
              <span>Reset database</span>
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem('chronex_admin_auth');
              }}
              className="px-4 py-2 bg-rose-950/15 hover:bg-rose-950/30 border border-rose-900/40 text-rose-400 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              Lock Console
            </button>
          </div>
        </div>

        {/* Dashboard Frame (Sidebar Menu + Tab Workspace) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Mobile Sidebar Toggle Header */}
          <div className="lg:hidden w-full flex justify-between items-center bg-neutral-900 p-4 rounded-xl border border-neutral-800 mb-2">
            <span className="font-serif font-bold text-amber-500 text-sm tracking-widest uppercase">Admin Menu</span>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-neutral-950 rounded-lg text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-colors shadow-lg"
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Sidebar Overlay for Mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/80 z-[100] lg:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar controls */}
          <aside className={`fixed lg:relative top-0 left-0 h-screen lg:h-auto z-[110] lg:z-auto w-[280px] lg:w-1/4 bg-neutral-950 lg:bg-transparent flex flex-col gap-2 border-r border-neutral-800 lg:border-neutral-900 p-6 lg:p-0 pr-6 lg:pr-6 shrink-0 transition-transform duration-300 ease-in-out overflow-y-auto pb-20 lg:pb-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
            
            <div className="flex justify-between items-center lg:hidden mb-6 shrink-0">
              <span className="font-serif font-bold text-amber-500 tracking-widest text-lg">CONSOLE</span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-200"
              >
                <X size={20} />
              </button>
            </div>
            {[
              { key: "overview", label: "Overview & Analytics", icon: <BarChart3 size={16} /> },
              { key: "reports", label: "Sales Reports", icon: <TrendingUp size={16} className="text-amber-500" /> },
              { key: "products", label: "Product Inventory", icon: <Package size={16} /> },
              { key: "orders", label: "Customer Orders", icon: <ClipboardList size={16} /> },
              { key: "returns", label: "Returns & Exchanges", icon: <Box size={16} className="text-rose-500" /> },
              { key: "customers", label: "Customer Accounts", icon: <Users size={16} className="text-amber-500" /> },
              { key: "subscriptions", label: "Subscriptions", icon: <Gift size={16} className="text-emerald-500" /> },
              { key: "referrals", label: "Referral Manager", icon: <Award size={16} className="text-amber-500" /> },
              { key: "tradeins", label: "Trade-In Appraisal", icon: <Scale size={16} className="text-amber-500" /> },
              { key: "services", label: "Service Tickets", icon: <Wrench size={16} /> },
              { key: "appointments", label: "Showroom Bookings", icon: <Calendar size={16} /> },
              { key: "showrooms", label: "Showrooms Locator", icon: <MapPin size={16} className="text-amber-500" /> },
              { key: "moderation", label: "Review Moderation", icon: <MessageSquare size={16} className="text-emerald-500" /> },
              { key: "coupons", label: "Coupon Codes", icon: <Key size={16} /> },
              { key: "restocks", label: "Restock Alerts", icon: <RefreshCw size={16} /> },
              { key: "blogs", label: "Magazine Editor", icon: <Edit3 size={16} /> },
              { key: "whatsapp", label: "WhatsApp Alerts", icon: <RefreshCw size={16} className="text-emerald-500" /> },
              { key: "warranty", label: "Warranty Ledger", icon: <ShieldCheck size={16} className="text-amber-500" /> },
              { key: "corporate", label: "Corporate Leads", icon: <Building2 size={16} className="text-amber-500" /> },
              { key: "newsletter", label: "Newsletter List", icon: <Mail size={16} /> },
              { key: "promo", label: "Promo Banner", icon: <Megaphone size={16} className="text-amber-500" /> }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setIsSidebarOpen(false);
                }}
                className={`py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold text-left flex items-center gap-3 whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? "bg-amber-500 text-neutral-950 font-extrabold"
                    : "bg-transparent text-neutral-400 hover:text-neutral-250 hover:bg-neutral-900/30"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </aside>

          {/* Main workspace */}
          <main className="flex-grow w-full overflow-hidden">
            
            {/* TAB 1: OVERVIEW & ANALYTICS */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-10">
                {/* Metrics row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  <div className="p-5 rounded-2xl bg-neutral-900/20 border border-neutral-900 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Total Revenue</span>
                      <h4 className="text-xl font-extrabold mt-1 text-neutral-150">₹{totalRevenue.toLocaleString("en-IN")}</h4>
                    </div>
                    <IndianRupee size={18} className="text-amber-500" />
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-neutral-900/20 border border-neutral-900 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Sales Orders</span>
                      <h4 className="text-xl font-extrabold mt-1 text-neutral-150">{totalOrders}</h4>
                    </div>
                    <ClipboardList size={18} className="text-amber-500" />
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-900/20 border border-neutral-900 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Repair Tickets</span>
                      <h4 className="text-xl font-extrabold mt-1 text-neutral-150">{totalServices}</h4>
                    </div>
                    <Wrench size={18} className="text-amber-500" />
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-900/20 border border-neutral-900 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Consultations</span>
                      <h4 className="text-xl font-extrabold mt-1 text-neutral-150">{totalAppointments}</h4>
                    </div>
                    <Calendar size={18} className="text-amber-500" />
                  </div>
                </div>

                {/* Advanced Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Horological Brand Inventory Share Donut Chart */}
                  <div className="p-8 rounded-3xl bg-neutral-900/20 border border-neutral-900 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold tracking-widest uppercase text-neutral-300 mb-2 flex items-center gap-2">
                        <Layers size={16} className="text-amber-500" />
                        <span>Inventory Share by Brand</span>
                      </h3>
                      <p className="text-[11px] text-neutral-500 mb-6 font-sans">Visual breakdown of luxury and heritage watch brand model representation in the showroom.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                      {/* SVG Donut */}
                      <div className="relative w-36 h-36 shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={donutSegments.map(s => ({ name: s.name, value: s.percentage, color: s.color }))}
                              cx="50%"
                              cy="50%"
                              innerRadius={46}
                              outerRadius={66}
                              paddingAngle={3}
                              dataKey="value"
                              stroke="none"
                            >
                              {donutSegments.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => [`${value}%`, 'Share']}
                              contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '12px', fontSize: '12px' }} 
                              itemStyle={{ color: '#d4af37' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-2xl font-extrabold text-neutral-100 font-sans">{totalProducts}</span>
                          <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-sans">Models</span>
                        </div>
                      </div>

                      {/* Legend Grid */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-neutral-450 flex-grow">
                        {donutSegments.map((seg) => (
                          <div key={seg.name} className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }}></span>
                            <span className="truncate font-medium text-neutral-300 max-w-[80px] font-sans">{seg.name}</span>
                            <span className="font-mono text-[10px] text-neutral-500 ml-auto">{seg.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Monthly Revenue Chart */}
                  <div className="p-8 rounded-3xl bg-neutral-900/20 border border-neutral-900 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold tracking-widest uppercase text-neutral-300 mb-2 flex items-center gap-2">
                        <BarChart3 size={16} className="text-amber-500" />
                        <span>Monthly Revenue Performance</span>
                      </h3>
                      <p className="text-[11px] text-neutral-500 mb-6 font-sans">Revenue generated over the last 6 months (SVG native chart).</p>
                    </div>
                    
                    <div className="flex flex-col gap-3 h-56 pt-4">
                      <AnalyticsChart 
                        data={[
                          { label: "Jan", value: 1250000 },
                          { label: "Feb", value: 1800000 },
                          { label: "Mar", value: 950000 },
                          { label: "Apr", value: 2400000 },
                          { label: "May", value: 2100000 },
                          { label: "Jun", value: totalRevenue }
                        ]}
                        height={200}
                      />
                    </div>
                  </div>
                </div>

                {/* Horological Analytics KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Avg. Order Value</span>
                    <h4 className="text-2xl font-sans font-extrabold text-neutral-200">₹{averageOrderValue.toLocaleString("en-IN")}</h4>
                    <p className="text-[10px] text-neutral-500 font-sans">Calculated across all successful portfolio checkouts.</p>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Fulfillment Rate</span>
                    <h4 className="text-2xl font-sans font-extrabold text-neutral-200">{fulfillmentRate}%</h4>
                    <p className="text-[10px] text-neutral-500 font-sans">{orders.filter(o => o.orderStatus === "Delivered").length} of {totalOrders} shipments successfully delivered.</p>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Consultation Rate</span>
                    <h4 className="text-2xl font-sans font-extrabold text-neutral-200">{totalAppointments > 0 ? Math.round((confirmedAppointments / totalAppointments) * 100) : 0}%</h4>
                    <p className="text-[10px] text-neutral-500 font-sans">{confirmedAppointments} of {totalAppointments} showroom visits confirmed/completed.</p>
                  </div>
                </div>

                {/* Engagement & Business KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Newsletter Subs</span>
                    <h4 className="text-2xl font-sans font-extrabold text-neutral-200">{newsletterSubscribers?.length || 0}</h4>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Low Stock Alerts</span>
                    <h4 className="text-2xl font-sans font-extrabold text-rose-500">{restockAlerts?.length || 0}</h4>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Total Referrals</span>
                    <h4 className="text-2xl font-sans font-extrabold text-emerald-400">{referrals?.length || 0}</h4>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Corporate Leads</span>
                    <h4 className="text-2xl font-sans font-extrabold text-amber-500">{corporateInquiries?.length || 0}</h4>
                  </div>
                </div>

                {/* Admin Audit Logs Widget */}
                <div className="bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl mt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-4 border-b border-neutral-900 pb-2">Admin Session Audit Trail</h3>
                  <div className="max-h-48 overflow-y-auto custom-scrollbar flex flex-col gap-2">
                    {adminLogs.map((log) => (
                      <div key={log.id} className="flex justify-between items-center text-xs text-neutral-400 bg-neutral-950/40 p-2.5 rounded-xl border border-neutral-900 font-mono">
                        <span>{log.action}</span>
                        <span className="text-[10px] text-neutral-600 shrink-0">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCT INVENTORY (CRUD) */}
            {activeTab === "products" && (() => {
              const uniqueBrands = ["All", ...new Set(products.map((p) => p.brand))];
              const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];
              const filteredProducts = products.filter((prod) => {
                const matchesSearch = prod.name.toLowerCase().includes(prodSearch.toLowerCase()) || 
                                      prod.brand.toLowerCase().includes(prodSearch.toLowerCase()) ||
                                      prod.id.toLowerCase().includes(prodSearch.toLowerCase());
                const matchesBrand = prodBrandFilter === "All" || prod.brand === prodBrandFilter;
                const matchesCat = prodCatFilter === "All" || prod.category === prodCatFilter;
                return matchesSearch && matchesBrand && matchesCat;
              });

              return (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">
                        Watch Inventory ({filteredProducts.length} filtered / {products.length} total)
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1">Manage timepiece listings and specifications.</p>
                    </div>
                    <button
                      onClick={() => {
                        resetProductForm();
                        setShowAddModal(true);
                      }}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-1.5 self-start md:self-auto"
                    >
                      <Plus size={14} />
                      <span>Add Timepiece</span>
                    </button>
                  </div>

                  {/* Search and Filters bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-neutral-900/10 border border-neutral-900 rounded-2xl">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search by name, brand, ID..." 
                        value={prodSearch}
                        onChange={(e) => setProdSearch(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 pl-9 text-xs text-neutral-150 placeholder-neutral-700 focus:outline-none"
                      />
                      <Search size={14} className="absolute left-3 top-2.5 text-neutral-600" />
                    </div>
                    <div>
                      <select
                        value={prodBrandFilter}
                        onChange={(e) => setProdBrandFilter(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-850 rounded-xl py-2 px-3 text-xs text-neutral-300 focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Brands</option>
                        {uniqueBrands.filter(b => b !== "All").map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        value={prodCatFilter}
                        onChange={(e) => setProdCatFilter(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-850 rounded-xl py-2 px-3 text-xs text-neutral-300 focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Categories</option>
                        {uniqueCategories.filter(c => c !== "All").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Products Grid Table */}
                  <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-16">
                        <Package size={40} className="text-neutral-800 mx-auto mb-4" />
                        <h4 className="text-sm font-bold text-neutral-400">No timepieces match your criteria</h4>
                      </div>
                    ) : (
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                          <thead>
                            <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                              <th className="p-4">Watch Model</th>
                              <th className="p-4">Brand</th>
                              <th className="p-4">Price</th>
                              <th className="p-4">Category</th>
                              <th className="p-4">Style</th>
                              <th className="p-4">Movement</th>
                              <th className="p-4">Stock</th>
                              <th className="p-4 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-900 text-neutral-350">
                            {filteredProducts.map((prod) => (
                              <tr key={prod.id} className="hover:bg-neutral-900/20 transition-colors">
                                <td className="p-4 flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-950 shrink-0 border border-neutral-850">
                                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="font-semibold text-neutral-200 block truncate max-w-[150px]">{prod.name}</span>
                                    <span className="text-[9px] text-neutral-500 font-mono block mt-0.5">{prod.id}</span>
                                  </div>
                                </td>
                                <td className="p-4 font-semibold text-neutral-300">{prod.brand}</td>
                                <td className="p-4 font-sans font-bold text-neutral-100">₹{prod.price.toLocaleString("en-IN")}</td>
                                <td className="p-4">{prod.category}</td>
                                <td className="p-4">{prod.style}</td>
                                <td className="p-4">{prod.movement}</td>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        updateProductStock(prod.id, -1);
                                        logAdminAction(`Decremented stock for ${prod.name}`);
                                      }}
                                      className="w-6 h-6 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 text-[10px] font-bold"
                                    >
                                      -
                                    </button>
                                    <span className={`w-8 text-center font-bold font-mono ${prod.stock === 0 ? "text-rose-500" : prod.stock <= 3 ? "text-amber-500 animate-pulse" : "text-emerald-400"}`}>
                                      {prod.stock !== undefined ? prod.stock : 10}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        updateProductStock(prod.id, 1);
                                        logAdminAction(`Incremented stock for ${prod.name}`);
                                      }}
                                      className="w-6 h-6 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 text-[10px] font-bold"
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex justify-center items-center gap-3">
                                    <button
                                      onClick={() => openEditModal(prod)}
                                      className="p-2 text-neutral-500 hover:text-amber-500 hover:bg-neutral-900 rounded-lg transition-colors"
                                      title="Edit details"
                                    >
                                      <Edit3 size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(prod.id)}
                                      className="p-2 text-neutral-500 hover:text-rose-500 hover:bg-neutral-900 rounded-lg transition-colors"
                                      title="Delete watch"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* TAB 3: CUSTOMER ORDERS */}
            {activeTab === "orders" && (() => {
              const filteredOrders = orders.filter((order) => {
                const customerName = order.customer?.name || "Guest User";
                const customerEmail = order.customer?.email || "";
                const matchesSearch = order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                                      customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
                                      customerEmail.toLowerCase().includes(orderSearch.toLowerCase());
                const matchesStatus = orderStatusFilter === "All" || order.orderStatus === orderStatusFilter;
                return matchesSearch && matchesStatus;
              });

              return (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">
                      Customer Orders ({filteredOrders.length} filtered / {orders.length} total)
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1">Monitor, fulfill, and print invoices for client orders.</p>
                  </div>

                  {/* Search and Filters bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-900/10 border border-neutral-900 rounded-2xl">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search by Order ID, Customer Name, Email..." 
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 pl-9 text-xs text-neutral-150 placeholder-neutral-700 focus:outline-none"
                      />
                      <Search size={14} className="absolute left-3 top-2.5 text-neutral-600" />
                    </div>
                    <div>
                      <select
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-850 rounded-xl py-2 px-3 text-xs text-neutral-300 focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Processing">Processing</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-20">
                        <ClipboardList size={40} className="text-neutral-800 mx-auto mb-4" />
                        <h4 className="text-sm font-bold text-neutral-400">No orders match your criteria</h4>
                      </div>
                    ) : (
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                          <thead>
                            <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                              <th className="p-4">Order ID</th>
                              <th className="p-4">Date</th>
                              <th className="p-4">Customer</th>
                              <th className="p-4">Items</th>
                              <th className="p-4">Total</th>
                              <th className="p-4">Payment</th>
                              <th className="p-4">Fulfillment Pipeline</th>
                              <th className="p-4 text-center">Invoice</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-900 text-neutral-350">
                            {filteredOrders.map((order) => (
                              <tr key={order.id} className="hover:bg-neutral-900/20 transition-colors">
                                <td className="p-4 font-mono font-bold text-neutral-100">{order.id}</td>
                                <td className="p-4 whitespace-nowrap text-neutral-400">
                                  <span>{new Date(order.date).toLocaleDateString("en-IN")}</span>
                                </td>
                                <td className="p-4">
                                  <strong className="text-neutral-200 block">{order.customer?.name || "Guest User"}</strong>
                                  <span className="text-[10px] text-neutral-500 block font-sans">{order.customer?.phone || "N/A"}</span>
                                </td>
                                <td className="p-4 font-sans">
                                  <div className="flex flex-col gap-0.5">
                                    {order.items.map((it) => (
                                      <span key={it.id} className="truncate max-w-[140px] block text-neutral-400">
                                        {it.brand} {it.name} <strong>x{it.quantity}</strong>
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="p-4 font-sans font-bold text-neutral-100">₹{order.total.toLocaleString("en-IN")}</td>
                                <td className="p-4 font-mono text-[10px] leading-normal">
                                  <div className="p-2 rounded bg-neutral-950 border border-neutral-900 max-w-[180px]">
                                    <span>{order.paymentMethod || "UPI"} &bull; <strong className="text-emerald-400 font-sans">Paid</strong></span>
                                    <span className="block mt-1 text-[9px] text-neutral-500 truncate">P-ID: {order.paymentDetails?.paymentId || "DEMO-PAY"}</span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <select
                                    value={order.orderStatus}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider focus:outline-none cursor-pointer ${getOrderStatusColor(
                                      order.orderStatus
                                    )}`}
                                  >
                                    <option value="Processing" className="bg-neutral-900">Processing</option>
                                    <option value="Packed" className="bg-neutral-900">Packed</option>
                                    <option value="Shipped" className="bg-neutral-900">Shipped</option>
                                    <option value="Out for Delivery" className="bg-neutral-900">Out for Delivery</option>
                                    <option value="Delivered" className="bg-neutral-900">Delivered</option>
                                  </select>
                                </td>
                                <td className="p-4 text-center">
                                  <Link
                                    to={`/invoice/${order.id}?from=admin`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex p-2 text-neutral-500 hover:text-amber-400 hover:bg-neutral-950 border border-transparent hover:border-neutral-850 rounded-lg transition-all"
                                    title="View Full Invoice"
                                  >
                                    <Eye size={14} />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* TAB 4: SERVICE CENTER TICKETS */}
            {activeTab === "services" && (
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">
                  Active Service Center Tickets ({serviceRequests.length} tickets)
                </h3>

                <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                  {serviceRequests.length === 0 ? (
                    <div className="text-center py-20">
                      <Wrench size={40} className="text-neutral-800 mx-auto mb-4" />
                      <h4 className="text-sm font-bold text-neutral-300">No service requests logged</h4>
                      <p className="text-xs text-neutral-500 mt-1">Submit watch repairs on the Service Center page to see them here.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                            <th className="p-4">Ticket ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Watch Description</th>
                            <th className="p-4">Service Needed</th>
                            <th className="p-4">Details / Notes</th>
                            <th className="p-4">Repair Pipeline</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {serviceRequests.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-neutral-900/20 transition-colors">
                              <td className="p-4 font-mono font-bold text-neutral-100">{ticket.id}</td>
                              <td className="p-4">
                                <strong className="text-neutral-200 block">{ticket.name}</strong>
                                <span className="text-[10px] text-neutral-500 block">{ticket.phone}</span>
                              </td>
                              <td className="p-4">
                                <span className="font-semibold text-neutral-200">{ticket.watchBrand}</span>
                                <span className="text-neutral-400 block">{ticket.watchModel || "General Model"}</span>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-850 rounded-lg text-[10px] font-semibold text-amber-500 uppercase tracking-wider">
                                  {ticket.serviceType}
                                </span>
                              </td>
                              <td className="p-4 max-w-xs truncate" title={ticket.issueDescription}>
                                {ticket.issueDescription || "No notes provided"}
                              </td>
                              <td className="p-4">
                                <select
                                  value={ticket.status}
                                  onChange={(e) => {
                                    updateServiceStatus(ticket.id, e.target.value);
                                    triggerToast(`Ticket ${ticket.id} pipeline updated!`);
                                  }}
                                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider focus:outline-none cursor-pointer ${getServiceStatusColor(
                                    ticket.status
                                  )}`}
                                >
                                  <option value="Received" className="bg-neutral-900">Received</option>
                                  <option value="Diagnosing" className="bg-neutral-900">Diagnosing</option>
                                  <option value="In Repair" className="bg-neutral-900">In Repair</option>
                                  <option value="Ready" className="bg-neutral-900">Ready for Pick-up</option>
                                  <option value="Delivered" className="bg-neutral-900">Returned / Paid</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: SHOWROOM APPOINTMENTS */}
            {activeTab === "appointments" && (
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">
                  Showroom Consultation Bookings ({appointments.length} slot{appointments.length !== 1 ? "s" : ""})
                </h3>

                <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                  {appointments.length === 0 ? (
                    <div className="text-center py-20">
                      <Calendar size={40} className="text-neutral-800 mx-auto mb-4" />
                      <h4 className="text-sm font-bold text-neutral-300">No consultation bookings registered</h4>
                      <p className="text-xs text-neutral-500 mt-1">Book slots on the Contact or Product page to populate calendar bookings.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                            <th className="p-4">Booking ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Date / Slot</th>
                            <th className="p-4">Consultation Purpose</th>
                            <th className="p-4">Scheduler Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {appointments.map((bkg) => (
                            <tr key={bkg.id} className="hover:bg-neutral-900/20 transition-colors">
                              <td className="p-4 font-mono font-bold text-neutral-100">{bkg.id}</td>
                              <td className="p-4">
                                <strong className="text-neutral-200 block">{bkg.name}</strong>
                                <span className="text-[10px] text-neutral-500 block">{bkg.phone}</span>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <span className="block font-semibold">{bkg.date}</span>
                                <span className="text-[10px] text-amber-500 block mt-0.5">{bkg.time} Slot</span>
                              </td>
                              <td className="p-4 font-sans font-medium text-neutral-300">
                                {bkg.purpose}
                              </td>
                              <td className="p-4">
                                <select
                                  value={bkg.status}
                                  onChange={(e) => {
                                    updateAppointmentStatus(bkg.id, e.target.value);
                                    triggerToast(`Booking slot ${bkg.id} updated!`);
                                  }}
                                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider focus:outline-none cursor-pointer ${getBkgStatusColor(
                                    bkg.status
                                  )}`}
                                >
                                  <option value="Pending" className="bg-neutral-900">Pending Approval</option>
                                  <option value="Confirmed" className="bg-neutral-900">Confirmed Slot</option>
                                  <option value="Completed" className="bg-neutral-900">Completed Consultation</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 6: COUPONS MANAGER */}
            {activeTab === "coupons" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Coupon Form */}
                <div className="bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl h-max">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-6 border-b border-neutral-900 pb-3">Create Coupon Code</h3>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newCoupCode || !newCoupValue) return;
                      addCoupon({
                        code: newCoupCode.toUpperCase().trim(),
                        type: newCoupType,
                        value: Number(newCoupValue),
                        minOrder: Number(newCoupMinOrder || 0)
                      });
                      triggerToast("Coupon created successfully!");
                      setNewCoupCode("");
                      setNewCoupValue("");
                      setNewCoupMinOrder("");
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Code</label>
                      <input 
                        type="text" required placeholder="e.g. EXTRA10" value={newCoupCode} 
                        onChange={(e) => setNewCoupCode(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Discount Type</label>
                      <select 
                        value={newCoupType} onChange={(e) => setNewCoupType(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 rounded-xl py-2 px-3 text-xs text-neutral-300 focus:outline-none"
                      >
                        <option value="percentage" className="bg-neutral-900">Percentage (%)</option>
                        <option value="flat" className="bg-neutral-900">Flat Amount (₹)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Value</label>
                      <input 
                        type="number" required placeholder="e.g. 10" value={newCoupValue} 
                        onChange={(e) => setNewCoupValue(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Minimum Order (INR)</label>
                      <input 
                        type="number" placeholder="e.g. 50000" value={newCoupMinOrder} 
                        onChange={(e) => setNewCoupMinOrder(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="py-2.5 bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-450 transition-colors mt-2">
                      Generate Coupon
                    </button>
                  </form>
                </div>

                {/* Coupons List */}
                <div className="lg:col-span-2 bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl overflow-hidden shadow-xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-6 border-b border-neutral-900 pb-3">Active Promotional Coupons</h3>
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-950 border-b border-neutral-900 text-neutral-500 uppercase tracking-wider text-[9px] font-bold">
                          <th className="p-3">Coupon Code</th>
                          <th className="p-3 text-center">Type</th>
                          <th className="p-3 text-center">Value</th>
                          <th className="p-3 text-center">Min Order Required</th>
                          <th className="p-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900 text-neutral-350">
                        {coupons.map((c) => (
                          <tr key={c.code} className="hover:bg-neutral-900/20">
                            <td className="p-3 font-mono font-bold text-neutral-100">{c.code}</td>
                            <td className="p-3 text-center capitalize">{c.type}</td>
                            <td className="p-3 text-center font-bold">{c.type === "percentage" ? `${c.value}%` : `₹${c.value.toLocaleString("en-IN")}`}</td>
                            <td className="p-3 text-center">₹{c.minOrder.toLocaleString("en-IN")}</td>
                            <td className="p-3 text-center">
                              <button 
                                onClick={() => { deleteCoupon(c.code); triggerToast(`Coupon ${c.code} deleted.`); }}
                                className="text-neutral-500 hover:text-rose-500 p-1 rounded transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: RESTOCK ALERTS */}
            {activeTab === "restocks" && (
              <div className="bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl overflow-hidden shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-6 border-b border-neutral-900 pb-3">Restock Alerts Registry</h3>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-950 border-b border-neutral-900 text-neutral-500 uppercase tracking-wider text-[9px] font-bold">
                        <th className="p-3">Client Email</th>
                        <th className="p-3">Watch Item</th>
                        <th className="p-3 text-center">Requested Date</th>
                        <th className="p-3 text-center">Simulated Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900 text-neutral-350">
                      {restockAlerts.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-neutral-500 italic">No restock requests logged yet.</td>
                        </tr>
                      ) : (
                        restockAlerts.map((alert, idx) => {
                          const product = products.find(p => p.id === alert.productId);
                          return (
                            <tr key={idx} className="hover:bg-neutral-900/20">
                              <td className="p-3 font-semibold text-neutral-200">{alert.email}</td>
                              <td className="p-3 flex items-center gap-3">
                                {product && (
                                  <>
                                    <div className="w-8 h-8 rounded overflow-hidden bg-neutral-950 border border-neutral-900">
                                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                      <span className="font-bold text-neutral-100 block">{product.brand}</span>
                                      <span className="text-[10px] text-neutral-500 block">{product.name}</span>
                                    </div>
                                  </>
                                )}
                              </td>
                              <td className="p-3 text-center text-neutral-450">{new Date(alert.date).toLocaleDateString("en-IN")}</td>
                              <td className="p-3 text-center">
                                <span className="px-2 py-0.5 rounded bg-rose-950/20 border border-rose-900 text-rose-400 text-[9px] font-bold uppercase tracking-wider">Out Of Stock</span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 8: MAGAZINE ARTICLES EDITOR */}
            {activeTab === "blogs" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Draft Article form */}
                <div className="bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-6 border-b border-neutral-900 pb-3">Draft New Article</h3>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newBlogTitle || !newBlogContent || !newBlogAuthor) return;
                      addBlogPost({
                        id: newBlogTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                        title: newBlogTitle,
                        category: newBlogCategory,
                        readTime: "5 min read",
                        author: newBlogAuthor,
                        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                        image: newBlogImage.trim() || "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800",
                        content: newBlogContent
                      });
                      triggerToast("Article published to magazine!");
                      setNewBlogTitle("");
                      setNewBlogAuthor("");
                      setNewBlogImage("");
                      setNewBlogContent("");
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Article Title</label>
                      <input 
                        type="text" required placeholder="e.g. Chronograph Mechanisms" value={newBlogTitle} 
                        onChange={(e) => setNewBlogTitle(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Category</label>
                      <select 
                        value={newBlogCategory} onChange={(e) => setNewBlogCategory(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 rounded-xl py-2 px-3 text-xs text-neutral-300 focus:outline-none"
                      >
                        <option value="Guides" className="bg-neutral-900">Guides</option>
                        <option value="Swiss Watches" className="bg-neutral-900">Swiss Watches</option>
                        <option value="Care" className="bg-neutral-900">Care</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Author Name</label>
                      <input 
                        type="text" required placeholder="e.g. Arjun Mehta" value={newBlogAuthor} 
                        onChange={(e) => setNewBlogAuthor(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Featured Image URL</label>
                      <input 
                        type="url" placeholder="https://images.unsplash.com/..." value={newBlogImage} 
                        onChange={(e) => setNewBlogImage(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Article Content</label>
                      <textarea 
                        rows="5" required placeholder="Write article content here..." value={newBlogContent} 
                        onChange={(e) => setNewBlogContent(e.target.value)}
                        className="bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none resize-none font-sans"
                      ></textarea>
                    </div>
                    <button type="submit" className="py-2.5 bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-450 transition-colors mt-2">
                      Publish Article
                    </button>
                  </form>
                </div>

                {/* Published Articles List */}
                <div className="lg:col-span-2 bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl overflow-hidden shadow-xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-6 border-b border-neutral-900 pb-3">Published Horology Articles</h3>
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="p-4 bg-neutral-950 rounded-2xl border border-neutral-900 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-10 rounded overflow-hidden bg-neutral-900 shrink-0">
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold block mb-0.5">{post.category}</span>
                            <h4 className="font-serif font-bold text-sm text-neutral-200 line-clamp-1">{post.title}</h4>
                            <span className="text-[10px] text-neutral-550 block mt-0.5">By {post.author} &bull; {post.date}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => { deleteBlogPost(post.id); triggerToast("Article deleted from magazine."); }}
                          className="text-neutral-550 hover:text-rose-500 p-2 rounded transition-colors shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 9: WHATSAPP ALERTS SIMULATOR */}
            {activeTab === "whatsapp" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-neutral-100">
                {/* Form to send broadcast */}
                <div className="bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-6 border-b border-neutral-900 pb-3">Trigger Test Alert</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!waRecipient) return;
                      const newLog = {
                        id: Date.now(),
                        recipient: waRecipient,
                        template: waTemplate,
                        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) + " (Today)",
                        status: "Sent"
                      };
                      const updated = [newLog, ...whatsappLogs];
                      setWhatsappLogs(updated);
                      localStorage.setItem("chronex_whatsapp_logs", JSON.stringify(updated));
                      triggerToast("WhatsApp Broadcast Alert Queued!");
                      setWaRecipient("");
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Recipient Mobile (e.g. +91 99999 99999)</label>
                      <input 
                        type="text" required placeholder="+91 83206 06850" value={waRecipient} 
                        onChange={(e) => setWaRecipient(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Message Template</label>
                      <select 
                        value={waTemplate} onChange={(e) => setWaTemplate(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 rounded-xl py-2 px-3 text-xs text-neutral-350 focus:outline-none"
                      >
                        <option value="order_confirmation">Order Confirmation Receipt</option>
                        <option value="shipping_update">Insured Transit Dispatch Update</option>
                        <option value="welcome_club">Loyalty Program Welcome Alert</option>
                      </select>
                    </div>
                    <button 
                      type="submit"
                      className="py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-neutral-950 font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all mt-2"
                    >
                      Trigger API Webhook
                    </button>
                  </form>
                </div>

                {/* Log display */}
                <div className="lg:col-span-2 bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-6 border-b border-neutral-900 pb-3 flex justify-between items-center">
                    <span>Cloud API Broadcast logs</span>
                    <button 
                      onClick={() => { setWhatsappLogs([]); localStorage.removeItem("chronex_whatsapp_logs"); }}
                      className="text-[10px] text-neutral-500 hover:text-neutral-300"
                    >
                      Clear Logs
                    </button>
                  </h3>
                  <div className="flex flex-col gap-3">
                    {whatsappLogs.length === 0 ? (
                      <div className="text-center text-xs text-neutral-600 py-12">No active broadcasts logged.</div>
                    ) : (
                      whatsappLogs.map((log) => (
                        <div key={log.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 flex justify-between items-center text-left">
                          <div>
                            <span className="text-xs font-black text-neutral-200 block">{log.recipient}</span>
                            <span className="text-[10px] text-neutral-500 font-mono mt-0.5">Template: {log.template} &bull; {log.time}</span>
                          </div>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            log.status === "Read" ? "bg-emerald-500/10 text-emerald-500" : log.status === "Delivered" ? "bg-[#3182ce]/10 text-[#3182ce]" : "bg-neutral-800 text-neutral-400"
                          }`}>
                            {log.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 10: WARRANTY LEDGER & REGISTRATION */}
            {activeTab === "warranty" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-neutral-100">
                {/* Form to register serial */}
                <div className="bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-6 border-b border-neutral-900 pb-3">Register Warranty Serial</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newSerial || !newModel || !newClient) return;
                      const expiryDate = new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]; // 5 years expiry
                      
                      mintWarrantyCertificate(
                        newSerial.toUpperCase().trim(),
                        newModel,
                        newClient,
                        expiryDate,
                        "Chronex Minted",
                        new Date().toISOString().split("T")[0]
                      );
                      
                      triggerToast("Serial successfully minted into ledger!");
                      setNewSerial("");
                      setNewModel("");
                      setNewClient("");
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-550 uppercase tracking-widest font-bold">Serial Number</label>
                      <input 
                        type="text" required placeholder="e.g. CHX-DEMO-999" value={newSerial} 
                        onChange={(e) => setNewSerial(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-550 uppercase tracking-widest font-bold">Watch Model</label>
                      <input 
                        type="text" required placeholder="e.g. Day-Date 36" value={newModel} 
                        onChange={(e) => setNewModel(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-550 uppercase tracking-widest font-bold">Client Name</label>
                      <input 
                        type="text" required placeholder="e.g. Rajesh Kumar" value={newClient} 
                        onChange={(e) => setNewClient(e.target.value)}
                        className="bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all mt-2"
                    >
                      Mint Serial Certificate
                    </button>
                  </form>
                </div>

                {/* Ledger display */}
                <div className="lg:col-span-2 bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-6 border-b border-neutral-900 pb-3">Authorized Serial Directory</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-neutral-950 border-b border-neutral-855 text-neutral-400 font-bold text-[9px] uppercase tracking-wider">
                          <th className="p-3">Serial</th>
                          <th className="p-3">Watch Model</th>
                          <th className="p-3">Client</th>
                          <th className="p-3">Expiry Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900 text-neutral-300 font-sans">
                        {warrantyLedger.map((w, index) => (
                          <tr key={index} className="hover:bg-neutral-900/10 transition-colors">
                            <td className="p-3 font-mono font-black text-amber-500 tracking-wider select-all">{w.serial}</td>
                            <td className="p-3">{w.model}</td>
                            <td className="p-3">{w.clientName}</td>
                            <td className="p-3">{w.expiresOn}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 11: CORPORATE LEADS */}
            {activeTab === "corporate" && (
              <div className="flex flex-col gap-6">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-neutral-900 pb-6">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200 flex items-center gap-2">
                      <Building2 size={16} className="text-amber-500" />
                      Corporate & B2B Inquiries
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1">All inquiries submitted via the Corporate Gifting page.</p>
                  </div>
                  <span className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold rounded-full">
                    {corporateInquiries?.length || 0} Lead{corporateInquiries?.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {!corporateInquiries?.length ? (
                  <div className="p-16 text-center bg-neutral-900/10 border border-dashed border-neutral-900 rounded-3xl">
                    <Building2 size={40} className="text-neutral-700 mx-auto mb-4" />
                    <h4 className="text-neutral-400 font-bold mb-2">No corporate inquiries yet</h4>
                    <p className="text-neutral-600 text-xs max-w-xs mx-auto">When a company submits a quote request from the Corporate page, it will appear here with full details.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {corporateInquiries?.map((inquiry, idx) => {
                      const discount = (() => {
                        const q = Number(inquiry.quantity);
                        if (q >= 50) return { label: "15% OFF", color: "text-emerald-400 bg-emerald-950/30 border-emerald-900/40" };
                        if (q >= 25) return { label: "10% OFF", color: "text-blue-400 bg-blue-950/30 border-blue-900/40" };
                        if (q >= 10) return { label: "5% OFF", color: "text-amber-400 bg-amber-950/30 border-amber-900/40" };
                        return { label: "Standard", color: "text-neutral-400 bg-neutral-900/30 border-neutral-800" };
                      })();

                      return (
                        <div key={inquiry.id || idx} className="bg-neutral-900/20 border border-neutral-900 hover:border-amber-500/20 rounded-2xl overflow-hidden transition-all">
                          {/* Card Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-neutral-900 bg-neutral-950/40">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                <Building2 size={18} className="text-amber-500" />
                              </div>
                              <div>
                                <h4 className="font-extrabold text-neutral-100 text-base">{inquiry.companyName || "—"}</h4>
                                <p className="text-xs text-neutral-500">Lead ID: <span className="font-mono text-amber-500/80">{inquiry.id}</span></p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${discount.color}`}>
                                {discount.label}
                              </span>
                              <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] font-bold rounded-lg">
                                {inquiry.status || "Pending"}
                              </span>
                              <span className="text-[10px] text-neutral-600 font-sans">
                                {inquiry.date ? new Date(inquiry.date).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                              </span>
                            </div>
                          </div>

                          {/* Card Body - Info Grid */}
                          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Contact Person */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Contact Person</span>
                              <span className="text-sm font-semibold text-neutral-200">{inquiry.contactName || "—"}</span>
                            </div>
                            {/* Email */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Email</span>
                              <a href={`mailto:${inquiry.email}`} className="text-sm font-semibold text-amber-400 hover:underline truncate">{inquiry.email || "—"}</a>
                            </div>
                            {/* Phone */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Phone</span>
                              <a href={`tel:${inquiry.phone}`} className="text-sm font-semibold text-neutral-200 hover:text-amber-400 transition-colors">{inquiry.phone || "—"}</a>
                            </div>
                            {/* Quantity */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Order Volume</span>
                              <span className="text-sm font-extrabold text-neutral-100">{inquiry.quantity ? `${inquiry.quantity} Watches` : "—"}</span>
                            </div>
                            {/* Budget */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Budget per Watch</span>
                              <span className="text-sm font-extrabold text-amber-400">{inquiry.budgetPerWatch || "—"}</span>
                            </div>
                            {/* GST */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">GST Number</span>
                              <span className="text-sm font-mono text-neutral-300">{inquiry.gstNumber || <span className="text-neutral-600 italic font-sans text-xs">Not provided</span>}</span>
                            </div>
                          </div>

                          {/* Requirements */}
                          {inquiry.requirements && (
                            <div className="px-5 pb-5">
                              <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-xl">
                                <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold block mb-2">Additional Requirements</span>
                                <p className="text-xs text-neutral-300 leading-relaxed italic">"{inquiry.requirements}"</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 12: SALES REPORTS */}
            {activeTab === "reports" && (() => {
              const pendingRevenue = orders.filter(o => o.orderStatus !== "Delivered").reduce((sum, o) => sum + o.total, 0);
              const deliveredRevenue = orders.filter(o => o.orderStatus === "Delivered").reduce((sum, o) => sum + o.total, 0);
              const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

              const productSales = {};
              orders.forEach(o => {
                o.items.forEach(it => {
                  const key = `${it.brand} ${it.name}`;
                  if (!productSales[key]) {
                    productSales[key] = { name: key, qty: 0, revenue: 0 };
                  }
                  productSales[key].qty += it.quantity;
                  productSales[key].revenue += it.price * it.quantity;
                });
              });
              const topProducts = Object.values(productSales).sort((a,b) => b.revenue - a.revenue).slice(0, 5);

              const downloadReportCSV = () => {
                let csvContent = "data:text/csv;charset=utf-8,";
                csvContent += "Order ID,Date,Customer Name,Customer Email,Items Count,Total Revenue,Payment Method,Status\n";
                orders.forEach(o => {
                  csvContent += `"${o.id}","${new Date(o.date).toLocaleDateString()}","${o.customer?.name || "Guest"}","${o.customer?.email || "N/A"}",${o.items.length},${o.total},"${o.paymentMethod || "UPI"}","${o.orderStatus}"\n`;
                });
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `Chronex_Sales_Report_${new Date().toISOString().split("T")[0]}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                triggerToast("Sales report downloaded successfully!");
                logAdminAction("Downloaded Sales Report CSV");
              };

              return (
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                    <div>
                      <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">
                        Sales & Financial Reports
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1">Detailed store performance audit and data exporting.</p>
                    </div>
                    <button
                      onClick={downloadReportCSV}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <TrendingUp size={14} />
                      <span>Export CSV Report</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Delivered Sales Revenue</span>
                      <h4 className="text-2xl font-sans font-extrabold text-emerald-400">₹{deliveredRevenue.toLocaleString("en-IN")}</h4>
                      <p className="text-[10px] text-neutral-500">Revenue from finalized checkouts.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Pending Revenue Pipeline</span>
                      <h4 className="text-2xl font-sans font-extrabold text-amber-500 font-mono">₹{pendingRevenue.toLocaleString("en-IN")}</h4>
                      <p className="text-[10px] text-neutral-500">Orders currently being processed/shipped.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-neutral-900/10 border border-neutral-900 flex flex-col gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Total Gross Revenue</span>
                      <h4 className="text-2xl font-sans font-extrabold text-neutral-200">₹{totalRevenue.toLocaleString("en-IN")}</h4>
                      <p className="text-[10px] text-neutral-500">Combined sum of all orders.</p>
                    </div>
                  </div>

                  <div className="bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200 mb-6 border-b border-neutral-900 pb-3">Best Performing Watches</h3>
                    {topProducts.length === 0 ? (
                      <p className="text-xs text-neutral-500">No items sold yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-neutral-950 border-b border-neutral-900 text-neutral-400 uppercase tracking-wider text-[9px] font-bold">
                              <th className="p-3">Watch Model</th>
                              <th className="p-3 text-center">Quantity Sold</th>
                              <th className="p-3 text-right">Total Revenue</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-900 text-neutral-300">
                            {topProducts.map((p, idx) => (
                              <tr key={idx} className="hover:bg-neutral-900/20">
                                <td className="p-3 font-semibold">{p.name}</td>
                                <td className="p-3 text-center font-bold font-sans text-neutral-200">{p.qty}</td>
                                <td className="p-3 text-right font-extrabold font-sans text-amber-500">₹{p.revenue.toLocaleString("en-IN")}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* TAB 13: CUSTOMER ACCOUNTS */}
            {activeTab === "customers" && (() => {
              const filteredCustomers = (usersList || []).filter((u) => {
                const search = customerSearch.toLowerCase();
                return u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search);
              });

              return (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">
                      Customer Directory ({filteredCustomers.length} registered)
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1">Manage user loyalty points, tiers, and details.</p>
                  </div>

                  <div className="relative max-w-md">
                    <input 
                      type="text" 
                      placeholder="Search customers by name or email..." 
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 pl-9 text-xs text-neutral-150 placeholder-neutral-700 focus:outline-none"
                    />
                    <Search size={14} className="absolute left-3 top-2.5 text-neutral-600" />
                  </div>

                  <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                            <th className="p-4">Customer Details</th>
                            <th className="p-4">Role</th>
                            <th className="p-4 text-center">Loyalty Points</th>
                            <th className="p-4 text-center">Orders Count</th>
                            <th className="p-4 text-right">Total Spend</th>
                            <th className="p-4 text-center">Loyalty Tweak</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {filteredCustomers.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="p-6 text-center text-neutral-500">No customers found</td>
                            </tr>
                          ) : (
                            filteredCustomers.map((user) => {
                              const points = Number(localStorage.getItem(`chronex_points_${user.email}`) || "250");
                              const userOrders = orders.filter(o => o.customer && o.customer.email === user.email);
                              const totalSpend = userOrders.reduce((sum, o) => sum + o.total, 0);
                              
                              const getTierName = (pts) => {
                                if (pts >= 2500) return { label: "Platinum VIP", color: "text-zinc-100 bg-neutral-900 border-neutral-700" };
                                if (pts >= 1000) return { label: "Gold Circle", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
                                if (pts >= 500) return { label: "Silver Elite", color: "text-zinc-300 bg-neutral-805 border-neutral-750" };
                                return { label: "Bronze Club", color: "text-amber-700 bg-amber-700/10 border-amber-700/20" };
                              };
                              const tier = getTierName(points);

                              return (
                                <tr key={user.email} className="hover:bg-neutral-900/20 transition-colors">
                                  <td className="p-4">
                                    <strong className="text-neutral-200 block capitalize">{user.name}</strong>
                                    <span className="text-neutral-550 text-[10px] font-mono block mt-0.5">{user.email}</span>
                                  </td>
                                  <td className="p-4">
                                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${user.role === 'admin' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>
                                      {user.role}
                                    </span>
                                  </td>
                                  <td className="p-4 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                      <span className="font-extrabold text-amber-500 font-sans">{points} pts</span>
                                      <span className={`px-2 py-0.2 rounded text-[8px] uppercase tracking-wider font-bold border ${tier.color}`}>
                                        {tier.label}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-4 text-center font-bold text-neutral-200">{userOrders.length}</td>
                                  <td className="p-4 text-right font-bold text-neutral-100">₹{totalSpend.toLocaleString("en-IN")}</td>
                                  <td className="p-4">
                                    <div className="flex justify-center gap-1.5">
                                      <button 
                                        onClick={() => {
                                          updateUserLoyaltyPoints(user.email, points + 100);
                                          logAdminAction(`Awarded +100 Loyalty Points to ${user.email}`);
                                          triggerToast(`Awarded +100 Loyalty Points to ${user.name}`);
                                        }}
                                        className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-500 text-amber-500 hover:text-neutral-950 font-bold rounded text-[9px] transition-colors"
                                      >
                                        +100 pts
                                      </button>
                                      <button 
                                        onClick={() => {
                                          updateUserLoyaltyPoints(user.email, Math.max(0, points - 100));
                                          logAdminAction(`Deducted 100 Loyalty Points from ${user.email}`);
                                          triggerToast(`Deducted 100 Loyalty Points from ${user.name}`);
                                        }}
                                        className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 text-rose-500 hover:text-white font-bold rounded text-[9px] transition-colors"
                                      >
                                        -100 pts
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* TAB 14: SUBSCRIPTIONS */}
            {activeTab === "subscriptions" && (() => {
              const allSubscriptions = (usersList || []).map(u => {
                const savedSub = localStorage.getItem(`chronex_sub_${u.email}`);
                return savedSub ? { ...JSON.parse(savedSub), user: u } : null;
              }).filter(Boolean);

              const filteredSubs = allSubscriptions.filter(sub => {
                const search = subscriptionSearch.toLowerCase();
                return sub.user.name.toLowerCase().includes(search) || 
                       sub.user.email.toLowerCase().includes(search) || 
                       sub.plan.toLowerCase().includes(search);
              });

              const activeCount = allSubscriptions.filter(s => s.status === 'Active').length;
              const subRev = allSubscriptions.filter(s => s.status === 'Active').reduce((sum, s) => {
                const prices = { Silver: 1999, Gold: 3999, Platinum: 7999 };
                return sum + (prices[s.plan] || 0);
              }, 0);

              return (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-neutral-900 pb-4">
                    <div>
                      <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200 flex items-center gap-2">
                        <Gift size={16} className="text-emerald-500" />
                        Collector's Box Subscriptions
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1">Manage luxury watch accessories monthly subscribers.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold rounded-full">
                        {activeCount} Active Subscriptions
                      </span>
                      <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold rounded-full">
                        MRR: ₹{subRev.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="relative max-w-md">
                    <input 
                      type="text" 
                      placeholder="Search subscriptions by name, email, or plan..." 
                      value={subscriptionSearch}
                      onChange={(e) => setSubscriptionSearch(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-amber-500/60 rounded-xl py-2 px-3 pl-9 text-xs text-neutral-150 placeholder-neutral-700 focus:outline-none"
                    />
                    <Search size={14} className="absolute left-3 top-2.5 text-neutral-600" />
                  </div>

                  <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                            <th className="p-4">Subscriber</th>
                            <th className="p-4 text-center">Plan Tier</th>
                            <th className="p-4 text-center">Start Date</th>
                            <th className="p-4 text-center">Next Billing</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {filteredSubs.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="p-6 text-center text-neutral-500">No subscriptions found</td>
                            </tr>
                          ) : (
                            filteredSubs.map((sub, idx) => (
                              <tr key={idx} className="hover:bg-neutral-900/20 transition-colors">
                                <td className="p-4">
                                  <strong className="text-neutral-200 block capitalize">{sub.user.name}</strong>
                                  <span className="text-neutral-550 text-[10px] font-mono block mt-0.5">{sub.user.email}</span>
                                </td>
                                <td className="p-4 text-center font-bold">
                                  <span className={`px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-wider font-extrabold border ${
                                    sub.plan === 'Platinum' ? 'text-zinc-100 bg-neutral-900 border-neutral-700' :
                                    sub.plan === 'Gold' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
                                    'text-zinc-350 bg-neutral-850 border-neutral-800'
                                  }`}>
                                    {sub.plan}
                                  </span>
                                </td>
                                <td className="p-4 text-center font-sans text-neutral-400">
                                  {new Date(sub.startDate).toLocaleDateString("en-IN")}
                                </td>
                                <td className="p-4 text-center font-sans text-neutral-400">
                                  {new Date(sub.nextBilling).toLocaleDateString("en-IN")}
                                </td>
                                <td className="p-4 text-center">
                                  <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
                                    sub.status === 'Active' ? 'bg-emerald-950/20 border border-emerald-900/40 text-emerald-400' : 'bg-rose-955/15 border border-rose-900/30 text-rose-455'
                                  }`}>
                                    {sub.status}
                                  </span>
                                </td>
                                <td className="p-4 text-center">
                                  {sub.status === 'Active' ? (
                                    <button
                                      onClick={() => {
                                        cancelUserSubscription(sub.user.email);
                                        logAdminAction(`Cancelled ${sub.user.email} Subscription`);
                                        triggerToast(`Subscription cancelled for ${sub.user.name}`);
                                      }}
                                      className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 text-rose-500 hover:text-white font-bold rounded-lg text-[9px] transition-colors"
                                    >
                                      Terminate
                                    </button>
                                  ) : (
                                    <span className="text-[10px] text-neutral-600 font-bold uppercase">Inactive</span>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* TAB 15: REFERRALS */}
            {activeTab === "referrals" && (() => {
              const allReferrals = (usersList || []).flatMap(u => {
                const savedRef = localStorage.getItem(`chronex_referrals_${u.email}`);
                const code = localStorage.getItem(`chronex_ref_code_${u.email}`) || "Not Generated";
                const list = savedRef ? JSON.parse(savedRef) : [];
                return list.map(ref => ({
                  referrer: u,
                  referrerCode: code,
                  friendEmail: ref.email,
                  date: ref.date,
                  status: ref.status
                }));
              });

              const filteredReferrals = allReferrals.filter(ref => {
                const search = referralSearch.toLowerCase();
                return ref.referrer.name.toLowerCase().includes(search) || 
                       ref.referrer.email.toLowerCase().includes(search) || 
                       ref.referrerCode.toLowerCase().includes(search) || 
                       ref.friendEmail.toLowerCase().includes(search);
              });

              const uniqueReferrers = (usersList || []).map(u => {
                const savedRef = localStorage.getItem(`chronex_referrals_${u.email}`);
                const code = localStorage.getItem(`chronex_ref_code_${u.email}`);
                const earnings = Number(localStorage.getItem(`chronex_ref_earnings_${u.email}`) || "0");
                const count = savedRef ? JSON.parse(savedRef).length : 0;
                return code ? { user: u, code, count, earnings } : null;
              }).filter(Boolean);

              return (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200 flex items-center gap-2">
                      <Award size={16} className="text-amber-500" />
                      Referrals & Invite Audit
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1">Audit promotional referral transactions and code stats.</p>
                  </div>

                  <div className="relative max-w-md">
                    <input 
                      type="text" 
                      placeholder="Search referrals by code, name, or invitee..." 
                      value={referralSearch}
                      onChange={(e) => setReferralSearch(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-2 px-3 pl-9 text-xs text-neutral-150 placeholder-neutral-700 focus:outline-none"
                    />
                    <Search size={14} className="absolute left-3 top-2.5 text-neutral-600" />
                  </div>

                  <div className="bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl shadow-xl">
                    <h4 className="text-xs uppercase tracking-widest text-neutral-450 font-bold border-b border-neutral-900 pb-3 mb-4">Referral Invitation Ledger</h4>
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-550 uppercase tracking-wider text-[9px] font-bold border-b border-neutral-900">
                            <th className="p-3">Referrer Name/Email</th>
                            <th className="p-3 text-center">Referrer Code</th>
                            <th className="p-3">Invited Friend</th>
                            <th className="p-3 text-center">Earned Bonus</th>
                            <th className="p-3 text-center">Date Joined</th>
                            <th className="p-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {filteredReferrals.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="p-3 text-center text-neutral-500">No referral records match your search</td>
                            </tr>
                          ) : (
                            filteredReferrals.map((ref, idx) => (
                              <tr key={idx} className="hover:bg-neutral-900/20">
                                <td className="p-3">
                                  <strong className="text-neutral-200 block capitalize">{ref.referrer.name}</strong>
                                  <span className="text-neutral-555 block font-mono text-[9px]">{ref.referrer.email}</span>
                                </td>
                                <td className="p-3 text-center font-mono font-bold text-amber-500">{ref.referrerCode}</td>
                                <td className="p-3 font-mono text-neutral-300">{ref.friendEmail}</td>
                                <td className="p-3 text-center font-bold text-emerald-400 font-sans">+500 Coins</td>
                                <td className="p-3 text-center font-sans text-neutral-450">{new Date(ref.date).toLocaleDateString()}</td>
                                <td className="p-3 text-center">
                                  <span className="px-2 py-0.5 rounded text-[8px] uppercase font-bold bg-emerald-950/20 border border-emerald-900/40 text-emerald-400">
                                    {ref.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-neutral-900/10 border border-neutral-900 p-6 rounded-3xl shadow-xl">
                    <h4 className="text-xs uppercase tracking-widest text-neutral-455 font-bold border-b border-neutral-900 pb-3 mb-4">Referral Code Directory & Performance</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-555 uppercase tracking-wider text-[9px] font-bold border-b border-neutral-900">
                            <th className="p-3">User</th>
                            <th className="p-3 text-center">Promotional Code</th>
                            <th className="p-3 text-center">Total Referred</th>
                            <th className="p-3 text-right">Referral Earnings</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {uniqueReferrers.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="p-3 text-center text-neutral-500">No users have generated referral codes yet.</td>
                            </tr>
                          ) : (
                            uniqueReferrers.map((ref, idx) => (
                              <tr key={idx} className="hover:bg-neutral-900/20">
                                <td className="p-3">
                                  <strong className="text-neutral-200 block capitalize">{ref.user.name}</strong>
                                  <span className="text-neutral-550 block font-mono text-[9px]">{ref.user.email}</span>
                                </td>
                                <td className="p-3 text-center font-mono font-extrabold text-amber-500 tracking-wider select-all">{ref.code}</td>
                                <td className="p-3 text-center font-bold text-neutral-255 font-sans">{ref.count}</td>
                                <td className="p-3 text-right font-extrabold text-emerald-400 font-sans">₹{ref.earnings.toLocaleString("en-IN")}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* TAB 16: NEWSLETTER LIST */}
            {activeTab === "newsletter" && (() => {
              const filteredNewsletter = (newsletterSubscribers || []).filter(sub => {
                return sub.email.toLowerCase().includes(subscriberSearch.toLowerCase());
              });

              return (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200 flex items-center gap-2">
                      <Mail size={16} className="text-neutral-355" />
                      Newsletter Privileged Subscribers
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1">Audit, export, and manage customers subscribed to brand announcements.</p>
                  </div>

                  <div className="relative max-w-md">
                    <input 
                      type="text" 
                      placeholder="Search subscribers by email..." 
                      value={subscriberSearch}
                      onChange={(e) => setSubscriberSearch(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-855 focus:border-amber-500/60 rounded-xl py-2 px-3 pl-9 text-xs text-neutral-150 placeholder-neutral-700 focus:outline-none"
                    />
                    <Search size={14} className="absolute left-3 top-2.5 text-neutral-600" />
                  </div>

                  <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                            <th className="p-4">Email Address</th>
                            <th className="p-4 text-center">Subscription Date</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {filteredNewsletter.length === 0 ? (
                            <tr>
                              <td colSpan="3" className="p-6 text-center text-neutral-500">No newsletter subscribers found</td>
                            </tr>
                          ) : (
                            filteredNewsletter.map((sub, idx) => (
                              <tr key={idx} className="hover:bg-neutral-900/20 transition-colors">
                                <td className="p-4 font-mono font-semibold text-neutral-200">{sub.email}</td>
                                <td className="p-4 text-center font-sans text-neutral-400">
                                  {sub.date ? new Date(sub.date).toLocaleString("en-IN") : "Mock Subscribed"}
                                </td>
                                <td className="p-4 text-center">
                                  <button
                                    onClick={() => {
                                      removeNewsletterSubscriber(sub.email);
                                      logAdminAction(`Removed newsletter subscriber ${sub.email}`);
                                      triggerToast(`Subscriber removed: ${sub.email}`);
                                    }}
                                    className="p-2 text-neutral-500 hover:text-rose-500 hover:bg-neutral-900 rounded-lg transition-all"
                                    title="Unsubscribe customer"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {activeTab === "showrooms" && (() => {
              return (
                <div className="flex flex-col gap-6 text-left animate-fade-in">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200 flex items-center gap-2">
                      <MapPin size={16} className="text-amber-500" />
                      Showrooms Locator Manager
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1">Add, update, or remove authorized brand showroom boutique locations.</p>
                  </div>

                  {/* Showrooms form */}
                  <form onSubmit={handleAddShowroom} className="p-6 bg-neutral-900/10 border border-neutral-800/40 rounded-3xl flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      {editingShowroomId ? "Edit Boutique Showroom" : "Add New Boutique Showroom"}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-neutral-500 uppercase font-semibold">City</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Vadodara" 
                          value={showroomCity}
                          onChange={(e) => setShowroomCity(e.target.value)}
                          className="bg-neutral-950 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-200 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-neutral-500 uppercase font-semibold">Showroom Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Chronex Alkapuri Boutique" 
                          value={showroomName}
                          onChange={(e) => setShowroomName(e.target.value)}
                          className="bg-neutral-950 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-200 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-neutral-500 uppercase font-semibold">Full Address</label>
                      <input 
                        type="text" 
                        placeholder="SF-12, Premium Galleria, RC Dutt Rd, Alkapuri, Vadodara, Gujarat 390007" 
                        value={showroomAddress}
                        onChange={(e) => setShowroomAddress(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-200 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-neutral-500 uppercase font-semibold">Hours of Operation</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 10:30 AM - 8:30 PM (Daily)" 
                          value={showroomHours}
                          onChange={(e) => setShowroomHours(e.target.value)}
                          className="bg-neutral-950 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-200 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-neutral-500 uppercase font-semibold">Phone Number</label>
                        <input 
                          type="text" 
                          placeholder="e.g. +91 83206 06850" 
                          value={showroomPhone}
                          onChange={(e) => setShowroomPhone(e.target.value)}
                          className="bg-neutral-950 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-neutral-500 uppercase font-semibold">Contact Email</label>
                        <input 
                          type="email" 
                          placeholder="e.g. alkapuri@chronex.in" 
                          value={showroomEmail}
                          onChange={(e) => setShowroomEmail(e.target.value)}
                          className="bg-neutral-950 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-200 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-neutral-500 uppercase font-semibold">Map Coordinate X (%)</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="100"
                          placeholder="e.g. 38" 
                          value={showroomCoordX}
                          onChange={(e) => setShowroomCoordX(e.target.value)}
                          className="bg-neutral-950 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-200 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-neutral-500 uppercase font-semibold">Map Coordinate Y (%)</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="100"
                          placeholder="e.g. 55" 
                          value={showroomCoordY}
                          onChange={(e) => setShowroomCoordY(e.target.value)}
                          className="bg-neutral-950 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-2 px-3 text-xs text-neutral-200 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                      {editingShowroomId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingShowroomId(null);
                            setShowroomCity("");
                            setShowroomName("");
                            setShowroomAddress("");
                            setShowroomHours("10:30 AM - 8:30 PM (Daily)");
                            setShowroomPhone("");
                            setShowroomEmail("");
                            setShowroomCoordX(50);
                            setShowroomCoordY(50);
                          }}
                          className="px-4 py-2 border border-neutral-800 hover:bg-neutral-900 text-neutral-450 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                        >
                          Cancel Edit
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                      >
                        {editingShowroomId ? "Update Showroom" : "Add Showroom"}
                      </button>
                    </div>
                  </form>

                  {/* Showrooms list table */}
                  <div className="flex justify-between items-end mt-6 mb-2 px-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Current Locations Database</h4>
                    <button
                      type="button"
                      onClick={() => {
                        resetShowrooms();
                        logAdminAction("Reset showroom database to original defaults");
                        triggerToast("Showrooms reset to default successfully");
                      }}
                      className="px-3 py-1.5 border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-neutral-950 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all"
                    >
                      Restore Factory Defaults
                    </button>
                  </div>
                  <div className="bg-neutral-900/10 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-800">
                            <th className="p-4">Boutique Name</th>
                            <th className="p-4">City</th>
                            <th className="p-4">Address</th>
                            <th className="p-4 text-center">Contact Info</th>
                            <th className="p-4 text-center">Map Coordinates</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800 text-neutral-300">
                          {showrooms.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="p-6 text-center text-neutral-500">No showrooms found. Please add one.</td>
                            </tr>
                          ) : (
                            showrooms.map((showroom) => (
                              <tr key={showroom.id} className="hover:bg-neutral-900/20 transition-colors">
                                <td className="p-4 font-bold text-neutral-200">{showroom.name}</td>
                                <td className="p-4 uppercase font-bold text-amber-500 text-[10px] tracking-wider">{showroom.city}</td>
                                <td className="p-4 text-neutral-400 max-w-[200px] truncate" title={showroom.address}>{showroom.address}</td>
                                <td className="p-4 text-center text-neutral-450 font-sans">
                                  <div className="flex flex-col text-[10px]">
                                    <span>{showroom.phone}</span>
                                    <span className="text-neutral-500">{showroom.email}</span>
                                  </div>
                                </td>
                                <td className="p-4 text-center font-mono text-[10px] text-neutral-400">
                                  X: {showroom.coords?.x || 50}%, Y: {showroom.coords?.y || 50}%
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center gap-1.5">
                                    <button
                                      onClick={() => handleEditShowroom(showroom)}
                                      className="p-2 text-neutral-500 hover:text-amber-500 hover:bg-neutral-900 rounded-lg transition-all"
                                      title="Edit showroom info"
                                    >
                                      <Edit3 size={14} />
                                    </button>
                                    <button
                                      onClick={() => {
                                        deleteShowroom(showroom.id);
                                        logAdminAction(`Deleted boutique location: ${showroom.name}`);
                                        triggerToast(`Showroom deleted: ${showroom.name}`);
                                      }}
                                      className="p-2 text-neutral-500 hover:text-rose-500 hover:bg-neutral-900 rounded-lg transition-all"
                                      title="Delete showroom"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {activeTab === "returns" && (() => {
              return (
                <div className="flex flex-col gap-6 text-left">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200 flex items-center gap-2">
                      <Box size={16} className="text-rose-500" />
                      Returns & Exchanges Ledger
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1">Manage return logs and refunds registered by users.</p>
                  </div>

                  <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                            <th className="p-4">Return ID</th>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">User Email</th>
                            <th className="p-4">Reason</th>
                            <th className="p-4">Refund Total</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {returnRequests.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="p-6 text-center text-neutral-500">No return requests logged</td>
                            </tr>
                          ) : (
                            returnRequests.map((ret) => (
                              <tr key={ret.id} className="hover:bg-neutral-900/20 transition-colors">
                                <td className="p-4 font-mono font-semibold text-neutral-200">{ret.id}</td>
                                <td className="p-4 font-mono text-neutral-400">{ret.orderId}</td>
                                <td className="p-4">{ret.email}</td>
                                <td className="p-4 truncate max-w-[150px]" title={ret.notes}>
                                  <strong>{ret.reason}</strong>
                                  {ret.notes && <span className="block text-[10px] text-neutral-500">"{ret.notes}"</span>}
                                </td>
                                <td className="p-4 font-sans font-bold text-neutral-100">₹{ret.total.toLocaleString("en-IN")}</td>
                                <td className="p-4 text-center">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${getStatusColor(ret.status)}`}>
                                    {ret.status}
                                  </span>
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center gap-1.5">
                                    {ret.status === "Pending" && (
                                      <button
                                        onClick={() => {
                                          updateReturnStatus(ret.id, "Approved");
                                          logAdminAction(`Approved return request ${ret.id}`);
                                          triggerToast(`Return request approved: ${ret.id}`);
                                        }}
                                        className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[9px] font-bold uppercase rounded"
                                      >
                                        Approve
                                      </button>
                                    )}
                                    {ret.status === "Approved" && (
                                      <button
                                        onClick={() => {
                                          processRefund(ret.id);
                                          logAdminAction(`Completed refund for return request ${ret.id}`);
                                          triggerToast(`Refund completed for return request: ${ret.id}`);
                                        }}
                                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-bold uppercase rounded"
                                      >
                                        Refund
                                      </button>
                                    )}
                                    {ret.status !== "Cancelled" && ret.status !== "Refunded" && (
                                      <button
                                        onClick={() => {
                                          updateReturnStatus(ret.id, "Cancelled");
                                          logAdminAction(`Cancelled return request ${ret.id}`);
                                          triggerToast(`Return request cancelled: ${ret.id}`);
                                        }}
                                        className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-500 hover:text-white text-[9px] font-bold uppercase rounded"
                                      >
                                        Cancel
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {activeTab === "moderation" && (() => {
              const allReviews = [];
              products.forEach(p => {
                if (p.reviews) {
                  p.reviews.forEach(r => {
                    allReviews.push({ ...r, productId: p.id, productName: p.name, productBrand: p.brand });
                  });
                }
              });

              return (
                <div className="flex flex-col gap-6 text-left">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200 flex items-center gap-2">
                      <MessageSquare size={16} className="text-emerald-500" />
                      Review Moderation Dashboard
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1">Approve or reject customer-submitted watch reviews.</p>
                  </div>

                  <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                            <th className="p-4">Timepiece</th>
                            <th className="p-4">Reviewer</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Comment</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {allReviews.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="p-6 text-center text-neutral-500">No reviews found</td>
                            </tr>
                          ) : (
                            allReviews.map((rev) => (
                              <tr key={rev.id} className="hover:bg-neutral-900/20 transition-colors">
                                <td className="p-4">
                                  <span className="font-semibold text-neutral-200 block">{rev.productBrand} {rev.productName}</span>
                                  <span className="text-[9px] text-neutral-500 block font-mono mt-0.5">{rev.productId}</span>
                                </td>
                                <td className="p-4">
                                  <strong className="text-neutral-300">{rev.author}</strong>
                                  <span className="text-[9px] text-neutral-500 block mt-0.5">{rev.date}</span>
                                </td>
                                <td className="p-4 text-amber-500 font-bold font-sans">⭐ {rev.rating} / 5</td>
                                <td className="p-4 italic max-w-sm truncate" title={rev.comment}>"{rev.comment}"</td>
                                <td className="p-4 text-center">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${getStatusColor(rev.status || "Approved")}`}>
                                    {rev.status || "Approved"}
                                  </span>
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center gap-1.5">
                                    {(rev.status === "Pending" || !rev.status) && (
                                      <>
                                        <button
                                          onClick={() => {
                                            approveReview(rev.productId, rev.id);
                                            logAdminAction(`Approved review by ${rev.author} on ${rev.productName}`);
                                            triggerToast("Review approved and published!");
                                          }}
                                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-bold uppercase rounded"
                                        >
                                          Approve
                                        </button>
                                        <button
                                          onClick={() => {
                                            rejectReview(rev.productId, rev.id);
                                            logAdminAction(`Rejected review by ${rev.author} on ${rev.productName}`);
                                            triggerToast("Review rejected.");
                                          }}
                                          className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-500 hover:text-white text-[9px] font-bold uppercase rounded"
                                        >
                                          Reject
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {activeTab === "tradeins" && (() => {
              return (
                <div className="flex flex-col gap-6 text-left">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200 flex items-center gap-2">
                      <Scale size={16} className="text-amber-500" />
                      Vintage Trade-In Appraisal Requests
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1">Appraise old watches, offer valuations, and manage buyback discounts.</p>
                  </div>

                  <div className="bg-neutral-900/10 border border-neutral-900 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-900">
                            <th className="p-4">Request ID</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Timepiece Details</th>
                            <th className="p-4">System Est</th>
                            <th className="p-4 text-center">Status / Offer</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 text-neutral-350">
                          {tradeInRequests.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="p-6 text-center text-neutral-500">No appraisal requests submitted</td>
                            </tr>
                          ) : (
                            tradeInRequests.map((req) => (
                              <tr key={req.id} className="hover:bg-neutral-900/20 transition-colors">
                                <td className="p-4 font-mono font-semibold text-neutral-200">{req.id}</td>
                                <td className="p-4">
                                  <span className="font-bold text-neutral-300 block">{req.name}</span>
                                  <span className="text-[10px] text-neutral-500 block font-mono mt-0.5">{req.email}</span>
                                  <span className="text-[10px] text-neutral-500 block font-mono">{req.phone}</span>
                                </td>
                                <td className="p-4 text-neutral-300">
                                  <span className="font-bold block">{req.brand} {req.model}</span>
                                  <span className="text-[10px] text-neutral-500 block mt-0.5">Purchased: {req.purchaseYear} &bull; Set: {req.boxPapers}</span>
                                  <span className="text-[10px] text-neutral-550 block font-sans mt-1">Condition: <strong className="text-amber-500">{req.condition}</strong></span>
                                  {req.notes && <span className="text-[10px] block text-neutral-550 mt-1 italic">"{req.notes}"</span>}
                                </td>
                                <td className="p-4 font-sans font-bold text-neutral-100">{req.estimatedRange}</td>
                                <td className="p-4 text-center">
                                  <div className="flex flex-col gap-1 items-center">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold border ${getStatusColor(req.status)}`}>
                                      {req.status}
                                    </span>
                                    {req.counterOffer && (
                                      <span className="text-xs font-mono font-bold text-neutral-300 mt-1">Offer: ₹{req.counterOffer.toLocaleString("en-IN")}</span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center gap-1.5">
                                    {req.status === "Pending" && (
                                      <button
                                        onClick={() => {
                                          const offer = window.prompt(`Enter buyback counter-offer price (in ₹) for ${req.brand} ${req.model}:`);
                                          if (offer) {
                                            const cleanedOffer = offer.replace(/[^\d]/g, "");
                                            if (cleanedOffer && !isNaN(cleanedOffer)) {
                                              updateTradeInStatus(req.id, "Counter-Offered", Number(cleanedOffer));
                                              logAdminAction(`Sent counter-offer of ₹${Number(cleanedOffer).toLocaleString("en-IN")} on appraisal #${req.id}`);
                                              triggerToast("Appraisal counter-offer logged successfully!");
                                            } else {
                                              triggerToast("Invalid price entered. Please use numbers only.");
                                            }
                                          }
                                        }}
                                        className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[9px] font-bold uppercase rounded"
                                      >
                                        Counter Offer
                                      </button>
                                    )}
                                    {req.status !== "Cancelled" && req.status !== "Accepted" && req.status !== "Rejected" && (
                                      <button
                                        onClick={() => {
                                          updateTradeInStatus(req.id, "Rejected");
                                          logAdminAction(`Rejected buyback request #${req.id}`);
                                          triggerToast("Trade-in request rejected.");
                                        }}
                                        className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-500 hover:text-white text-[9px] font-bold uppercase rounded"
                                      >
                                        Reject
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* TAB: PROMO BANNER */}
            {activeTab === "promo" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-amber-500 tracking-wider">PROMO BANNER SETTINGS</h2>
                    <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Manage Global Sales Banner</p>
                  </div>
                  <button 
                    onClick={() => updatePromoBanner({ isVisible: !promoBanner.isVisible })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${promoBanner.isVisible ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-emerald-500 text-neutral-950 hover:bg-emerald-400'}`}
                  >
                    {promoBanner.isVisible ? "Disable Banner" : "Enable Banner"}
                  </button>
                </div>
                
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Banner Title</label>
                    <input 
                      type="text" 
                      defaultValue={promoBanner.title}
                      onBlur={(e) => updatePromoBanner({ title: e.target.value })}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:outline-none transition-all text-neutral-200 font-bold"
                      placeholder="e.g. CHRONEX EXCLUSIVES SALE"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Banner Subtitle</label>
                    <input 
                      type="text" 
                      defaultValue={promoBanner.subtitle}
                      onBlur={(e) => updatePromoBanner({ subtitle: e.target.value })}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:outline-none transition-all text-neutral-200"
                      placeholder="e.g. Complimentary Winder with Automatics. Ends in:"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Countdown End Date</label>
                    <input 
                      type="datetime-local" 
                      defaultValue={promoBanner.endDate ? new Date(new Date(promoBanner.endDate).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0,16) : ""}
                      onChange={(e) => updatePromoBanner({ endDate: new Date(e.target.value).toISOString() })}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:outline-none transition-all text-neutral-200 w-full sm:w-auto"
                    />
                    <span className="text-[9px] text-neutral-500 uppercase mt-1">This will automatically drive the live countdown timer on the frontend.</span>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* PRODUCT CRUD MODAL: ADD TIMEPIECE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-10">
          <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          
          <div className="relative bg-neutral-900 border border-neutral-800 p-8 rounded-3xl w-full max-w-2xl shadow-2xl z-10 my-auto">
            <h3 className="text-lg font-serif font-bold text-neutral-200 mb-6 border-b border-neutral-850 pb-3 flex items-center gap-2">
              <Plus size={18} className="text-amber-500" />
              <span>Add Watch to Showroom Inventory</span>
            </h3>

            <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              
              {/* CORE INFO GROUP */}
              <h4 className="sm:col-span-2 text-xs uppercase tracking-widest font-bold text-amber-500 border-b border-neutral-850 pb-1 mt-2">1. Core Details</h4>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Watch Name / Model</label>
                <input
                  type="text" required placeholder="e.g. Submariner Date"
                  value={prodName} onChange={(e) => setProdName(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Watch Brand</label>
                <select
                  value={prodBrand} onChange={(e) => setProdBrand(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-300 focus:outline-none cursor-pointer"
                >
                  {["Rolex", "Titan", "Casio", "Fastrack", "Timex", "Fossil", "Omega", "Tissot", "Rado", "TAG Heuer", "G-Shock", "Citizen"].map((b) => (
                    <option key={b} value={b} className="bg-neutral-900">{b}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Selling Price (INR)</label>
                <input
                  type="number" required placeholder="e.g. 68500"
                  value={prodPrice} onChange={(e) => setProdPrice(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Gender Category</label>
                <select
                  value={prodCategory} onChange={(e) => setProdCategory(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-300 focus:outline-none cursor-pointer"
                >
                  <option value="Men" className="bg-neutral-900">Men</option>
                  <option value="Women" className="bg-neutral-900">Women</option>
                  <option value="Unisex" className="bg-neutral-900">Unisex</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Boutique Style</label>
                <select
                  value={prodStyle} onChange={(e) => setProdStyle(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-300 focus:outline-none cursor-pointer"
                >
                  <option value="Luxury" className="bg-neutral-900">Luxury</option>
                  <option value="Sport" className="bg-neutral-900">Sport</option>
                  <option value="Formal" className="bg-neutral-900">Formal</option>
                  <option value="Casual" className="bg-neutral-900">Casual</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Watch Movement</label>
                <select
                  value={prodMovement} onChange={(e) => setProdMovement(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-300 focus:outline-none cursor-pointer"
                >
                  <option value="Automatic" className="bg-neutral-900">Automatic (Mechanical)</option>
                  <option value="Quartz" className="bg-neutral-900">Quartz (Battery)</option>
                  <option value="Solar" className="bg-neutral-900">Solar (Eco-Drive)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Stock Quantity</label>
                <input
                  type="number" min="0" placeholder="e.g. 10" required
                  value={productStock} onChange={(e) => setProductStock(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Image URL (Unsplash/Web)</label>
                <input
                  type="url" placeholder="Paste image address or leave empty for default placeholder"
                  value={prodImageUrl} onChange={(e) => setProdImageUrl(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Story Description</label>
                <textarea
                  rows="3" required placeholder="Describe the watch's craftsmanship, heritage, and style appeal..."
                  value={prodDescription} onChange={(e) => setProdDescription(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none resize-none"
                ></textarea>
              </div>

              {/* TECHNICAL SPECS GROUP */}
              <h4 className="sm:col-span-2 text-xs uppercase tracking-widest font-bold text-amber-500 border-b border-neutral-850 pb-1 mt-4">2. Technical Specifications</h4>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Calibre / Engine (Spec)</label>
                <input
                  type="text" placeholder="e.g. Rolex Calibre 3235"
                  value={specMovement} onChange={(e) => setSpecMovement(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Case Diameter (Spec)</label>
                <input
                  type="text" placeholder="e.g. 41 mm"
                  value={specDiameter} onChange={(e) => setSpecDiameter(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Case Material (Spec)</label>
                <input
                  type="text" placeholder="e.g. Oystersteel"
                  value={specMaterial} onChange={(e) => setSpecMaterial(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Strap Details (Spec)</label>
                <input
                  type="text" placeholder="e.g. Oyster Bracelet"
                  value={specStrap} onChange={(e) => setSpecStrap(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Waterproof Depth (Spec)</label>
                <input
                  type="text" placeholder="e.g. 300 meters"
                  value={specWater} onChange={(e) => setSpecWater(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Glass Crystal (Spec)</label>
                <input
                  type="text" placeholder="e.g. Sapphire Crystal"
                  value={specGlass} onChange={(e) => setSpecGlass(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Warranty Coverage (Spec)</label>
                <input
                  type="text" placeholder="e.g. 5 Years International Warranty"
                  value={specWarranty} onChange={(e) => setSpecWarranty(e.target.value)}
                  className="bg-neutral-950 border border-neutral-850 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              {/* Action buttons */}
              <div className="sm:col-span-2 flex gap-4 mt-6 border-t border-neutral-850 pt-6">
                <button
                  type="button" onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-3 bg-neutral-950 border border-neutral-855 text-neutral-400 text-xs uppercase tracking-widest rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/15"
                >
                  Publish Watch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT CRUD MODAL: EDIT TIMEPIECE */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-10">
          <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm" onClick={() => setShowEditModal(false)}></div>
          
          <div className="relative bg-neutral-900 border border-neutral-800 p-8 rounded-3xl w-full max-w-2xl shadow-2xl z-10 my-auto">
            <h3 className="text-lg font-serif font-bold text-neutral-200 mb-6 border-b border-neutral-850 pb-3 flex items-center gap-2">
              <Edit3 size={18} className="text-amber-500" />
              <span>Modify Timepiece Details ({editingProductId})</span>
            </h3>

            <form onSubmit={handleEditProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              
              <h4 className="sm:col-span-2 text-xs uppercase tracking-widest font-bold text-amber-500 border-b border-neutral-850 pb-1">1. Core Details</h4>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Watch Name</label>
                <input
                  type="text" required
                  value={prodName} onChange={(e) => setProdName(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Brand</label>
                <select
                  value={prodBrand} onChange={(e) => setProdBrand(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-300 focus:outline-none"
                >
                  {["Rolex", "Titan", "Casio", "Fastrack", "Timex", "Fossil", "Omega", "Tissot", "Rado", "TAG Heuer", "G-Shock", "Citizen"].map((b) => (
                    <option key={b} value={b} className="bg-neutral-900">{b}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Price (INR)</label>
                <input
                  type="number" required
                  value={prodPrice} onChange={(e) => setProdPrice(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Category</label>
                <select
                  value={prodCategory} onChange={(e) => setProdCategory(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-300 focus:outline-none"
                >
                  <option value="Men" className="bg-neutral-900">Men</option>
                  <option value="Women" className="bg-neutral-900">Women</option>
                  <option value="Unisex" className="bg-neutral-900">Unisex</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Style</label>
                <select
                  value={prodStyle} onChange={(e) => setProdStyle(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-300 focus:outline-none"
                >
                  <option value="Luxury" className="bg-neutral-900">Luxury</option>
                  <option value="Sport" className="bg-neutral-900">Sport</option>
                  <option value="Formal" className="bg-neutral-900">Formal</option>
                  <option value="Casual" className="bg-neutral-900">Casual</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Movement</label>
                <select
                  value={prodMovement} onChange={(e) => setProdMovement(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-300 focus:outline-none"
                >
                  <option value="Automatic" className="bg-neutral-900">Automatic</option>
                  <option value="Quartz" className="bg-neutral-900">Quartz</option>
                  <option value="Solar" className="bg-neutral-900">Solar</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Stock Quantity</label>
                <input
                  type="number" min="0" required
                  value={productStock} onChange={(e) => setProductStock(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Image URL</label>
                <input
                  type="url" required
                  value={prodImageUrl} onChange={(e) => setProdImageUrl(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Description</label>
                <textarea
                  rows="3" required
                  value={prodDescription} onChange={(e) => setProdDescription(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none resize-none"
                ></textarea>
              </div>

              <h4 className="sm:col-span-2 text-xs uppercase tracking-widest font-bold text-amber-500 border-b border-neutral-850 pb-1 mt-4">2. Technical Specifications</h4>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Calibre</label>
                <input
                  type="text"
                  value={specMovement} onChange={(e) => setSpecMovement(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Diameter</label>
                <input
                  type="text"
                  value={specDiameter} onChange={(e) => setSpecDiameter(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Case Material</label>
                <input
                  type="text"
                  value={specMaterial} onChange={(e) => setSpecMaterial(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Strap Details</label>
                <input
                  type="text"
                  value={specStrap} onChange={(e) => setSpecStrap(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Waterproofing</label>
                <input
                  type="text"
                  value={specWater} onChange={(e) => setSpecWater(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Glass Crystal</label>
                <input
                  type="text"
                  value={specGlass} onChange={(e) => setSpecGlass(e.target.value)}
                  className="bg-neutral-950 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400">Warranty</label>
                <input
                  type="text"
                  value={specWarranty} onChange={(e) => setSpecWarranty(e.target.value)}
                  className="bg-neutral-955 border border-neutral-855 rounded-xl py-2.5 px-4 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex gap-4 mt-6 border-t border-neutral-850 pt-6">
                <button
                  type="button" onClick={() => setShowEditModal(false)}
                  className="w-1/2 py-3 bg-neutral-955 border border-neutral-855 text-neutral-400 text-xs uppercase tracking-widest rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/15"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOUTIQUE INVOICE DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-10">
          <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          
          <div className="relative bg-neutral-900 border border-neutral-850 p-8 rounded-3xl w-full max-w-3xl shadow-2xl z-10 my-auto">
            
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-850 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold tracking-[0.25em] text-amber-400 font-serif leading-none">
                    CHRONEX
                  </span>
                  <span className="text-[9px] tracking-widest text-neutral-400 font-sans uppercase">
                    Boutique Invoice
                  </span>
                </div>
                <h3 className="text-xs text-neutral-500 mt-1 font-mono">Invoice ID: {selectedOrder.id}</h3>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-955/40 border border-emerald-900 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full font-sans">
                  Paid & Confirmed
                </span>
                <span className={`px-3 py-1 border text-[10px] font-bold uppercase tracking-widest rounded-full font-sans ${getOrderStatusColor(selectedOrder.orderStatus)}`}>
                  {selectedOrder.orderStatus}
                </span>
              </div>
            </div>

            {/* Customer & Shipping Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs mb-6">
              <div className="p-4 rounded-2xl bg-neutral-950/50 border border-neutral-850">
                <h4 className="text-[10px] uppercase tracking-widest text-amber-500 font-bold mb-3 font-sans">👤 Client Information</h4>
                <div className="flex flex-col gap-2 text-neutral-300">
                  <div>Name: <strong className="text-neutral-100 font-sans">{selectedOrder.customer.name}</strong></div>
                  <div>Phone: <a href={`tel:${selectedOrder.customer.phone}`} className="text-amber-500/80 hover:underline font-mono">{selectedOrder.customer.phone}</a></div>
                  <div>Email: <a href={`mailto:${selectedOrder.customer.email}`} className="text-neutral-450 hover:underline font-sans">{selectedOrder.customer.email}</a></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/50 border border-neutral-850">
                <h4 className="text-[10px] uppercase tracking-widest text-amber-500 font-bold mb-3 font-sans">📍 Dispatch Destination</h4>
                <div className="flex flex-col gap-1.5 text-neutral-300">
                  <div className="leading-relaxed font-sans">{selectedOrder.customer.address}</div>
                  <div className="font-sans">{selectedOrder.customer.cityState}</div>
                  <div className="font-mono tracking-wider text-neutral-400 font-bold">Pincode: {selectedOrder.customer.pincode}</div>
                </div>
              </div>
            </div>

            {/* Itemized Watch List */}
            <div className="border border-neutral-850 rounded-2xl overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[9px] font-bold border-b border-neutral-855">
                      <th className="p-3 font-sans">Timepiece</th>
                      <th className="p-3 text-center font-sans">Unit Price</th>
                      <th className="p-3 text-center font-sans">Qty</th>
                      <th className="p-3 text-right font-sans">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-850 text-neutral-300 font-sans">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-900/10 transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-950 border border-neutral-850 shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-semibold text-neutral-100 block">{item.brand}</span>
                            <span className="text-neutral-405 text-[11px] block">{item.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-center font-medium">₹{item.price.toLocaleString("en-IN")}</td>
                        <td className="p-3 text-center font-bold">{item.quantity}</td>
                        <td className="p-3 text-right font-bold text-neutral-100">₹{(item.price * item.quantity).toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Price Calculations & Payment Audit */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-t border-neutral-850 pt-6">
              {/* Payment Audit */}
              <div className="text-[10px] text-neutral-500 font-mono flex flex-col gap-1.5 p-3 rounded-xl bg-neutral-950 border border-neutral-850 max-w-sm w-full">
                <span className="text-[9px] text-amber-500 font-bold uppercase tracking-widest font-sans">💳 Simulated Transaction Audit</span>
                <div>Gateway: <strong className="text-neutral-400">{selectedOrder.paymentMethod}</strong></div>
                <div>Payment ID: <strong className="text-neutral-400 select-all">{selectedOrder.paymentDetails.paymentId}</strong></div>
                <div>Transaction ID: <strong className="text-neutral-400 select-all">{selectedOrder.paymentDetails.transactionId}</strong></div>
                <div>Timestamp: <strong className="text-neutral-400">{new Date(selectedOrder.date).toLocaleString("en-IN")}</strong></div>
              </div>

              {/* Invoice Calculations */}
              <div className="w-full sm:w-64 flex flex-col gap-2 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span className="font-sans">Cart Subtotal</span>
                  <span className="font-sans text-neutral-300">₹{selectedOrder.total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans">Insured Shipping</span>
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[9px] mt-0.5 font-sans">Free (Pan-India)</span>
                </div>
                <div className="flex justify-between border-t border-neutral-800 pt-2 text-neutral-200 font-bold">
                  <span className="text-neutral-150 text-sm font-sans">Total Paid</span>
                  <span className="text-amber-400 text-base font-sans font-extrabold">₹{selectedOrder.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex gap-4 mt-6 border-t border-neutral-850 pt-6">
              <button
                type="button"
                onClick={() => {
                  triggerToast("Packing slip generated. Opening print queue...");
                  setTimeout(() => window.print(), 1000);
                }}
                className="w-1/2 py-3 bg-neutral-955 border border-neutral-850 text-neutral-300 hover:text-amber-400 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 font-sans"
              >
                <span>Print Packing Slip</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/10 font-sans"
              >
                Close Invoice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
