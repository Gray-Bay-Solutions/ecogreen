import { Metadata } from 'next';
import BookingConfirmation from './BookingConfirmation';

export const metadata: Metadata = {
  title: 'Booking Confirmation | Eco Green Nosara',
  description: 'Your tour booking request has been received.',
};

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  return <BookingConfirmation reference={reference} />;
}
