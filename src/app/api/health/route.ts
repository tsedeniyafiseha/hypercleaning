import { NextRequest, NextResponse } from 'next/server';
import { healthCheck, getDatabaseStatus } from '@/lib/db-connection';
import { logger } from '@/lib/logger';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('x-health-check-token');
    
    // Health check token is optional - if set, must match
    if (process.env.HEALTH_CHECK_TOKEN && token !== process.env.HEALTH_CHECK_TOKEN) {
      return unauthorizedResponse();
    }

    // Check database connection with detailed status
    const dbHealth = await healthCheck();
    const dbStatus = await getDatabaseStatus();

    if (!dbHealth.healthy) {
      logger.error('Health check failed - database unhealthy', new Error(dbHealth.error || 'Unknown error'));
      return errorResponse('Database connection failed', 503);
    }

    return successResponse({
      status: 'healthy',
      database: dbStatus,
      latency: dbHealth.latency,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    logger.error('Health check failed', error as Error);
    return errorResponse('Health check failed', 503);
  }
}
