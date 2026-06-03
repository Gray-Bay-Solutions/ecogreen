import { randomBytes } from 'crypto';

export function generateBookingReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(3).toString('hex').toUpperCase();
  return `BK-${timestamp}-${random}`;
}
