import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Camera, Image as ImageIcon, Home, Search, Compass, MessageSquare, Bell, User, Edit3, X } from 'lucide-react';
import Post from '../components/Post';

export default function Landing() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ imageUrl: '', caption: '' });
  
  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ username: '', email: '' });
  const [profileError, setProfileError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('activeUser'));
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
      setProfileForm({ username: user.username, email: user.email });
    }

    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(savedPosts);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('activeUser');
    navigate('/login');
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.caption) return;

    const post = {
      id: Date.now().toString(),
      username: currentUser.username,
      imageUrl: newPost.imageUrl,
      caption: newPost.caption,
      likes: []
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setNewPost({ imageUrl: '', caption: '' });
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(currentUser.username);
        let updatedLikes;
        if (hasLiked) {
          updatedLikes = post.likes.filter(name => name !== currentUser.username);
        } else {
          updatedLikes = [...post.likes, currentUser.username];
        }
        return { ...post, likes: updatedLikes };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setProfileError('');
    
    const { username: newUsername, email: newEmail } = profileForm;
    const oldUsername = currentUser.username;

    if (!newUsername || !newEmail) {
      setProfileError('Missing parameters.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check for username conflict (ignoring self)
    const conflict = users.find(u => u.username === newUsername && u.username !== oldUsername);
    if (conflict) {
      setProfileError('Identity conflict: Username allocated.');
      return;
    }

    // 1. Update Master Users Array
    const updatedUsers = users.map(u => {
      if (u.username === oldUsername) {
        return { ...u, username: newUsername, email: newEmail };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // 2. Update Active User
    const updatedActiveUser = { ...currentUser, username: newUsername, email: newEmail };
    localStorage.setItem('activeUser', JSON.stringify(updatedActiveUser));
    setCurrentUser(updatedActiveUser);

    // 3. Update Posts (Authorship and Likes)
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = savedPosts.map(post => {
      let modifiedPost = { ...post };
      
      // Update Author
      if (modifiedPost.username === oldUsername) {
        modifiedPost.username = newUsername;
      }
      
      // Update Likes array
      if (modifiedPost.likes.includes(oldUsername)) {
        modifiedPost.likes = modifiedPost.likes.map(name => name === oldUsername ? newUsername : name);
      }
      
      return modifiedPost;
    });

    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setIsEditingProfile(false);
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-950 pb-20 font-mono text-cyan-50 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Decorative background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-2xl border-b border-cyan-900/50 sticky top-0 z-40 shadow-[0_4px_30px_rgba(6,182,212,0.05)]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer w-1/4">
            <div className="bg-slate-950 border border-cyan-500/30 p-1.5 rounded-xl transform group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Camera className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
            </div>
            <span className="text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 ml-2 hidden sm:block uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
              Nexus
            </span>
          </div>

          {/* Social Icons (Center) */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 flex-1">
            <button className="text-cyan-400 transition-transform hover:scale-110 active:scale-95 group relative drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              <Home className="w-6 h-6 sm:w-7 sm:h-7" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-fuchsia-500 rounded-full shadow-[0_0_5px_rgba(217,70,239,1)]"></div>
            </button>
            <button className="text-slate-500 hover:text-cyan-400 transition-all hover:scale-110 active:scale-95">
              <Search className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
            <button className="text-slate-500 hover:text-cyan-400 transition-all hover:scale-110 active:scale-95 hidden sm:block">
              <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
            <button className="text-slate-500 hover:text-cyan-400 transition-all hover:scale-110 active:scale-95 relative">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-fuchsia-500 text-slate-950 text-[10px] font-bold flex items-center justify-center rounded-sm border border-slate-900 shadow-[0_0_5px_rgba(217,70,239,0.8)]">3</div>
            </button>
            <button className="text-slate-500 hover:text-cyan-400 transition-all hover:scale-110 active:scale-95 relative">
              <Bell className="w-6 h-6 sm:w-7 sm:h-7" />
              <div className="absolute top-0 right-1 w-2.5 h-2.5 bg-fuchsia-500 rounded-full border-2 border-slate-900 shadow-[0_0_5px_rgba(217,70,239,0.8)]"></div>
            </button>
          </div>

          {/* User & Logout (Right) */}
          <div className="flex items-center justify-end gap-3 w-1/4">
            <div 
              onClick={() => setIsEditingProfile(true)}
              className="hidden md:flex items-center gap-3 cursor-pointer group px-3 py-1.5 rounded-lg border border-transparent hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
            >
              <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-[1px] shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                <div className="bg-slate-950 rounded-md w-full h-full flex items-center justify-center overflow-hidden">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-sm font-bold text-cyan-100 tracking-wider uppercase group-hover:text-cyan-400 transition-colors drop-shadow-md">
                {currentUser.username}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:py-2 sm:px-4 text-xs font-bold tracking-widest text-slate-400 hover:text-fuchsia-400 bg-slate-900/50 border border-slate-700 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10 rounded-lg transition-all active:scale-95 shadow-sm uppercase"
              title="Terminate Session"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Exit</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 mt-8 relative z-10 flex gap-8">
        
        {/* Main Feed Column */}
        <div className="w-full lg:max-w-xl flex-shrink-0">
          {/* Create Post Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-900/50 rounded-xl p-5 mb-10 shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <form onSubmit={handlePostSubmit}>
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-[1px] flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.3)] transform transition-transform hover:scale-105">
                  <div className="bg-slate-950 rounded-lg w-full h-full flex items-center justify-center">
                    <span className="text-lg font-bold text-cyan-400 font-mono">{currentUser.username.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
                <textarea
                  placeholder={`> Initialize data stream, ${currentUser.username}...`}
                  className="w-full bg-transparent border-none resize-none px-2 py-3 text-lg font-medium text-cyan-50 placeholder-slate-600 focus:outline-none min-h-[60px]"
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-3 ml-16 border-t border-slate-800/80 pt-4">
                <div className="relative flex-1 group/input">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="text-slate-500 w-5 h-5 group-focus-within/input:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                  </div>
                  <input
                    type="url"
                    placeholder="URL_ATTACHMENT [OPTIONAL]"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/50 hover:bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono tracking-widest focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all text-cyan-100 placeholder-slate-600"
                    value={newPost.imageUrl}
                    onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newPost.caption}
                  className="bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-cyan-400 hover:text-cyan-300 font-bold tracking-widest py-2.5 px-6 rounded-lg text-xs transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-[0_0_10px_rgba(6,182,212,0.2)] uppercase"
                >
                  Transmit
                </button>
              </div>
            </form>
          </div>

          {/* Feed */}
          <div className="space-y-8">
            {posts.length === 0 ? (
              <div className="text-center mt-12 p-10 bg-slate-900/60 backdrop-blur-sm rounded-xl border border-cyan-900/50 shadow-[0_0_15px_rgba(6,182,212,0.05)] flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                <div className="w-24 h-24 bg-slate-950 border border-cyan-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)] relative z-10">
                  <Camera className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                </div>
                <h3 className="text-2xl font-extrabold text-cyan-50 mb-2 tracking-widest uppercase relative z-10 drop-shadow-md">System Empty</h3>
                <p className="text-slate-400 font-medium max-w-sm relative z-10 tracking-wider text-sm">No data packets detected. Be the first to initiate a transmission.</p>
              </div>
            ) : (
              posts.map(post => (
                <Post 
                  key={post.id} 
                  post={post} 
                  currentUser={currentUser.username} 
                  onLike={handleLike} 
                />
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar (Suggestions) */}
        <div className="hidden lg:block w-[320px] flex-shrink-0 sticky top-[88px] h-fit">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-900/50 rounded-xl p-6 shadow-[0_0_15px_rgba(6,182,212,0.05)] mb-6">
            <h3 className="text-cyan-500 font-bold text-xs tracking-widest uppercase mb-6 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">Network Entities</h3>
            <div className="space-y-5">
              {[
                { name: 'neo_matrix', role: 'System Admin', color: 'from-cyan-400 to-blue-500' },
                { name: 'trinity_01', role: 'Network Security', color: 'from-fuchsia-400 to-pink-500' },
                { name: 'morpheus', role: 'Data Architect', color: 'from-emerald-400 to-cyan-500' }
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${user.color} p-[1px] shadow-[0_0_8px_rgba(6,182,212,0.2)]`}>
                      <div className="bg-slate-950 rounded-lg w-full h-full flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-200 font-mono">{user.name.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-cyan-100 group-hover:text-cyan-400 transition-colors uppercase tracking-wider">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{user.role}</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors uppercase tracking-widest border border-fuchsia-500/30 px-2 py-1 rounded bg-fuchsia-500/10 hover:bg-fuchsia-500/20">Sync</button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-[10px] text-slate-600 font-mono tracking-widest uppercase leading-relaxed px-2">
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">Nodes</span> | 
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">Protocols</span> | 
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">API</span> | 
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy</span>
            </div>
            <p className="text-cyan-900/80">© 2026 NEXUS.NET INC.</p>
          </div>
        </div>

      </div>

      {/* Profile Edit Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsEditingProfile(false)}></div>
          
          {/* Modal Content */}
          <div className="bg-slate-900 border border-cyan-500/50 rounded-xl p-8 max-w-sm w-full relative z-10 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            <button 
              onClick={() => setIsEditingProfile(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Edit3 className="w-6 h-6 text-fuchsia-400 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]" />
              <h2 className="text-xl font-bold text-cyan-50 tracking-widest uppercase">Edit Profile</h2>
            </div>

            {profileError && (
              <div className="bg-red-950/50 border border-red-500/50 text-red-400 p-2 rounded text-xs mb-4 text-center font-bold tracking-wider">
                [ {profileError} ]
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div>
                <label className="block text-[10px] text-cyan-400 mb-1 font-bold tracking-widest uppercase">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded focus:outline-none focus:border-cyan-400 text-sm text-cyan-50 font-mono shadow-inner"
                  value={profileForm.username}
                  onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-[10px] text-cyan-400 mb-1 font-bold tracking-widest uppercase">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded focus:outline-none focus:border-cyan-400 text-sm text-cyan-50 font-mono shadow-inner"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-300 font-bold tracking-widest py-2 px-4 rounded transition-all active:scale-95 text-xs uppercase shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
