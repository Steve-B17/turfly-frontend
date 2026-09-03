import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getTurfImage } from '../utils/sportImages';
import ThemeToggle from '../components/ThemeToggle';

function MyTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [sportType, setSportType] = useState('');
  const [price, setPrice] = useState('');
  const [creating, setCreating] = useState(false);

  const { logout } = useAuth();

  const fetchTurfs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosClient.get('/turfs/my-turfs');
      setTurfs(response.data);
    } catch (err) {
      setError('Failed to load turfs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');

    try {
      await axiosClient.post('/turfs', {
        name,
        address,
        sportType,
        price: parseFloat(price),
      });
      setName('');
      setAddress('');
      setSportType('');
      setPrice('');
      fetchTurfs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create turf');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this turf?')) return;
    try {
      await axiosClient.delete(`/turfs/${id}`);
      fetchTurfs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete turf');
    }
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
          <Link to="/bookings" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium text-sm transition">
            Bookings
          </Link>
          <ThemeToggle />
          <button onClick={logout} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="relative max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Turfs</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage the turfs you list on Turfly</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200 dark:border-emerald-500/10 p-6 mb-8">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Add a new turf</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Turf name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            <select
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              required
              className="border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              <option value="" className="dark:bg-[#06120c]">Select sport</option>
              <option value="Football" className="dark:bg-[#06120c]">Football</option>
              <option value="Cricket" className="dark:bg-[#06120c]">Cricket</option>
              <option value="Basketball" className="dark:bg-[#06120c]">Basketball</option>
              <option value="Tennis" className="dark:bg-[#06120c]">Tennis</option>
              <option value="Badminton" className="dark:bg-[#06120c]">Badminton</option>
              <option value="Volleyball" className="dark:bg-[#06120c]">Volleyball</option>
            </select>
            <input
              type="number"
              placeholder="Price per hour (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            <button
              type="submit"
              disabled={creating}
              className="col-span-2 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-emerald-600/20"
            >
              {creating ? 'Adding...' : 'Add Turf'}
            </button>
          </form>
        </div>

        {loading ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm">Loading turfs...</p>
        ) : turfs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
            No turfs yet — add your first one above.
          </div>
        ) : (
          <div className="space-y-3">
            {turfs.map((turf) => (
              <div
                key={turf.id}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-emerald-500/10 overflow-hidden hover:shadow-md dark:hover:border-emerald-500/30 transition flex"
              >
                <img
                  src={getTurfImage(turf.sportType)}
                  alt={turf.sportType}
                  className="w-32 h-24 object-cover shrink-0"
                />
                <div className="flex-1 p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{turf.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {turf.address} &nbsp;·&nbsp; {turf.sportType} &nbsp;·&nbsp; ₹{turf.price}/hr
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(turf.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTurfs;