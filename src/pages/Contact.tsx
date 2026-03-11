import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Loader2, Clock } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', email: '', tel: '', motivo: '', mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email) {
      alert(c.alertMsg);
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xaqdkzdn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Contacto Casa Jonico: ${formData.motivo || 'Consulta general'}`,
          _replyto: formData.email,
          Nombre: `${formData.nombre} ${formData.apellido}`,
          Email: formData.email,
          Teléfono: formData.tel || '—',
          Motivo: formData.motivo || '—',
          Mensaje: formData.mensaje || '—',
        })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ nombre: '', apellido: '', email: '', tel: '', motivo: '', mensaje: '' });
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
      alert(c.errorMsg);
    }
  };

  const contactItems = [
    { label: c.labelTel,      value: '+34 607 83 03 81',           href: 'tel:+34607830381',           icon: Phone,          whatsapp: false },
    { label: c.labelEmail,    value: 'reserves@casajonico.com',     href: 'mailto:reserves@casajonico.com', icon: Mail,         whatsapp: false },
    { label: c.labelDir,      value: c.dirValue,                    href: undefined,                    icon: MapPin,         whatsapp: false },
    { label: c.labelWhatsapp, value: c.whatsappValue,               href: 'https://wa.me/34607830381',  icon: MessageCircle,  whatsapp: true  },
  ];

  return (
    <div className="pt-20 bg-[#f5f0e8] min-h-screen">

      {/* Header */}
      <section className="bg-[#f5f2ed] pt-24 pb-16 px-6 relative overflow-hidden border-b border-[#ddd6c8]">
        <div className="absolute left-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover" alt="" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/5 hidden xl:block opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover" alt="" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b07d3a] mb-4 block">
            {c.badge}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-10 leading-tight">
            {c.title} <br /> <span>{c.titleSpan}</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-24 h-px bg-[#b07d3a] mx-auto mb-10" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-base md:text-lg text-[#5a5a4a] leading-relaxed max-w-2xl mx-auto font-light">
            {c.desc}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">
            <div className="space-y-0 border-t border-[#ddd6c8]">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-6 py-6 border-b border-[#ddd6c8] group">
                  {item.href ? (
                    <a href={item.href} target={item.whatsapp ? '_blank' : undefined} rel={item.whatsapp ? 'noopener noreferrer' : undefined}
                      className="w-10 h-10 rounded-full border border-[#ddd6c8] flex items-center justify-center flex-shrink-0 mt-1 transition-colors group-hover:border-[#2d4a2d] group-hover:bg-[#2d4a2d]/5">
                      <item.icon className="w-4 h-4 text-[#2d4a2d]" />
                    </a>
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-[#ddd6c8] flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-[#2d4a2d]" />
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#b07d3a] mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.whatsapp ? '_blank' : undefined} rel={item.whatsapp ? 'noopener noreferrer' : undefined}
                        className="text-base font-light text-[#2c2c2c] hover:text-[#2d4a2d] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base font-light text-[#2c2c2c] leading-relaxed">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white border border-[#e0d8c8] border-l-4 border-l-[#2d4a2d] rounded-sm p-6 flex items-center gap-4 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#2d4a2d] animate-pulse" />
              <p className="text-sm text-[#5a5a4a] font-light">
                <strong className="text-[#2d4a2d] font-medium">{c.responseNote}</strong> — {c.responseDesc}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white border border-[#e0d8c8] rounded-sm p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-display text-2xl text-black mb-2">{c.formTitle}</h2>
              <p className="text-sm text-[#9a9a8a] font-light mb-8 pb-6 border-b border-[#ede8de]">{c.formDesc}</p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="py-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-[#edf4ed] text-[#2d4a2d] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-[#2d4a2d] mb-2">{c.successTitle}</h3>
                      <p className="text-[#5a5a4a] font-light leading-relaxed">{c.successDesc}</p>
                    </div>
                    <button onClick={() => setStatus('idle')} className="text-[#b07d3a] font-bold uppercase tracking-widest text-[11px] hover:underline">
                      {c.successBtn}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{c.fieldNombre}</label>
                        <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} placeholder={c.placeholderNombre} required
                          className="w-full px-4 py-3 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] focus:bg-white outline-none transition-all font-light text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{c.fieldApellido}</label>
                        <input type="text" id="apellido" value={formData.apellido} onChange={handleChange} placeholder={c.placeholderApellido}
                          className="w-full px-4 py-3 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] focus:bg-white outline-none transition-all font-light text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{c.fieldEmail}</label>
                      <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder={c.placeholderEmail} required
                        className="w-full px-4 py-3 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] focus:bg-white outline-none transition-all font-light text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{c.fieldTel}</label>
                      <input type="tel" id="tel" value={formData.tel} onChange={handleChange} placeholder={c.placeholderTel}
                        className="w-full px-4 py-3 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] focus:bg-white outline-none transition-all font-light text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{c.fieldMotivo}</label>
                      <select id="motivo" value={formData.motivo} onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] focus:bg-white outline-none transition-all font-light text-sm appearance-none">
                        <option value="">{c.motivoDefault}</option>
                        <option>{c.motivo1}</option>
                        <option>{c.motivo2}</option>
                        <option>{c.motivo3}</option>
                        <option>{c.motivo4}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{c.fieldMensaje}</label>
                      <textarea id="mensaje" value={formData.mensaje} onChange={handleChange} rows={4} placeholder={c.placeholderMensaje}
                        className="w-full px-4 py-3 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] focus:bg-white outline-none transition-all font-light text-sm resize-none" />
                    </div>
                    <button type="submit" disabled={status === 'loading'}
                      className="w-full py-4 bg-[#2d4a2d] text-[#f5f0e8] font-display text-lg rounded-sm hover:bg-[#1e3620] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group">
                      {status === 'loading' ? (
                        <><Loader2 className="w-5 h-5 animate-spin" />{c.submitting}</>
                      ) : (
                        <>{c.submitBtn}<Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#9a9a8a] font-light">
                      <Clock className="w-3 h-3" />
                      {c.responseTime}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f5f0e8] rounded-full opacity-50 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-4xl mx-auto px-6 pt-4 pb-16 text-center">
        <div className="w-16 h-px bg-[#d0c8b8] mx-auto mb-6" />
        <h2 className="font-display text-3xl md:text-4xl text-[#2d4a2d] mb-6 italic">{c.quoteTitle}</h2>
        <p className="text-base font-light text-[#5a5a4a] max-w-2xl mx-auto">{c.quoteDesc}</p>
      </section>

      <ScrollToTop />
    </div>
  );
}