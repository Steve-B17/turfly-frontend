import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import ThemeToggle from '../components/ThemeToggle';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axiosClient.post('/auth/register', { name, email, password, role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#06120c] relative overflow-hidden transition-colors">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-lime-400/20 dark:bg-lime-400/10 rounded-full blur-3xl" />

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-emerald-500/10 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">Create your account</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Join Turfly to book or manage turfs</p>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />

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
          className="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">I am a</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        >
          <option value="CUSTOMER" className="dark:bg-[#06120c]">Customer — I want to book turfs</option>
          <option value="OWNER" className="dark:bg-[#06120c]">Turf Owner — I want to list turfs</option>
          <option value="ADMIN" className="dark:bg-[#06120c]">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-emerald-600/20"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;