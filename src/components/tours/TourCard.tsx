import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/types';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={tour.imageUrl}
          alt={tour.name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-heading font-semibold">{tour.name}</h3>
          <span className="text-primary font-bold">${tour.price}</span>
        </div>
        <p className="text-gray-600 mb-6 text-sm">{tour.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{tour.duration} • {tour.difficulty}</span>
          <Link 
            href={`/tours/${tour.id}`}
            className="btn-primary text-sm py-1.5"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
} 