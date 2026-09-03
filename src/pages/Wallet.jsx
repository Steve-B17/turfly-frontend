import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Wallet as WalletIcon } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

function Wallet() {
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [toppingUp, setToppingUp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { logout } = useAuth();

  const fetchBalance = async () => {
    try {
      const res = await axiosClient.get('/wallet/balance');
      setBalance(res.data.walletBalance);
    } catch (err) {
      setError('Failed to load wallet balance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleTopUp = async (e) => {
    e.preventDefault();
    setToppingUp(true);
    setError('');
    setSuccess('');

    try {
      const res = await axiosClient.post('/wallet/topup', { amount: parseFloat(amount) });
      setBalance(res.data.walletBalance);
      setAmount('');
      setSuccess('Wallet topped up successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to top up wallet');
    } finally {
      setToppingUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#06120c] relative overflow-hidden transition-colors">
      <div className="absolute top-0 -left-32 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-lime-400/10 dark:bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

      <nav className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl border-b border-slate-200 dark:border-emerald-500/10 px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Turf<span className="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">ly</span>
        </h1>
        <div className="flex gap-6 items-center">
          <Link to="/browse" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium text-sm transition">
            Browse Turfs
          </Link>
          <Link to="/my-bookings" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium text-sm transition">
            My Bookings
          </Link>
          <ThemeToggle />
          <button onClick={logout} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="relative max-w-md mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Wallet</h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {success}
          </div>
        )}

        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-500/10 p-6 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 mb-3">
            <WalletIcon size={22} className="text-white" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Current Balance</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {loading ? '...' : `₹${balance}`}
          </p>
        </div>

        <form
          onSubmit={handleTopUp}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-500/10 p-6"
        >
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Top up amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            className="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <button
            type="submit"
            disabled={toppingUp}
            className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-emerald-600/20"
          >
            {toppingUp ? 'Adding...' : 'Add Money'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Wallet;