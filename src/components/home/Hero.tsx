import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-[600px] sm:h-[650px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-nosara.jpg" 
          alt="Beautiful nature of Nosara, Costa Rica"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>
      
      {/* Hero Content */}
      <div className="relative container-custom h-full flex flex-col justify-center">
        <div className="max-w-2xl space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
            Experience <span className="text-highlight">Eco-Tourism</span> in Nosara, Costa Rica
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-xl">
            Discover the natural beauty of Nosara with our sustainable and immersive eco-tours, connecting you with nature while preserving it for future generations.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/tours" className="btn-primary">
              Explore Tours
            </Link>
            <Link href="/booking" className="bg-white text-primary hover:bg-gray-100 font-semibold py-2 px-4 rounded transition-colors duration-300">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 