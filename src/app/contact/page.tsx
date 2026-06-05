import MainLayout from '@/components/layout/MainLayout';
import ContactForm from '@/components/contact/ContactForm';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/tour-policies';

export const metadata: Metadata = {
  title: 'Contact Us | Eco Green Nosara',
  description: 'Contact Eco Green Nosara for inquiries about our eco-friendly tours in Nosara, Costa Rica. We offer kayaking, paddle boarding, coffee tours, nature hikes, and bird watching.',
};

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/contact-hero.jpg"
          alt="Contact Eco Green Nosara"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container-custom h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/90 max-w-2xl text-lg">
            Get in touch with our team for inquiries, custom tours, or general information
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
            
            {/* Contact Info & Map */}
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-6">Contact Information</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Address</h3>
                      <p className="text-gray-600">Main Street, Nosara</p>
                      <p className="text-gray-600">Guanacaste Province, Costa Rica</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+50661111023" className="hover:text-primary transition-colors">+506 6111 1023</a>
                      </p>
                      <p className="text-gray-600">
                        WhatsApp:{' '}
                        <a href="https://wa.me/50661111023" className="hover:text-primary transition-colors">+506 6111 1023</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:Schusslera333@gmail.com" className="hover:text-primary transition-colors">Schusslera333@gmail.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Office Hours</h3>
                      <p className="text-gray-600">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sunday: 9:00 AM - 3:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-80">
                  {/* Note: In a real app, replace with an actual Google Maps embed */}
                  <Image
                    src="/images/map-placeholder.jpg"
                    alt="Map of Eco Green Nosara location"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary transition-colors"
                    >
                      View on Google Maps
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-16 bg-primary/5">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Follow Us on Instagram</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Stay updated with our latest tours, travel tips, and beautiful photos from Nosara on{' '}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              {INSTAGRAM_HANDLE}
            </a>
            .
          </p>
          
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
            aria-label="Follow Eco Green Nosara on Instagram"
          >
            <svg className="w-7 h-7 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.214c0 2.717-.012 3.056-.06 4.122-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.214c-2.717 0-3.056-.012-4.122-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
            <span className="font-semibold text-text">{INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      </section>
    </MainLayout>
  );
} 