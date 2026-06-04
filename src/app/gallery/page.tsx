import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { Metadata } from 'next';
import GalleryMasonry from '@/components/gallery/GalleryMasonry';

export const metadata: Metadata = {
  title: 'Gallery | Eco Green Nosara',
  description: 'Browse beautiful photos from our eco-friendly tours in Nosara, Costa Rica including kayaking, paddle boarding, coffee tours, nature hikes, and bird watching.',
};

// In a real application, this would be fetched from an API or database
const galleryImages = [
  {
    id: 1,
    src: '/images/gallery/kayak-1.jpg',
    alt: 'Kayaking through mangroves',
    category: 'mangrove-tour',
    width: 800,
    height: 600
  },
  {
    id: 2,
    src: '/images/gallery/bird-2.jpg',
    alt: 'Colorful toucan in tree',
    category: 'bird-watching',
    width: 600,
    height: 800
  },
  {
    id: 3,
    src: '/images/gallery/hike-1.jpg',
    alt: 'Hiking trail through lush forest',
    category: 'nature-hike',
    width: 800,
    height: 533
  },
  {
    id: 4,
    src: '/images/gallery/paddle-3.jpg',
    alt: 'Paddle boarding at sunset',
    category: 'mangrove-tour',
    width: 800,
    height: 800
  },
  {
    id: 5,
    src: '/images/gallery/coffee-1.jpg',
    alt: 'Coffee beans drying in the sun',
    category: 'coffee-tour',
    width: 800,
    height: 600
  },
  {
    id: 6,
    src: '/images/gallery/bird-1.jpg',
    alt: 'Hummingbird feeding on flower',
    category: 'bird-watching',
    width: 600,
    height: 800
  },
  {
    id: 7,
    src: '/images/gallery/kayak-2.jpg',
    alt: 'Group kayaking through calm waters',
    category: 'mangrove-tour',
    width: 800,
    height: 533
  },
  {
    id: 8,
    src: '/images/gallery/waterfall-1.jpg',
    alt: 'Twin waterfalls cascading over rocky cliffs',
    category: 'waterfall-tour',
    width: 576,
    height: 1024
  },
  {
    id: 16,
    src: '/images/gallery/waterfall-2.jpg',
    alt: 'Tiered waterfall in a lush green forest',
    category: 'waterfall-tour',
    width: 768,
    height: 1024
  },
  {
    id: 17,
    src: '/images/gallery/waterfall-3.jpg',
    alt: 'Waterfall flowing into a jungle pool',
    category: 'waterfall-tour',
    width: 768,
    height: 1024
  },
  {
    id: 9,
    src: '/images/gallery/paddle-1.jpg',
    alt: 'Person paddle boarding on clear water',
    category: 'mangrove-tour',
    width: 800,
    height: 600
  },
  {
    id: 10,
    src: '/images/gallery/coffee-3.jpg',
    alt: 'Coffee plantation with mountain view',
    category: 'coffee-tour',
    width: 800,
    height: 533
  },
  {
    id: 11,
    src: '/images/gallery/bird-3.jpg',
    alt: 'Scarlet macaw in flight',
    category: 'bird-watching',
    width: 800,
    height: 600
  },
  {
    id: 12,
    src: '/images/gallery/kayak-3.jpg',
    alt: 'Kayakers spotting wildlife',
    category: 'mangrove-tour',
    width: 600,
    height: 800
  },
  {
    id: 13,
    src: '/images/gallery/hike-2.jpg',
    alt: 'Hikers on mountain trail',
    category: 'nature-hike',
    width: 800,
    height: 600
  },
  {
    id: 14,
    src: '/images/gallery/paddle-2.jpg',
    alt: 'Aerial view of paddle boarders',
    category: 'mangrove-tour',
    width: 800,
    height: 533
  },
  {
    id: 15,
    src: '/images/gallery/coffee-2.jpg',
    alt: 'Coffee tasting session',
    category: 'coffee-tour',
    width: 600,
    height: 800
  },
];

const categories = [
  { id: 'all', name: 'All Photos' },
  { id: 'mangrove-tour', name: 'Mangrove Tour' },
  { id: 'coffee-tour', name: 'Organic Coffee Tour' },
  { id: 'nature-hike', name: 'Nature Hike' },
  { id: 'waterfall-tour', name: 'Waterfall Tour' },
  { id: 'bird-watching', name: 'Birdwatching' },
  { id: 'castilla-tour', name: 'La Castilla Tour' },
  { id: 'snorkeling', name: 'Snorkeling' },
  { id: 'atv-tour', name: 'ATV Tours' },
];

export default function GalleryPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/gallery-hero.jpg"
          alt="Eco Green Nosara Gallery"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container-custom h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Gallery</h1>
          <p className="text-white/90 max-w-2xl text-lg">
            Explore the beauty of Costa Rica through our collection of photos from various tours
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <GalleryMasonry images={galleryImages} categories={categories} />
        </div>
      </section>
    </MainLayout>
  );
} 