import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

const FORMSPREE_ID = 'xaqdkzdn';

const seasons = [
  { name: 'alta', months: [6, 7], price: 285, minNights: 3 },
  { name: 'media', months: [5, 8], price: 235, minNights: 2 },
  { name: 'baja', months: null, price: 210, minNights: 2 },
];

const specialHighDates = [
  '2026-03-29', '2026-03-30', '2026-03-31', '2026-04-01', '2026-04-02', '2026-04-03', '2026-04-04', '2026-04-05',
  '2026-12-24', '2026-12-25', '2026-12-26', '2026-12-27', '2026-12-28', '2026-12-29', '2026-12-30', '2026-12-31',
  '2027-01-01', '2027-01-02', '2027-01-03',
];

export default function Pricing() {
  const { t } = useLanguage();
  const p = t.pricing;

  const [occupiedDates, setOccupiedDates] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetch('/.netlify/functions/ical')
      .then(r => r.json())
      .then(data => { if (data.blockedDates) setOccupiedDates(data.blockedDates); })
      .catch(() => {}); // si falla, el calendari queda sense dates bloquejades
  }, []);
  const [selectStart, setSelectStart] = useState<string | null>(null);
  const [selectEnd, setSelectEnd] = useState<string | null>(null);
  const [awaitingEnd, setAwaitingEnd] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', email: '', tel: '',
    personas: '', ninos: '0', mensaje: ''
  });

  const toDateStr = (d: Date) =>
    d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  const getSeasonForDate = (dateStr: string) => {
    if (specialHighDates.includes(dateStr)) return seasons[0];
    const month = new Date(dateStr + 'T00:00:00').getMonth();
    return seasons.find(s => s.months && s.months.includes(month)) || seasons[2];
  };

  // Determina el mínim de nits per a un rang de dates (agafa el màxim dels mínims de les temporades implicades)
  const getMinNightsForRange = (startStr: string, endStr: string) => {
    let maxMin = 2;
    let cur = new Date(startStr + 'T00:00:00');
    const end = new Date(endStr + 'T00:00:00');
    while (cur < end) {
      const season = getSeasonForDate(toDateStr(cur));
      if (season.minNights > maxMin) maxMin = season.minNights;
      cur.setDate(cur.getDate() + 1);
    }
    return maxMin;
  };

  const calcTotal = (startStr: string, endStr: string) => {
    const result = { nights: 0, breakdown: [] as any[], total: 0 };
    let cur = new Date(startStr + 'T00:00:00');
    const end = new Date(endStr + 'T00:00:00');
    while (cur < end) {
      const ds = toDateStr(cur);
      const season = getSeasonForDate(ds);
      result.nights++;
      result.total += season.price;
      const last = result.breakdown[result.breakdown.length - 1];
      if (last && last.seasonName === season.name) {
        last.nights++;
        last.subtotal += season.price;
      } else {
        result.breakdown.push({ seasonName: season.name, price: season.price, nights: 1, subtotal: season.price });
      }
      cur.setDate(cur.getDate() + 1);
    }
    return result;
  };

  const hasOccupiedBetween = (startStr: string, endStr: string) => {
    let cur = new Date(startStr + 'T00:00:00');
    cur.setDate(cur.getDate() + 1);
    const end = new Date(endStr + 'T00:00:00');
    while (cur < end) {
      if (occupiedDates.includes(toDateStr(cur))) return true;
      cur.setDate(cur.getDate() + 1);
    }
    return false;
  };

  const selectDate = (dateStr: string) => {
    if (!awaitingEnd) {
      setSelectStart(dateStr);
      setSelectEnd(null);
      setAwaitingEnd(true);
    } else {
      const start = new Date(selectStart! + 'T00:00:00');
      const end = new Date(dateStr + 'T00:00:00');
      if (end <= start || hasOccupiedBetween(selectStart!, dateStr)) {
        setSelectStart(dateStr);
        setSelectEnd(null);
      } else {
        setSelectEnd(dateStr);
        setAwaitingEnd(false);
      }
    }
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const getSeasonLabel = (seasonName: string) => {
    const idx = seasonName === 'alta' ? 0 : seasonName === 'media' ? 1 : 2;
    return p.seasonRows[idx]?.label || seasonName;
  };

  // Calcula si el rang seleccionat té prou nits
  const minNightsRequired = selectStart && selectEnd ? getMinNightsForRange(selectStart, selectEnd) : 2;
  const calcResult = selectStart && selectEnd ? calcTotal(selectStart, selectEnd) : null;
  const minNightsNotMet = calcResult !== null && calcResult.nights < minNightsRequired;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email) {
      alert(p.alertForm);
      return;
    }
    if (!selectStart || !selectEnd) {
      alert(p.alertDates);
      return;
    }
    if (minNightsNotMet) {
      alert(p.minNightsAlert(minNightsRequired));
      return;
    }
    setStatus('loading');
    const calc = calcTotal(selectStart, selectEnd);
    const fmt = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString(p.summaryLocale, { day: 'numeric', month: 'long', year: 'numeric' });
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `${p.emailSubject}: ${fmt(selectStart)} → ${fmt(selectEnd)}`,
          _replyto: formData.email,
          [p.fieldNombre]: `${formData.nombre} ${formData.apellido}`,
          [p.fieldEmail]: formData.email,
          [p.fieldTel]: formData.tel || '—',
          [p.summaryCheckin]: fmt(selectStart),
          [p.summaryCheckout]: fmt(selectEnd),
          Noches: calc.nights,
          [p.fieldPersonas]: formData.personas || '—',
          [p.fieldNinos]: formData.ninos,
          Total: Math.round(calc.total * 0.88) + ' ' + p.totalSuf,
          [p.fieldMensaje]: formData.mensaje || '—',
        })
      });
      if (response.ok) setStatus('success');
      else throw new Error('Error');
    } catch {
      setStatus('error');
      alert(p.alertError);
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date(); today.setHours(0, 0, 0, 0);

    const days = [];
    for (let i = 0; i < offset; i++) days.push(<div key={`e-${i}`} className="aspect-square" />);

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dateObj = new Date(year, month, d);
      const isPast = dateObj < today;
      const isOccupied = occupiedDates.includes(dateStr);
      const season = getSeasonForDate(dateStr);

      let cls = 'aspect-square flex items-center justify-center text-sm font-light rounded-sm transition-all relative cursor-pointer ';
      if (isPast) {
        cls += 'text-gray-300 cursor-default ';
      } else if (isOccupied) {
        cls += 'bg-[#f0e8e0] text-[#c4a882] cursor-not-allowed line-through ';
      } else {
        if (season.name === 'alta') cls += 'text-[#b07d3a] ';
        if (season.name === 'media') cls += 'text-[#2d4a2d] ';
        cls += 'hover:bg-[#eee8dc] ';
      }

      const isStart = dateStr === selectStart;
      const isEnd = dateStr === selectEnd;
      const isInRange = selectStart && selectEnd &&
        dateObj > new Date(selectStart + 'T00:00:00') &&
        dateObj < new Date(selectEnd + 'T00:00:00');

      if (isStart || isEnd) {
        cls = 'aspect-square flex items-center justify-center text-sm font-medium bg-[#2d4a2d] text-white rounded-sm relative z-10 ';
      } else if (isInRange) {
        cls = 'aspect-square flex items-center justify-center text-sm font-light bg-[#e0ebe0] text-[#2d4a2d] relative ';
      }

      days.push(
        <div key={dateStr} className={cls} onClick={() => !isPast && !isOccupied && selectDate(dateStr)}>
          {d}
          {isOccupied && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#b07d3a] opacity-50" />}
        </div>
      );
    }

    return (
      <div className="bg-white border border-[#e0d8c8] rounded-sm p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-display text-xl text-black capitalize">
            {p.calMonths[month]} {year}
          </h3>
          <div className="flex gap-2">
            <button onClick={() => changeMonth(-1)} className="w-8 h-8 border border-[#d0c8b8] rounded-sm flex items-center justify-center text-[#2d4a2d] hover:bg-[#2d4a2d] hover:text-white transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => changeMonth(1)} className="w-8 h-8 border border-[#d0c8b8] rounded-sm flex items-center justify-center text-[#2d4a2d] hover:bg-[#2d4a2d] hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className={`text-xs text-center mb-6 italic transition-colors ${awaitingEnd ? 'text-[#b07d3a] font-medium' : 'text-[#a09a8a]'}`}>
          {awaitingEnd ? p.calInstruccionEnd : p.calInstruccion}
        </p>

        <div className="grid grid-cols-7 gap-1 mb-8">
          {p.calDays.map(dow => (
            <div key={dow} className="text-center text-[10px] font-bold uppercase tracking-widest text-[#9a9a8a] py-2">{dow}</div>
          ))}
          {days}
        </div>

        <div className="pt-6 border-t border-[#ede8de] flex flex-wrap gap-x-6 gap-y-3">
          <div className="flex items-center gap-2 text-[11px] text-[#7a7a6a]">
            <div className="w-3 h-3 bg-[#2d4a2d] rounded-sm" /> {p.calSeleccionado}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#7a7a6a]">
            <div className="w-3 h-3 bg-[#e0ebe0] border border-[#c8d8c8] rounded-sm" /> {p.calRango}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#7a7a6a]">
            <div className="w-3 h-3 bg-[#f0e8e0] border border-[#d0c8b8] rounded-sm" /> {p.calNoDisp}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#7a7a6a]">
            <div className="w-2 h-2 bg-[#b07d3a] rounded-full" /> {p.calTAlta}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#7a7a6a]">
            <div className="w-2 h-2 bg-[#2d4a2d] rounded-full" /> {p.calTMedia}
          </div>
        </div>

        {/* Nota mínims de nits — sempre visible sota la llegenda */}
        <div className="mt-5 pt-5 border-t border-[#ede8de] flex flex-col gap-1.5">
          <p className="text-[11px] text-[#9a9a8a] font-light flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b07d3a] flex-shrink-0" />
            {p.minNightsHigh}
          </p>
          <p className="text-[11px] text-[#9a9a8a] font-light flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2d4a2d] flex-shrink-0" />
            {p.minNightsMid}
          </p>
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    if (!selectStart || !selectEnd) {
      return (
        <div className="text-center py-8 text-[#a0b0a0] font-light italic text-sm">
          {awaitingEnd ? p.summaryEmptyEnd : p.summaryEmpty}
        </div>
      );
    }

    const calc = calcTotal(selectStart, selectEnd);
    const fmt = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString(p.summaryLocale, { day: 'numeric', month: 'short', year: 'numeric' });
    const totalOriginal = calc.total;
    const totalDescuento = Math.round(totalOriginal * 0.88);
    const estalvi = totalOriginal - totalDescuento;

    return (
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-[#c8d4c8] font-light">
          <span>{p.summaryCheckin}</span>
          <span className="text-white">{fmt(selectStart)}</span>
        </div>
        <div className="flex justify-between text-sm text-[#c8d4c8] font-light">
          <span>{p.summaryCheckout}</span>
          <span className="text-white">{fmt(selectEnd)}</span>
        </div>

        <div className="pt-4 space-y-2">
          {calc.breakdown.map((b, idx) => (
            <div key={idx} className="flex justify-between text-sm text-[#c8d4c8] font-light">
              <span>
                {b.nights} {b.nights > 1 ? p.summaryNights : p.summaryNight} · {getSeasonLabel(b.seasonName)} ({b.price}€/n)
              </span>
              <span className="text-white">{b.subtotal}€</span>
            </div>
          ))}
        </div>

        {/* Avís mínims no complerts */}
        {minNightsNotMet && (
          <div className="flex items-start gap-2 bg-[#b07d3a]/20 border border-[#b07d3a]/40 rounded-sm px-3 py-2.5 mt-2">
            <AlertCircle className="w-3.5 h-3.5 text-[#d4a05a] flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#d4a05a] font-light leading-snug">
              {p.minNightsAlert(minNightsRequired)}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 mt-4">
          <div className="flex justify-between items-start">
            <span className="text-base text-white">{p.summaryTotal}</span>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="text-xs text-white/40 line-through">{totalOriginal} €</span>
                <span className="bg-[#b07d3a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-12%</span>
              </div>
              <span className="font-display text-2xl text-white">{totalDescuento} €</span>
            </div>
          </div>
          <p className="text-[11px] text-[#a8c4a8] text-right mt-2">
            {p.summaryAhorro} {estalvi} {p.summaryAhorroSuf}
          </p>
        </div>
      </div>
    );
  };

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
            {p.badge}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-10 leading-tight">
            {p.title} <br /> <span>{p.titleSpan}</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-24 h-px bg-[#b07d3a] mx-auto mb-10" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-base md:text-lg text-[#5a5a4a] leading-relaxed max-w-2xl mx-auto font-light">
            {p.desc}
          </motion.p>
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center border-b border-[#ddd6c8] pb-16">
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#b07d3a] mb-2">{p.bannerMin}</p>
            <p className="font-display text-2xl text-black">{p.bannerMinVal}</p>
            <p className="text-[11px] text-[#9a9a8a] mt-1">{p.bannerMinSub}</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#d0c8b8]" />
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#b07d3a] mb-2">{p.bannerCheckin}</p>
            <p className="font-display text-2xl text-black">{p.bannerCheckinVal}</p>
            <p className="text-[11px] text-[#9a9a8a] mt-1">{p.bannerCheckinSub}</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#d0c8b8]" />
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#b07d3a] mb-2">{p.bannerCap}</p>
            <p className="font-display text-2xl text-black">{p.bannerCapVal}</p>
            <p className="text-[11px] text-[#9a9a8a] mt-1">{p.bannerCapSub}</p>
          </div>
        </div>
      </section>

      {/* Season Table */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        {/* Desktop */}
        <div className="hidden sm:block bg-white border border-[#e0d8c8] rounded-sm overflow-hidden shadow-sm">
          <div className="grid grid-cols-4 bg-[#2d4a2d] text-[#f5f0e8] text-[10px] font-bold tracking-widest uppercase p-4 gap-4">
            <span>Temporada</span>
            <span className="col-span-2">Período</span>
            <span className="text-right">Precio/noche</span>
          </div>
          {p.seasonRows.map((row, idx) => (
            <div key={idx} className={`grid grid-cols-4 p-4 gap-4 items-center border-t border-[#ede8de] text-sm font-light ${idx % 2 === 0 ? '' : 'bg-[#faf8f4]'}`}>
              <span><span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${row.badge}`}>{row.label}</span></span>
              <span className="col-span-2 text-[#5a5a4a]">{row.period}</span>
              <span className="text-right font-display text-lg text-black">{row.price}</span>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="sm:hidden space-y-3">
          {p.seasonRows.map((row, idx) => (
            <div key={idx} className={`bg-white border-l-4 ${row.border} border border-[#e0d8c8] rounded-sm p-4 shadow-sm flex items-center justify-between gap-4`}>
              <div className="flex flex-col gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase w-fit ${row.badge}`}>{row.label}</span>
                <span className="text-sm text-[#5a5a4a] font-light">{row.period}</span>
              </div>
              <span className="font-display text-xl text-black whitespace-nowrap">{row.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Layout */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Calendar */}
          <div className="lg:col-span-2">
            {renderCalendar()}
          </div>

          {/* Summary + Form */}
          <div className="space-y-8">
            <div className="bg-[#2d4a2d] rounded-sm p-8 text-[#f5f0e8] shadow-xl">
              <h3 className="font-display text-lg mb-6">{p.summaryTitle}</h3>
              {renderSummary()}
            </div>

            <div className="bg-white border border-[#e0d8c8] rounded-sm p-8 shadow-xl">
              <h3 className="font-display text-lg text-[#2d4a2d] mb-6 pb-4 border-b border-[#ede8de]">{p.formTitle}</h3>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#edf4ed] text-[#2d4a2d] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-display text-xl text-[#2d4a2d]">{p.successTitle}</h4>
                    <p className="text-sm text-[#5a5a4a] font-light">{p.successDesc}</p>
                    <button onClick={() => setStatus('idle')} className="text-[#b07d3a] text-[10px] font-bold uppercase tracking-widest hover:underline">{p.successBtn}</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{p.fieldNombre}</label>
                        <input type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} placeholder={p.placeholderNombre} required className="w-full px-4 py-2 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] outline-none text-sm font-light" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{p.fieldApellido}</label>
                        <input type="text" value={formData.apellido} onChange={e => setFormData({...formData, apellido: e.target.value})} placeholder={p.placeholderApellido} className="w-full px-4 py-2 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] outline-none text-sm font-light" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{p.fieldEmail}</label>
                      <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder={p.placeholderEmail} required className="w-full px-4 py-2 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] outline-none text-sm font-light" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{p.fieldTel}</label>
                      <input type="tel" value={formData.tel} onChange={e => setFormData({...formData, tel: e.target.value})} placeholder={p.placeholderTel} className="w-full px-4 py-2 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] outline-none text-sm font-light" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{p.fieldPersonas}</label>
                        <select value={formData.personas} onChange={e => setFormData({...formData, personas: e.target.value})} className="w-full px-4 py-2 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] outline-none text-sm font-light appearance-none">
                          <option value="">—</option>
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{p.fieldNinos}</label>
                        <select value={formData.ninos} onChange={e => setFormData({...formData, ninos: e.target.value})} className="w-full px-4 py-2 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] outline-none text-sm font-light appearance-none">
                          {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a7a6a]">{p.fieldMensaje}</label>
                      <textarea value={formData.mensaje} onChange={e => setFormData({...formData, mensaje: e.target.value})} rows={3} placeholder={p.placeholderMensaje} className="w-full px-4 py-2 bg-[#faf8f4] border border-[#d8d0c0] rounded-sm focus:border-[#2d4a2d] outline-none text-sm font-light resize-none" />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading' || !selectStart || !selectEnd || minNightsNotMet}
                      className="w-full py-4 bg-[#2d4a2d] text-white font-display text-lg rounded-sm hover:bg-[#1e3620] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {status === 'loading'
                        ? <Loader2 className="w-5 h-5 animate-spin" />
                        : <>{p.submitBtn} <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                      }
                    </button>
                    <p className="text-[10px] text-center text-[#9a9a8a] font-light">{p.confirmNote}</p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-4xl mx-auto px-6 pt-4 pb-16 text-center">
        <div className="w-16 h-px bg-[#d0c8b8] mx-auto mb-6" />
        <h2 className="font-display text-3xl md:text-4xl text-[#2d4a2d] mb-6">{p.quoteTitle}</h2>
        <p className="text-base font-light text-[#5a5a4a] max-w-2xl mx-auto">{p.quoteDesc}</p>
      </section>

      <ScrollToTop />
    </div>
  );
}