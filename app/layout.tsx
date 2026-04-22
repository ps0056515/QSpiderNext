import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NavigationLoader } from '@/components/layout/NavigationLoader';
import { LearnAssistant } from '@/components/ai/LearnAssistant';
import { AppProviders } from '@/components/providers/AppProviders';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QSpiders Learn — Launch Your IT Career with Hands-On Training',
  description:
    'Industry-grade training in Software Testing, Full Stack Development, DevOps, Cloud, and Data Science. 7.5 lakh+ students placed across 2,500+ companies.',
  keywords: [
    'QSpiders',
    'software testing',
    'selenium',
    'java training',
    'python',
    'devops',
    'placement',
    'IT training',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
      style={{ backgroundColor: '#f8fafc' }}
    >
      <body
        className={`${fontSans.className} min-h-screen bg-slate-50 font-sans text-[1.0625rem] leading-relaxed text-slate-600 antialiased`}
        style={{
          margin: 0,
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          color: '#475569',
        }}
      >
        <AppProviders>
          <Suspense fallback={null}>
            <NavigationLoader />
          </Suspense>
          <Suspense fallback={null}>
            <LearnAssistant />
          </Suspense>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
