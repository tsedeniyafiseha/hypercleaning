import * as Sentry from '@sentry/nextjs';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface LogContext {
  userId?: string | number;
  orderId?: string | number;
  productId?: string | number;
  [key: string]: any;
}

export class Logger {
  private context: LogContext = {};
  private sentryEnabled: boolean;

  constructor() {
    // Check if Sentry is properly initialized
    this.sentryEnabled = !!process.env.SENTRY_DSN;
  }

  setContext(context: LogContext) {
    this.context = { ...this.context, ...context };
  }

  private log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      context: this.context,
      ...(data && { data }),
    };

    console[level === LogLevel.ERROR ? 'error' : level === LogLevel.WARN ? 'warn' : 'log'](
      JSON.stringify(logEntry)
    );

    // Only use Sentry if it's enabled and properly configured
    if (this.sentryEnabled) {
      try {
        if (level === LogLevel.ERROR) {
          Sentry.captureException(new Error(message), { extra: { ...logEntry, data } });
        } else if (level === LogLevel.WARN) {
          Sentry.captureMessage(message, 'warning');
        }
      } catch (error) {
        // Silently fail if Sentry has issues
        console.error('Sentry logging failed:', error);
      }
    }
  }

  debug(message: string, data?: any) {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any) {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any) {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: Error | any, data?: any) {
    if (error instanceof Error) {
      this.log(LogLevel.ERROR, message, { error: error.message, stack: error.stack, ...data });
    } else {
      this.log(LogLevel.ERROR, message, { error, ...data });
    }
  }
}

export const logger = new Logger();
