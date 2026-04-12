import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, CheckCircle } from 'lucide-react';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="min-h-screen bg-coffee-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-coffee-950">Admin Dashboard</h1>
            <p className="text-coffee-600">Manage your cafe orders here.</p>
          </div>
          <button 
            onClick={fetchOrders}
            className="flex items-center gap-2 px-4 py-2 bg-white text-coffee-800 border border-coffee-200 rounded-lg shadow-sm hover:bg-coffee-100 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-coffee-600' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-coffee-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-coffee-100/50 text-coffee-900 border-b border-coffee-200">
                  <th className="p-4 font-semibold">Order ID</th>
                  <th className="p-4 font-semibold">Customer</th>
                  <th className="p-4 font-semibold">Item(s)</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold">Time</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-coffee-500">
                      No orders found yet.
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="border-b border-coffee-100 hover:bg-coffee-50/50 transition-colors">
                      <td className="p-4 text-coffee-600">#{order.id}</td>
                      <td className="p-4 font-medium text-coffee-900">
                        {order.customer_name}
                        <div className="text-xs text-coffee-500 font-normal">Location: {order.location || 'Unknown'}</div>
                      </td>
                      <td className="p-4 text-coffee-800">
                        {order.items_ordered} <span className="text-coffee-500">x{order.quantity}</span>
                      </td>
                      <td className="p-4 font-bold text-coffee-900">₹{order.total_price}</td>
                      <td className="p-4 text-sm text-coffee-600">
                        {new Date(order.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        {order.status === 'pending' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'completed')}
                            className="bg-coffee-800 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-coffee-900 transition-colors"
                          >
                            Mark Done
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
