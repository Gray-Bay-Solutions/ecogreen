export interface Tour {
  id: string;
  name: string;
  tagline?: string;
  price?: number;
  contactForPricing?: boolean;
  description: string;
  longDescription: string;
  duration: string;
  distance?: string;
  difficulty: string;
  location?: string;
  startTimes: string[];
  bookingNote?: string;
  minGroupSize?: number;
  maxGroupSize?: number;
  includedItems: string[];
  whatToBring: string[];
  optionalItems?: string[];
  imageUrl: string;
  /** CSS object-position for tall/portrait heroes, e.g. "center 40%" */
  imagePosition?: string;
  gallery: string[];
  transportationIncluded?: boolean;
  transportationOptions?: TransportationOption[];
  packageOptions?: PackageOption[];
}

export interface TransportationOption {
  type: string;
  price: number;
  description: string;
}

export interface PackageOption {
  type: string;
  price: number;
  description: string;
}

export interface BookingFormData {
  tourId: string;
  date: string;
  time: string;
  participants: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
} 