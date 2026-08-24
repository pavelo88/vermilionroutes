import { LocalizedString } from '@/utils/i18nHelper';

export interface ItineraryDay {
  day: number;
  title: LocalizedString;
  titleEs?: string;
  description: LocalizedString;
  descriptionEs?: string;
  highlights?: LocalizedString[];
  highlightsEs?: string[];
  meals?: LocalizedString;
  mealsEs?: string;
  accommodation?: LocalizedString;
  accommodationEs?: string;
  transportation?: LocalizedString;
  activity?: LocalizedString;
  includedVisits?: LocalizedString;
  altitude?: LocalizedString;
  image?: string;
}

export interface Tour {
  id: string;
  title: LocalizedString;
  titleEs?: string;
  destination: string;
  duration: LocalizedString;
  durationEs?: string;
  durationDays?: number;
  price: number;
  price3Star?: number;
  price4Star?: number;
  priceFromUSD?: number;
  imageUrl: string;
  desktopImage?: string;
  mobileImage?: string;
  mainImage?: string;
  rating: number;
  reviewsCount?: number;
  category?: LocalizedString;
  categoryEs?: string;
  highlights?: LocalizedString[];
  highlightsEs?: string[];
  isPopular?: boolean;
  isUpcoming?: boolean;
  description?: LocalizedString;
  descriptionEs?: string;
  shortDescription?: LocalizedString;
  shortDescriptionEs?: string;
  gallery?: string[];
  itinerary?: ItineraryDay[];
  itineraryEs?: ItineraryDay[];
  inclusions?: LocalizedString[];
  inclusionsEs?: string[];
  exclusions?: LocalizedString[];
  exclusionsEs?: string[];
  groupPrice?: number;
  pdfUrl?: string;
  availabilityInfo?: string;
  optionalTours?: { title: string; price: number; description: string }[];
}

export interface Destination {
  id: string;
  name: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  toursCount: number;
  slug: string;
}

export interface SlideData {
  place: LocalizedString | string;
  title: LocalizedString | string;
  title2: LocalizedString | string;
  description: LocalizedString | string;
  image: string;
  desktopImage?: string;
  mobileImage?: string;
}

export interface Review {
  id: string;
  author: string;
  location?: string;
  avatarUrl?: string;
  rating: number;
  date: string;
  tourTitle?: string;
  title?: string;
  comment: string;
  verifiedTripAdvisor?: boolean;
  tourId?: string;
}

export interface BookingRequest {
  id?: string;
  tourId: string;
  tourTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  travelDates?: string;
  guestsCount?: string;
  destination?: string;
  message?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export type DestinationInfo = Destination;
export type SiteSettings = Record<string, any>;
