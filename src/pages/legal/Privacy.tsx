import { useLanguage } from '../../i18n/LanguageContext';
import ScrollToTop from '../../components/ScrollToTop';

const content = {
  es: {
    badge: 'Legal',
    title: 'Política de',
    titleSpan: 'Privacidad',
    updated: 'Última actualización: abril de 2025',
    sections: [
      {
        title: '1. Responsable del tratamiento',
        body: 'Casa Jonico de Montardit, Montardit de Dalt, Sort, Lleida 25568. Teléfono: +34 607 830 381. Email: reserves@casajonico.com',
      },
      {
        title: '2. Finalidad del tratamiento',
        body: 'Tratamos tus datos personales con las siguientes finalidades: (a) Gestionar las solicitudes de reserva y el servicio de alojamiento. (b) Responder a consultas y peticiones enviadas a través del formulario de contacto. (c) Enviar comunicaciones relacionadas con tu estancia.',
      },
      {
        title: '3. Base legal',
        body: 'La base legal para el tratamiento de tus datos es la ejecución del contrato de reserva (art. 6.1.b RGPD) y el interés legítimo para responder a consultas (art. 6.1.f RGPD).',
      },
      {
        title: '4. Conservación de los datos',
        body: 'Los datos se conservarán durante el tiempo necesario para prestar el servicio y durante el plazo legalmente establecido, con un máximo de 3 años tras la finalización de la estancia o la última comunicación.',
      },
      {
        title: '5. Destinatarios',
        body: 'No cedemos tus datos a terceros, salvo obligación legal. Utilizamos Formspree (formspree.io) para la gestión de formularios, proveedor que cumple con el RGPD.',
      },
      {
        title: '6. Tus derechos',
        body: 'Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición escribiendo a reserves@casajonico.com. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).',
      },
    ],
  },
  ca: {
    badge: 'Legal',
    title: 'Política de',
    titleSpan: 'Privacitat',
    updated: 'Última actualització: abril de 2025',
    sections: [
      {
        title: '1. Responsable del tractament',
        body: 'Casa Jonico de Montardit, Montardit de Dalt, Sort, Lleida 25568. Telèfon: +34 607 830 381. Email: reserves@casajonico.com',
      },
      {
        title: '2. Finalitat del tractament',
        body: 'Tractem les teves dades personals amb les finalitats següents: (a) Gestionar les sol·licituds de reserva i el servei d\'allotjament. (b) Respondre a consultes i peticions enviades a través del formulari de contacte. (c) Enviar comunicacions relacionades amb la teva estada.',
      },
      {
        title: '3. Base legal',
        body: 'La base legal per al tractament de les teves dades és l\'execució del contracte de reserva (art. 6.1.b RGPD) i l\'interès legítim per respondre a consultes (art. 6.1.f RGPD).',
      },
      {
        title: '4. Conservació de les dades',
        body: 'Les dades es conservaran durant el temps necessari per prestar el servei i durant el termini legalment establert, amb un màxim de 3 anys després de la finalització de l\'estada o de l\'última comunicació.',
      },
      {
        title: '5. Destinataris',
        body: 'No cedim les teves dades a tercers, llevat d\'obligació legal. Fem servir Formspree (formspree.io) per a la gestió de formularis, proveïdor que compleix el RGPD.',
      },
      {
        title: '6. Els teus drets',
        body: 'Pots exercir els teus drets d\'accés, rectificació, supressió, portabilitat, limitació i oposició escrivint a reserves@casajonico.com. També pots presentar una reclamació davant l\'Agència Espanyola de Protecció de Dades (aepd.es).',
      },
    ],
  },
  en: {
    badge: 'Legal',
    title: 'Privacy',
    titleSpan: 'Policy',
    updated: 'Last updated: April 2025',
    sections: [
      {
        title: '1. Data Controller',
        body: 'Casa Jonico de Montardit, Montardit de Dalt, Sort, Lleida 25568. Phone: +34 607 830 381. Email: reserves@casajonico.com',
      },
      {
        title: '2. Purpose of processing',
        body: 'We process your personal data for the following purposes: (a) Managing booking requests and the accommodation service. (b) Responding to enquiries and requests sent through the contact form. (c) Sending communications related to your stay.',
      },
      {
        title: '3. Legal basis',
        body: 'The legal basis for processing your data is the performance of the booking contract (art. 6.1.b GDPR) and legitimate interest for responding to enquiries (art. 6.1.f GDPR).',
      },
      {
        title: '4. Data retention',
        body: 'Data will be kept for as long as necessary to provide the service and for the legally established period, with a maximum of 3 years after the end of the stay or last communication.',
      },
      {
        title: '5. Recipients',
        body: 'We do not share your data with third parties, except as required by law. We use Formspree (formspree.io) for form management, a GDPR-compliant provider.',
      },
      {
        title: '6. Your rights',
        body: 'You may exercise your rights of access, rectification, erasure, portability, restriction and objection by writing to reserves@casajonico.com. You may also lodge a complaint with the Spanish Data Protection Agency (aepd.es).',
      },
    ],
  },
};

export default function Privacy() {
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
