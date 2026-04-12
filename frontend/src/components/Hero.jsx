import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-coffee-950/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 font-serif tracking-tight"
        >
          The <span className="text-coffee-400">Hangout</span> Cafe
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-3xl text-coffee-100 font-light mb-10"
        >
          Shake it. Drink it. Repeat.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a href="#menu" className="inline-block px-8 py-4 bg-coffee-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-coffee-500 hover:shadow-coffee-500/50 hover:scale-105 transition-all duration-300">
            Explore Menu
          </a>
        </motion.div>
      </div>

      {/* Decorative coffee bean or accent could go here */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-coffee-50 to-transparent"></div>
    </section>
  );
};

export default Hero;
