import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react";

const Blog = () => {
  const { blogPosts } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", "Guides", "Swiss Watches", "Care"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans selection:bg-amber-500/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-semibold">Chronex Magazine</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-100 mt-3 mb-6">
            The Horological Journal
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Delve into Swiss mechanics, watch collecting guides, maintenance advice, and the rich history of high-end horology.
          </p>
        </div>

        {/* Toolbar (Filters & Search) */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-neutral-900">
          
          {/* Categories Tab list */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 border-amber-500 text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-250 hover:bg-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/60 rounded-xl py-3 pl-11 pr-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
            />
            <Search size={16} className="absolute left-4 top-3.5 text-neutral-600" />
          </div>

        </div>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-neutral-900/30 border border-neutral-900 rounded-3xl overflow-hidden hover:border-neutral-800 transition-all group flex flex-col h-full"
              >
                <Link to={`/blog/${post.id}`} className="block aspect-video overflow-hidden bg-neutral-950 relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[10px] text-amber-500 font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </Link>

                <div className="p-6 md:p-8 flex flex-col grow">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-neutral-200 mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>

                  <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-6 font-sans">
                    {post.content}
                  </p>

                  <div className="mt-auto pt-5 border-t border-neutral-900/50 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-1">
                      <User size={12} /> By {post.author}
                    </span>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-[10px] uppercase tracking-widest text-amber-500 font-bold flex items-center gap-1 hover:text-amber-400 transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-neutral-900/10 border border-neutral-900 rounded-3xl">
            <p className="text-neutral-500 text-sm italic">No articles found matching those filters.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Blog;
