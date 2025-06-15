"use client";
import React, { useEffect, useState } from "react";
import { API_BANNER_VIDEO } from '../api';
const BannerVideo = () => {
  const [videoUrl, setVideoUrl] = useState<string| null>(null);
   const [isVertical, setIsVertical] = useState<boolean>(false);
  
  const fetchVideo = async () => {
    try {
      const response = await fetch(API_BANNER_VIDEO);
      console.log(response)
      const data = await response.json();
      console.log(data);
      const relativePath = data[0]?.banner_video;

        // Prepend the base URL to the relative path
      // Using NEXT_PUBLIC_MEDIA_BASE_URL as the base for media files
      const baseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || '';
      const fullUrl = `${baseUrl}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
      

      console.log("Banner video URL:", fullUrl);
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
