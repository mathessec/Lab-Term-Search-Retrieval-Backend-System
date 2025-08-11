// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// Global limiter (applies to all routes unless overridden)
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // max requests per IP
  message: { success: false, message: 'Too many requests, please try again later.' }
});

// Login-specific limiter
export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // 5 login attempts
  message: { success: false, message: 'Too many login attempts. Please wait 5 minutes.' }
});

// Search-specific limiter
export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 300, // 50 searches
  message: { success: false, message: 'Too many search requests. Please wait a minute.' }
});
