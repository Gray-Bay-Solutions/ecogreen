import { TRANSPORTATION_POLICY, IVA_POLICY } from '@/lib/tour-policies';

interface TourPoliciesProps {
  className?: string;
}

export default function TourPolicies({ className = '' }: TourPoliciesProps) {
  return (
    <div className={`space-y-3 text-sm text-gray-600 ${className}`}>
      <p>{TRANSPORTATION_POLICY}</p>
      <p className="font-medium">{IVA_POLICY}</p>
    </div>
  );
}
