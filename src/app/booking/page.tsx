import MainLayout from '@/components/layout/MainLayout';
import BookingForm from '@/components/booking/BookingForm';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Tour | Eco Green Nosara',
  description: 'Book your eco-friendly tour in Nosara, Costa Rica. Choose from kayaking, paddle boarding, coffee tours, nature hikes, and bird watching.',
};

export default async function BookingPage(props: any) {
  // Get the selected tour from the URL query params
  const selectedTourId = (await props.searchParams)?.tour as string | undefined;

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/booking-hero.jpg"
          alt="Book an eco-tour in Nosara, Costa Rica"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container-custom h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Book a Tour</h1>
          <p className="text-white/90 max-w-2xl text-lg">
            Secure your spot today for an unforgettable eco-adventure in Nosara
          </p>
        </div>
      </div>

      {/* Booking Form Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <BookingForm selectedTourId={selectedTourId} />
            </div>
            
            <div className="mt-12 bg-primary/5 rounded-lg p-8">
              <h2 className="text-2xl font-heading font-semibold mb-6">Booking Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-3">Payment</h3>
                  <p className="text-gray-600">
                    Payment is made in person on the day of your tour. We accept cash (USD or Costa Rican Colones), major credit cards, and PayPal.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-3">Cancellation Policy</h3>
                  <p className="text-gray-600 mb-2">
                    We understand that plans can change. Our cancellation policy is as follows:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Cancellations made 48+ hours in advance: Full refund</li>
                    <li>Cancellations made 24-48 hours in advance: 50% refund</li>
                    <li>Cancellations made less than 24 hours in advance: No refund</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-3">Weather Policy</h3>
                  <p className="text-gray-600">
                    Your safety is our top priority. In case of inclement weather, we reserve the right to reschedule or cancel tours. If we cancel a tour due to weather, you will receive a full refund or the option to reschedule.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-3">Group Discounts</h3>
                  <p className="text-gray-600">
                    Groups of 6 or more receive a 10% discount on all tours. Please contact us directly for large group bookings or private tours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}