import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  env: {
    // This makes the environment variable available at runtime
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },

  /* config options here */
  images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'futuretech.media',
              pathname: '/**',
            },
            {
              protocol: 'https',
              hostname: 'www.technoxian.com',
              pathname: '/images/**',
            },
            {
              protocol: 'https',
              hostname: 'www.worldatlas.com',
              pathname: '/**'
            },
            {
              protocol: 'https',
              hostname: 'roboclub.technoxian.com',
              pathname: '/**'
            },
            {
              protocol: 'https',
              hostname: 'technoxian.com',
              pathname: '/images/**', 
            },
            {
              protocol: 'https',
              hostname: 'wp.clutchpoints.com',
              pathname: '/wp-content/uploads/**', 
            },
             {
              protocol: 'https',
              hostname: 'th.bing.com',
              pathname: '/**', 
            },
             {
              protocol: 'https',
              hostname: 'cdn.rit.edu',
              pathname: '/images/**', 
            },
          ],
    }
};

export default nextConfig;
