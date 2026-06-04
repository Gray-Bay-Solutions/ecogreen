import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Tour } from '@/types';
import tours from '@/data/tours.json';
import { formatTourPrice } from '@/lib/tours';
import ToursIntro from '@/components/tours/ToursIntro';
import ToursInfographic from '@/components/tours/ToursInfographic';

export const metadata: Metadata = {
  title: 'Our Tours | Eco Green Nosara',
  description: 'Explore eco-friendly tours in Nosara, Costa Rica — mangrove kayak & paddle, nature hikes, birdwatching, organic coffee, waterfalls, snorkeling, La Castilla, and ATV adventures.',
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
      <section className="py-8 bg-background">
        <div className="container-custom">
          <ToursIntro />

          {/* Tour Listings */}
          <div className="space-y-8">
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
                  <div className="p-5 md:p-6 md:col-span-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-heading font-bold">{tour.name}</h3>
                      <span className={`font-bold text-xl ${tour.contactForPricing ? 'text-sm text-gray-600' : 'text-primary'}`}>
                        {formatTourPrice(tour)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{tour.description}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 text-sm">
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
                        href={tour.contactForPricing ? '/contact' : `/booking?tour=${tour.id}`}
                        className="btn-secondary"
                      >
                        {tour.contactForPricing ? 'Contact for Pricing' : 'Book Now'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 