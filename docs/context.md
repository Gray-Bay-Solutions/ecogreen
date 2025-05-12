# Eco Green Nosara - Website Context Document

## Project Overview
This document outlines the requirements for developing a modern, elegant website for Eco Green Nosara, an eco-tourism company based in Nosara, Costa Rica. The website will showcase their tour offerings, feature a vertical-scrolling photo gallery, and include a booking form for customers.

## Business Information
- **Company Name**: Eco Green Nosara
- **Location**: Nosara, Costa Rica
- **Services**:
  - Kayak Tour ($70)
  - Paddle Board ($70)
  - Coffee Tour ($65)
  - Nature Hike ($55)
  - Bird Watching ($50)

## Technical Requirements
- **Framework**: Next.js
- **Design Approach**: Modern, elegant UI/UX
- **Mobile Responsive**: Yes (must work well on all devices)
- **Primary Technologies**: React, Next.js, TailwindCSS

## Design Direction
- **Color Palette**: Various shades of green (from olive to citrus green)
  - Primary: #4D7C0F (olive green)
  - Secondary: #65A30D (forest green)
  - Accent: #84CC16 (lime green)
  - Highlight: #BEF264 (citrus green)
  - Background: #F7FEE7 (pale green / off-white)
  - Text: #1C1917 (almost black) and #FFFFFF (white)
- **Typography**:
  - Headings: Montserrat (clean, modern sans-serif)
  - Body: Open Sans (readable, friendly)
- **Visual Style**: Clean, minimal, with abundant white space and high-quality nature photography

## Key Pages & Features

### 1. Home Page
- Hero section with stunning background image of Nosara's nature
- Brief company introduction with mission statement
- Featured tours with images and prices
- Call-to-action buttons leading to booking form
- Testimonials section

### 2. About Page
- Company story and philosophy
- Information about Nosara's unique ecosystem
- Commitment to sustainability and eco-friendly practices
- Team introduction (optional)

### 3. Tours Page
- Detailed descriptions of each tour offering
- Pricing information
- Duration, difficulty level, and what to bring
- Featured photos for each tour

### 4. Gallery
- **Instagram-style vertical scrolling gallery**
- Masonry layout for varied image sizes
- Ability to click images for larger view
- Lazy loading for performance
- Categories to filter by tour type

### 5. Booking Form
- **User-friendly tour booking system**
- Selection for:
  - Tour type (dropdown with 5 options)
  - Date (calendar picker)
  - Time (options based on tour availability)
  - Number of participants
  - Contact information (name, email, phone)
  - Special requests/notes
- Automatic email confirmation to both the customer and business owner
- Clear pricing display with any applicable discounts

### 6. Contact Page
- Contact form
- Map location
- Direct contact information (phone, email)
- Social media links

## Technical Specifications

### Front-end
- **Component Structure**:
  - Layout components (Header, Footer, Layout wrapper)
  - UI components (Buttons, Cards, Forms, Gallery)
  - Page components

### State Management
- React Context API for global state
- Form state management with React Hook Form

### Data Storage
- Local JSON files for tour information
- Form submissions via API routes

### Image Handling
- Next.js Image component for optimization
- Progressive loading for gallery images
- Cloudinary or similar service for image hosting (optional)

### Form & Email System
- Server-side API route for form processing
- Email.js or Nodemailer for sending confirmation emails

## SEO Considerations
- Metadata for each page
- Alt text for images
- Semantic HTML structure
- Sitemap.xml and robots.txt

## Performance Goals
- Lighthouse score > 90
- Initial load time < 3 seconds
- Optimized images and assets

## Future Considerations
- Multilingual support (English/Spanish)
- Blog section for eco-tourism tips and local information
- Online payment integration

## Implementation Timeline
1. Setup Next.js project with TailwindCSS
2. Develop core components and layout
3. Build individual pages
4. Implement gallery feature
5. Create booking form and email functionality
6. Testing and optimization
7. Deployment