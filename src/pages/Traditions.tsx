import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';

const traditionImages: Record<string, string> = {
  falles: 'https://static.wixstatic.com/media/fb9e9f_3fb6edfdfa0543cca1de158588afa850~mv2.png',
  pagesa: 'https://static.wixstatic.com/media/fb9e9f_f157f61a6736440eabfd776e93f63e01~mv2.png',
  aplecs: 'https://static.wixstatic.com/media/fb9e9f_0a3dca8c7c254c33a1cabcad4b101349~mv2.png',
  carnaval: 'https://static.wixstatic.com/media/fb9e9f_bedaaf452bf34265ab73ec2442b980e3~mv2.png',
  llegendes: 'https://static.wixstatic.com/media/fb9e9f_d94e9a8c74954eaba2162f9001d054b6~mv2.png',
};

export default function Traditions() {
  const { t } = useLanguage();
  const tr = t.traditions;

  return (
    <div className="pt-20 bg-[#f5f0e8] min-h-screen">
      {/* Header */}
      <section className="bg-[#f5f2ed] pt-24 pb-16 px-6 relative overflow-hidden border-b border-[#ddd6c8]">
        <div className="absolute left-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop"
            className="h-full w-full object-cover"
            alt="forest left"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop"
            className="h-full w-full object-cover"
            alt="forest right"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-10 leading-tight"
          >
            {tr.title1} <br /> <span>{tr.title2}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-px bg-[#b07d3a] mx-auto mb-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-[#5a5a4a] leading-relaxed max-w-2xl mx-auto font-light"
          >
            {tr.desc}
          </motion.p>
        </div>
      </section>

      {/* Traditions Content */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        {tr.items.map((tradition, idx) => (
          <motion.div
            key={tradition.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "flex flex-col md:flex-row items-stretch mb-16 last:mb-0 rounded-sm overflow-hidden shadow-lg",
              idx % 2 !== 0 && "md:flex-row-reverse"
            )}
          >
            {/* Image Side */}
            <div className="md:w-[42%] min-h-[300px] md:min-h-[450px] relative overflow-hidden">
              <img
                src={traditionImages[tradition.id]}
                alt={tradition.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Side */}
            <div className={cn(
              "flex-1 p-8 md:p-12 flex flex-col justify-center border-y border-[#e0d8c8]",
              tradition.dark
                ? "bg-[#2d4a2d] text-[#f5f0e8] border-[#2d4a2d]"
                : "bg-white text-[#2d4a2d] border-x border-[#e0d8c8]",
              idx % 2 === 0 && !tradition.dark && "border-r border-[#e0d8c8]",
              idx % 2 !== 0 && !tradition.dark && "border-l border-[#e0d8c8]"
            )}>
              <div className={cn(
                "text-[11px] font-bold tracking-[0.14em] uppercase mb-3",
                tradition.dark ? "text-[#d4a05a]" : "text-[#b07d3a]"
              )}>
                {tradition.tag}
              </div>
              <h2 className={cn(
                "font-display text-2xl md:text-3xl mb-4 leading-tight",
                tradition.dark ? "text-[#f5f0e8]" : "text-black"
              )}>
                {tradition.title}
              </h2>
              <div className="w-9 h-0.5 bg-[#b07d3a] mb-6" />
              <p className={cn(
                "text-sm md:text-base font-light leading-relaxed",
                tradition.dark ? "text-[#c8d4c8]" : "text-[#4a4a4a]"
              )}>
                {tradition.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Footer Quote */}
      <section className="max-w-4xl mx-auto px-6 pt-4 pb-16 text-center">
        <div className="w-16 h-px bg-[#d0c8b8] mx-auto mb-6" />
        <h2 className="font-display text-3xl md:text-4xl text-[#2d4a2d] mb-6">{tr.quoteTitle}</h2>
        <p className="text-base font-light text-[#5a5a4a] max-w-2xl mx-auto">
          {tr.quoteDesc}
        </p>
      </section>

      <ScrollToTop />
    </div>
  );
}