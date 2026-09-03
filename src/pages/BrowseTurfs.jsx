import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MapPin, IndianRupee, User } from 'lucide-react';
import { getTurfImage } from '../utils/sportImages';
import ThemeToggle from '../components/ThemeToggle';

function BrowseTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [bookingTurfId, setBookingTurfId] = useState(null);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [booking, setBooking] = useState(false);

  const { logout } = useAuth();

  const fetchTurfs = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/turfs', { params: { page: 0, size: 50 } });
      setTurfs(response.data.content);
    } catch (err) {
      setError('Failed to load turfs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const openBookingForm = (turfId) => {
    setBookingTurfId(turfId);
    setDate('');
    setStartTime('');
    setEndTime('');
    setError('');
    setSuccess('');
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setBooking(true);
    setError('');
    setSuccess('');

    try {
      await axiosClient.post('/bookings', {
        turfId: bookingTurfId,
        date,
        startTime,
        endTime,
      });
      setSuccess('Booking request sent! Waiting for owner approval.');
      setBookingTurfId(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setBooking(false);
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
          <Link to="/my-bookings" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium text-sm transition">
            My Bookings
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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Browse Turfs</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Find and book a turf near you</p>

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

        {loading ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm">Loading turfs...</p>
        ) : turfs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">No turfs available yet.</div>
        ) : (
          <div className="space-y-4">
            {turfs.map((turf) => (
              <div
                key={turf.id}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-500/10 overflow-hidden hover:shadow-md dark:hover:border-emerald-500/30 transition"
              >
                <div className="flex">
                  <img
                    src={getTurfImage(turf.sportType)}
                    alt={turf.sportType}
                    className="w-40 h-32 object-cover shrink-0"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{turf.name}</p>
                        <span className="inline-block text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1">
                          {turf.sportType}
                        </span>
                      </div>
                      <button
                        onClick={() => openBookingForm(turf.id)}
                        className="bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md shadow-emerald-600/20"
                      >
                        Book
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {turf.address}
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupee size={14} /> {turf.price}/hr
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} /> {turf.ownerName}
                      </span>
                    </div>
                  </div>
                </div>

                {bookingTurfId === turf.id && (
                  <form
                    onSubmit={handleBook}
                    className="px-4 pb-4 pt-3 border-t border-slate-100 dark:border-white/10 grid grid-cols-3 gap-3"
                  >
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                    <button
                      type="submit"
                      disabled={booking}
                      className="col-span-3 bg-slate-900 dark:bg-white/10 text-white font-medium py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-white/20 transition disabled:opacity-50"
                    >
                      {booking ? 'Booking...' : 'Confirm Booking Request'}
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseTurfs;