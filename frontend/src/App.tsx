import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { MyAppointments } from './pages/MyAppointments';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/services" element={<div className="container mx-auto py-20">Services Page (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
