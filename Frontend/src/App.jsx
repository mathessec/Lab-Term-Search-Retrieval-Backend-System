import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Search from './pages/Search.jsx';
import TermDetail from './pages/LoincSearchPage.jsx';
import Stats from './pages/Stats.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <main className="mx-auto max-w-7xl p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/search" element={<Search />} />
              <Route path="/term/:code" element={<TermDetail />} />
              <Route path="/stats" element={<Stats />} />
            </Route>

            <Route path="*" element={<div className="p-6">Not found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
