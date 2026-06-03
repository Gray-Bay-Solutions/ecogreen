import { Resend } from 'resend';

export interface BookingEmailData {
  bookingReference: string;
  tourName: string;
  tourDate: string;
  tourTime: string;
  participants: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  transportationType?: string;
  basePrice: number;
  transportationPrice: number;
  estimatedTotal: number;
}

function formatBookingDetails(data: BookingEmailData): string {
  const lines = [
    `Reference: ${data.bookingReference}`,
    `Tour: ${data.tourName}`,
    `Date: ${data.tourDate}`,
    `Time: ${data.tourTime}`,
    `Participants: ${data.participants}`,
    `Name: ${data.customerName}`,
    `Email: ${data.customerEmail}`,
    `Phone: ${data.customerPhone}`,
  ];

  if (data.transportationType) {
    lines.push(`Transportation: ${data.transportationType}`);
  }
  if (data.specialRequests) {
    lines.push(`Special requests: ${data.specialRequests}`);
  }

  lines.push(
    `Estimated total: $${data.estimatedTotal.toFixed(2)} (+ IVA)`,
    '',
    'Payment is not collected online. Our team will confirm availability and payment details.'
  );

  return lines.join('\n');
}

export async function sendBookingEmails(data: BookingEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'Eco Green Nosara <onboarding@resend.dev>';
  const toEmail = process.env.BOOKING_TO_EMAIL || 'Schusslera333@gmail.com';
  const details = formatBookingDetails(data);

  const [ownerResult, customerResult] = await Promise.all([
    resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.customerEmail,
      subject: `New booking request — ${data.tourName} (${data.bookingReference})`,
      text: `New tour booking request:\n\n${details}`,
    }),
    resend.emails.send({
      from: fromEmail,
      to: data.customerEmail,
      subject: `Booking request received — ${data.tourName}`,
      text: `Hi ${data.customerName},\n\nThank you for your booking request with Eco Green Nosara. We have received your details and will contact you shortly to confirm availability.\n\n${details}\n\nQuestions? Reply to this email or call +506 6111 1023.\n\nPura Vida!\nEco Green Nosara`,
    }),
  ]);

  if (ownerResult.error) {
    throw new Error(ownerResult.error.message);
  }
  if (customerResult.error) {
    throw new Error(customerResult.error.message);
  }

  return { ownerResult, customerResult };
}
