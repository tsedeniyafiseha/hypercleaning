import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Simplified Prisma client for Next.js compatibility
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

// Store in global to prevent multiple instances in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Enhanced query with retry logic
export async function prismaQueryWithRetry<T>(
  queryFn: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> {
  try {
    return await queryFn();
  } catch (error: any) {
    // Check if it's a connection error
    const isConnectionError =
      error?.code === "P1001" || // Can't reach database server
      error?.code === "P1002" || // Connection timeout
      error?.code === "P1003" || // Database does not exist
      error?.code === "P1017" || // Server has closed the connection
      error?.message?.includes("connect") ||
      error?.message?.includes("timeout") ||
      error?.message?.includes("ECONNREFUSED") ||
      error?.message?.includes("ENOTFOUND");

    if (isConnectionError && retries > 0) {
      logger.warn(`Database connection error, retrying... (${retries} attempts left)`, {
        error: error.message,
        code: error.code,
      });

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));

      // Test connection before retrying
      const isConnected = await testConnection();
      if (isConnected) {
        return await queryFn(); // Retry the query
      }

      // If still not connected, try again
      return prismaQueryWithRetry(queryFn, retries - 1);
    }

    // Not a connection error or out of retries
    throw error;
  }
}

// Export connection test utility
export async function testDatabaseConnection(): Promise<boolean> {
  return testConnection();
}


