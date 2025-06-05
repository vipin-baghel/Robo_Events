import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
