import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Camera } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('System Error: Missing parameters');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const validUser = users.find(
      (u) => u.username === formData.username && u.password === formData.password
    );

    if (!validUser) {
      setError('Authentication Failed: Invalid Credentials');
      return;
    }

    localStorage.setItem('activeUser', JSON.stringify(validUser));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-fuchsia-500/30 selection:text-fuchsia-200 font-mono relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-fuchsia-600/20 blur-[150px] animate-pulse"></div>
      </div>
      
      {/* Form Card */}
      <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-8 border border-slate-700/50 relative z-10 shadow-[0_0_50px_rgba(217,70,239,0.1)] hover:shadow-[0_0_80px_rgba(217,70,239,0.15)] transition-all duration-700">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-slate-950 p-4 rounded-xl mb-6 shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-500/30 relative group">
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Camera className="w-10 h-10 text-cyan-400 relative z-10" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 uppercase">Nexus</h1>
          <p className="text-fuchsia-600/70 text-xs mt-3 tracking-widest uppercase">Authenticate Session</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-500/50 text-red-400 p-3 rounded-lg text-xs mb-6 text-center font-bold tracking-wider animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            [ {error} ]
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="text-slate-500 w-5 h-5 group-focus-within:text-fuchsia-400 transition-colors drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
            </div>
            <input
              type="text"
              placeholder="USERNAME"
              className="w-full pl-12 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-lg focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/50 transition-all text-sm font-medium text-fuchsia-50 placeholder-slate-600 shadow-inner"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="text-slate-500 w-5 h-5 group-focus-within:text-fuchsia-400 transition-colors drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
            </div>
            <input
              type="password"
              placeholder="ACCESS_CODE"
              className="w-full pl-12 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-lg focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/50 transition-all text-sm font-medium text-fuchsia-50 placeholder-slate-600 shadow-inner"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-fuchsia-500/10 border border-fuchsia-500/50 hover:bg-fuchsia-500/20 text-fuchsia-400 hover:text-fuchsia-300 font-bold tracking-widest py-3 px-4 rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] active:scale-95 text-xs uppercase"
          >
            Enter_Nexus
          </button>
        </form>

        <div className="mt-8 text-center text-xs tracking-wider text-slate-500 border-t border-slate-800 pt-6">
          Unregistered Entity?{' '}
          <Link to="/register" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
            INITIALIZE_NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
