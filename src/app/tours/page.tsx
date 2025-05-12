import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Tour } from '@/types';
import tours from '@/data/tours.json';

export const metadata: Metadata = {
  title: 'Our Tours | Eco Green Nosara',
  description: 'Explore our eco-friendly tours in Nosara, Costa Rica including kayaking, paddle boarding, coffee tours, nature hikes, and bird watching.',
};

export default function ToursPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/tours-hero.jpg"
          alt="Eco-friendly tours in Nosara, Costa Rica"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container-custom h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Tours</h1>
          <p className="text-white/90 max-w-2xl text-lg">
            Immersive eco-friendly experiences that connect you with Nosara&apos;s natural beauty
          </p>
        </div>
      </div>

      {/* Tours Introduction */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-text mb-4">Explore Our Eco-Tours</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Each of our tours is designed to provide a unique and enriching experience of Nosara&apos;s natural environment. Our expert guides ensure your safety while sharing their deep knowledge of local ecosystems.
            </p>
          </div>

          {/* Tour Listings */}
          <div className="space-y-16">
            {tours.map((tour: Tour) => (
              <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {/* Tour Image */}
                  <div className="relative h-64 md:h-auto md:col-span-2">
                    <Image
                      src={tour.imageUrl}
                      alt={tour.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Tour Details */}
                  <div className="p-8 md:col-span-3">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-heading font-bold">{tour.name}</h3>
                      <span className="text-primary font-bold text-xl">${tour.price}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{tour.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <span className="block text-sm text-gray-500 mb-1">Duration</span>
                        <span className="font-medium">{tour.duration}</span>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500 mb-1">Difficulty</span>
                        <span className="font-medium">{tour.difficulty}</span>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500 mb-1">Start Times</span>
                        <span className="font-medium">{tour.startTimes.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Link 
                        href={`/tours/${tour.id}`} 
                        className="btn-primary"
                      >
                        View Details
                      </Link>
                      <Link 
                        href={`/booking?tour=${tour.id}`}
                        className="btn-secondary"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Booking Section */}
      <section className="py-16 bg-primary/10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-text mb-4">Group Bookings & Private Tours</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Planning a family reunion, corporate retreat, or special occasion? We offer private tours and group discounts.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              For groups of 6 or more, we offer a 10% discount on any of our tours. Private tours can also be arranged for a more personalized experience.
            </p>
            <p className="text-gray-600 mb-6">
              Contact us directly to discuss your group&apos;s needs and we&apos;ll create a custom experience that everyone will enjoy.
            </p>
            <div className="text-center">
              <Link href="/contact" className="btn-primary">
                Contact Us for Group Bookings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 