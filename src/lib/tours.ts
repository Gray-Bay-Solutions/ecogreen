import { Tour } from '@/types';

export function formatTourPrice(tour: Tour): string {
  if (tour.contactForPricing) {
    return 'Contact us for pricing';
  }
  return `$${tour.price}`;
}

export function formatTourPricePerPerson(tour: Tour): string {
  if (tour.contactForPricing) {
    return 'Contact us for pricing';
  }
  return `$${tour.price} per person (+ IVA)`;
}

export function isBookableOnline(tour: Tour): boolean {
  return !tour.contactForPricing;
}
