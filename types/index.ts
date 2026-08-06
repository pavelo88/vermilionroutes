export interface ItineraryDay {
  day: number;
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  highlights?: string[];
  highlightsEs?: string[];
  meals?: string;
  mealsEs?: string;
  accommodation?: string;
  accommodationEs?: string;
}

export interface Tour {
  id: string;
  title: string;
  titleEs?: string;
  destination: string;
  duration: string;
  durationEs?: string;
  durationDays?: number;
  price: number;
  priceFromUSD?: number;
  imageUrl: string;
  mainImage?: string;
  rating: number;
  reviewsCount?: number;
  category?: string;
  categoryEs?: string;
  highlights?: string[];
  highlightsEs?: string[];
  isPopular?: boolean;
  isUpcoming?: boolean;
  description?: string;
  descriptionEs?: string;
  shortDescription?: string;
  shortDescriptionEs?: string;
  gallery?: string[];
  itinerary?: ItineraryDay[];
  itineraryEs?: ItineraryDay[];
  inclusions?: string[];
  inclusionsEs?: string[];
  exclusions?: string[];
  exclusionsEs?: string[];
  groupPrice?: number;
  pdfUrl?: string;
  availabilityInfo?: string;
  optionalTours?: { title: string; price: number; description: string }[];
}

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  toursCount: number;
  slug: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  avatarUrl: string;
  rating: number;
  date: string;
  tourTitle: string;
  title: string;
  comment: string;
  verifiedTripAdvisor: boolean;
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
