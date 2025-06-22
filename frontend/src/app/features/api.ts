// Centralized API URL constants for the frontend

declare global {
  interface Window {
    _env_?: {
      API_BASE_URL?: string;
      MEDIA_BASE_URL?: string;
    };
  }
}

// Use window._env_ for runtime variables, fallback to process.env for build time
const getRuntimeEnv = (key: 'API_BASE_URL' | 'MEDIA_BASE_URL', defaultValue: string): string => {
  if (typeof window !== 'undefined' && window._env_?.[key]) {
    return window._env_[key] as string;
  }
  const value = process.env[`NEXT_PUBLIC_${key}`];
  return value !== undefined ? value : defaultValue;
};

export const API_BASE_URL = getRuntimeEnv('API_BASE_URL', 'http://localhost/api/');
export const MEDIA_BASE_URL = getRuntimeEnv('MEDIA_BASE_URL', 'http://localhost/media/');

export const API_EVENT_RANKS = `${API_BASE_URL}top-team-ranks/`;
export const API_EVENTS = `${API_BASE_URL}events/`;
export const API_FEATURED_NEWS = `${API_BASE_URL}featured-news/`;
export const API_TESTIMONIALS = `${API_BASE_URL}testimonials/`;
export const API_INTERNATIONAL_OFFICES = `${API_BASE_URL}international-offices/`;
export const API_COMPETITIONS = `${API_BASE_URL}competitions/`;
export const API_BANNER_VIDEO = `${API_BASE_URL}banner-video/`;
export const API_NEWS_UPDATES = `${API_BASE_URL}news-updates/`;
export const API_FOOTER = `${API_BASE_URL}footer`;
// Add more endpoints as needed
