// components/ui/courses/SecureYouTubePlayer.tsx - Updated with better error handling
"use client";

import { useRef, useState } from "react";
import { RefreshCw, Play, AlertCircle } from "lucide-react";

interface SecureYouTubePlayerProps {
  url: string;
  title: string;
  className?: string;
}

export const SecureYouTubePlayer = ({
  url,
  title,
  className = "",
}: SecureYouTubePlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Extract YouTube video ID from URL with better regex
  const getYouTubeId = (url: string): string | null => {
    // Support multiple YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = getYouTubeId(url);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  // Handle iframe errors
  const handleIframeError = () => {
    console.error("YouTube iframe failed to load");
    setHasError(true);
    setIsLoaded(true);
  };

  // Retry loading the video
  const retryLoad = () => {
    setRetryCount((prev) => prev + 1);
    setIsLoaded(false);
    setHasError(false);

    // Force iframe reload
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = "";
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 100);
    }
  };

  // Disable right-click context menu on the video area
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  if (!videoId) {
    return (
      <div
        className={`bg-neutral-800 flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
          <p className="text-neutral-400">Invalid video URL format</p>
          <p className="text-neutral-500 text-sm mt-1">
            Please check the YouTube URL
          </p>
        </div>
      </div>
    );
  }

  // Create embed URL with less restrictive parameters for better compatibility
  const embedUrl =
    `https://www.youtube-nocookie.com/embed/${videoId}?` +
    new URLSearchParams({
      rel: "0", // Don't show related videos
      modestbranding: "1", // Minimal YouTube branding
      autoplay: "0", // Don't autoplay
      fs: "1", // Allow fullscreen
      playsinline: "1", // Play inline on mobile
      origin: typeof window !== "undefined" ? window.location.origin : "",
      // Removed some parameters that might cause issues
    }).toString() +
    `&retry=${retryCount}`;

  return (
    <div
      className={`relative ${className}`}
      onContextMenu={handleContextMenu}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {/* Loading overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-[#ECC578] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-neutral-400 text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center z-10">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Video Unavailable</h3>
            <p className="text-neutral-400 text-sm mb-4 max-w-sm">
              This video might be private, deleted, or temporarily unavailable.
            </p>
            <button
              onClick={retryLoad}
              className="flex items-center space-x-2 px-4 py-2 bg-[#ECC578] hover:bg-[#D4B366] text-black font-medium rounded-lg transition-colors mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* YouTube iframe */}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        className={`w-full h-full border-0 ${className}`}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{
          backgroundColor: "#000",
          pointerEvents: "auto",
        }}
      />

      {/* Overlay to reduce YouTube branding visibility */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle overlay to hide potential YouTube watermarks */}
        <div className="absolute top-0 right-0 w-16 h-6 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Custom overlay to prevent developer tools inspection on video area */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: "transparent",
          zIndex: 1,
        }}
        onContextMenu={handleContextMenu}
      />
    </div>
  );
};

// Alternative fallback player for when YouTube is completely blocked
export const YouTubeFallback = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`bg-neutral-800 flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <Play className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm max-w-sm">
          Video content is temporarily unavailable. Please try again later or
          contact support.
        </p>
      </div>
    </div>
  );
};
