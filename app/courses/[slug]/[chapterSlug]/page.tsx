// Updated Chapter Page with Secure YouTube Player
// app/courses/[courseSlug]/[chapterSlug]/page.tsx - Updated with secure YouTube player
"use client";

import { useEffect, useState, useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Menu,
  X,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Play,
} from "lucide-react";
import { client, createLiveQuery } from "@/sanity/lib/client";
import { CompletionAnimation } from "@/components/ui/courses/CompletionAnimation";
import { ProgressIndicator } from "@/components/ui/courses/ProgressIndicator";
import { RichText } from "@/components/sanity/RichText";
import { LoadingSpinner } from "@/components/ui/courses/LoadingSpinner";
import { VideoPlayer } from "@/components/ui/courses/VideoPlayer";
import { use } from "react";
import { SecureYouTubePlayer } from "@/components/ui/courses/SecureYoutubePlayer";
import { TypedObject } from "@portabletext/types";

interface Chapter {
  _id: string;
  title: string;
  slug: { current: string };
  description?: unknown[];
  videoUrl?: string;
  youtubeUrl?: string;
  videoFile?: {
    asset?: {
      playbackId: string;
      thumbTime?: number;
      assetId?: string;
    };
  };
  videoType: "url" | "upload" | "youtube";
  duration?: number;
  order: number;
}

interface Course {
  _id: string;
  title: string;
  slug: { current: string };
  chapters: Chapter[];
}

interface UserProgress {
  _id: string;
  chapterId: string;
  completed: boolean;
  watchTimeSeconds: number;
}

export default function ChapterPage({
  params,
}: {
  params: Promise<{ courseSlug: string; chapterSlug: string }>;
}) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { courseSlug, chapterSlug } = use(params);

  // Optimistic progress updates - instant UI feedback
  const [optimisticProgress, addOptimisticProgress] = useOptimistic(
    progress,
    (
      state: UserProgress[],
      optimisticValue: { chapterId: string; completed: boolean }
    ) => {
      const existingIndex = state.findIndex(
        (p) => p.chapterId === optimisticValue.chapterId
      );

      if (existingIndex >= 0) {
        const updated = [...state];
        updated[existingIndex] = {
          ...updated[existingIndex],
          completed: optimisticValue.completed,
        };
        return updated;
      } else {
        return [
          ...state,
          {
            _id: `optimistic-${optimisticValue.chapterId}`,
            chapterId: optimisticValue.chapterId,
            completed: optimisticValue.completed,
            watchTimeSeconds: 0,
          } as UserProgress,
        ];
      }
    }
  );

  // Get current chapter's progress from optimistic state
  const currentProgress = chapter
    ? optimisticProgress.find((p) => p.chapterId === chapter._id)
    : null;
  const hasCompleted = !!currentProgress?.completed;

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      router.push("/sign-in");
      return;
    }

    fetchData();
  }, [courseSlug, chapterSlug, router]);

  // Set up real-time progress updates
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    const progressQuery = `*[_type == "userProgress" && userEmail == $userEmail && completed == true]`;
    const subscription = createLiveQuery(progressQuery, {
      userEmail: userEmail.toLowerCase(),
    }).subscribe((update) => {
      if (update.result) {
        console.log("Real-time progress update received:", update.result);
        setProgress(Array.isArray(update.result) ? update.result : []);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchChapter(), fetchProgress()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChapter = async () => {
    try {
      const data = await client.fetch(
        `
        *[_type == "chapter" && slug.current == $chapterSlug][0] {
          _id,
          title,
          slug,
          description,
          videoUrl,
          youtubeUrl,
          videoFile {
            asset-> {
              playbackId,
              thumbTime,
              assetId
            }
          },
          videoType,
          duration,
          order,
          "course": *[_type == "course" && references(^._id) && published == true][0] {
            _id,
            title,
            slug,
            "chapters": chapters[]->{
              _id,
              title,
              slug,
              order,
              duration
            } | order(order asc)
          }
        }
      `,
        { chapterSlug: chapterSlug },
        {
          cache: "force-cache",
          next: {
            revalidate: 300,
            tags: [`chapter-${chapterSlug}`, `course-data`],
          },
        }
      );

      if (data && data.course) {
        setChapter(data);
        setCourse(data.course);
      }
    } catch (error) {
      console.error("Error fetching chapter:", error);
    }
  };

  const fetchProgress = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    try {
      const res = await fetch(`/api/progress?userEmail=${userEmail}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const markAsCompleted = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail || !chapter || !course || hasCompleted) {
      return;
    }

    startTransition(() => {
      addOptimisticProgress({
        chapterId: chapter._id,
        completed: true,
      });
    });

    setShowCompletion(true);

    startTransition(async () => {
      try {
        const response = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail,
            chapterId: chapter._id,
            chapterTitle: chapter.title,
            courseId: course._id,
            courseTitle: course.title,
            chapterDuration: chapter.duration || 0,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to mark as completed");
        }

        const result = await response.json();
        console.log("Progress updated successfully:", result);
        await fetchProgress();
      } catch (error) {
        console.error("Error marking as completed:", error);
        await fetchProgress();
        setShowCompletion(false);
      }
    });
  };

  const getChapterStatus = (chapterId: string): "not-started" | "completed" => {
    const chapterProgress = optimisticProgress.find(
      (p) => p.chapterId === chapterId
    );
    return chapterProgress?.completed ? "completed" : "not-started";
  };

  const getNextChapter = (): Chapter | null => {
    if (!course || !chapter) return null;
    const currentIndex = course.chapters.findIndex(
      (c) => c._id === chapter._id
    );
    return course.chapters[currentIndex + 1] || null;
  };

  const getPrevChapter = (): Chapter | null => {
    if (!course || !chapter) return null;
    const currentIndex = course.chapters.findIndex(
      (c) => c._id === chapter._id
    );
    return course.chapters[currentIndex - 1] || null;
  };

  // Render secure video player based on video type
  const renderVideoPlayer = () => {
    if (!chapter) return null;

    const commonClasses = "w-full h-full rounded-lg";

    switch (chapter.videoType) {
      case "youtube":
        if (!chapter.youtubeUrl) {
          return (
            <div
              className={`bg-neutral-800 flex items-center justify-center ${commonClasses}`}
            >
              <div className="text-center">
                <Play className="w-12 h-12 text-neutral-600 mx-auto mb-2" />
                <p className="text-neutral-400">No video URL provided</p>
              </div>
            </div>
          );
        }
        return (
          <SecureYouTubePlayer
            url={chapter.youtubeUrl}
            title={chapter.title}
            className={commonClasses}
          />
        );

      case "upload":
      case "url":
      default:
        return (
          <VideoPlayer
            videoType={chapter.videoType}
            videoFile={chapter.videoFile}
            videoUrl={chapter.videoUrl}
            chapterTitle={chapter.title}
            onLoadedData={() => console.log("Video loaded successfully")}
            onError={(error) => console.error("Video error:", error)}
            className={commonClasses}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <LoadingSpinner size="lg" />
          <p className="text-neutral-400 mt-4">Loading chapter...</p>
        </motion.div>
      </div>
    );
  }

  if (!chapter || !course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Chapter Not Found
          </h1>
          <Link href="/courses" className="text-[#FBDDA3] hover:underline">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const nextChapter = getNextChapter();
  const prevChapter = getPrevChapter();
  const currentIndex = course.chapters.findIndex((c) => c._id === chapter._id);

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header - REMOVED YouTube indicator */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-neutral-800 bg-black/90 backdrop-blur-sm z-30"
          >
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href={`/courses/${course.slug.current}`}
                  className="flex items-center space-x-2 text-[#FBDDA3] hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="hidden sm:inline">{course.title}</span>
                </Link>

                <div className="h-6 w-px bg-neutral-700" />

                <div>
                  <h1 className="font-semibold text-white">{chapter.title}</h1>
                  <p className="text-sm text-neutral-400">
                    Chapter {currentIndex + 1} of {course.chapters.length}
                    {/* REMOVED YouTube indicator */}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {hasCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center space-x-2 text-[#ECC578]"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:inline">
                      Completed
                    </span>
                  </motion.div>
                )}

                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                >
                  {sidebarOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </motion.header>

          {/* Video Player */}
          <div className="flex-1 bg-black flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-6xl"
            >
              <div className="relative aspect-video">{renderVideoPlayer()}</div>
            </motion.div>
          </div>

          {/* Chapter Description & Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-neutral-800 bg-gradient-to-r from-neutral-950 to-black p-6"
          >
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h2 className="font-cinzel text-2xl font-bold text-white mb-3">
                  {chapter.title}
                </h2>
                {chapter.description &&
                  Array.isArray(chapter.description) &&
                  chapter.description.length > 0 && (
                    <div className="text-neutral-300">
                      <RichText
                        content={chapter.description as TypedObject[]}
                      />
                    </div>
                  )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  {prevChapter && (
                    <Link
                      href={`/courses/${course.slug.current}/${prevChapter.slug.current}`}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex font-poppins items-center space-x-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </motion.button>
                    </Link>
                  )}

                  {!hasCompleted && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={markAsCompleted}
                      disabled={isPending}
                      className="px-4 py-2 bg-[#ECC578] hover:bg-[#D4B366] disabled:bg-neutral-600 disabled:cursor-not-allowed text-black font-medium rounded-lg transition-colors font-poppins"
                    >
                      {isPending ? "Updating..." : "Mark as Completed"}
                    </motion.button>
                  )}
                </div>

                {nextChapter && (
                  <Link
                    href={`/courses/${course.slug.current}/${nextChapter.slug.current}`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#FBDDA3] via-[#E3B887] to-[#A87740] text-black font-bold rounded-lg"
                    >
                      <span>Next Chapter</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || isLargeScreen) && (
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed lg:static inset-y-0 right-0 w-80 bg-gradient-to-b from-neutral-900 to-neutral-950 border-l border-neutral-800 z-40 lg:z-auto"
            >
              <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-6 h-6 text-[#FBDDA3]" />
                    <div>
                      <h3 className="font-bold text-white">{course.title}</h3>
                      <p className="text-sm text-neutral-400">
                        {course.chapters.length} chapters
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {course.chapters.map((ch, index) => {
                    const status = getChapterStatus(ch._id);
                    const isActive = ch._id === chapter._id;

                    return (
                      <motion.div
                        key={ch._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={`/courses/${course.slug.current}/${ch.slug.current}`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <div
                            className={`p-4 rounded-lg border transition-all duration-300 ${
                              isActive
                                ? "bg-[#ECC578]/10 border-[#ECC578] text-white"
                                : "bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-800/70"
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isActive
                                    ? "bg-[#ECC578] text-black"
                                    : "bg-neutral-700 text-neutral-400"
                                }`}
                              >
                                {index + 1}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`font-medium text-sm leading-tight mb-1 ${
                                    isActive ? "text-white" : "text-neutral-200"
                                  }`}
                                >
                                  {ch.title}
                                </h4>

                                <div
                                  className={`flex items-center justify-between text-xs ${
                                    isActive
                                      ? "text-neutral-300"
                                      : "text-neutral-500"
                                  }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-3 h-3" />
                                    <span>{ch.duration}m</span>
                                  </div>

                                  <ProgressIndicator
                                    status={status}
                                    size="sm"
                                    animated={false}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
        )}
      </div>

      <CompletionAnimation
        show={showCompletion}
        chapterTitle={chapter.title}
        onComplete={() => setShowCompletion(false)}
      />
    </>
  );
}
