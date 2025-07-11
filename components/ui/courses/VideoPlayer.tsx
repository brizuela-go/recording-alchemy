// components/ui/courses/VideoPlayer.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FBDDA3] mx-auto mb-2"></div>
        <p className="text-neutral-400 text-sm">Loading player...</p>
      </div>
    </div>
  ),
});

interface VideoPlayerProps {
  videoType: "upload" | "url";
  videoFile?: {
    asset?: {
      playbackId: string;
      thumbTime?: number;
      assetId?: string;
    };
  };
  videoUrl?: string;
  chapterTitle: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onLoadedData?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export function VideoPlayer({
  videoType,
  videoFile,
  videoUrl,
  chapterTitle,
  onTimeUpdate,
  onLoadedData,
  onError,
  className = "",
}: VideoPlayerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Validate video source - updated to handle nested asset structure
  const playbackId = videoFile?.asset?.playbackId;
  const hasValidSource = videoType === "upload" ? !!playbackId : !!videoUrl;

  useEffect(() => {
    if (!hasValidSource) {
      const errorMsg = `No valid ${
        videoType === "upload" ? "playback ID" : "video URL"
      } found`;
      setError(errorMsg);
      onError?.(errorMsg);
      setIsLoading(false);
    }
  }, [hasValidSource, videoType, onError]);

  const handleTimeUpdate = () => {
    if (videoRef.current && onTimeUpdate) {
      const { currentTime, duration } = videoRef.current;
      if (duration && !isNaN(duration)) {
        onTimeUpdate(currentTime, duration);
      }
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    setError(null);
    onLoadedData?.();
  };

  const handleError = (errorMsg: string) => {
    setError(errorMsg);
    setIsLoading(false);
    onError?.(errorMsg);
  };

  // Debug logging for development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("VideoPlayer Debug:", {
        videoType,
        videoFile,
        videoUrl,
        playbackId,
        hasValidSource,
      });
    }
  }, [videoType, videoFile, videoUrl, playbackId, hasValidSource]);

  if (!hasValidSource || error) {
    return (
      <div className={`bg-neutral-900 rounded-lg overflow-hidden ${className}`}>
        <div className="w-full h-full flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Video Unavailable
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
              {error || "This video content is currently unavailable."}
            </p>
            <div className="text-xs text-neutral-500 space-y-1">
              <div>Video Type: {videoType}</div>
              {videoType === "upload" ? (
                <div>Expected MUX playback ID, got: {playbackId || "none"}</div>
              ) : (
                <div>Expected video URL, got: {videoUrl || "none"}</div>
              )}
              {process.env.NODE_ENV === "development" && (
                <details className="mt-2 text-left">
                  <summary className="cursor-pointer text-neutral-400">
                    Debug Info
                  </summary>
                  <pre className="mt-1 text-xs overflow-auto">
                    {JSON.stringify({ videoFile, videoUrl }, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Render MUX Player for uploaded videos
  if (videoType === "upload" && playbackId) {
    return (
      <div className={`bg-neutral-900 rounded-lg overflow-hidden ${className}`}>
        <div className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FBDDA3] mx-auto mb-2"></div>
                <p className="text-neutral-400 text-sm">Loading video...</p>
              </div>
            </div>
          )}

          <MuxPlayer
            playbackId={playbackId}
            metadata={{
              video_title: chapterTitle,
              video_id: playbackId,
            }}
            accentColor="#FBDDA3"
            onLoadedData={handleLoadedData}
            onError={() => handleError("Failed to load MUX video")}
            onTimeUpdate={handleTimeUpdate}
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: "16/9",
            }}
          />
        </div>
      </div>
    );
  }

  // Render HTML5 video for URL videos
  if (videoType === "url" && videoUrl) {
    return (
      <div className={`bg-neutral-900 rounded-lg overflow-hidden ${className}`}>
        <div className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FBDDA3] mx-auto mb-2"></div>
                <p className="text-neutral-400 text-sm">Loading video...</p>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="w-full h-full"
            style={{ aspectRatio: "16/9" }}
            onLoadedData={handleLoadedData}
            onError={() => handleError("Failed to load video from URL")}
            onTimeUpdate={handleTimeUpdate}
            preload="metadata"
          >
            <source src={videoUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }

  return null;
}
