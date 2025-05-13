'use client';

import { useState, useEffect } from 'react';
import TourCard from '../tours/TourCard';
import { Tour } from '@/types';
import Link from 'next/link';

export default function FeaturedTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this could be a fetch request to an API
    const loadTours = async () => {
      try {
        const toursData = await import('@/data/tours.json');
        setTours(toursData.default);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load tours:', error);
        setIsLoading(false);
      }
    };

    loadTours();
  }, []);

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <div className="animate-pulse h-8 w-72 bg-gray-200 rounded-md mx-auto mb-16"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded-md mb-6"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                    <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="container-custom py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-heading font-bold text-text mb-4">Our Popular Tours</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the beauty of Nosara through our guided eco-friendly experiences. Our tours are designed to connect you with nature while protecting our environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.slice(0, 3).map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link href="/tours" className="btn-primary inline-block px-8 py-3">
          View All Tours
        </Link>
      </div>
    </section>
  );
} 