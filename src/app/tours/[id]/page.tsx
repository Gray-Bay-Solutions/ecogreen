import { notFound } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Tour } from '@/types';
import tours from '@/data/tours.json';

export async function generateStaticParams() {
  return tours.map((tour: Tour) => ({
    id: tour.id,
  }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const tourId = (await params).id;
  const tour = tours.find((t: Tour) => t.id === tourId);
  
  if (!tour) {
    return {
      title: 'Tour Not Found | Eco Green Nosara',
      description: 'The requested tour could not be found.',
    };
  }

  return {
    title: `${tour.name} | Eco Green Nosara`,
    description: tour.description,
  };
}

export default async function TourDetailPage({ params }: any) {
  const tourId = (await params).id;
  const tour = tours.find((t: Tour) => t.id === tourId);

  if (!tour) {
    notFound();
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <Image
          src={tour.imageUrl}
          alt={tour.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 container-custom pb-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{tour.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"></path>
                </svg>
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                </svg>
                <span>{tour.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.993 0-1.953.146-2.863.418.155.393.271.788.275 1.133.16-.14.327-.279.495-.418.829-.686 1.747-1.065 2.536-1.123.79-.058 1.439.15 1.844.406.32.204.531.444.661.674.276.494.381 1.06.312 1.69-.158 1.431-1.274 2.468-2.918 2.835.37.654.887 1.336 1.476 1.955a6 6 0 10-1.818-7.57zm1.616 1.83c-.16-.095-.365-.186-.59-.24-.307-.077-.651-.091-1.08-.034-.431.057-1.07.299-1.682.8-1.223 1.01-1.678 2.131-1.375 3.43.302 1.296 1.247 1.91 2.12 2.247.872.337 1.842.35 2.758.3.463-.025.861-.06 1.208-.122.347-.062.655-.168.934-.337.478-.292.764-.8.722-1.53-.042-.728-.392-1.39-.871-1.915a6.11 6.11 0 00-1.825-1.389c-.143-.072-.292-.133-.447-.186.053-.307.086-.631.053-.978-.045-.47-.208-.926-.525-1.046z" clipRule="evenodd"></path>
                </svg>
                <span>${tour.price} per person</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Details */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-heading font-semibold mb-6">About This Tour</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">{tour.longDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-4">What&apos;s Included</h3>
                  <ul className="space-y-2">
                    {tour.includedItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-4">What to Bring</h3>
                  <ul className="space-y-2">
                    {tour.whatToBring.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Schedule & Booking */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-heading font-semibold mb-6">Schedule & Booking</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-4">Tour Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Duration</span>
                      <span className="font-medium">{tour.duration}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Difficulty</span>
                      <span className="font-medium">{tour.difficulty}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Available Start Times</span>
                      <ul className="list-disc list-inside">
                        {tour.startTimes.map((time, index) => (
                          <li key={index} className="font-medium">{time}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Group Size</span>
                      <span className="font-medium">Minimum 2, Maximum 12 participants</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="font-heading font-semibold text-lg mb-4">Book This Tour</h3>
                  <p className="text-gray-600 mb-6">
                    Secure your spot now for an unforgettable eco-adventure in Nosara. Private tours and group discounts are available.
                  </p>
                  <div className="flex flex-col space-y-4">
                    <Link 
                      href={`/booking?tour=${tour.id}`}
                      className="btn-primary text-center"
                    >
                      Book Now
                    </Link>
                    <Link 
                      href="/contact" 
                      className="btn-secondary text-center"
                    >
                      Contact for Private Tour
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gallery */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-heading font-semibold mb-6">Tour Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tour.gallery.map((image, index) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${tour.name} gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* More Tours */}
      <section className="py-16 bg-primary/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Explore Other Tours</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover more ways to experience the natural beauty of Nosara with our other eco-friendly tours
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tours
              .filter(t => t.id !== tour.id)
              .slice(0, 3)
              .map((otherTour: Tour) => (
                <div key={otherTour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={otherTour.imageUrl}
                      alt={otherTour.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-heading font-semibold">{otherTour.name}</h3>
                      <span className="text-primary font-bold">${otherTour.price}</span>
                    </div>
                    <div className="mb-6">
                      <span className="text-sm text-gray-500">{otherTour.duration} • {otherTour.difficulty}</span>
                    </div>
                    <Link href={`/tours/${otherTour.id}`} className="btn-primary w-full block text-center">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </MainLayout>
  );
}