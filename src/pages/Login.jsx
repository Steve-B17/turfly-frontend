import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#06120c] relative overflow-hidden transition-colors">
      {/* Ambient glow blobs — turf-under-lights feel */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-lime-400/20 dark:bg-lime-400/10 rounded-full blur-3xl" />

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-emerald-500/10 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">
          Turf<span className="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">ly</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Sign in to continue</p>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-emerald-600/20"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;