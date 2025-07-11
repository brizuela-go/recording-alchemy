// sanity/lib/client.ts - Optimized client with Live Content API
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // CRITICAL: Set to false for real-time updates
  perspective: "published",
});

// Real-time client for live updates
export const liveClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Never use CDN for live updates
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN, // Add read token for live updates
});

// Helper function to create live queries
export function createLiveQuery<T = any>(
  query: string,
  params?: Record<string, any>
) {
  return liveClient.listen(query, params);
}

// Fetch with automatic cache tagging
export async function sanityFetch<T = any>({
  query,
  params = {},
  revalidate = 60, // 1 minute default
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  const result = await client.fetch(query, params, {
    cache: revalidate === false ? "no-store" : "force-cache",
    next: {
      revalidate,
      tags,
    },
  });

  return result;
}
