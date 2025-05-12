import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Eco Green Nosara',
  description: 'Learn about our company story, philosophy, and commitment to sustainable eco-tourism in Nosara, Costa Rica.',
};

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="Nosara's unique ecosystem"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container-custom h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">About Us</h1>
          <p className="text-white/90 max-w-2xl text-lg">
            Passionate about eco-tourism and preserving the natural beauty of Nosara, Costa Rica
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-text mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Eco Green Nosara was founded by Alex Schussler in 2023 who wanted to share the incredible biodiversity of Nosara with visitors in a way that protects and preserves it for future generations.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small operation with just two kayaks and a passion for nature has grown into a respected eco-tourism company offering a variety of sustainable tours and experiences. Throughout our growth, we&apos;ve maintained our core values of environmental protection, education, and authentic connections with nature.
              </p>
              <p className="text-gray-600">
                Today, we&apos;re proud to employ local guides who are experts in their fields and deeply committed to conservation. Every tour we offer is designed to minimize environmental impact while maximizing your enjoyment and understanding of Costa Rica&apos;s natural wonders.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/our-story.jpg"
                alt="Eco Green Nosara founders"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-primary/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-text mb-4">Our Philosophy</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Eco Green Nosara, we believe that responsible tourism can be a powerful force for conservation and community development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-center mb-4">Environmental Stewardship</h3>
              <p className="text-gray-600 text-center">
                We actively work to protect Nosara&apos;s ecosystems through sustainable practices, conservation education, and supporting local environmental initiatives.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-center mb-4">Community Connection</h3>
              <p className="text-gray-600 text-center">
                We prioritize hiring local guides and supporting local businesses, ensuring that tourism benefits the Nosara community.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-center mb-4">Educational Excellence</h3>
              <p className="text-gray-600 text-center">
                We believe in providing not just activities, but learning experiences that foster a deeper understanding and appreciation of Costa Rica&apos;s natural heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-text mb-4">Nosara&apos;s Unique Ecosystem</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Located on Costa Rica&apos;s Nicoya Peninsula, Nosara is home to an incredible variety of ecosystems and biodiversity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-heading font-semibold mb-4">Mangrove Forests</h3>
              <p className="text-gray-600 mb-4">
                Our mangrove forests act as critical nurseries for marine life and habitat for countless bird species. These unique ecosystems filter water, protect coastlines, and sequester carbon.
              </p>
              <p className="text-gray-600">
                During our kayak tours, you&apos;ll explore these fascinating environments and learn about their vital ecological role.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-heading font-semibold mb-4">Tropical Dry Forests</h3>
              <p className="text-gray-600 mb-4">
                Nosara&apos;s tropical dry forests are characterized by a distinct wet and dry season, leading to unique adaptations in the plant and animal life.
              </p>
              <p className="text-gray-600">
                Our nature hikes take you through these forests where you can observe howler monkeys, exotic birds, and remarkable plant species.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-heading font-semibold mb-4">Pristine Beaches</h3>
              <p className="text-gray-600 mb-4">
                Our beaches are nesting grounds for sea turtles and home to diverse marine life. The coastal ecosystems provide critical habitat for many species.
              </p>
              <p className="text-gray-600">
                Through our paddle boarding activities, you can experience these beautiful coastlines while learning about marine conservation.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-heading font-semibold mb-4">Agricultural Landscapes</h3>
              <p className="text-gray-600 mb-4">
                Sustainable agriculture, including coffee cultivation, is an important part of Nosara&apos;s landscape and economy.
              </p>
              <p className="text-gray-600">
                Our coffee tours showcase how sustainable farming practices can work in harmony with nature while producing exceptional products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Experience Nosara with Us</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join us for an unforgettable eco-adventure that connects you with nature while helping to preserve it for future generations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tours" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              Explore Our Tours
            </Link>
            <Link href="/booking" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 