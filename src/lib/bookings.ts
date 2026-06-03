import db from './db';
import { generateBookingReference } from './booking-reference';

export interface BookingData {
  tourId: string;
  tourName: string;
  tourDate: string;
  tourTime: string;
  participants: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  transportationType?: string;
  basePrice: number;
  transportationPrice?: number;
  totalPrice: number;
}

export interface Booking extends BookingData {
  id: number;
  bookingReference: string;
  paymentStatus: string;
  paypalOrderId?: string;
  paypalCaptureId?: string;
  createdAt: string;
  updatedAt: string;
}

// Generate unique booking reference
export { generateBookingReference };

// Create a new booking
export function createBooking(data: BookingData): string {
  const bookingReference = generateBookingReference();
  
  const stmt = db.prepare(`
    INSERT INTO bookings (
      booking_reference, tour_id, tour_name, tour_date, tour_time,
      participants, customer_name, customer_email, customer_phone,
      special_requests, transportation_type, base_price,
      transportation_price, total_price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    bookingReference,
    data.tourId,
    data.tourName,
    data.tourDate,
    data.tourTime,
    data.participants,
    data.customerName,
    data.customerEmail,
    data.customerPhone,
    data.specialRequests || null,
    data.transportationType || null,
    data.basePrice,
    data.transportationPrice || 0,
    data.totalPrice
  );

  return bookingReference;
}

// Get booking by reference
export function getBookingByReference(reference: string): Booking | null {
  const stmt = db.prepare(`
    SELECT
      id, booking_reference as bookingReference, tour_id as tourId,
      tour_name as tourName, tour_date as tourDate, tour_time as tourTime,
      participants, customer_name as customerName, customer_email as customerEmail,
      customer_phone as customerPhone, special_requests as specialRequests,
      transportation_type as transportationType, base_price as basePrice,
      transportation_price as transportationPrice, total_price as totalPrice,
      payment_status as paymentStatus, paypal_order_id as paypalOrderId,
      paypal_capture_id as paypalCaptureId, created_at as createdAt,
      updated_at as updatedAt
    FROM bookings
    WHERE booking_reference = ?
  `);

  return stmt.get(reference) as Booking | null;
}

// Update booking with PayPal order ID
export function updateBookingWithPayPalOrder(
  bookingReference: string,
  paypalOrderId: string
): void {
  const stmt = db.prepare(`
    UPDATE bookings
    SET paypal_order_id = ?, updated_at = CURRENT_TIMESTAMP
    WHERE booking_reference = ?
  `);

  stmt.run(paypalOrderId, bookingReference);
}

// Update booking payment status
export function updateBookingPaymentStatus(
  bookingReference: string,
  status: string,
  paypalCaptureId?: string
): void {
  const stmt = db.prepare(`
    UPDATE bookings
    SET payment_status = ?, paypal_capture_id = ?, updated_at = CURRENT_TIMESTAMP
    WHERE booking_reference = ?
  `);

  stmt.run(status, paypalCaptureId || null, bookingReference);
}

// Get all bookings (for admin purposes)
export function getAllBookings(): Booking[] {
  const stmt = db.prepare(`
    SELECT
      id, booking_reference as bookingReference, tour_id as tourId,
      tour_name as tourName, tour_date as tourDate, tour_time as tourTime,
      participants, customer_name as customerName, customer_email as customerEmail,
      customer_phone as customerPhone, special_requests as specialRequests,
      transportation_type as transportationType, base_price as basePrice,
      transportation_price as transportationPrice, total_price as totalPrice,
      payment_status as paymentStatus, paypal_order_id as paypalOrderId,
      paypal_capture_id as paypalCaptureId, created_at as createdAt,
      updated_at as updatedAt
    FROM bookings
    ORDER BY created_at DESC
  `);

  return stmt.all() as Booking[];
}

// Get bookings by date (for scheduling)
export function getBookingsByDate(date: string): Booking[] {
  const stmt = db.prepare(`
    SELECT
      id, booking_reference as bookingReference, tour_id as tourId,
      tour_name as tourName, tour_date as tourDate, tour_time as tourTime,
      participants, customer_name as customerName, customer_email as customerEmail,
      customer_phone as customerPhone, special_requests as specialRequests,
      transportation_type as transportationType, base_price as basePrice,
      transportation_price as transportationPrice, total_price as totalPrice,
      payment_status as paymentStatus, paypal_order_id as paypalOrderId,
      paypal_capture_id as paypalCaptureId, created_at as createdAt,
      updated_at as updatedAt
    FROM bookings
    WHERE tour_date = ? AND payment_status = 'completed'
    ORDER BY tour_time
  `);

  return stmt.all(date) as Booking[];
}

// Get total participants for a specific tour date/time
export function getTourAvailability(
  tourId: string,
  date: string,
  time: string
): number {
  const stmt = db.prepare(`
    SELECT COALESCE(SUM(participants), 0) as total
    FROM bookings
    WHERE tour_id = ? AND tour_date = ? AND tour_time = ? AND payment_status = 'completed'
  `);

  const result = stmt.get(tourId, date, time) as { total: number };
  return result.total;
}

