'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export interface StoredBooking {
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
  totalPrice: number;
  paymentStatus: string;
}

interface BookingConfirmationProps {
  reference: string;
}

export default function BookingConfirmation({ reference }: BookingConfirmationProps) {
  const [booking, setBooking] = useState<StoredBooking | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(`booking:${reference}`);
    if (stored) {
      try {
        setBooking(JSON.parse(stored));
      } catch {
        setBooking(null);
      }
    }
    setLoaded(true);
  }, [reference]);

  if (!loaded) {
    return (
      <MainLayout>
        <section className="py-16 bg-background min-h-screen">
          <div className="container-custom text-center text-gray-600">Loading...</div>
        </section>
      </MainLayout>
    );
  }

  if (!booking) {
    return (
      <MainLayout>
        <section className="py-16 bg-background min-h-screen">
          <div className="container-custom max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Request Submitted</h1>
            <p className="text-gray-600 mb-6">
              Your booking reference is <strong>{reference}</strong>. If you don&apos;t see a
              confirmation email, please contact us.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-16 bg-background min-h-screen">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl font-heading font-bold text-text mb-4">
                Booking Request Sent!
              </h1>
              <p className="text-xl text-gray-600">
                We&apos;ll confirm availability and contact you shortly.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-primary text-white px-8 py-6">
                <h2 className="text-2xl font-heading font-semibold mb-2">Booking Reference</h2>
                <p className="text-3xl font-bold">{booking.bookingReference}</p>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <h3 className="text-xl font-heading font-semibold mb-4">Tour Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Tour</p>
                      <p className="font-semibold text-lg">{booking.tourName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                      <p className="font-semibold">
                        {new Date(booking.tourDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="font-semibold">{booking.tourTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Participants</p>
                      <p className="font-semibold">{booking.participants}</p>
                    </div>
                    {booking.transportationType && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Transportation</p>
                        <p className="font-semibold">{booking.transportationType}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-heading font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Name</p>
                      <p className="font-semibold">{booking.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-semibold">{booking.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="font-semibold">{booking.customerPhone}</p>
                    </div>
                  </div>
                  {booking.specialRequests && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-1">Special Requests</p>
                      <p className="font-semibold">{booking.specialRequests}</p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4">Estimated Total</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tour</span>
                      <span className="font-medium">${booking.basePrice.toFixed(2)}</span>
                    </div>
                    {booking.transportationPrice > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transportation</span>
                        <span className="font-medium">
                          ${booking.transportationPrice.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2 flex justify-between items-center">
                      <span className="text-lg font-semibold">Estimated total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${booking.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Payment is not collected online. Prices exclude 13% IVA. Our team will confirm
                    final details with you.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="text-lg font-heading font-semibold mb-3 text-blue-900">What&apos;s Next?</h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>A confirmation email was sent to {booking.customerEmail}</li>
                <li>We&apos;ll reach out to confirm your tour date and payment details</li>
                <li>Questions? Call +506 6111 1023 or email Schusslera333@gmail.com</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary text-center">Return to Home</Link>
              <Link href="/tours" className="btn-secondary text-center">Browse More Tours</Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
