import { useLanguage } from '../../i18n/LanguageContext';
import ScrollToTop from '../../components/ScrollToTop';

const content = {
  es: {
    badge: 'Legal',
    title: 'Términos y',
    titleSpan: 'Condiciones',
    updated: 'Última actualización: abril de 2025',
    sections: [
      {
        title: '1. Identificación',
        body: 'Casa Jonico de Montardit, Montardit de Dalt, Sort, Lleida 25568. Teléfono: +34 607 830 381. Email: reserves@casajonico.com. Licencia turística: HUTL-062592.',
      },
      {
        title: '2. Objeto',
        body: 'Estas condiciones regulan el uso del sitio web casajonicomontardit.com y la contratación del servicio de alojamiento rural en Casa Jonico de Montardit.',
      },
      {
        title: '3. Proceso de reserva',
        body: 'La reserva se solicita mediante el formulario disponible en la web. No es efectiva hasta recibir la confirmación por escrito por parte de Casa Jonico, en un plazo máximo de 24 horas. El pago se realiza según las instrucciones indicadas en la confirmación.',
      },
      {
        title: '4. Precios',
        body: 'Los precios publicados en la web son por noche y para toda la casa. Se aplica un descuento del 12% sobre las tarifas de plataformas externas (Booking.com, Airbnb) para reservas directas. Los precios incluyen IVA.',
      },
      {
        title: '5. Normas de la casa',
        body: 'Capacidad máxima: 8 personas. No se admiten mascotas. No está permitido fumar en el interior. El check-in es a partir de las 16h y el check-out antes de las 12h. Los huéspedes son responsables de los daños ocasionados durante su estancia.',
      },
      {
        title: '6. Propiedad intelectual',
        body: 'Todos los contenidos del sitio web (textos, imágenes, diseño) son propiedad de Casa Jonico de Montardit o se usan con la debida autorización. Queda prohibida su reproducción sin consentimiento expreso.',
      },
      {
        title: '7. Legislación aplicable',
        body: 'Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Lleida.',
      },
    ],
  },
  ca: {
    badge: 'Legal',
    title: 'Termes i',
    titleSpan: 'Condicions',
    updated: 'Última actualització: abril de 2025',
    sections: [
      {
        title: '1. Identificació',
        body: 'Casa Jonico de Montardit, Montardit de Dalt, Sort, Lleida 25568. Telèfon: +34 607 830 381. Email: reserves@casajonico.com. Llicència turística: HUTL-062592.',
      },
      {
        title: '2. Objecte',
        body: 'Aquestes condicions regulen l\'ús del lloc web casajonicomontardit.com i la contractació del servei d\'allotjament rural a Casa Jonico de Montardit.',
      },
      {
        title: '3. Procés de reserva',
        body: 'La reserva es sol·licita mitjançant el formulari disponible a la web. No és efectiva fins a rebre la confirmació per escrit per part de Casa Jonico, en un termini màxim de 24 hores. El pagament es realitza segons les instruccions indicades a la confirmació.',
      },
      {
        title: '4. Preus',
        body: 'Els preus publicats a la web són per nit i per a tota la casa. S\'aplica un descompte del 12% sobre les tarifes de plataformes externes (Booking.com, Airbnb) per a reserves directes. Els preus inclouen IVA.',
      },
      {
        title: '5. Normes de la casa',
        body: 'Capacitat màxima: 8 persones. No s\'admeten mascotes. No es permet fumar a l\'interior. El check-in és a partir de les 16h i el check-out abans de les 12h. Els hostes són responsables dels danys ocasionats durant la seva estada.',
      },
      {
        title: '6. Propietat intel·lectual',
        body: 'Tots els continguts del lloc web (textos, imatges, disseny) són propietat de Casa Jonico de Montardit o s\'usen amb la deguda autorització. Queda prohibida la seva reproducció sense consentiment exprés.',
      },
      {
        title: '7. Legislació aplicable',
        body: 'Aquestes condicions es regeixen per la legislació espanyola. Per a qualsevol controvèrsia, les parts se sotmeten als jutjats i tribunals de Lleida.',
      },
    ],
  },
  en: {
    badge: 'Legal',
    title: 'Terms &',
    titleSpan: 'Conditions',
    updated: 'Last updated: April 2025',
    sections: [
      {
        title: '1. Identification',
        body: 'Casa Jonico de Montardit, Montardit de Dalt, Sort, Lleida 25568. Phone: +34 607 830 381. Email: reserves@casajonico.com. Tourism licence: HUTL-062592.',
      },
      {
        title: '2. Purpose',
        body: 'These terms govern the use of casajonicomontardit.com and the booking of rural accommodation at Casa Jonico de Montardit.',
      },
      {
        title: '3. Booking process',
        body: 'Bookings are requested via the form on the website. They are not confirmed until written confirmation is received from Casa Jonico, within a maximum of 24 hours. Payment is made according to the instructions provided in the confirmation.',
      },
      {
        title: '4. Prices',
        body: 'Prices published on the website are per night for the entire house. A 12% discount applies compared to external platform rates (Booking.com, Airbnb) for direct bookings. Prices include VAT.',
      },
      {
        title: '5. House rules',
        body: 'Maximum capacity: 8 people. No pets allowed. No smoking inside. Check-in from 4pm, check-out before 12pm. Guests are responsible for any damages caused during their stay.',
      },
      {
        title: '6. Intellectual property',
        body: 'All website content (text, images, design) is owned by Casa Jonico de Montardit or used with proper authorisation. Reproduction without express consent is prohibited.',
      },
      {
        title: '7. Applicable law',
        body: 'These terms are governed by Spanish law. For any dispute, the parties submit to the courts of Lleida.',
      },
    ],
  },
};

export default function Terms() {
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
