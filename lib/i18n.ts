/**
 * Vermilion Routes - Bilingual Translation System (EN / ES)
 * Simple key-value store for all UI strings displayed to visitors.
 */

export type Lang = 'en' | 'es';

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.destinations': 'Destinations',
    'nav.galapagos': 'Galapagos Islands',
    'nav.galapagos.desc': 'Luxury Cruises & Island Hopping',
    'nav.ecuador': 'Mainland Ecuador',
    'nav.ecuador.desc': 'Avenue of Volcanoes & Amazon',
    'nav.peru': 'Mystical Peru',
    'nav.peru.desc': 'Cusco, Sacred Valley & Machu Picchu',
    'nav.tours': 'Featured Tours',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.quote': 'Request a Quote',
    'nav.banner.tagline': 'Tailor-Made Expeditions & Private Small Groups',
    'nav.banner.badge': 'Exclusive Luxury Journeys',

    // Hero
    'hero.badge': 'Award-Winning Luxury Travel',
    'hero.title': 'The World\'s Most Extraordinary',
    'hero.title.highlight': 'Destinations Await',
    'hero.subtitle': 'Bespoke expeditions to the Galapagos Islands, Andean Highlands, Amazon Rainforest & Machu Picchu — crafted by expert local guides.',
    'hero.cta.explore': 'Explore All Tours',
    'hero.cta.quote': 'Get a Free Quote',
    'hero.stats.tours': 'Tailor-Made Tours',
    'hero.stats.reviews': 'Five-Star Reviews',
    'hero.stats.naturalists': 'Expert Naturalists',
    'hero.stats.support': '24/7 Support',

    // Destinations
    'destinations.badge': 'Where Will You Go?',
    'destinations.title': 'Explore Our Destinations',
    'destinations.subtitle': 'From the volcanic peaks of the Andes to the pristine reefs of the Galapagos — we take you where few travelers dare to go.',
    'destinations.cta': 'Explore Tours',

    // Tours
    'tours.badge': 'Interactive 3D Carousel Showcase',
    'tours.title': 'Featured Signature Journeys',
    'tours.subtitle': 'Curated experiences led by expert local naturalists with seamless logistics, handpicked boutique stays, and the ultimate balance between luxury and adventure.',
    'tours.cta.label': 'Looking for something 100% custom?',
    'tours.cta.title': 'We Design Your Tailor-Made Itinerary At No Extra Cost',
    'tours.cta.subtitle': 'Our destination specialists will customize travel dates, pacing, hotel luxury level, and private excursions tailored precisely to your preferences.',
    'tours.cta.button': 'Request Custom Itinerary',
    'tours.filter.all': 'All Expeditions',
    'tours.filter.galapagos': 'Galapagos Islands',
    'tours.filter.ecuador': 'Mainland Ecuador',
    'tours.filter.peru': 'Cusco & Peru',
    'tours.card.from': 'From',
    'tours.card.person': '/ person',
    'tours.card.view': 'View Details',
    'tours.card.bestseller': 'Best Seller',
    'tours.showing': 'Showing',
    'tours.of': 'of',
    'tours.journeys': 'journeys',

    // About
    'about.badge': 'Who We Are',
    'about.title': 'Boutique Travel Expertise',
    'about.title.highlight': 'Since 2005',
    'about.subtitle': 'We are a certified boutique tour operator based in Quito, Ecuador, specializing in tailor-made luxury expeditions across Ecuador, the Galapagos, and Peru.',
    'about.cta': 'Plan My Journey',
    
    // Experience Section
    'experience.badge': 'About Vermilion Routes',
    'experience.title': 'Unrivaled Experience, Uncompromising Excellence',
    'experience.text': 'At Vermilion Routes, we don\'t just book tours. We craft unique, unforgettable, fully customized expeditions across the spectacular landscapes of Ecuador, Galapagos, and Peru. As direct local operators, we combine regional expertise with uncompromising excellence.',
    'experience.certified': 'Certified Operator',
    'experience.sustainable': 'Sustainable Impact',

    // Reviews
    'reviews.badge': 'Guest Experiences',
    'reviews.title': 'What Our Travelers Say',
    'reviews.verified': 'Verified TripAdvisor',

    // FAQ
    'faq.badge': 'Common Questions',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about planning your luxury expedition with Vermilion Routes.',

    // Contact
    'contact.badge': 'Let\'s Plan Your Trip',
    'contact.title': 'Request Your Free Quote',
    'contact.subtitle': 'Tell us about your dream expedition. Our specialists will design a custom itinerary within 24 hours.',
    'contact.name': 'Your Full Name',
    'contact.email': 'Email Address',
    'contact.destination': 'Destination of Interest',
    'contact.travelers': 'Number of Travelers',
    'contact.message': 'Tell us about your dream expedition...',
    'contact.send': 'Send Quote Request',
    'contact.sending': 'Sending...',
    'contact.success': 'Thank you! We\'ll be in touch within 24 hours.',

    // Tour detail page
    'tour.overview': 'Overview',
    'tour.itinerary': 'Itinerary',
    'tour.includes': 'What\'s Included',
    'tour.optional': 'Optional Add-Ons',
    'tour.day': 'Day',
    'tour.book': 'Book This Tour',
    'tour.download': 'Download PDF',
    'tour.group.price': 'Group Rate',
    'tour.from': 'From',
    'tour.per.person': 'per person',
    'tour.duration': 'Duration',
    'tour.destination': 'Destination',
    'tour.rating': 'Rating',
    'tour.gallery': 'Photo Gallery',
    'tour.highlights': 'Highlights',
    'tour.included': 'Included',
    'tour.excluded': 'Not Included',
    'tour.meals': 'Meals',
    'tour.accommodation': 'Accommodation',

    // Footer
    'footer.tagline': 'Premier luxury boutique expedition specialists in Ecuador, Galapagos & Peru since 2005.',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.destinations': 'Destinos',
    'nav.galapagos': 'Islas Galápagos',
    'nav.galapagos.desc': 'Cruceros de Lujo e Island Hopping',
    'nav.ecuador': 'Ecuador Continental',
    'nav.ecuador.desc': 'Avenida de los Volcanes y Amazonía',
    'nav.peru': 'Perú Místico',
    'nav.peru.desc': 'Cusco, Valle Sagrado y Machu Picchu',
    'nav.tours': 'Tours Destacados',
    'nav.about': 'Quiénes Somos',
    'nav.contact': 'Contacto',
    'nav.quote': 'Solicitar Cotización',
    'nav.banner.tagline': 'Expediciones a Medida y Grupos Privados',
    'nav.banner.badge': 'Viajes de Lujo Exclusivos',

    // Hero
    'hero.badge': 'Agencia de Viajes Premiada',
    'hero.title': 'Los Destinos Más Extraordinarios',
    'hero.title.highlight': 'Te Esperan',
    'hero.subtitle': 'Expediciones a medida a las Islas Galápagos, Andes, Selva Amazónica y Machu Picchu — diseñadas por guías locales expertos.',
    'hero.cta.explore': 'Ver Todos los Tours',
    'hero.cta.quote': 'Cotización Gratuita',
    'hero.stats.tours': 'Tours a Medida',
    'hero.stats.reviews': 'Reseñas 5 Estrellas',
    'hero.stats.naturalists': 'Naturalistas Expertos',
    'hero.stats.support': 'Soporte 24/7',

    // Destinations
    'destinations.badge': '¿A Dónde Irás?',
    'destinations.title': 'Explora Nuestros Destinos',
    'destinations.subtitle': 'Desde las cumbres volcánicas de los Andes hasta los arrecifes pristinos de Galápagos — te llevamos donde pocos viajeros se atreven.',
    'destinations.cta': 'Ver Tours',

    // Tours
    'tours.badge': 'Vitrina Interactiva de Tours',
    'tours.title': 'Nuestros Viajes Estrella',
    'tours.subtitle': 'Experiencias curadas por naturalistas locales expertos con logística perfecta, alojamientos boutique seleccionados y el equilibrio ideal entre lujo y aventura.',
    'tours.cta.label': '¿Buscas algo 100% a tu medida?',
    'tours.cta.title': 'Diseñamos Tu Itinerario Personalizado Sin Costo Adicional',
    'tours.cta.subtitle': 'Nuestros especialistas personalizarán fechas, ritmo, nivel de hotel y excursiones privadas según tus preferencias exactas.',
    'tours.cta.button': 'Solicitar Itinerario a Medida',
    'tours.filter.all': 'Todas las Expediciones',
    'tours.filter.galapagos': 'Islas Galápagos',
    'tours.filter.ecuador': 'Ecuador Continental',
    'tours.filter.peru': 'Cusco y Perú',
    'tours.card.from': 'Desde',
    'tours.card.person': '/ por persona',
    'tours.card.view': 'Ver Detalles',
    'tours.card.bestseller': 'Más Vendido',
    'tours.showing': 'Mostrando',
    'tours.of': 'de',
    'tours.journeys': 'viajes',

    // About
    'about.badge': 'Quiénes Somos',
    'about.title': 'Expertise en Viajes Boutique',
    'about.title.highlight': 'Desde 2005',
    'about.subtitle': 'Somos un operador turístico boutique certificado con sede en Quito, Ecuador, especializado en expediciones de lujo a medida por Ecuador, Galápagos y Perú.',
    'about.cta': 'Planifica Mi Viaje',
    
    // Experience Section
    'experience.badge': 'Acerca de Vermilion Routes',
    'experience.title': 'Experiencia inigualable, excelencia sin concesiones',
    'experience.text': 'En Vermilion Routes, no solo reservamos tours. Creamos expediciones únicas e inolvidables, totalmente personalizadas, a través de los espectaculares paisajes de Ecuador, Galápagos y Perú. Como operadores locales directos, combinamos el conocimiento de la región con una excelencia sin concesiones.',
    'experience.certified': 'Operador certificado',
    'experience.sustainable': 'Impacto sostenible',

    // Reviews
    'reviews.badge': 'Experiencias de Viajeros',
    'reviews.title': 'Lo Que Dicen Nuestros Viajeros',
    'reviews.verified': 'Verificado TripAdvisor',

    // FAQ
    'faq.badge': 'Preguntas Frecuentes',
    'faq.title': 'Preguntas Más Comunes',
    'faq.subtitle': 'Todo lo que necesitas saber para planificar tu expedición de lujo con Vermilion Routes.',

    // Contact
    'contact.badge': 'Planifiquemos Tu Viaje',
    'contact.title': 'Solicita Tu Cotización Gratuita',
    'contact.subtitle': 'Cuéntanos sobre tu expedición soñada. Nuestros especialistas diseñarán un itinerario a medida en 24 horas.',
    'contact.name': 'Nombre Completo',
    'contact.email': 'Correo Electrónico',
    'contact.destination': 'Destino de Interés',
    'contact.travelers': 'Número de Viajeros',
    'contact.message': 'Cuéntanos sobre tu expedición soñada...',
    'contact.send': 'Enviar Solicitud',
    'contact.sending': 'Enviando...',
    'contact.success': '¡Gracias! Nos pondremos en contacto en menos de 24 horas.',

    // Tour detail page
    'tour.overview': 'Descripción',
    'tour.itinerary': 'Itinerario',
    'tour.includes': 'Qué Incluye',
    'tour.optional': 'Excursiones Opcionales',
    'tour.day': 'Día',
    'tour.book': 'Reservar Este Tour',
    'tour.download': 'Descargar PDF',
    'tour.group.price': 'Precio Grupal',
    'tour.from': 'Desde',
    'tour.per.person': 'por persona',
    'tour.duration': 'Duración',
    'tour.destination': 'Destino',
    'tour.rating': 'Calificación',
    'tour.gallery': 'Galería de Fotos',
    'tour.highlights': 'Destacados',
    'tour.included': 'Incluye',
    'tour.excluded': 'No Incluye',
    'tour.meals': 'Comidas',
    'tour.accommodation': 'Alojamiento',

    // Footer
    'footer.tagline': 'Especialistas boutique en expediciones de lujo en Ecuador, Galápagos y Perú desde 2005.',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
  },
};

export function t(lang: Lang, key: string): string {
  return translations[lang][key] ?? translations['en'][key] ?? key;
}
