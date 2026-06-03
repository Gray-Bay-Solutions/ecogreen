import { NextRequest, NextResponse } from 'next/server';
import { PAYMENTS_ENABLED } from '@/lib/booking-config';

/** SQLite booking lookup — dormant while using email-only bookings */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  if (!PAYMENTS_ENABLED) {
    return NextResponse.json(
      { error: 'Booking lookup unavailable in email-only mode' },
      { status: 503 }
    );
  }

  const { getBookingByReference } = await import('@/lib/bookings');

  try {
    const { reference } = await params;

    const booking = getBookingByReference(reference);

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Get booking error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve booking' },
      { status: 500 }
    );
  }
}

