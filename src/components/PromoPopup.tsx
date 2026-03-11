import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenPromoPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenPromoPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#2d4a2d] rounded-sm overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Close Button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12 text-center flex flex-col items-center">
              {/* Main Discount */}
              <div className="mb-2">
                <span className="text-6xl md:text-8xl font-display italic text-white leading-none">12%</span>
              </div>
              <h3 className="text-lg md:text-xl font-display text-white mb-8">
                de descuento reservando directamente
              </h3>

              {/* Subtitle */}
              <div className="mb-6">
                <p className="text-[#b07d3a] font-display text-lg md:text-xl mb-1">
                  Reserva directa · Oferta exclusiva
                </p>
                <p className="text-white/90 font-light text-sm md:text-base">
                  Reservando en nuestra web directamente
                </p>
              </div>

              {/* CTA Button */}
              <Link
                to="/reservas"
                onClick={closePopup}
                className="w-full max-w-xs py-4 bg-[#f5f2ed] text-[#2d4a2d] rounded-full font-sans font-medium text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white transition-all mb-8 group"
              >
                Reservar con descuento
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Footer text */}
              <p className="text-white/70 text-[11px] md:text-xs font-light tracking-wider uppercase">
                Sin intermediarios · Confirmación en menos de 24h
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2d4a2d]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
