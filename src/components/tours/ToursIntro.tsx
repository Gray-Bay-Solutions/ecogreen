import Link from 'next/link';
import { CONTACT_PHONE, CONTACT_PHONE_LINK, IVA_POLICY, TRANSPORTATION_POLICY } from '@/lib/tour-policies';

export default function ToursIntro() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 mb-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="lg:max-w-xl">
          <h2 className="text-lg font-heading font-semibold text-text mb-1">Explore Our Eco-Tours</h2>
          <p className="text-sm text-gray-600">
            Guided adventures through Nosara&apos;s mangroves, forests, waterfalls, and coast — led by a local who knows the land.
          </p>
        </div>

        <ul className="text-xs text-gray-600 space-y-1 lg:text-right shrink-0">
          <li>{TRANSPORTATION_POLICY}</li>
          <li>{IVA_POLICY}</li>
        </ul>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Link href="#tour-guide" className="text-primary font-medium hover:underline">
          View tour guide & pricing
        </Link>
        <span className="text-gray-300 hidden sm:inline">|</span>
        <span className="text-gray-600">
          Book:{' '}
          <a href={CONTACT_PHONE_LINK} className="text-primary hover:underline">{CONTACT_PHONE}</a>
          {' · '}
          <a href="mailto:Schusslera333@gmail.com" className="text-primary hover:underline">Schusslera333@gmail.com</a>
        </span>
      </div>
    </div>
  );
}
