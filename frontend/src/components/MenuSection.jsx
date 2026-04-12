import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems } from '../data/menu';
import { ShoppingBag } from 'lucide-react';

const categories = ["All", ...new Set(menuItems.map(item => item.category))];
const ADMIN_NUMBER = "919744417226";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const handleOrder = (item) => {
    const customerData = JSON.parse(localStorage.getItem('customer') || '{"name":"WhatsApp Customer","location":"Unknown"}');
    const message = `Hi! I want to order:\n\n*${item.item_name}*\nPrice: ₹${item.price}\n\nMy name: ${customerData.name}\nLocation: ${customerData.location}\n\nPlease let me know the status.`;
    const whatsappUrl = `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Attempt to log order to backend (ignore errors if backend not running)
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: customerData.name,
        phone_number: "Wait via WhatsApp", // Kept just in case it's still needed, but location is more important.
        location: customerData.location,
        items_ordered: item.item_name,
        quantity: 1,
        total_price: item.price
      })
    }).catch(e => console.log('Backend not unreachable (this is fine for WhatsApp order)'));

    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="menu" className="py-20 bg-coffee-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-950 mb-4">Our Menu</h2>
          <div className="w-24 h-1 bg-coffee-500 mx-auto rounded-full"></div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                  ? 'bg-coffee-600 text-white shadow-md shadow-coffee-500/30'
                  : 'bg-coffee-100 text-coffee-800 hover:bg-coffee-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-coffee-100 hover:shadow-2xl hover:shadow-coffee-900/10 transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.item_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-coffee-800 shadow-sm">
                    ₹{item.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-coffee-950">{item.item_name}</h3>
                  </div>
                  <p className="text-coffee-600 text-sm mb-6 line-clamp-2 h-10">{item.description}</p>

                  <button
                    onClick={() => handleOrder(item)}
                    className="w-full py-3 px-4 bg-coffee-800 hover:bg-coffee-900 text-white rounded-xl font-medium flex justify-center items-center gap-2 transition-all group-hover:shadow-md"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
