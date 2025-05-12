'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Thompson",
    location: "United States",
    text: "The kayak tour was absolutely amazing! Our guide was knowledgeable and friendly, and we saw so much wildlife. Definitely the highlight of our trip to Nosara.",
    image: "/images/testimonials/person-1.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Mendez",
    location: "Spain",
    text: "The coffee tour was educational and delicious! Learning about sustainable coffee production and tasting the different varieties was a wonderful experience.",
    image: "/images/testimonials/person-2.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Johnson",
    location: "Canada",
    text: "We did the nature hike and bird watching tours. Both were exceptional experiences with guides who clearly love what they do. We spotted over 20 different bird species!",
    image: "/images/testimonials/person-3.jpg",
    rating: 4
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-primary/5 py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-text mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from travelers who have experienced our eco-tours.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`bg-white rounded-lg shadow-md p-8 transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 