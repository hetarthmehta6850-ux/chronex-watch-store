import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Bot, HelpCircle } from "lucide-react";

const SUPPORT_TOPICS = [
  { id: "emi", label: "💳 EMI Options & Banks", response: "We offer easy 3, 6, 9, and 12-month EMI options on all purchases above ₹15,000. Partner banks include HDFC, SBI, ICICI, Axis, and American Express. You can check the detailed breakdown using the 'Size Guide & EMI Calculator' on any product page!" },
  { id: "warranty", label: "🛡️ Warranty & Authenticity", response: "Every watch at Chronex is 100% original and comes directly from the brand. You receive the official Brand Warranty card (typically 2 years) along with Chronex's certified physical certificate of authenticity." },
  { id: "shipping", label: "📦 Delivery & Shipping", response: "We provide free, fully-insured delivery across India. Your timepiece will be dispatched within 24 hours of confirmation via secure luxury shipping partners (BlueDart/Sequel). Delivery takes 2-4 business days depending on your pincode." },
  { id: "location", label: "📍 Showroom & Hours", response: "Our boutique is located in Alkapuri, Vadodara, Gujarat. We are open Tuesday to Sunday from 11:00 AM to 8:00 PM. We offer dedicated valet parking for all clients." },
  { id: "appointment", label: "📅 Book Boutique Slot", response: "You can book a premium showroom consultation slot from the product details page or the contact page. We will reserve a private viewing lounge and keep your chosen timepieces ready." }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Namaste! Welcome to Chronex. How can I assist you with your luxury watch selection today?" }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleTopicClick = (topic) => {
    const userMsg = { sender: "user", text: topic.label };
    const botMsg = { sender: "bot", text: topic.response };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const userMsg = { sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate bot thinking and matching query
    setTimeout(() => {
      let botResponse = "I'm sorry, I'm still learning. Could you please select one of the support topics below or contact us via WhatsApp for instant showroom support?";
      const lowerText = userText.toLowerCase();

      if (lowerText.includes("emi") || lowerText.includes("installment") || lowerText.includes("bank")) {
        botResponse = SUPPORT_TOPICS.find(t => t.id === "emi").response;
      } else if (lowerText.includes("warranty") || lowerText.includes("genuine") || lowerText.includes("fake") || lowerText.includes("original")) {
        botResponse = SUPPORT_TOPICS.find(t => t.id === "warranty").response;
      } else if (lowerText.includes("shipping") || lowerText.includes("delivery") || lowerText.includes("pincode") || lowerText.includes("courier")) {
        botResponse = SUPPORT_TOPICS.find(t => t.id === "shipping").response;
      } else if (lowerText.includes("location") || lowerText.includes("address") || lowerText.includes("where") || lowerText.includes("hours") || lowerText.includes("timings")) {
        botResponse = SUPPORT_TOPICS.find(t => t.id === "location").response;
      } else if (lowerText.includes("appointment") || lowerText.includes("book") || lowerText.includes("visit") || lowerText.includes("showroom")) {
        botResponse = SUPPORT_TOPICS.find(t => t.id === "appointment").response;
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] font-sans">
      {/* Chat Bubble Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 md:w-14 md:h-14 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 transition-all animate-bounce"
          aria-label="Open support chat"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[350px] sm:w-[385px] h-[500px] bg-neutral-950/95 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col backdrop-blur-md animate-scale-in">
          
          {/* Header */}
          <div className="bg-neutral-900/50 border-b border-neutral-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-neutral-200">Chronex Concierge</h3>
                <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online Support
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs border ${
                  msg.sender === "user" 
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
                    : "bg-neutral-900 border-neutral-800 text-neutral-300"
                }`}>
                  {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-amber-500 text-neutral-950 font-medium rounded-tr-none"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ / Topics */}
          <div className="p-3 border-t border-neutral-900 bg-neutral-950/60 flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold px-1 flex items-center gap-1">
              <HelpCircle size={10} /> Choose a support topic
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 px-1 custom-scrollbar shrink-0">
              {SUPPORT_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic)}
                  className="whitespace-nowrap px-3.5 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-500 hover:border-amber-500/30 text-[10px] uppercase font-bold tracking-wider rounded-full transition-colors"
                >
                  {topic.label.split(" ")[1] || topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-neutral-900 bg-neutral-950 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about EMI, Shipping, Showroom..."
              className="flex-grow bg-neutral-900 border border-neutral-850 focus:border-amber-500/60 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none"
            />
            <button
              type="submit"
              className="w-10 h-10 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl flex items-center justify-center shrink-0 transition-colors"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};

export default Chatbot;
