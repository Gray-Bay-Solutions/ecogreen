import { Tour } from '@/types';

function lowestPackagePrice(tour: Tour): number | undefined {
  if (!tour.packageOptions?.length) return undefined;
  return Math.min(...tour.packageOptions.map((option) => option.price));
}

export function formatTourPrice(tour: Tour): string {
  if (tour.contactForPricing) {
    return 'Contact us for pricing';
  }
  const fromPrice = lowestPackagePrice(tour);
  if (fromPrice != null) {
    return `From $${fromPrice}`;
  }
  return `$${tour.price}`;
}

export function formatTourPricePerPerson(tour: Tour): string {
  if (tour.contactForPricing) {
    return 'Contact us for pricing';
  }
  const fromPrice = lowestPackagePrice(tour);
  if (fromPrice != null) {
    return `From $${fromPrice} per person (+ IVA)`;
  }
  return `$${tour.price} per person (+ IVA)`;
}

export function isBookableOnline(tour: Tour): boolean {
  return !tour.contactForPricing;
}
