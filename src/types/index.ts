export interface Tour {
  id: string;
  name: string;
  price?: number;
  contactForPricing?: boolean;
  description: string;
  longDescription: string;
  duration: string;
  difficulty: string;
  startTimes: string[];
  minGroupSize?: number;
  maxGroupSize?: number;
  includedItems: string[];
  whatToBring: string[];
  imageUrl: string;
  gallery: string[];
  transportationOptions?: TransportationOption[];
}

export interface TransportationOption {
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