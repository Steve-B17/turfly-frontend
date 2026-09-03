import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { logout } = useAuth();

  useEffect(() => {
    axiosClient.get('/bookings/my-bookings')
      .then((res) => setBookings(res.data))
      .catch(() => setError('Failed to load bookings'))
      .finally(() => setLoading(false));
  }, []);

  const statusStyles = {
    PENDING: 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
    APPROVED: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    REJECTED: 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400',
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
          <Link to="/wallet" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium text-sm transition">
            Wallet
          </Link>
          <ThemeToggle />
          <button onClick={logout} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="relative max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">My Bookings</h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm">Loading...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">No bookings yet.</div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-500/10 p-5 hover:shadow-sm dark:hover:border-emerald-500/30 transition"
              >
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-slate-900 dark:text-white">{b.turfName}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {b.date} &nbsp;·&nbsp; {b.startTime}–{b.endTime} &nbsp;·&nbsp; ₹{b.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;