import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MyTurfs from './pages/MyTurfs';
import OwnerBookings from './pages/OwnerBookings';
import BrowseTurfs from './pages/BrowseTurfs';
import MyBookings from './pages/MyBookings';
import Wallet from './pages/Wallet';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './context/AuthContext';

function Dashboard() {
  const { user, loadingUser } = useAuth();
  if (loadingUser) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'OWNER') return <Navigate to="/turfs" />;
  if (user.role === 'CUSTOMER') return <Navigate to="/browse" />;
  if (user.role === 'ADMIN') return <Navigate to="/admin" />;
  return <Navigate to="/login" />;
}

function ProtectedRoute({ children }) {
  const { token, loadingUser } = useAuth();
  if (loadingUser) return <div className="p-8">Loading...</div>;
  if (!token) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/turfs" element={<ProtectedRoute><MyTurfs /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><OwnerBookings /></ProtectedRoute>} />

      <Route path="/browse" element={<ProtectedRoute><BrowseTurfs /></ProtectedRoute>} />
      <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />

      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;