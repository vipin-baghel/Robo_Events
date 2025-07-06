"use client";
import React, { useEffect, useState } from "react";
import { API_BANNER_VIDEO, MEDIA_BASE_URL } from '../api';
const BannerVideo = () => {
  const [videoUrl, setVideoUrl] = useState<string| null>(null);
   const [isVertical, setIsVertical] = useState<boolean>(false);
  
  const fetchVideo = async () => {
    try {
      const response = await fetch(API_BANNER_VIDEO);
      if (!response.ok) {
        throw new Error(`Failed to fetch banner video data: ${response.status}`);
      }
      
      const data = await response.json();
      const relativePath = data[0]?.banner_video;
      
      if (!relativePath) {
        throw new Error('No banner video path found in the response');
      }

      // Get the media base URL from our runtime configuration
      const baseUrl = MEDIA_BASE_URL;
      console.log('Media base URL from config:', baseUrl);
      
      // Ensure the base URL ends with a slash and the relative path doesn't start with one
      const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const normalizedPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
      const fullUrl = `${normalizedBaseUrl}${normalizedPath}`;
      
      console.log('Constructed banner video URL:', {
        baseUrl,
        relativePath,
        normalizedBaseUrl,
        normalizedPath,
        fullUrl
      });
      
      setVideoUrl(fullUrl);
      if (fullUrl && (fullUrl.includes("vertical") || fullUrl.includes("portrait"))) {
        setIsVertical(true);
      }
    } catch (error) {
      console.error("Error while loading video", error);
    }
  };
  useEffect(() => {
    fetchVideo();
  }, []);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
  if (videoRef.current) {
    videoRef.current.play().catch((e) => {
      console.warn("Autoplay prevented", e);
    });
  }
}, [videoUrl]);

  return (
    <div className="overflow-x-hidden">
      {videoUrl ? (
        videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
          
          <iframe
             className={`${
              isVertical ? "aspect-[9/16] w-[360px]" : "aspect-video w-full"
            } max-w-full`}
            src={`${videoUrl.replace("watch?v=", "embed/")
                          .replace("youtu.be/", "youtube.com/embed/")}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className={`${
              isVertical ? "aspect-[9/16] w-[360px]" : "aspect-video w-full"
            } max-w-full`}
            autoPlay
            loop
            muted
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      ) : null}
    </div>
  );
};

export default BannerVideo;
