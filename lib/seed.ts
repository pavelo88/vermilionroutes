import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { mockTours, mockDestinations, mockReviews } from '@/data/mock';
import parsedTours from '../data/parsed_tours.json';

export const defaultSettings = {
  contact: {
    phone: "+593 99 404 8458",
    email: "info@vermilionroutes.com",
    address: "Quito, Ecuador",
    whatsappUrl: "https://wa.me/593994048458",
    facebook: "https://facebook.com/vermilionroutes",
    instagram: "https://instagram.com/vermilionroutes",
    tripadvisor: "https://tripadvisor.com"
  },
  seo: {
    title: "Vermilion Routes | Tailor-Made Luxury Travel in Galapagos, Ecuador & Peru",
    description: "Experience South America with bespoke travel itineraries, luxury Galapagos island cruises, Amazon rainforest expeditions, and Andean volcano treks.",
    keywords: "Galapagos luxury cruises, Ecuador travel agency, Machu Picchu private tours, South America luxury expeditions, Tailor-made itineraries Galapagos, Bespoke travel Ecuador Peru, Vermilion Routes"
  },
  hero: {
    badge: "Boutique Travel Agency • Galapagos, Ecuador & Peru Specialists",
    title: "Tailor-Made Luxury Expeditions",
    titleColored: "Crafted for Extraordinary Travel",
    subtitle: "Cruise the enchanted Galapagos Islands, trek the volcanic spine of the high Andes, explore the deep Amazon rainforest, and uncover the mysteries of Machu Picchu.",
    backgroundImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80"
  },
  about: {
    title: "Unrivaled Expertise, Uncompromised Luxury",
    subtitle: "OUR CREDENTIALS",
    paragraph1: "At Vermilion Routes, we don't just book tours. We curate deeply personal, once-in-a-lifetime expeditions across the spectacular landscapes of Ecuador, the Galapagos, and Peru. As direct local operators, we combine local wisdom with uncompromising luxury.",
    paragraph2: "Whether you are navigating the volcanic channels of the Galapagos on a private yacht charter, staying in remote, eco-friendly Amazon rainforest canopy suites, or walking the cobblestone paths of ancient Inca citadels, we handle every detail with absolute precision.",
    imageUrl: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80",
    metric1Val: "100%",
    metric1Lbl: "Bespoke & Tailor-Made",
    metric2Val: "+15 Yrs",
    metric2Lbl: "Field Travel Expertise",
    metric3Val: "4.9/5",
    metric3Lbl: "Guest Satisfaction",
    metric4Val: "24/7",
    metric4Lbl: "On-Trip Concierge Care"
  },
  faq: [
    {
      question: "Is a cruise or land-based tour better for the Galapagos?",
      answer: "Cruises are ideal for visiting remote, uninhabited islands that are inaccessible in a day. Land-based tours are more flexible, perfect for multi-generational families, and less prone to seasickness."
    },
    {
      question: "When is the best time to book a luxury Galapagos expedition?",
      answer: "We highly recommend booking 6 to 12 months in advance. Premium yachts (16-20 passengers maximum) have limited availability and book out very quickly for peak seasons (June-August, December-January)."
    },
    {
      question: "What is included in a Vermilion Routes tailor-made journey?",
      answer: "Our luxury packages are fully inclusive of high-end boutique stays, private PNG-certified naturalist guides, inter-island flights/transfers, high-end snorkeling gear, private land transport, and curated gourmet meals."
    }
  ],
  footer: {
    logoText: "VERMILION",
    logoSubtitle: "ROUTES & EXPERIENCES",
    description: "Premier boutique tour operator specializing in custom-crafted luxury travel itineraries across South America's most iconic wonders.",
    copyright: "© 2026 Vermilion Routes. All Rights Reserved."
  }
};

export async function seedAllDataToFirestore(): Promise<void> {
  try {
    // 1. Seed settings
    const settingsRef = doc(db, 'settings', 'general');
    await setDoc(settingsRef, defaultSettings, { merge: true });
    console.log('Seeded settings.');

    // 2. Seed destinations
    for (const dest of mockDestinations) {
      const destRef = doc(db, 'destinations', dest.id);
      await setDoc(destRef, dest, { merge: true });
    }
    console.log('Seeded destinations.');

    // 3. Seed tours
    const toursToSeed = parsedTours && parsedTours.length > 0 ? parsedTours : mockTours;
    for (const tour of toursToSeed) {
      const tourRef = doc(db, 'tours', tour.id);
      await setDoc(tourRef, tour, { merge: true });
    }
    console.log(`Seeded ${toursToSeed.length} tours.`);

    // 4. Seed reviews
    for (const rev of mockReviews) {
      const revRef = doc(db, 'reviews', rev.id);
      await setDoc(revRef, rev, { merge: true });
    }
    console.log('Seeded reviews.');
  } catch (error) {
    console.error('Failed to seed all data to Firestore:', error);
    throw error;
  }
}
