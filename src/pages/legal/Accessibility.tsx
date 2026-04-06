import { useLanguage } from '../../i18n/LanguageContext';
import ScrollToTop from '../../components/ScrollToTop';

const content = {
  es: {
    badge: 'Legal',
    title: 'Declaración de',
    titleSpan: 'Accesibilidad',
    updated: 'Última actualización: abril de 2025',
    sections: [
      {
        title: '1. Compromiso con la accesibilidad',
        body: 'Casa Jonico de Montardit se compromete a hacer accesible su sitio web casajonicomontardit.com a todas las personas, con independencia de su situación personal o tecnológica. Trabajamos para cumplir con las pautas WCAG 2.1 nivel AA.',
      },
      {
        title: '2. Medidas adoptadas',
        body: 'El sitio web incluye: textos alternativos en imágenes relevantes, estructura de encabezados semántica, contraste de colores suficiente, navegación por teclado, y textos legibles en todos los dispositivos.',
      },
      {
        title: '3. Limitaciones conocidas',
        body: 'Algunos contenidos de terceros incrustados (como mapas externos) pueden no cumplir plenamente con todos los criterios de accesibilidad. Trabajamos para minimizar estas limitaciones.',
      },
      {
        title: '4. Contacto',
        body: 'Si encuentras algún problema de accesibilidad o necesitas la información en un formato alternativo, contáctanos en reserves@casajonico.com o en el +34 607 830 381. Nos comprometemos a responder en un plazo máximo de 2 días hábiles.',
      },
    ],
  },
  ca: {
    badge: 'Legal',
    title: 'Declaració',
    titleSpan: "d'Accessibilitat",
    updated: 'Última actualització: abril de 2025',
    sections: [
      {
        title: '1. Compromís amb l\'accessibilitat',
        body: 'Casa Jonico de Montardit es compromet a fer accessible el seu lloc web casajonicomontardit.com a totes les persones, independentment de la seva situació personal o tecnològica. Treballem per complir amb les pautes WCAG 2.1 nivell AA.',
      },
      {
        title: '2. Mesures adoptades',
        body: 'El lloc web inclou: textos alternatius en imatges rellevants, estructura d\'encapçalaments semàntica, contrast de colors suficient, navegació per teclat, i textos llegibles en tots els dispositius.',
      },
      {
        title: '3. Limitacions conegudes',
        body: 'Alguns continguts de tercers incrustats (com ara mapes externs) poden no complir plenament amb tots els criteris d\'accessibilitat. Treballem per minimitzar aquestes limitacions.',
      },
      {
        title: '4. Contacte',
        body: 'Si trobes algun problema d\'accessibilitat o necessites la informació en un format alternatiu, contacta\'ns a reserves@casajonico.com o al +34 607 830 381. Ens comprometem a respondre en un termini màxim de 2 dies hàbils.',
      },
    ],
  },
  en: {
    badge: 'Legal',
    title: 'Accessibility',
    titleSpan: 'Statement',
    updated: 'Last updated: April 2025',
    sections: [
      {
        title: '1. Commitment to accessibility',
        body: 'Casa Jonico de Montardit is committed to making its website casajonicomontardit.com accessible to all people, regardless of their personal or technological situation. We work to meet WCAG 2.1 Level AA guidelines.',
      },
      {
        title: '2. Measures taken',
        body: 'The website includes: alternative text for relevant images, semantic heading structure, sufficient colour contrast, keyboard navigation, and readable text on all devices.',
      },
      {
        title: '3. Known limitations',
        body: 'Some embedded third-party content (such as external maps) may not fully meet all accessibility criteria. We work to minimise these limitations.',
      },
      {
        title: '4. Contact',
        body: 'If you find any accessibility issues or need information in an alternative format, contact us at reserves@casajonico.com or +34 607 830 381. We commit to responding within 2 business days.',
      },
    ],
  },
};

export default function Accessibility() {
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
