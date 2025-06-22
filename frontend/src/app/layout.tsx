"use client"
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from "./features/components/Header"
import Footer from "./features/components/Footer"
import { useRef } from "react"

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
  const footerRef = useRef<HTMLDivElement | null>(null)

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script src="/runtime-env.js" strategy="beforeInteractive" />
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
