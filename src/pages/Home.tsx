import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Users, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/familia.jpg"
            alt="Pirineo Catalán"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block text-secondary uppercase tracking-[0.3em] text-sm font-bold mb-6"
          >
            &nbsp;
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight"
          >
            {h.heroTitle1} <br /> <span>{h.heroTitle2}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/reservas"
              className="px-10 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 group"
            >
              {h.heroReserva}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/espacio"
              className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              {h.heroExplorar}
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-px h-12 bg-white/30 mx-auto" />
        </motion.div>
      </section>

      {/* Highlights */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-serif mb-4">{h.h1Title}</h3>
              <p className="text-primary/60">{h.h1Desc}</p>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-serif mb-4">{h.h2Title}</h3>
              <p className="text-primary/60">{h.h2Desc}</p>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-serif mb-4">{h.h3Title}</h3>
              <p className="text-primary/60">{h.h3Desc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">{h.featuredBadge}</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">{h.featuredTitle}</h2>
            <p className="text-lg text-primary/70 mb-8 leading-relaxed">{h.featuredDesc}</p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-primary/80">
                <div className="w-2 h-2 bg-accent rounded-full" />
                {h.li1}
              </li>
              <li className="flex items-center gap-3 text-primary/80">
                <div className="w-2 h-2 bg-accent rounded-full" />
                {h.li2}
              </li>
              <li className="flex items-center gap-3 text-primary/80">
                <div className="w-2 h-2 bg-accent rounded-full" />
                {h.li3}
              </li>
            </ul>
            <Link
              to="/espacio"
              className="inline-block px-8 py-3 border-2 border-primary text-primary font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
            >
              {h.verEspacio}
            </Link>
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/fora2.png"
              alt="Casa Rural Exterior"
              className="rounded-2xl shadow-2xl w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 bg-primary p-8 rounded-2xl hidden md:block">
              <p className="text-secondary font-serif text-4xl mb-2">9.7</p>
              <p className="text-secondary/60 uppercase tracking-widest text-xs">Booking.com</p>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}