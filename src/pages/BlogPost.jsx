import { useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogPosts } = useContext(ShopContext);
  const post = blogPosts.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) {
      navigate("/blog");
    }
  }, [post, navigate]);

  if (!post) return null;

  // Get 2 related posts
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-32 pb-24 font-sans selection:bg-amber-500/30">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumbs & Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to="/blog" 
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-amber-500 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft size={14} /> Back to Magazine
          </Link>
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-neutral-500">
            <Link to="/blog" className="hover:text-neutral-300">Magazine</Link>
            <ChevronRight size={10} className="text-neutral-700" />
            <span className="text-neutral-400">{post.category}</span>
          </div>
        </div>

        {/* Article Title & Metadata */}
        <header className="mb-12">
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] uppercase tracking-widest font-bold rounded-full">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-neutral-100 mt-4 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400 pb-6 border-b border-neutral-900">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-300 border border-neutral-700">
                {post.author.charAt(0)}
              </div>
              <span className="font-semibold text-neutral-300">By {post.author}</span>
            </div>
            <div className="flex items-center gap-1.5"><Calendar size={14} className="text-neutral-600" /> {post.date}</div>
            <div className="flex items-center gap-1.5"><Clock size={14} className="text-neutral-600" /> {post.readTime}</div>
          </div>
        </header>

        {/* Feature Image */}
        <div className="aspect-video w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-900 mb-12 shadow-2xl">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none mb-16">
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-sans mb-6">
            {post.content}
          </p>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans mb-6">
            In luxury horology, details define quality. From the finish of the hand-beveled edges to the choice of alloys in the balance spring, high-end watches demonstrate engineering limits. Proper care, regular servicing at authorized labs (every 3 to 5 years), and correct winding techniques will preserve the life and value of these mechanical treasures for generations.
          </p>
        </article>

        <hr className="border-neutral-900 mb-12" />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="font-serif font-bold text-xl text-neutral-250 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link 
                  key={related.id} 
                  to={`/blog/${related.id}`} 
                  className="p-5 bg-neutral-900/30 border border-neutral-900 hover:border-neutral-800 rounded-2xl flex flex-col gap-3 group transition-all"
                >
                  <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold">{related.category}</span>
                  <h4 className="font-serif font-bold text-base text-neutral-200 group-hover:text-amber-500 transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <div className="mt-auto pt-4 flex justify-between items-center text-[10px] text-neutral-500 uppercase tracking-widest">
                    <span>{related.date}</span>
                    <span>{related.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPost;
