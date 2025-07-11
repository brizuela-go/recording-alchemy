// sanity/lib/mutationClient.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

if (!process.env.SANITY_API_WRITE_TOKEN) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN environment variable. " +
      "Please add this to your .env.local file with a token that has " +
      "'Editor' or 'Administrator' permissions in your Sanity project."
  );
}

export const mutationClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Essential for mutations - never use CDN for writes
  token: process.env.SANITY_API_WRITE_TOKEN,
  perspective: "published", // Ensure we're working with published content
});

// Test function to verify permissions (optional - call this in development)
export async function testMutationPermissions() {
  try {
    // Try to create a test document
    const testDoc = await mutationClient.create({
      _type: "test",
      title: "Permission test",
    });

    // Try to update it
    await mutationClient
      .patch(testDoc._id)
      .set({ title: "Updated test" })
      .commit();

    // Try to delete it
    await mutationClient.delete(testDoc._id);

    console.log("✅ All mutation permissions working correctly");
    return true;
  } catch (error) {
    console.error("❌ Mutation permissions test failed:", error);
    return false;
  }
}

// Export a function to check if the client is properly configured
export function validateMutationClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    return {
      isValid: false,
      error: "Missing SANITY_API_WRITE_TOKEN environment variable",
    };
  }

  if (!projectId || !dataset) {
    return {
      isValid: false,
      error: "Missing Sanity project configuration (projectId or dataset)",
    };
  }

  return {
    isValid: true,
    error: null,
  };
}
