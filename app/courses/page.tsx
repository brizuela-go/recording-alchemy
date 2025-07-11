// app/courses/page.tsx - Optimized with real-time updates
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  PlayCircle,
  BookOpen,
  LogOut,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { ProgressIndicator } from "@/components/ui/courses/ProgressIndicator";
import { urlFor } from "@/sanity/lib/image";
import { LoadingSpinner } from "@/components/ui/courses/LoadingSpinner";
import { client, createLiveQuery } from "@/sanity/lib/client";

interface Chapter {
  _id: string;
  title: string;
  order: number;
  duration: number;
  isFree: boolean;
}

interface Course {
  _id: string;
  title: string;
  slug: { current: string };
  description?: unknown[];
  thumbnail?: unknown;
  chapters: Chapter[];
  difficulty: string;
  featured: boolean;
}

interface UserProgress {
  _id: string;
  chapterId: string;
  courseId: string;
  completed: boolean;
  watchTimeSeconds: number;
}

interface UserStats {
  totalCourses: number;
  completedCourses: number;
  totalChapters: number;
  completedChapters: number;
  totalWatchTime: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      router.push("/sign-in");
      return;
    }

    fetchData();
    setupRealtimeUpdates();
  }, [router]);

  // Set up real-time progress updates
  const setupRealtimeUpdates = () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    const progressQuery = `*[_type == "userProgress" && userEmail == $userEmail && completed == true]`;
    const subscription = createLiveQuery(progressQuery, {
      userEmail: userEmail.toLowerCase(),
    }).subscribe((update) => {
      if (update.result) {
        console.log("Real-time progress update received:", update.result);
        setProgress(Array.isArray(update.result) ? update.result : []);
        setLastUpdateTime(new Date());

        // Recalculate stats with new progress
        if (courses.length > 0) {
          calculateUserStats(
            courses,
            Array.isArray(update.result) ? update.result : []
          );
        }
      }
    });

    return () => subscription.unsubscribe();
  };

  const fetchData = async () => {
    try {
      // Fetch both courses and progress in parallel
      const [coursesData, progressData] = await Promise.all([
        fetchCourses(),
        fetchProgress(),
      ]);

      // Calculate stats after both are loaded
      if (coursesData && progressData) {
        calculateUserStats(coursesData, progressData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async (): Promise<Course[]> => {
    try {
      const data = await client.fetch(
        `
        *[_type == "course" && published == true] {
          _id,
          title,
          slug,
          description,
          thumbnail,
          difficulty,
          featured,
          "chapters": chapters[]->{ _id, title, order, duration, isFree }
        } | order(featured desc, _createdAt desc)
      `,
        {},
        {
          cache: "force-cache",
          next: {
            revalidate: 300, // 5 minutes cache for course data
            tags: ["courses", "course-data"],
          },
        }
      );
      setCourses(data);
      return data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  };

  const fetchProgress = async (): Promise<UserProgress[]> => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return [];

    try {
      const res = await fetch(`/api/progress?userEmail=${userEmail}`, {
        cache: "no-store", // Always get fresh progress
      });
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
        return data.progress;
      }
      return [];
    } catch (error) {
      console.error("Error fetching progress:", error);
      return [];
    }
  };

  const calculateUserStats = (
    coursesData: Course[],
    progressData: UserProgress[]
  ) => {
    // Total available courses
    const totalCourses = coursesData.length;

    // Total available chapters across all courses
    const totalChapters = coursesData.reduce(
      (acc, course) => acc + (course.chapters?.length || 0),
      0
    );

    // Completed chapters (from progress)
    const completedChapters = progressData.filter((p) => p.completed).length;

    // Completed courses (courses where all chapters are completed)
    const completedCourses = coursesData.filter((course) => {
      const courseChapters = course.chapters || [];
      if (courseChapters.length === 0) return false;

      const courseProgress = progressData.filter(
        (p) => p.courseId === course._id && p.completed
      );

      return courseProgress.length === courseChapters.length;
    }).length;

    // Total watch time in minutes
    const totalWatchTime = Math.round(
      progressData.reduce((acc, p) => acc + (p.watchTimeSeconds || 0), 0) / 60
    );

    const stats: UserStats = {
      totalCourses,
      completedCourses,
      totalChapters,
      completedChapters,
      totalWatchTime,
    };

    console.log("Calculated stats:", stats);
    console.log("Progress data:", progressData);

    setUserStats(stats);
  };

  const getCourseProgress = (courseId: string) => {
    const course = courses.find((c) => c._id === courseId);
    const courseProgress = progress.filter(
      (p) => p.courseId === courseId && p.completed
    );

    if (!course) {
      return {
        completed: 0,
        total: 0,
        percentage: 0,
      };
    }

    const totalChapters = course.chapters?.length || 0;
    const completedChapters = courseProgress.length;

    return {
      completed: completedChapters,
      total: totalChapters,
      percentage:
        totalChapters > 0
          ? Math.round((completedChapters / totalChapters) * 100)
          : 0,
    };
  };

  const handleSignOut = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    router.push("/sign-in");
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
          <p className="text-neutral-400 mt-4">Loading your courses...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-neutral-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/logo.png"
                alt="Recording Alchemy"
                width={200}
                height={48}
                className="h-8 w-auto"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-neutral-400">Welcome back,</p>
                  <p className="text-white font-medium">
                    {localStorage.getItem("userName") ||
                      localStorage.getItem("userEmail")}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="cursor-pointer flex items-center space-x-2 px-4 py-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800/50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Your Learning</span>
            <span className="text-white"> Journey</span>
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-lg max-w-2xl">
              Master the art of recording, mixing, and production with our
              comprehensive courses designed for every skill level.
            </p>
            <p className="text-xs text-neutral-500">
              Last updated: {lastUpdateTime.toLocaleTimeString()}
            </p>
          </div>
        </motion.div>

        {/* Stats Cards with real-time updates */}
        {userStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            {[
              {
                label: "Courses Available",
                value: userStats.totalCourses,
                icon: BookOpen,
                color: "text-blue-400",
              },
              {
                label: "Courses Completed",
                value: userStats.completedCourses,
                icon: Trophy,
                color: "text-[#ECC578]",
              },
              {
                label: "Chapters Completed",
                value: `${userStats.completedChapters}/${userStats.totalChapters}`,
                icon: TrendingUp,
                color: "text-green-400",
              },
              {
                label: "Content Watched",
                value: `${userStats.totalWatchTime}m`,
                icon: Clock,
                color: "text-purple-400",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-400 text-sm font-medium">
                        {stat.label}
                      </p>
                      <motion.p
                        className="text-2xl font-bold text-white mt-1"
                        key={stat.value} // Re-animate when value changes
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {stat.value}
                      </motion.p>
                    </div>
                    <div className={`p-3 rounded-lg bg-neutral-800/50`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Courses Grid with optimistic updates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-cinzel text-2xl font-bold text-white">
              Your Courses
            </h2>
            <div className="text-sm text-neutral-400">
              {courses.length} course{courses.length !== 1 ? "s" : ""} available
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {courses.map((course, index) => {
                const courseProgress = getCourseProgress(course._id);
                const totalDuration =
                  course.chapters?.reduce(
                    (acc, ch) => acc + (ch.duration || 0),
                    0
                  ) || 0;

                return (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link href={`/courses/${course.slug.current}`}>
                      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl overflow-hidden border border-neutral-800 hover:border-[#ECC578]/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
                        {/* Course Image */}
                        <div className="relative aspect-video overflow-hidden">
                          {course.thumbnail ? (
                            <Image
                              src={urlFor(course.thumbnail)
                                .width(600)
                                .height(337)
                                .url()}
                              alt={course.title}
                              width={600}
                              height={337}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                              <PlayCircle className="w-16 h-16 text-neutral-600" />
                            </div>
                          )}

                          {/* Featured Badge */}
                          {course.featured && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-gradient-to-r from-[#ECC578] to-[#A87740] text-black text-xs font-bold rounded-full">
                                FEATURED
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Course Content */}
                        <div className="p-6">
                          {/* Title & Difficulty */}
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#FBDDA3] transition-colors line-clamp-2">
                              {course.title}
                            </h3>
                            <span className="ml-2 px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full capitalize flex-shrink-0">
                              {course.difficulty}
                            </span>
                          </div>

                          {/* Description */}
                          {course.description &&
                            Array.isArray(course.description) &&
                            course.description.length > 0 && (
                              <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                                {Array.isArray(course.description)
                                  ? course.description
                                      .map((block) =>
                                        (
                                          block as {
                                            children?: { text?: string }[];
                                          }
                                        ).children
                                          ? (
                                              block as {
                                                children?: { text?: string }[];
                                              }
                                            ).children
                                            ? (
                                                block as {
                                                  children?: {
                                                    text?: string;
                                                  }[];
                                                }
                                              )
                                                .children!.map((child) =>
                                                  typeof child.text === "string"
                                                    ? child.text
                                                    : ""
                                                )
                                                .join(" ")
                                            : ""
                                          : ""
                                      )
                                      .join(" ")
                                  : ""}
                              </p>
                            )}

                          {/* Course Stats */}
                          <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <PlayCircle className="w-4 h-4" />
                                <span>
                                  {course.chapters?.length || 0} chapters
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{totalDuration}m</span>
                              </div>
                            </div>
                          </div>

                          {/* Progress Bar with animation */}
                          {courseProgress.total > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                                <span>Progress</span>
                                <motion.span
                                  key={courseProgress.percentage}
                                  initial={{ scale: 1.1 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {courseProgress.percentage}%
                                </motion.span>
                              </div>
                              <div className="w-full bg-neutral-800 rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${courseProgress.percentage}%`,
                                  }}
                                  transition={{
                                    duration: 1,
                                    delay: 0.5 + index * 0.1,
                                  }}
                                  className="bg-gradient-to-r from-[#ECC578] to-[#A87740] h-2 rounded-full"
                                />
                              </div>
                            </div>
                          )}

                          {/* Status */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {courseProgress.percentage === 100 ? (
                                <>
                                  <ProgressIndicator
                                    status="completed"
                                    size="sm"
                                  />
                                  <span className="text-[#ECC578] text-sm font-medium">
                                    Completed
                                  </span>
                                </>
                              ) : courseProgress.completed > 0 ? (
                                <>
                                  <ProgressIndicator
                                    status="completed"
                                    size="sm"
                                  />
                                  <span className="text-[#FBDDA3] text-sm font-medium">
                                    In Progress
                                  </span>
                                </>
                              ) : (
                                <>
                                  <ProgressIndicator
                                    status="not-started"
                                    size="sm"
                                  />
                                  <span className="text-neutral-500 text-sm font-medium font-poppins">
                                    Start Course
                                  </span>
                                </>
                              )}
                            </div>

                            {courseProgress.total > 0 && (
                              <motion.span
                                className="text-xs text-neutral-500"
                                key={`${courseProgress.completed}-${courseProgress.total}`}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {courseProgress.completed}/
                                {courseProgress.total} chapters
                              </motion.span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {courses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No courses available
              </h3>
              <p className="text-neutral-400">
                Check back later for new content.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
