import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ansh Dental & Physio Care | Dr. Dipen Patel - Surat',
  description:
    'Award-winning integrated dental and rehabilitation care in Pandesara, Surat directed by Dr. Dipen Patel. Premium cosmetic dentistry, dental implants, root canal therapy, and advanced physiotherapy.',
  keywords: [
    'Ansh Dental Care',
    'Dr Dipen Patel dentist Surat',
    'Dental clinic Pandesara',
    'Dental implants Surat',
    'Root canal Pandesara',
    'Physiotherapy Surat',
    'Cosmetic Dentistry Surat',
    'Best dentist Pandesara Surat',
    'NRI dental treatments Gujarat',
  ],
  authors: [{ name: 'Dr. Dipen Patel, B.D.S' }],
  openGraph: {
    title: 'Ansh Dental & Physio Care | Dr. Dipen Patel - Surat',
    description:
      'Premier cosmetic dentistry, implantology, and rehabilitation center in Pandesara, Surat. Rated 4.9 ★ by 160+ patients.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ansh Dental & Physio Care | Dr. Dipen Patel - Surat',
    description:
      'Premier cosmetic dentistry, implantology, and rehabilitation center in Pandesara, Surat.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'MedicalBusiness', 'PhysicalTherapyClinic'],
  name: 'Ansh Dental And Physio Care',
  image: '/assets/aistudio/IMG_20261023_212516_53b2f41f.jpg',
  telephone: '+919428677067',
  alternatePhone: '+918238070024',
  url: 'https://anshdentalphysiocare.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'B-42, Utsav Complex, Gujarat Housing Board (GHB) Main Road, near Sarvoday Sahkari Bank, Piyush Point, Laxmi Nagar',
    addressLocality: 'Pandesara, Surat',
    addressRegion: 'Gujarat',
    postalCode: '394221',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 21.1442,
    longitude: 72.8258,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:30',
    },
  ],
  priceRange: '₹₹',
  paymentAccepted: 'Cash, UPI, Google Pay, Credit Card, Debit Card',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '160',
    bestRating: '5',
  },
  medicalSpecialty: ['Dentistry', 'Physiotherapy', 'Orthodontics', 'Implantology'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark overflow-x-clip">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen selection:bg-teal-500/30 selection:text-teal-200 overflow-x-clip w-full max-w-full m-0 p-0" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

