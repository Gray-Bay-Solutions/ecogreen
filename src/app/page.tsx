import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import FeaturedTours from '@/components/home/FeaturedTours';
import InstagramSection from '@/components/home/InstagramSection';
import Link from 'next/link';
import Image from 'next/image';
import { TOUR_INTRO } from '@/lib/tour-policies';

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      
      <FeaturedTours />
      
      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-text mb-6">Experience Nosara&apos;s Natural Beauty</h2>
              <p className="text-gray-600 mb-6">
                {TOUR_INTRO}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary">
                  Learn More About Us
                </Link>
                <Link href="/tours#tour-guide" className="btn-secondary">
                  View Tour Guide
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about-nosara.jpg"
                alt="Eco-friendly tour in Nosara"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <InstagramSection />
      
      {/* <Testimonials /> */}
      
      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Ready for an Eco-Adventure?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Book your tour today and experience the natural beauty of Nosara, Costa Rica with our expert guides.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              Book Now
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
