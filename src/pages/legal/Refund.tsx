import { useLanguage } from '../../i18n/LanguageContext';
import ScrollToTop from '../../components/ScrollToTop';

const content = {
  es: {
    badge: 'Legal',
    title: 'Política de',
    titleSpan: 'Reembolso',
    updated: 'Última actualización: abril de 2025',
    sections: [
      {
        title: '1. Cancelación gratuita',
        body: 'Si cancelas tu reserva con más de 30 días de antelación a la fecha de entrada, recibirás el reembolso íntegro del importe pagado, sin ningún cargo.',
      },
      {
        title: '2. Cancelación parcial (entre 14 y 30 días)',
        body: 'Si cancelas entre 14 y 30 días antes de la fecha de entrada, se retendrá el 50% del importe total de la reserva. Se reembolsará el 50% restante.',
      },
      {
        title: '3. Cancelación tardía (menos de 14 días)',
        body: 'Si cancelas con menos de 14 días de antelación, no habrá derecho a reembolso. Se retendrá el 100% del importe total de la reserva.',
      },
      {
        title: '4. Cómo cancelar',
        body: 'Para cancelar tu reserva, envía un correo electrónico a reserves@casajonico.com indicando tu nombre, fechas de estancia y número de reserva. La fecha de cancelación se contará desde la recepción del correo.',
      },
      {
        title: '5. Reembolsos',
        body: 'Los reembolsos se procesarán en un plazo máximo de 14 días hábiles mediante el mismo método de pago utilizado para la reserva.',
      },
      {
        title: '6. Casos excepcionales',
        body: 'En caso de circunstancias excepcionales debidamente justificadas (fuerza mayor, enfermedad grave documentada), Casa Jonico estudiará cada caso de forma individual y podrá ofrecer condiciones de cancelación más flexibles o la posibilidad de cambiar las fechas de estancia.',
      },
    ],
  },
  ca: {
    badge: 'Legal',
    title: 'Política de',
    titleSpan: 'Reemborsament',
    updated: 'Última actualització: abril de 2025',
    sections: [
      {
        title: '1. Cancel·lació gratuïta',
        body: 'Si cancel·les la teva reserva amb més de 30 dies d\'antelació a la data d\'entrada, rebràs el reemborsament íntegre de l\'import pagat, sense cap càrrec.',
      },
      {
        title: '2. Cancel·lació parcial (entre 14 i 30 dies)',
        body: 'Si cancel·les entre 14 i 30 dies abans de la data d\'entrada, es retindrà el 50% de l\'import total de la reserva. Es reemborsarà el 50% restant.',
      },
      {
        title: '3. Cancel·lació tardana (menys de 14 dies)',
        body: 'Si cancel·les amb menys de 14 dies d\'antelació, no hi haurà dret a reemborsament. Es retindrà el 100% de l\'import total de la reserva.',
      },
      {
        title: '4. Com cancel·lar',
        body: 'Per cancel·lar la teva reserva, envia un correu electrònic a reserves@casajonico.com indicant el teu nom, les dates d\'estada i el número de reserva. La data de cancel·lació es comptarà des de la recepció del correu.',
      },
      {
        title: '5. Reemborsaments',
        body: 'Els reemborsaments es processaran en un termini màxim de 14 dies hàbils mitjançant el mateix mètode de pagament utilitzat per a la reserva.',
      },
      {
        title: '6. Casos excepcionals',
        body: 'En cas de circumstàncies excepcionals degudament justificades (força major, malaltia greu documentada), Casa Jonico estudiarà cada cas de forma individual i podrà oferir condicions de cancel·lació més flexibles o la possibilitat de canviar les dates d\'estada.',
      },
    ],
  },
  en: {
    badge: 'Legal',
    title: 'Refund',
    titleSpan: 'Policy',
    updated: 'Last updated: April 2025',
    sections: [
      {
        title: '1. Free cancellation',
        body: 'If you cancel your booking more than 30 days before the check-in date, you will receive a full refund of the amount paid, with no charge.',
      },
      {
        title: '2. Partial cancellation (14–30 days)',
        body: 'If you cancel between 14 and 30 days before check-in, 50% of the total booking amount will be retained. The remaining 50% will be refunded.',
      },
      {
        title: '3. Late cancellation (less than 14 days)',
        body: 'If you cancel less than 14 days before check-in, no refund will be given. 100% of the total booking amount will be retained.',
      },
      {
        title: '4. How to cancel',
        body: 'To cancel your booking, send an email to reserves@casajonico.com with your name, stay dates and booking reference. The cancellation date will be counted from receipt of the email.',
      },
      {
        title: '5. Refunds',
        body: 'Refunds will be processed within a maximum of 14 business days via the same payment method used for the booking.',
      },
      {
        title: '6. Exceptional circumstances',
        body: 'In cases of duly justified exceptional circumstances (force majeure, documented serious illness), Casa Jonico will assess each case individually and may offer more flexible cancellation conditions or the option to change the stay dates.',
      },
    ],
  },
};

export default function Refund() {
  const { locale } = useLanguage();
  const c = content[locale];

  return (
    <div className="pt-20 bg-[#f5f0e8] min-h-screen">
      <section className="bg-[#f5f2ed] pt-24 pb-16 px-6 border-b border-[#ddd6c8]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b07d3a] mb-4 block">{c.badge}</span>
          <h1 className="text-2xl md:text-5xl font-display text-[#2d4a2d] mb-6 leading-tight">
            {c.title} <span>{c.titleSpan}</span>
          </h1>
          <p className="text-xs text-[#9a9a8a] font-light">{c.updated}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-10">
        {c.sections.map((s, i) => (
          <div key={i} className="border-b border-[#e0d8c8] pb-8">
            <h2 className="font-display text-xl text-[#2d4a2d] mb-3">{s.title}</h2>
            <p className="text-[#5a5a4a] font-light leading-relaxed text-sm">{s.body}</p>
          </div>
        ))}
      </section>
      <ScrollToTop />
    </div>
  );
}
