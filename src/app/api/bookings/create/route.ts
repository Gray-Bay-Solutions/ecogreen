import { NextRequest, NextResponse } from 'next/server';
import { generateBookingReference } from '@/lib/booking-reference';
import { sendBookingEmails } from '@/lib/email';
import tours from '@/data/tours.json';

// Payment + SQLite (disabled while using email-only bookings)
// import { createBooking, updateBookingWithPayPalOrder } from '@/lib/bookings';
// import { createPayPalOrder } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      tourId,
      date,
      time,
      participants,
      name,
      email,
      phone,
      specialRequests,
      transportationType,
    } = body;

    if (!tourId || !date || !time || !participants || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const tour = tours.find((t) => t.id === tourId);
    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    if (tour.contactForPricing) {
      return NextResponse.json(
        { error: 'This tour requires contacting us directly for pricing' },
        { status: 400 }
      );
    }

    const basePrice = (tour.price ?? 0) * participants;
    let transportationPrice = 0;

    if (transportationType && tour.transportationOptions) {
      const transportOption = tour.transportationOptions.find(
        (opt) => opt.type === transportationType
      );
      if (transportOption) {
        transportationPrice = transportOption.price * participants;
      }
    }

    const totalPrice = basePrice + transportationPrice;
    const bookingReference = generateBookingReference();

    const booking = {
      bookingReference,
      tourId,
      tourName: tour.name,
      tourDate: date,
      tourTime: time,
      participants: Number(participants),
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      specialRequests: specialRequests || undefined,
      transportationType: transportationType || undefined,
      basePrice,
      transportationPrice,
      totalPrice,
      paymentStatus: 'pending',
    };

    await sendBookingEmails({
      bookingReference,
      tourName: tour.name,
      tourDate: date,
      tourTime: time,
      participants: Number(participants),
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      specialRequests,
      transportationType,
      basePrice,
      transportationPrice,
      estimatedTotal: totalPrice,
    });

    /* PayPal + SQLite flow — re-enable when NEXT_PUBLIC_PAYMENTS_ENABLED=true
    if (PAYMENTS_ENABLED) {
      createBooking({ ... });
      const paypalResult = await createPayPalOrder({ ... });
      updateBookingWithPayPalOrder(bookingReference, paypalResult.orderId!);
      return NextResponse.json({
        success: true,
        bookingReference,
        orderId: paypalResult.orderId,
        mode: 'payment',
      });
    }
    */

    return NextResponse.json({
      success: true,
      bookingReference,
      booking,
      mode: 'email',
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to submit booking request';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
