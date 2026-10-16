import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, Coffee, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white p-7 sm:p-10 border border-[#EBE3D7] rounded-3xl shadow-cozy-md relative overflow-hidden">
        
        {/* Soft background glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FAECE5] rounded-full blur-2xl pointer-events-none" />

        {/* Masthead Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#C65D42] text-white flex items-center justify-center shadow-cozy-sm">
            <Coffee className="w-7 h-7" />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAECE5] text-[#C65D42] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span>Reader Sign-In</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B231D]">
            Welcome Back to Your Nook
          </h1>
          <p className="font-serif italic text-xs sm:text-sm text-[#736257] mt-1">
            "Your morning cup is poured. Sign in to resume reading."
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-2xl mb-6 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#736257] mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF6F0] border border-[#EBE3D7] rounded-xl text-sm text-[#2B231D] placeholder-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/40 focus:border-[#E07A5F] transition-all"
                placeholder="reader@morningdispatch.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#A8988B]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#736257] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF6F0] border border-[#EBE3D7] rounded-xl text-sm text-[#2B231D] placeholder-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/40 focus:border-[#E07A5F] transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#A8988B]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#C65D42] text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-cozy-sm hover:shadow-cozy-md disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            <Coffee className="w-4 h-4" />
            <span>{loading ? 'Opening Edition...' : 'Open Today’s Edition'}</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#F5EFE6] text-center text-xs text-[#736257]">
          <span>New to our newsstand? </span>
          <Link
            to="/register"
            className="font-semibold text-[#C65D42] hover:text-[#943C25] hover:underline"
          >
            Join the Reader's Circle →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
