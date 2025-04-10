'use client';

import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { CatsDivider } from '@/components/sections/CatsDivider';
import { About } from '@/components/sections/About';
import { Solutions } from '@/components/sections/Solutions';
import { Process } from '@/components/sections/Process';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-hanno-text overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#000000',
            padding: '8px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
      <Header />
      <Hero />
      <CatsDivider />
      <About />
      <Solutions />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
