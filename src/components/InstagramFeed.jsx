import { Heart, MessageCircle } from "lucide-react";

const InstagramIcon = ({ size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600",
    likes: "1,245",
    comments: "42"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600",
    likes: "956",
    comments: "18"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
    likes: "1,872",
    comments: "56"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600",
    likes: "743",
    comments: "12"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600",
    likes: "2,110",
    comments: "64"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600",
    likes: "1,438",
    comments: "31"
  }
];

const InstagramFeed = () => {
  return (
    <section className="py-24 border-t border-neutral-900 bg-neutral-950 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-500 mb-4">
            <InstagramIcon size={14} />
            <span className="text-[10px] uppercase tracking-widest font-bold">@chronex_vadodara</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-100 tracking-wide">
            Shared on #ChronexClub
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
          <p className="text-neutral-400 text-xs max-w-md mx-auto mt-3">
            Follow our curation of horological excellence and lifestyle wrist shots. 
          </p>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {posts.map((post) => (
            <a 
              key={post.id} 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-900 block"
            >
              <img 
                src={post.image} 
                alt="Instagram watch lifestyle post" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white text-sm font-bold font-sans">
                <div className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
                  <Heart size={16} className="fill-white group-hover:fill-amber-500" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
                  <MessageCircle size={16} className="fill-white group-hover:fill-amber-500" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-350 hover:text-amber-500 border border-neutral-800 hover:border-amber-500/30 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
          >
            <InstagramIcon size={14} /> Follow on Instagram
          </a>
        </div>

      </div>
    </section>
  );
};

export default InstagramFeed;
