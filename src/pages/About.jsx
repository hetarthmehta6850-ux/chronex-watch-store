import { Link } from "react-router-dom";
import { ShieldCheck, Calendar, Award, Sparkles, MapPin, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">
            Our Legacy
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
            The Chronex Story
          </h1>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
          <p className="text-neutral-400 text-sm mt-4 leading-relaxed">
            For over a decade, Chronex has been a trusted custodian of horological artistry in Vadodara, offering a curated physical boutique where timepieces are celebrated.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-amber-500 text-xs tracking-[0.25em] uppercase font-bold">Since 2014</span>
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-neutral-100 tracking-wide leading-tight">
              An Absolute Commitment to Authenticity
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              Chronex was founded in 2014 by a family of watch enthusiasts with a simple mission: to establish a world-class showroom in Vadodara where customers could discover authentic, high-quality watches without leaving Gujarat. 
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              Starting as a modest shop, we have grown into one of Vadodara's most respected multi-brand retailers. Located in the premium commercial hub of Alkapuri, our showroom houses everything from essential everyday timepieces like Fastrack and Casio to premium automatic movements like Seiko, Tissot, Rado, and luxury Swiss markers.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              We do not just sell watches; we celebrate birthdays, promotions, anniversaries, and achievements. Every timepiece that leaves our showroom carries a promise of 100% authenticity, backed by official brand warranties and our dedicated in-house service lab.
            </p>
          </div>

          {/* Visual Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600"
                alt="Premium silver watch showcase"
                className="w-full h-full object-cover opacity-75"
              />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 mt-8">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600"
                alt="Luxury gold watch showcase"
                className="w-full h-full object-cover opacity-75"
              />
            </div>
            
            {/* Background absolute decor */}
            <div className="absolute -z-10 w-48 h-48 bg-amber-500/10 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="border-t border-neutral-900 pt-24 mb-24">
          <div className="text-center mb-16">
            <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">Our Philosophy</span>
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-neutral-100 tracking-wide mt-2">
              The Boutique Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-neutral-900/20 border border-neutral-900 rounded-2xl text-center flex flex-col items-center">
              <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-full mb-6 text-amber-500">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-200">100% Genuine Guarantee</h3>
              <p className="text-xs text-neutral-500 mt-3 leading-relaxed max-w-xs">
                We are authorized retailers for every brand we house. Every watch comes in official packaging with a certified stamping of authenticity.
              </p>
            </div>

            <div className="p-8 bg-neutral-900/20 border border-neutral-900 rounded-2xl text-center flex flex-col items-center">
              <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-full mb-6 text-amber-500">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-200">Watchmaking Expertise</h3>
              <p className="text-xs text-neutral-500 mt-3 leading-relaxed max-w-xs">
                Our in-store specialists are horological experts who guide you on case materials, crystal qualities, and movement calibres tailored to your lifestyle.
              </p>
            </div>

            <div className="p-8 bg-neutral-900/20 border border-neutral-900 rounded-2xl text-center flex flex-col items-center">
              <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-full mb-6 text-amber-500">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-200">Relationship First</h3>
              <p className="text-xs text-neutral-500 mt-3 leading-relaxed max-w-xs">
                For us, a purchase is the start of a relationship. Our dedicated service center in Vadodara supports you with lifelong maintenance.
              </p>
            </div>
          </div>
        </div>

        {/* Call To Action Block */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-900 text-center flex flex-col items-center max-w-4xl mx-auto shadow-xl">
          <MapPin className="text-amber-500 mb-4 animate-bounce" size={32} />
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-neutral-100 tracking-wide">
            Visit Our Showroom In Alkapuri
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm max-w-xl leading-relaxed mt-3">
            Experience our comprehensive collections first-hand. Located centrally opposite Welcome Hotel in Alkapuri, Vadodara. Free valet parking is available for all boutique visitors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/collections"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10"
            >
              Browse Catalog
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-neutral-950 border border-neutral-850 hover:border-neutral-750 text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Get Directions & Book Slot
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
