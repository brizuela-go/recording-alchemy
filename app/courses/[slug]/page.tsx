// app/courses/[slug]/page.tsx - Simplified Course Detail Page
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  PlayCircle,
  BookOpen,
  Award,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { LoadingSpinner } from "@/components/ui/courses/LoadingSpinner";
import { RichText } from "@/components/sanity/RichText";
import { ProgressIndicator } from "@/components/ui/courses/ProgressIndicator";
import { use } from "react";
import { PortableTextBlock } from "sanity";

interface Chapter {
  _id: string;
  title: string;
  slug: { current: string };
  description?: PortableTextBlock[];
  duration?: number;
  order: number;
  isFree: boolean;
  thumbnail?: string;
}

interface Course {
  _id: string;
  title: string;
  slug: { current: string };
  description?: PortableTextBlock[];
  thumbnail?: string;
  chapters: Chapter[];
  difficulty: string;
  featured: boolean;
}

interface UserProgress {
  _id: string;
  chapterId: string;
  completed: boolean;
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { slug } = use(params);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      router.push("/sign-in");
      return;
    }

    Promise.all([fetchCourse(), fetchProgress()]).finally(() => {
      setLoading(false);
    });
  }, [slug, router]);

  const fetchCourse = async () => {
    try {
      const data = await client.fetch(
        `
        *[_type == "course" && slug.current == $slug && published == true][0] {
          _id,
          title,
          slug,
          description,
          thumbnail,
          difficulty,
          featured,
          "chapters": chapters[]->{
            _id,
            title,
            slug,
            description,
            duration,
            order,
            isFree,
            thumbnail
          } | order(order asc)
        }
      `,
        { slug: slug }
      );

      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchProgress = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    try {
      const res = await fetch(`/api/progress?userEmail=${userEmail}`);
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const getChapterStatus = (chapterId: string): "not-started" | "completed" => {
    const chapterProgress = progress.find((p) => p.chapterId === chapterId);
    return chapterProgress?.completed ? "completed" : "not-started";
  };

  const getCourseStats = () => {
    if (!course)
      return {
        totalChapters: 0,
        completedChapters: 0,
        totalDuration: 0,
        percentage: 0,
      };

    const totalChapters = course.chapters.length;
    const completedChapters = course.chapters.filter(
      (ch) => getChapterStatus(ch._id) === "completed"
    ).length;
    const totalDuration = course.chapters.reduce(
      (acc, ch) => acc + (ch.duration || 0),
      0
    );
    const percentage =
      totalChapters > 0
        ? Math.round((completedChapters / totalChapters) * 100)
        : 0;

    return { totalChapters, completedChapters, totalDuration, percentage };
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
          <p className="text-neutral-400 mt-4">Loading course...</p>
        </motion.div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Course Not Found
          </h1>
          <Link href="/courses" className="text-[#FBDDA3] hover:underline">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const stats = getCourseStats();
  const nextChapter = course.chapters.find(
    (ch) => getChapterStatus(ch._id) !== "completed"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-neutral-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Link
              href="/courses"
              className="flex items-center space-x-2 text-[#FBDDA3] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Courses</span>
            </Link>
            <div className="h-6 w-px bg-neutral-700" />
            <h1 className="font-medium text-white truncate">{course.title}</h1>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12"
        >
          {/* Course Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden">
            {course.thumbnail ? (
              <Image
                src={urlFor(course.thumbnail).width(800).height(450).url()}
                alt={course.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                <PlayCircle className="w-24 h-24 text-neutral-600" />
              </div>
            )}

            {course.featured && (
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-gradient-to-r from-[#ECC578] to-[#A87740] text-black font-bold rounded-full">
                  FEATURED COURSE
                </span>
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full capitalize">
                  {course.difficulty}
                </span>
                {stats.percentage === 100 && (
                  <span className="flex items-center space-x-1 px-3 py-1 bg-[#ECC578]/20 text-[#ECC578] text-sm rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed</span>
                  </span>
                )}
              </div>

              <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">{course.title}</span>
              </h1>

              {course.description && (
                <div className="text-neutral-300">
                  <RichText content={course.description} />
                </div>
              )}
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Chapters",
                  value: stats.totalChapters,
                  icon: BookOpen,
                  color: "text-blue-400",
                },
                {
                  label: "Total Duration",
                  value: `${stats.totalDuration}m`,
                  icon: Clock,
                  color: "text-green-400",
                },
                {
                  label: "Completed",
                  value: `${stats.completedChapters}/${stats.totalChapters}`,
                  icon: Award,
                  color: "text-[#ECC578]",
                },
                {
                  label: "Progress",
                  value: `${stats.percentage}%`,
                  icon: TrendingUp,
                  color: "text-purple-400",
                },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-4 rounded-lg border border-neutral-800"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                      <div>
                        <p className="text-neutral-400 text-sm">{stat.label}</p>
                        <p className="text-white font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            {stats.totalChapters > 0 && (
              <div>
                <div className="flex items-center justify-between text-sm text-neutral-400 mb-2">
                  <span>Course Progress</span>
                  <span>{stats.percentage}%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-gradient-to-r from-[#ECC578] to-[#A87740] h-3 rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Action Button */}
            {nextChapter && (
              <Link
                href={`/courses/${course.slug.current}/${nextChapter.slug.current}`}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#FBDDA3] via-[#E3B887] to-[#A87740] text-black font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <span className="flex items-center justify-center space-x-2 font-poppins">
                    <PlayCircle className="w-5 h-5" />
                    <span>
                      {stats.percentage === 0
                        ? "Start Course"
                        : "Continue Learning"}
                    </span>
                  </span>
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Chapter List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-cinzel text-2xl font-bold text-white mb-6">
            Course Content
          </h2>

          <div className="space-y-3">
            <AnimatePresence>
              {course.chapters.map((chapter, index) => {
                const status = getChapterStatus(chapter._id);

                return (
                  <motion.div
                    key={chapter._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      href={`/courses/${course.slug.current}/${chapter.slug.current}`}
                    >
                      <div className="group bg-gradient-to-r from-neutral-900 to-neutral-950 p-6 rounded-lg border border-neutral-800 hover:border-[#ECC578]/50 transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          {/* Chapter Number */}
                          <div className="flex-shrink-0 w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-[#ECC578]/20 transition-colors">
                            <span className="text-sm font-bold text-neutral-400 group-hover:text-[#ECC578]">
                              {index + 1}
                            </span>
                          </div>

                          {/* Chapter Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-white group-hover:text-[#FBDDA3] transition-colors mb-1">
                                  {chapter.title}
                                </h3>
                                {chapter.description &&
                                  chapter.description.length > 0 && (
                                    <p className="text-neutral-400 text-sm line-clamp-2">
                                      {Array.isArray(chapter.description) &&
                                      Array.isArray(
                                        chapter.description[0]?.children
                                      ) &&
                                      typeof chapter.description[0].children[0]
                                        ?.text === "string"
                                        ? chapter.description[0].children[0]
                                            .text
                                        : ""}
                                    </p>
                                  )}
                              </div>

                              <div className="flex items-center space-x-4 ml-4">
                                {/* Duration */}
                                <div className="flex items-center space-x-1 text-neutral-500 text-sm">
                                  <Clock className="w-4 h-4" />
                                  <span>{chapter.duration}m</span>
                                </div>

                                {/* Free badge */}
                                {chapter.isFree && (
                                  <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded">
                                    FREE
                                  </span>
                                )}

                                {/* Progress Indicator */}
                                <ProgressIndicator status={status} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
