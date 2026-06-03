import { NextRequest, NextResponse } from 'next/server';
import { PAYMENTS_ENABLED } from '@/lib/booking-config';

/** PayPal capture — dormant while NEXT_PUBLIC_PAYMENTS_ENABLED=false */
export async function POST(request: NextRequest) {
  if (!PAYMENTS_ENABLED) {
    return NextResponse.json(
      { error: 'Online payments are temporarily disabled' },
      { status: 503 }
    );
  }

  const { capturePayPalPayment } = await import('@/lib/paypal');
  const { updateBookingPaymentStatus, getBookingByReference } = await import('@/lib/bookings');

  try {
    const body = await request.json();
    const { orderId, bookingReference } = body;

    if (!orderId || !bookingReference) {
      return NextResponse.json(
        { error: 'Missing orderId or bookingReference' },
        { status: 400 }
      );
    }

    // Verify booking exists
    const booking = getBookingByReference(bookingReference);
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Capture PayPal payment
    const captureResult = await capturePayPalPayment(orderId);

    if (!captureResult.success) {
      return NextResponse.json(
        { error: captureResult.error },
        { status: 500 }
      );
    }

    // Update booking status
    updateBookingPaymentStatus(
      bookingReference,
      'completed',
      captureResult.captureId
    );

    return NextResponse.json({
      success: true,
      captureId: captureResult.captureId,
      bookingReference,
    });
  } catch (error) {
    console.error('Payment capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture payment' },
      { status: 500 }
    );
  }
}

