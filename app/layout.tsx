import type {Metadata} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Global styles
import { AuthProvider } from '@/context/AuthContext';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Wanderlush - Magic of Bromo',
  description: 'Experience the magic of Bromo with Wanderlush. Curated volcanic expeditions, luxury villas, lava jeep tours, cultural heritage, and custom itineraries in Bromo Tengger Semeru National Park.',
  openGraph: {
    title: 'Wanderlush - Magic of Bromo',
    description: 'Experience the magic of Bromo with Wanderlush. Curated volcanic expeditions, luxury villas, lava jeep tours, cultural heritage, and custom itineraries in Bromo Tengger Semeru National Park.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wanderlush - Magic of Bromo',
    description: 'Experience the magic of Bromo with Wanderlush. Curated volcanic expeditions, luxury villas, lava jeep tours, cultural heritage, and custom itineraries in Bromo Tengger Semeru National Park.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
