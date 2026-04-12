import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  };

  const isLoggedIn = localStorage.getItem('customer') || localStorage.getItem('isAdmin');

  return (
    <nav className="bg-coffee-50/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-coffee-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-coffee-800 font-bold text-xl tracking-tight">
              <Coffee className="w-6 h-6 text-coffee-600" />
              The Hangout Cafe
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn && (
              <>
                <a href="/#home" className="text-coffee-800 hover:text-coffee-600 font-medium transition-colors">Home</a>
                <a href="/#menu" className="text-coffee-800 hover:text-coffee-600 font-medium transition-colors">Menu</a>
                <a href="/#contact" className="text-coffee-800 hover:text-coffee-600 font-medium transition-colors">Contact</a>
                {localStorage.getItem('isAdmin') && (
                  <Link to="/admin" className="text-coffee-800 hover:text-coffee-600 font-medium transition-colors">Admin</Link>
                )}
                <button onClick={handleLogout} className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full hover:bg-red-200 font-medium transition-colors text-sm">
                  Logout
                </button>
              </>
            )}
            {!isLoggedIn && (
               <Link to="/login" className="px-4 py-2 bg-coffee-800 text-white rounded-full hover:bg-coffee-900 transition-colors shadow-md">
                 Login
               </Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-coffee-800 hover:text-coffee-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-coffee-50 border-b border-coffee-200 px-4 pt-2 pb-4 space-y-2">
          {isLoggedIn ? (
            <>
              <a href="/#home" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-coffee-800 font-medium hover:bg-coffee-100 rounded-md">Home</a>
              <a href="/#menu" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-coffee-800 font-medium hover:bg-coffee-100 rounded-md">Menu</a>
              <a href="/#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-coffee-800 font-medium hover:bg-coffee-100 rounded-md">Contact</a>
              {localStorage.getItem('isAdmin') && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-coffee-800 font-medium hover:bg-coffee-100 rounded-md">Admin</Link>
              )}
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-md">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-coffee-800 font-medium hover:bg-coffee-100 rounded-md">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
