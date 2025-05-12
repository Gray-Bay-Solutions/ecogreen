'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { Tour } from '@/types';
import tours from '@/data/tours.json';

interface BookingFormProps {
  selectedTourId?: string;
}

export default function BookingForm({ selectedTourId }: BookingFormProps) {
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    tourId: selectedTourId || '',
    date: '',
    time: '',
    participants: '1',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
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

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.tourId) errors.tourId = 'Please select a tour';
    if (!formData.date) errors.date = 'Please select a date';
    if (!formData.time) errors.time = 'Please select a time';
    if (!formData.participants || parseInt(formData.participants) < 1) {
      errors.participants = 'Please enter at least 1 participant';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a delay and success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setIsSubmitted(true);
      setFormData({
        tourId: '',
        date: '',
        time: '',
        participants: '1',
        name: '',
        email: '',
        phone: '',
        specialRequests: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewBooking = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-heading font-semibold mb-4">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for booking with Eco Green Nosara. We&apos;ve sent a confirmation email with all the details.
          Our team will be in touch shortly to confirm your reservation.
        </p>
        <button
          onClick={handleNewBooking}
          className="btn-primary"
        >
          Make Another Booking
        </button>
      </div>
    );
  }

  return (
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
                {tour.name} (${tour.price})
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
            min="1"
            max="12"
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
      
      {/* Submit Button */}
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
            'Book Now'
          )}
        </button>
      </div>
    </form>
  );
} 