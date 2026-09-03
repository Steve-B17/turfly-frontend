import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

function AdminDashboard() {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [turfs, setTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { logout } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [usersRes, turfsRes, bookingsRes] = await Promise.all([
        axiosClient.get('/admin/users'),
        axiosClient.get('/admin/turfs'),
        axiosClient.get('/admin/bookings'),
      ]);
      setUsers(usersRes.data);
      setTurfs(turfsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    try {
      await axiosClient.delete(`/admin/users/${id}`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const roleStyles = {
    ADMIN: 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400',
    OWNER: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    CUSTOMER: 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300',
  };

  const statusStyles = {
    PENDING: 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
    APPROVED: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    REJECTED: 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400',
  };

  const tabs = [
    { key: 'users', label: `Users (${users.length})` },
    { key: 'turfs', label: `Turfs (${turfs.length})` },
    { key: 'bookings', label: `Bookings (${bookings.length})` },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#06120c] relative overflow-hidden transition-colors">
      <div className="absolute top-0 -left-32 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-lime-400/10 dark:bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

      <nav className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl border-b border-slate-200 dark:border-emerald-500/10 px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Turf<span className="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">ly</span>{' '}
          <span className="text-slate-400 dark:text-slate-500 font-normal text-base">Admin</span>
        </h1>
        <div className="flex gap-6 items-center">
          <ThemeToggle />
          <button onClick={logout} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Platform Overview</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">View and manage all users, turfs, and bookings</p>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-white/10">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                tab === t.key
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm">Loading...</p>
        ) : (
          <>
            {tab === 'users' && (
              <div className="space-y-3">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-500/10 p-5 flex justify-between items-center hover:shadow-sm dark:hover:border-emerald-500/30 transition"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-slate-900 dark:text-white">{u.name}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleStyles[u.role]}`}>
                          {u.role}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {u.email} &nbsp;·&nbsp; Wallet: ₹{u.walletBalance}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            {tab === 'turfs' && (
              <div className="space-y-3">
                {turfs.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-500/10 p-5 hover:shadow-sm dark:hover:border-emerald-500/30 transition"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {t.address} &nbsp;·&nbsp; {t.sportType} &nbsp;·&nbsp; ₹{t.price}/hr &nbsp;·&nbsp; Owner: {t.ownerName}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'bookings' && (
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
                      {b.customerName} &nbsp;·&nbsp; {b.date} &nbsp;·&nbsp; {b.startTime}–{b.endTime} &nbsp;·&nbsp; ₹{b.amount}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;