// // Centralized API URL configuration for the frontend

// declare global {
//   interface Window {
//     _env_?: {
//       API_BASE_URL: string;
//       MEDIA_BASE_URL: string;
//     };
//   }
// }

// // Debug function to log environment state
// const logEnvState = (context: string) => {
//   if (typeof window !== 'undefined') {
//     console.log(`[${context}] Environment state:`, {
//       windowEnv: window._env_,
//       location: window.location.href,
//       timestamp: new Date().toISOString()
//     });
//   }
// };

// // Function to get API base URL (no fallback)
// const getApiBaseUrl = (): string => {
//   // During SSR, return an empty string - these functions should only be called client-side
//   if (typeof window === 'undefined') {
//     return '';
//   }

//   if (!window._env_?.API_BASE_URL) {
//     const error = new Error('API_BASE_URL is not defined in window._env_');
//     console.error('Environment Error:', error);
//     logEnvState('error-getApiBaseUrl');
//     throw error;
//   }
  
//   return window._env_.API_BASE_URL;
// };

// // Function to get media base URL (no fallback)
// const getMediaBaseUrl = (): string => {
//   // During SSR, return an empty string - these functions should only be called client-side
//   if (typeof window === 'undefined') {
//     return '';
//   }

//   if (!window._env_?.MEDIA_BASE_URL) {
//     const error = new Error('MEDIA_BASE_URL is not defined in window._env_');
//     console.error('Environment Error:', error);
//     logEnvState('error-getMediaBaseUrl');
//     throw error;
//   }
  
//   return window._env_.MEDIA_BASE_URL;
// };

// // Initialize window._env_ if it doesn't exist
// if (typeof window !== 'undefined') {
//   window._env_ = window._env_ || {
//     API_BASE_URL: undefined as unknown as string,
//     MEDIA_BASE_URL: undefined as unknown as string
//   };
  
//   // Debug: Log when window._env_ is accessed or modified
//   const originalEnv = { ...window._env_ };
//   Object.defineProperty(window, '_env_', {
//     get() {
//       console.log('window._env_ accessed:', { ...originalEnv });
//       return originalEnv;
//     },
//     set(value) {
//       console.log('window._env_ updated:', value);
//       Object.assign(originalEnv, value);
//       logEnvState('window-env-updated');
//     },
//     configurable: true
//   });
// }

// // Helper function to construct API endpoints
// export const getApiEndpoint = (endpoint: string): string => {
//   // During SSR, return a placeholder URL
//   if (typeof window === 'undefined') {
//     return `/_ssr_placeholder_/${endpoint}`;
//   }

//   const baseUrl = getApiBaseUrl();
//   if (!baseUrl) {
//     console.error('getApiEndpoint: baseUrl is empty');
//     return '';
//   }
  
//   // Ensure base URL ends with exactly one slash
//   const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
//   // Ensure endpoint doesn't start with a slash
//   const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
//   const url = `${normalizedBase}/${normalizedEndpoint}`;
  
//   // Debug log
//   console.log(`[getApiEndpoint] Generated URL: ${url}`);
//   return url;
// };

// // Export base URLs as functions to ensure they're always fresh
// export const getAPIBaseURL = () => getApiBaseUrl();
// export const getMediaBaseURL = () => getMediaBaseUrl();

// // Export API endpoints as functions to ensure they use the latest base URL
// export const getEventsEndpoint = () => getApiEndpoint('events/');
// export const getEventRanksEndpoint = () => getApiEndpoint('top-team-ranks/');
// export const getFeaturedNewsEndpoint = () => getApiEndpoint('featured-news/');
// export const getTestimonialsEndpoint = () => getApiEndpoint('testimonials/');
// export const getInternationalOfficesEndpoint = () => getApiEndpoint('international-offices/');
// export const getCompetitionsEndpoint = () => getApiEndpoint('competitions/');
// export const getBannerVideoEndpoint = () => getApiEndpoint('banner-video/');
// export const getNewsUpdatesEndpoint = () => getApiEndpoint('news-updates/');
// export const getFooterEndpoint = () => getApiEndpoint('footer');

// // Log initial environment state
// if (typeof window !== 'undefined') {
//   logEnvState('initial-load');
  
//   // Log when window._env_ changes (for debugging)
//   const originalEnv = { ...(window._env_ || {}) };
//   Object.defineProperty(window, '_env_', {
//     get() {
//       return originalEnv;
//     },
//     set(value) {
//       console.log('window._env_ updated:', value);
//       Object.assign(originalEnv, value);
//     },
//     configurable: true
//   });
// }

// Legacy exports for backward compatibility
export const API_BASE_URL = "https://navyugam.com/api"
export const MEDIA_BASE_URL = "https://navyugam.com/media/"
export const API_EVENTS = "https://navyugam.com/api/events/"
export const API_EVENT_RANKS = "https://navyugam.com/api/top-team-ranks/"
// export const API_FEATURED_NEWS = getFeaturedNewsEndpoint();
export const API_TESTIMONIALS = "https://navyugam.com/api/testimonials/"
// export const API_INTERNATIONAL_OFFICES = getInternationalOfficesEndpoint();
export const API_COMPETITIONS = "https://navyugam.com/api/competitions/"
export const API_BANNER_VIDEO = "https://navyugam.com/api/banner-video/"
export const API_NEWS_UPDATES = "https://navyugam.com/api/news-updates/"
export const API_FOOTER = "https://navyugam.com/api/footer/"
