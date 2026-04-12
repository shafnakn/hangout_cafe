import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState('customer'); // 'customer' or 'admin'
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    if (!name || !location) {
      setError('Please enter both name and location.');
      return;
    }
    const customer = { name, location };
    localStorage.setItem('customer', JSON.stringify(customer));
    navigate('/');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (username === 'shafnakn' && password === '123456789') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-coffee-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-coffee-100">
        <div className="p-8">
          <h2 className="text-3xl font-serif font-bold text-center text-coffee-950 mb-8">
            Welcome to The Hangout Cafe
          </h2>

          <div className="flex mb-6 bg-coffee-100 p-1 rounded-lg">
            <button
              onClick={() => { setActiveTab('customer'); setError(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                activeTab === 'customer' ? 'bg-white text-coffee-900 shadow-sm' : 'text-coffee-600 hover:text-coffee-800'
              }`}
            >
              Customer Login
            </button>
            <button
              onClick={() => { setActiveTab('admin'); setError(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                activeTab === 'admin' ? 'bg-white text-coffee-900 shadow-sm' : 'text-coffee-600 hover:text-coffee-800'
              }`}
            >
              Admin Login
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {activeTab === 'customer' ? (
            <form onSubmit={handleCustomerLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-coffee-800 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-800 mb-1">Your Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 outline-none transition-all"
                  placeholder="Enter your location"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-coffee-800 hover:bg-coffee-900 text-white rounded-lg font-semibold transition-colors mt-6"
              >
                Continue to Menu
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-coffee-800 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 outline-none transition-all"
                  placeholder="Admin username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-800 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 outline-none transition-all"
                  placeholder="Admin password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-coffee-800 hover:bg-coffee-900 text-white rounded-lg font-semibold transition-colors mt-6"
              >
                Login as Admin
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
