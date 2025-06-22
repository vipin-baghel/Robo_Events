"use client"
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import './globals.css'
import Header from "./features/components/Header"
import Footer from "./features/components/Footer"

// Define the exact shape of our environment variables
type EnvironmentVariables = {
  API_BASE_URL: string;
  MEDIA_BASE_URL: string;
};

declare global {
  interface Window {
    _env_?: EnvironmentVariables;
  }
}

// Initialize window._env_ if it doesn't exist (client-side only)
if (typeof window !== 'undefined') {
  // Only initialize if it doesn't exist or is missing required properties
  if (!window._env_ || !window._env_.API_BASE_URL || !window._env_.MEDIA_BASE_URL) {
    console.warn('Environment variables not properly initialized. Waiting for runtime-env.js...');
    window._env_ = window._env_ || {
      API_BASE_URL: '',
      MEDIA_BASE_URL: ''
    };
  }
} else {
  // Server-side: Set a flag to indicate SSR is happening
  console.log('Server-side rendering detected');
}

const companyName = "Navyugam"

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [envLoaded, setEnvLoaded] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if environment variables are already loaded
    if (window._env_?.API_BASE_URL) {
      setEnvLoaded(true);
      console.log('Environment variables loaded:', window._env_);
    } else {
      // Fallback: Check again after a short delay
      const timer = setTimeout(() => {
        console.warn('Environment variables not loaded, using fallback');
        setEnvLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Show loading state while environment variables are being loaded
  if (!envLoaded) {
    return (
      <html lang="en" className={inter.variable}>
        <head>
          <title>Loading...</title>
          <Script 
            id="runtime-env"
            src="/runtime-env.js"
            strategy="beforeInteractive"
            onLoad={() => {
              // Force a re-render after the script loads
              console.log('Runtime environment loaded:', window._env_);
              setEnvLoaded(true);
            }}
            onError={(e) => {
              console.error('Failed to load runtime-env.js', e);
              setEnvLoaded(true); // Continue with fallback
            }}
          />
        </head>
        <body className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading environment...</p>
            <div className="mt-4 p-4 bg-gray-100 rounded text-left text-sm">
              <p>Debug Info:</p>
              <pre>{JSON.stringify({
                envLoaded,
                windowEnv: typeof window !== 'undefined' ? window._env_ : 'undefined',
                location: typeof window !== 'undefined' ? window.location.href : 'undefined'
              }, null, 2)}</pre>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script 
          id="runtime-env"
          src="/runtime-env.js"
          strategy="beforeInteractive"
          onLoad={() => {
            console.log('Runtime environment loaded:', window._env_);
          }}
          onError={(e) => {
            console.error('Failed to load runtime-env.js', e);
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden font-sans">
        <Header onContactClick={scrollToFooter} />
        <main className="flex-1">
          {children}
        </main>
        <Footer ref={footerRef} companyName={companyName} />
      </body>
    </html>
  );
}
