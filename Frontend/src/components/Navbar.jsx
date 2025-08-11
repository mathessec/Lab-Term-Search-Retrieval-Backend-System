import { Link, useNavigate } from 'react-router-dom';
import { clearAuthToken, getAuthToken } from '../api/client.js';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthed = Boolean(getAuthToken());

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to={isAuthed ? '/dashboard' : '/'} className="font-semibold">
          LOINC Finder
        </Link>

        <div className="flex items-center gap-4">
          {isAuthed && (
            <>
              {/* <Link className="hover:text-emerald-300" to="/dashboard">Dashboard</Link> */}
              <Link className="hover:text-emerald-300" to="/search">Search</Link>
              <Link className="hover:text-emerald-300" to="/stats">Stats</Link>
              {/* <Link className="hover:text-emerald-300" to="/loincSearchPage">Term Details</Link> */}
              <button onClick={handleLogout} className="rounded bg-emerald-600 px-3 py-1 hover:bg-emerald-500">
                Logout
              </button>
            </>
          )}
          {!isAuthed && (
            <>
              <Link className="hover:text-emerald-300" to="/login">Login</Link>
              <Link className="hover:text-emerald-300" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}