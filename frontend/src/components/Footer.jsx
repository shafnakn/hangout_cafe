import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const Footer = () => {
  return (
    <footer id="contact" className="bg-coffee-950 text-coffee-100 py-12 border-t-4 border-coffee-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-serif text-white">The Hangout Cafe</h3>
            <p className="text-coffee-300">Shake it. Drink it. Repeat.<br />Your cozy spot for the best shakes, burgers, and vibes in town.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white transition-colors"><InstagramIcon className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><FacebookIcon className="w-6 h-6" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-coffee-500 shrink-0 mt-1" />
                <span className="text-coffee-300">123 Cafe Street, Downtown<br />Cityname, State</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-coffee-500 shrink-0" />
                <span className="text-coffee-300">+91 9744417226</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-coffee-500 shrink-0" />
                <span className="text-coffee-300">hello@thehangoutcafe.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Opening Hours</h4>
            <ul className="space-y-2 text-coffee-300">
              <li className="flex justify-between"><span>Mon - Fri:</span> <span>10:00 AM - 10:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday:</span> <span>11:00 AM - 11:00 PM</span></li>
              <li className="flex justify-between text-coffee-500 font-medium"><span>Sunday:</span> <span>Closed</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-coffee-800 mt-8 pt-8 text-center text-coffee-400 text-sm">
          <p>&copy; {new Date().getFullYear()} The Hangout Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
