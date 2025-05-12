'use client';

import { useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-heading font-bold text-primary">Eco Green Nosara</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center p-2"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-text hover:text-primary font-medium transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-text hover:text-primary font-medium transition-colors">
            About
          </Link>
          <Link href="/tours" className="text-text hover:text-primary font-medium transition-colors">
            Tours
          </Link>
          {/* <Link href="/gallery" className="text-text hover:text-primary font-medium transition-colors">
            Gallery
          </Link> */}
          <Link href="/booking" className="bg-primary text-white hover:bg-primary/90 font-medium transition-colors py-2 px-4 rounded">
            Book Now
          </Link>
          {/* <Link href="/contact" className="text-text hover:text-primary font-medium transition-colors">
            Contact
          </Link> */}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white border-t border-gray-100`}>
        <div className="container-custom py-4 space-y-4">
          <Link href="/" className="block text-text hover:text-primary font-medium transition-colors" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/about" className="block text-text hover:text-primary font-medium transition-colors" onClick={toggleMenu}>
            About
          </Link>
          <Link href="/tours" className="block text-text hover:text-primary font-medium transition-colors" onClick={toggleMenu}>
            Tours
          </Link>
          {/* <Link href="/gallery" className="block text-text hover:text-primary font-medium transition-colors" onClick={toggleMenu}>
            Gallery
          </Link> */}
          <Link href="/booking" className="inline-block bg-primary text-white hover:bg-primary/90 font-medium transition-colors py-2 px-4 rounded" onClick={toggleMenu}>
            Book Now
          </Link>
          {/* <Link href="/contact" className="block text-text hover:text-primary font-medium transition-colors" onClick={toggleMenu}>
            Contact
          </Link> */}
        </div>
      </div>
    </header>
  );
} 