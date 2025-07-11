// app/api/progress/route.ts - Optimized with cache invalidation
import { client } from "@/sanity/lib/client";
import { mutationClient } from "@/sanity/lib/mutationClient";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface UserProgress {
  _id: string;
  userEmail: string;
  chapterId: string;
  chapterTitle: string;
  courseId: string;
  courseTitle: string;
  completed: boolean;
  watchTimeSeconds: number;
  completedAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userEmail,
      chapterId,
      chapterTitle,
      courseId,
      courseTitle,
      chapterDuration = 0,
    } = body;

    // Validate required fields
    if (
      !userEmail ||
      !chapterId ||
      !chapterTitle ||
      !courseId ||
      !courseTitle
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const normalizedEmail = userEmail.toLowerCase();
    const now = new Date().toISOString();

    // Check if progress already exists
    const existingProgress: UserProgress | null = await client.fetch(
      `*[_type == "userProgress" && userEmail == $userEmail && chapterId == $chapterId][0]`,
      { userEmail: normalizedEmail, chapterId },
      {
        cache: "no-store", // Don't cache this check
      }
    );

    let result;

    if (existingProgress) {
      // If already completed, no need to update
      if (existingProgress.completed) {
        return NextResponse.json({
          success: true,
          progress: existingProgress,
          message: "Already completed",
        });
      }

      // Mark as completed
      result = await mutationClient
        .patch(existingProgress._id)
        .set({
          completed: true,
          completedAt: now,
          watchTimeSeconds: chapterDuration * 60, // Convert minutes to seconds
        })
        .commit();
    } else {
      // Create new completed progress record
      result = await mutationClient.create({
        _type: "userProgress",
        userEmail: normalizedEmail,
        chapterId,
        chapterTitle,
        courseId,
        courseTitle,
        completed: true,
        watchTimeSeconds: chapterDuration * 60, // Convert minutes to seconds
        completedAt: now,
      });
    }

    // CRITICAL: Invalidate relevant caches immediately
    const tagsToRevalidate = [
      `progress-${normalizedEmail}`, // User's progress
      `progress-${normalizedEmail}-${courseId}`, // Course progress
      `progress-${normalizedEmail}-${chapterId}`, // Chapter progress
      `course-stats-${courseId}`, // Course statistics
      `user-stats-${normalizedEmail}`, // User statistics
    ];

    // Revalidate all related cache tags
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag);
    }

    console.log(
      `Progress updated and cache invalidated for: ${normalizedEmail}, chapter: ${chapterId}`
    );

    return NextResponse.json({
      success: true,
      progress: result,
      revalidatedTags: tagsToRevalidate, // For debugging
    });
  } catch (error) {
    console.error("Progress tracking error:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = userEmail.toLowerCase();

    // Get all completed progress for user with cache tags
    const progress: UserProgress[] = await client.fetch(
      `*[_type == "userProgress" && userEmail == $userEmail && completed == true] | order(completedAt desc)`,
      { userEmail: normalizedEmail },
      {
        cache: "force-cache",
        next: {
          revalidate: 30, // Cache for 30 seconds
          tags: [`progress-${normalizedEmail}`], // Cache tag for invalidation
        },
      }
    );

    // Calculate stats
    const stats = {
      totalChapters: progress.length,
      completedChapters: progress.length, // All fetched records are completed
      totalWatchTime: Math.round(
        progress.reduce((acc, p) => acc + (p.watchTimeSeconds || 0), 0) / 60
      ), // Convert to minutes
    };

    return NextResponse.json({
      progress,
      stats,
    });
  } catch (error) {
    console.error("Get progress error:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
