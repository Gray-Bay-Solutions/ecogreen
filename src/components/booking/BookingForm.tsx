'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tour } from '@/types';
import tours from '@/data/tours.json';
import { formatTourPrice, isBookableOnline } from '@/lib/tours';
import { PAYMENTS_ENABLED } from '@/lib/booking-config';
import Link from 'next/link';

interface BookingFormProps {
  selectedTourId?: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function BookingForm({ selectedTourId }: BookingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [paypalLoaded] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [bookingReference, setBookingReference] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');

  const [formData, setFormData] = useState({
    tourId: selectedTourId || '',
    date: '',
    time: '',
    participants: '1',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    transportationType: '',
  });

  // Available times for the selected tour
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // Update available times when tourId changes
  useEffect(() => {
    if (formData.tourId) {
      const selectedTour = tours.find((tour: Tour) => tour.id === formData.tourId);
      if (selectedTour) {
        setAvailableTimes(selectedTour.startTimes);
        setFormData(prev => ({ ...prev, time: '' })); // Reset time when tour changes
      }
    } else {
      setAvailableTimes([]);
    }
  }, [formData.tourId]);

  // Set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Set max date to 6 months from now
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  const maxDate = sixMonthsFromNow.toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Get selected tour
  const selectedTour = tours.find((tour: Tour) => tour.id === formData.tourId);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const tour = tours.find((t: Tour) => t.id === formData.tourId);
    
    if (!formData.tourId) errors.tourId = 'Please select a tour';
    if (!formData.date) errors.date = 'Please select a date';
    if (!formData.time) errors.time = 'Please select a time';
    const participants = parseInt(formData.participants, 10);
    if (!formData.participants || participants < 1) {
      errors.participants = 'Please enter at least 1 participant';
    } else if (tour?.minGroupSize && participants < tour.minGroupSize) {
      errors.participants = `Minimum ${tour.minGroupSize} participants for this tour`;
    } else if (tour?.maxGroupSize && participants > tour.maxGroupSize) {
      errors.participants = `Maximum ${tour.maxGroupSize} participants for this tour`;
    }
    if (!formData.name.trim()) errors.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Please enter your phone number';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Calculate total price
  const calculateTotal = () => {
    if (!selectedTour || selectedTour.contactForPricing || selectedTour.price == null) return 0;
    
    const basePrice = selectedTour.price * parseInt(formData.participants || '1');
    let transportationPrice = 0;
    
    if (formData.transportationType && selectedTour.transportationOptions) {
      const transportOption = selectedTour.transportationOptions.find(
        (opt) => opt.type === formData.transportationType
      );
      if (transportOption) {
        transportationPrice = transportOption.price * parseInt(formData.participants || '1');
      }
    }
    
    return basePrice + transportationPrice;
  };

  // Initialize PayPal buttons (disabled — set NEXT_PUBLIC_PAYMENTS_ENABLED=true to re-enable)
  useEffect(() => {
    if (!PAYMENTS_ENABLED) return;
    if (paypalLoaded && showPayPal && window.paypal && orderId) {
      const container = document.getElementById('paypal-button-container');
      if (container && !container.hasChildNodes()) {
        window.paypal
          .Buttons({
            createOrder: () => {
              return orderId;
            },
            onApprove: async (data: any) => {
              try {
                const response = await fetch('/api/bookings/capture', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    orderId: data.orderID,
                    bookingReference,
                  }),
                });

                const result = await response.json();

                if (result.success) {
                  router.push(`/booking/confirmation/${bookingReference}`);
                } else {
                  alert('Payment failed. Please try again.');
                }
              } catch (error) {
                console.error('Payment capture error:', error);
                alert('Payment failed. Please try again.');
              }
            },
            onError: (err: any) => {
              console.error('PayPal error:', err);
              alert('An error occurred with PayPal. Please try again.');
            },
          })
          .render('#paypal-button-container');
      }
    }
  }, [paypalLoaded, showPayPal, orderId, bookingReference, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (selectedTour && !isBookableOnline(selectedTour)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        if (result.mode === 'payment' && PAYMENTS_ENABLED) {
          setBookingReference(result.bookingReference);
          setOrderId(result.orderId);
          setShowPayPal(true);
          return;
        }

        if (result.booking) {
          sessionStorage.setItem(
            `booking:${result.bookingReference}`,
            JSON.stringify(result.booking)
          );
        }
        router.push(`/booking/confirmation/${result.bookingReference}`);
        return;
      }

      alert(result.error || 'Failed to submit booking request. Please try again.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (PAYMENTS_ENABLED && showPayPal) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-heading font-semibold mb-4">Complete Your Payment</h2>
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Booking Reference:</p>
            <p className="font-bold text-lg">{bookingReference}</p>
            <p className="text-sm text-gray-600 mt-4 mb-2">Total Amount:</p>
            <p className="font-bold text-2xl text-primary">${calculateTotal().toFixed(2)}</p>
          </div>
          <div id="paypal-button-container"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* PayPal SDK — disabled while using email-only bookings
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
        onLoad={() => setPaypalLoaded(true)}
      />
      */}
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-heading font-semibold mb-6">Book Your Tour</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Tour Selection */}
        <div>
          <label htmlFor="tourId" className="block font-medium text-text mb-1">
            Select Tour <span className="text-red-500">*</span>
          </label>
          <select
            id="tourId"
            name="tourId"
            value={formData.tourId}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border ${
              formErrors.tourId ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            required
          >
            <option value="">Select a tour...</option>
            {tours.map((tour: Tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.name} ({formatTourPrice(tour)})
              </option>
            ))}
          </select>
          {formErrors.tourId && (
            <p className="text-red-500 text-sm mt-1">{formErrors.tourId}</p>
          )}
        </div>
        
        {/* Date */}
        <div>
          <label htmlFor="date" className="block font-medium text-text mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={minDate}
            max={maxDate}
            className={`w-full p-3 rounded-md border ${
              formErrors.date ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            required
          />
          {formErrors.date && (
            <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
          )}
        </div>
        
        {/* Time */}
        <div>
          <label htmlFor="time" className="block font-medium text-text mb-1">
            Time <span className="text-red-500">*</span>
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border ${
              formErrors.time ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            disabled={!formData.tourId || availableTimes.length === 0}
            required
          >
            <option value="">Select a time...</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {formErrors.time && (
            <p className="text-red-500 text-sm mt-1">{formErrors.time}</p>
          )}
        </div>
        
        {/* Participants */}
        <div>
          <label htmlFor="participants" className="block font-medium text-text mb-1">
            Number of Participants <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="participants"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            min={selectedTour?.minGroupSize ?? 1}
            max={selectedTour?.maxGroupSize ?? 12}
            className={`w-full p-3 rounded-md border ${
              formErrors.participants ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            required
          />
          {formErrors.participants && (
            <p className="text-red-500 text-sm mt-1">{formErrors.participants}</p>
          )}
        </div>
      </div>
      
      {/* Transportation Options */}
      {selectedTour?.transportationOptions && (
        <div className="mb-6">
          <h3 className="text-xl font-heading font-semibold mb-4">Transportation Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedTour.transportationOptions.map((option) => (
              <label
                key={option.type}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formData.transportationType === option.type
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-300 hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="transportationType"
                  value={option.type}
                  checked={formData.transportationType === option.type}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="font-semibold mb-2">{option.type}</div>
                <div className="text-primary font-bold mb-2">
                  {option.price === 0 ? 'Included' : `+$${option.price}/person`}
                </div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </label>
            ))}
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-heading font-semibold mb-4">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium text-text mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border ${
              formErrors.name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            required
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium text-text mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border ${
              formErrors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            required
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>
        
        {/* Phone */}
        <div className="md:col-span-2">
          <label htmlFor="phone" className="block font-medium text-text mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border ${
              formErrors.phone ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            required
          />
          {formErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
          )}
        </div>
      </div>
      
      {/* Special Requests */}
      <div className="mb-8">
        <label htmlFor="specialRequests" className="block font-medium text-text mb-1">
          Special Requests or Notes
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        ></textarea>
      </div>
      
      {/* Price Summary */}
      {selectedTour?.contactForPricing && (
        <div className="bg-primary/5 rounded-lg p-6 mb-8 border border-primary/20">
          <h3 className="text-xl font-heading font-semibold mb-3">Contact Us to Book</h3>
          <p className="text-gray-600 mb-4">
            {selectedTour.name} pricing depends on group size and route. Please contact us directly for a quote and availability.
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Contact Us for Pricing
          </Link>
        </div>
      )}

      {selectedTour && !selectedTour.contactForPricing && formData.participants && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-heading font-semibold mb-4">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {selectedTour.name} x {formData.participants}
              </span>
              <span className="font-medium">
                ${((selectedTour.price ?? 0) * parseInt(formData.participants)).toFixed(2)}
              </span>
            </div>
            {formData.transportationType && selectedTour.transportationOptions && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {formData.transportationType} Transportation x {formData.participants}
                </span>
                <span className="font-medium">
                  $
                  {(
                    (selectedTour.transportationOptions.find(
                      (opt) => opt.type === formData.transportationType
                    )?.price || 0) * parseInt(formData.participants)
                  ).toFixed(2)}
                </span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Submit Button */}
      {!selectedTour?.contactForPricing && (
      <div className="text-right">
        <button
          type="submit"
          className="btn-primary py-3 px-8 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Submit Booking Request'
          )}
        </button>
      </div>
      )}
      </form>
    </>
  );
} 