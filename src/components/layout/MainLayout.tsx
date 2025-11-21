'use client';

import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8 px-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
