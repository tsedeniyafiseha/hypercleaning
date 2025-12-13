/**
 * Database Connection Utilities
 * Provides helper functions for database connection management
 */

import { prisma, testDatabaseConnection } from "./prisma";
import { logger } from "./logger";

/**
 * Validates database connection and environment variables
 */
export async function validateDatabaseConnection(): Promise<{
  connected: boolean;
  error?: string;
}> {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return {
        connected: false,
        error: "DATABASE_URL environment variable is not set",
      };
    }

    // Test connection
    const isConnected = await testDatabaseConnection();
    if (!isConnected) {
      return {
        connected: false,
        error: "Failed to connect to database",
      };
    }

    return { connected: true };
  } catch (error) {
    logger.error("Database connection validation failed", error as Error);
    return {
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Gets database connection status
 */
export async function getDatabaseStatus() {
  try {
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const responseTime = Date.now() - startTime;

    return {
      status: "connected",
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Closes database connection gracefully
 */
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info("Database connection closed successfully");
  } catch (error) {
    logger.error("Error closing database connection", error as Error);
    throw error;
  }
}

/**
 * Database connection health check for monitoring
 */
export async function healthCheck(): Promise<{
  healthy: boolean;
  latency?: number;
  error?: string;
}> {
  try {
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - startTime;

    return {
      healthy: true,
      latency,
    };
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}



