import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const { logout } = useAuth();

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosClient.get('/bookings/owner-bookings');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (id) => {
    setActionLoadingId(id);
    setError('');
    try {
      await axiosClient.patch(`/bookings/${id}/approve`);
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve booking');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoadingId(id);
    setError('');
    try {
      await axiosClient.patch(`/bookings/${id}/reject`);
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject booking');
    } finally {
      setActionLoadingId(null);
    }
  };

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
          Turf<span className="bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">ly</span>{' '}
          <span className="text-slate-400 dark:text-slate-500 font-normal text-base">Owner</span>
        </h1>
        <div className="flex gap-6 items-center">
          <Link to="/turfs" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium text-sm transition">
            My Turfs
          </Link>
          <ThemeToggle />
          <button onClick={logout} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="relative max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bookings</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Requests for the turfs you manage</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
            No bookings yet.
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-500/10 p-5 hover:shadow-sm dark:hover:border-emerald-500/30 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-slate-900 dark:text-white">{booking.turfName}</p>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {booking.customerName} &nbsp;·&nbsp; {booking.date} &nbsp;·&nbsp;{' '}
                      {booking.startTime}–{booking.endTime} &nbsp;·&nbsp; ₹{booking.amount}
                    </p>
                  </div>

                  {booking.status === 'PENDING' && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleApprove(booking.id)}
                        disabled={actionLoadingId === booking.id}
                        className="bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition disabled:opacity-50 shadow-md shadow-emerald-600/20"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(booking.id)}
                        disabled={actionLoadingId === booking.id}
                        className="bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/10 transition disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerBookings;