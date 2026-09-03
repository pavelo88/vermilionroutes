export type LocalizedString = any;

const DEFAULT_TRANSLATIONS: Record<string, Record<string, string>> = {
  "Unrivaled Expertise, Uncompromised Excellence": {
    es: "Experiencia Inigualable, Excelencia Inquebrantable",
    de: "Unerreichte Expertise, Kompromisslose Exzellenz",
    fr: "Une expertise inégalée, une excellence sans compromis",
  },
  "OUR CREDENTIALS": {
    es: "NUESTRAS CREDENCIALES",
    de: "UNSERE REFERENZEN",
    fr: "NOS RÉFÉRENCES",
  },
  "At Vermilion Routes, we don't just book tours. We curate deeply personal, once-in-a-lifetime expeditions across the spectacular landscapes of Ecuador and the Galapagos. As direct local operators, we combine local wisdom with uncompromising exclusivity.": {
    es: "En Vermilion Routes, no solo reservamos tours. Creamos expediciones únicas, inolvidables y totalmente personalizadas a través de los espectaculares paisajes de Ecuador y Galápagos. Como operadores locales directos, combinamos la experiencia regional con una excelencia inquebrantable.",
    de: "Bei Vermilion Routes buchen wir nicht einfach nur Touren. Wir kuratieren zutiefst persönliche Expeditionen durch die spektakulären Landschaften Ecuadors und der Galapagosinseln.",
    fr: "Chez Vermilion Routes, nous ne nous contentons pas de réserver des circuits. Nous concevons des expéditions profondément personnalisées à travers l'Équateur et les Galapagos.",
  },
  "Whether you are navigating the volcanic channels of the Galapagos on a private yacht charter, staying in remote, eco-friendly Amazon rainforest canopy suites, or walking the cobblestone paths of Quito historic center, we handle every detail with absolute precision.": {
    es: "Ya sea navegando por los canales volcánicos de Galápagos en un chárter privado, alojándose en suites ecológicas en la selva amazónica, o caminando por las calles adoquinadas del centro histórico de Quito, gestionamos cada detalle con absoluta precisión.",
    de: "Ob Sie die Vulkankanäle der Galapagosinseln auf einer privaten Yacht befahren oder durch Quitos Altstadt spazieren – wir kümmern uns um jedes Detail mit absoluter Präzision.",
    fr: "Que vous naviguiez dans les canaux volcaniques des Galapagos sur un yacht privé ou que vous parcouriez les ruelles pavées de Quito, nous gérons chaque détail avec une précision absolue.",
  },
  "Bespoke & Tailor-Made": {
    es: "A Medida y Personalizado",
    de: "Maßgeschneidert & Individuell",
    fr: "Sur mesure et personnalisé",
  },
  "Field Travel Expertise": {
    es: "Años de Experiencia en Campo",
    de: "Langjährige Felderfahrung",
    fr: "Années d'expérience sur le terrain",
  },
  "Guest Satisfaction": {
    es: "Satisfacción de Huéspedes",
    de: "Gästezufriedenheit",
    fr: "Satisfaction des clients",
  },
  "On-Trip Concierge Care": {
    es: "Atención de Concierge 24/7",
    de: "24/7 Concierge-Betreuung",
    fr: "Conciergerie dédiée 24h/24",
  },
  "Tailor-Made Curated Expeditions": {
    es: "Expediciones Curadas a Medida",
    de: "Maßgeschneiderte Expeditionen",
    fr: "Expéditions personnalisées",
  },
  "Crafted for Extraordinary Travel": {
    es: "Diseñadas para Viajes Extraordinarios",
    de: "Geschaffen für außergewöhnliche Reisen",
    fr: "Conçues pour des voyages extraordinaires",
  },
  "Cruise the enchanted Galapagos Islands, trek the volcanic spine of the high Andes, explore the deep Amazon rainforest, and experience the magical equator line.": {
    es: "Navega por las encantadas Islas Galápagos, recorre la espina dorsal de los altos Andes, explora la profunda selva amazónica y vive la mágica línea ecuatorial.",
    de: "Kreuzen Sie durch die Galapagosinseln, wandern Sie durch die Anden und erkunden Sie den tiefen Amazonas-Regenwald.",
    fr: "Naviguez dans les îles enchantées des Galapagos, parcourez les Andes et explorez la forêt amazonienne.",
  }
};

export function getLocalizedText(text: LocalizedString | undefined | null, locale: string): string {
  if (!text) return '';
  
  if (typeof text === 'string') {
    if (locale !== 'en' && DEFAULT_TRANSLATIONS[text]?.[locale]) {
      return DEFAULT_TRANSLATIONS[text][locale];
    }
    return text;
  }
  
  // Try to find the exact locale (e.g. 'es')
  if (text[locale]) return text[locale];
  
  // Fallbacks
  if (text['en']) {
    const enVal = text['en'];
    if (typeof enVal === 'string' && locale !== 'en' && DEFAULT_TRANSLATIONS[enVal]?.[locale]) {
      return DEFAULT_TRANSLATIONS[enVal][locale];
    }
    return enVal;
  }
  
  // First available key if no English
  const keys = Object.keys(text);
  if (keys.length > 0) return text[keys[0]];
  
  return '';
}
