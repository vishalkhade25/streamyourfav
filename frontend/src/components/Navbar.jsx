import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  }

  const handleLinkClick = () => {
    setMenuOpen(false);
  }

  return (
    <nav className="bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white tracking-tight">
          Stream<span className="text-red-600">YourFav</span>
        </Link>

        <div className="hidden md:block flex-1 max-w-xs mx-6">
          <SearchBar />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {
            isAuthenticated ? (
              <>
                <Link to="/profile" className="text-neutral-300 hover:text-white text-sm font-medium transition-colors">
                  Profile
                </Link>
                {user.role === "Admin" && (
                  <Link to="/admin" className="text-neutral-300 hover:text-white text-sm font-medium transition-colors">
                    Admin
                  </Link>
                )}
                <span className="text-neutral-400 text-sm">Hi, {user.username}</span>
                <button onClick={handleLogout} className="text-neutral-300 hover:text-red-500 text-sm font-medium transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-neutral-300 hover:text-white text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                  Sign Up
                </Link>
              </>
            )
          }
        </div>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl leading-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-800 px-6 py-4 flex flex-col gap-4">
          <SearchBar />

          {
            isAuthenticated ? (
              <>
                <Link to="/profile" onClick={handleLinkClick} className="text-neutral-300 hover:text-white text-sm font-medium transition-colors">
                  Profile
                </Link>
                {user.role === "Admin" && (
                  <Link to="/admin" onClick={handleLinkClick} className="text-neutral-300 hover:text-white text-sm font-medium transition-colors">
                    Admin
                  </Link>
                )}
                <span className="text-neutral-400 text-sm">Hi, {user.username}</span>
                <button onClick={handleLogout} className="text-neutral-300 hover:text-red-500 text-sm font-medium transition-colors text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={handleLinkClick} className="text-neutral-300 hover:text-white text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/signup" onClick={handleLinkClick} className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors text-center">
                  Sign Up
                </Link>
              </>
            )
          }
        </div>
      )}
    </nav>
  )
}

export default Navbar;