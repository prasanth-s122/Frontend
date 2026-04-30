import { Heart, MessageSquare, Send, Bookmark } from 'lucide-react';

export default function Post({ post, currentUser, onLike }) {
  const isLiked = post.likes.includes(currentUser);

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-900/50 rounded-xl mb-8 max-w-lg w-full mx-auto shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 overflow-hidden group relative">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500/50 rounded-br-xl pointer-events-none"></div>

      {/* Post Header */}
      <div className="flex items-center p-4 border-b border-slate-800/50">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-[1px] shadow-[0_0_10px_rgba(6,182,212,0.3)] transform group-hover:scale-105 transition-transform">
          <div className="bg-slate-950 rounded-lg w-full h-full flex items-center justify-center">
            <span className="text-sm font-bold text-cyan-400 font-mono">{post.username.charAt(0).toUpperCase()}</span>
          </div>
        </div>
        <div className="ml-4 flex flex-col">
          <span className="font-bold text-sm text-cyan-100 tracking-wider uppercase">{post.username}</span>
          <span className="text-[10px] text-cyan-600/70 font-mono uppercase tracking-widest">Sys.Time: 00:00:00</span>
        </div>
      </div>

      {/* Post Content */}
      {post.imageUrl ? (
        <div className="w-full bg-slate-950 flex items-center justify-center overflow-hidden relative border-y border-slate-800/50">
          <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay pointer-events-none z-10"></div>
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 hover:scale-[1.02] filter contrast-125 saturate-150"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2564&auto=format&fit=crop';
            }}
          />
        </div>
      ) : (
        <div className="w-full bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] bg-slate-950 min-h-[200px] flex items-center justify-center p-8 text-center border-y border-slate-800/50 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none"></div>
          <p className="text-xl font-medium text-cyan-50 leading-relaxed font-mono drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
            &gt; {post.caption}
          </p>
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4 bg-slate-900/40">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6">
            <button 
              onClick={() => onLike(post.id)}
              className="focus:outline-none transition-transform hover:scale-125 active:scale-90 relative"
            >
              <Heart 
                className={`w-6 h-6 transition-all duration-300 ${isLiked ? 'fill-fuchsia-500 text-fuchsia-500 drop-shadow-[0_0_12px_rgba(217,70,239,0.8)]' : 'text-slate-500 hover:text-fuchsia-400 drop-shadow-none'}`} 
              />
            </button>
            <button className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
              <MessageSquare className="w-6 h-6 text-slate-500 hover:text-cyan-400 transition-colors" />
            </button>
            <button className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
              <Send className="w-6 h-6 text-slate-500 hover:text-cyan-400 transition-colors" />
            </button>
          </div>
          <button className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
            <Bookmark className="w-6 h-6 text-slate-500 hover:text-cyan-400 transition-colors" />
          </button>
        </div>
        
        {/* Likes Count */}
        <div className="font-bold text-xs text-cyan-400 mb-2 font-mono tracking-wider">
          LIKES_COUNT: {post.likes.length}
        </div>

        {/* Caption for image posts */}
        {post.imageUrl && (
          <div className="text-sm text-slate-300 leading-relaxed font-mono mt-2">
            <span className="font-bold text-fuchsia-400 mr-2 hover:text-fuchsia-300 cursor-pointer drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]">[{post.username}]</span>
            {post.caption}
          </div>
        )}
      </div>
    </div>
  );
}
