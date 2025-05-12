export interface Tour {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  duration: string;
  difficulty: string;
  startTimes: string[];
  includedItems: string[];
  whatToBring: string[];
  imageUrl: string;
  gallery: string[];
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