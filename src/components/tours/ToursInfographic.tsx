import Link from 'next/link';
import { CONTACT_PHONE, CONTACT_PHONE_LINK } from '@/lib/tour-policies';

export default function ToursInfographic() {
  return (
    <section id="tour-guide" className="py-8 bg-primary/5">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-xl font-heading font-bold text-text">Tour Guide & Pricing</h2>
          <Link
            href="/infographic.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm whitespace-nowrap self-start sm:self-auto"
          >
            Open Full PDF
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl">
          <iframe
            src="/infographic.pdf"
            title="Eco Green Nosara tour guide and pricing"
            className="w-full h-[420px] md:h-[520px] border-0"
          />
          <p className="px-4 py-3 text-xs text-gray-600 border-t border-gray-100">
            Reservations:{' '}
            <a href={CONTACT_PHONE_LINK} className="text-primary font-medium hover:underline">
              {CONTACT_PHONE}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
