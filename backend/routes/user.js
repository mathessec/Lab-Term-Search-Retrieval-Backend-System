import express from 'express';
const router = express.Router();
import userController from '../controller/user.js';
import { loginLimiter, searchLimiter } from '../middleware/rateLimiter.js';
import { cacheMiddleware } from '../middleware/cache.js';
import verifyAuth from '../middleware/verifyauth.js';

// User authentication routes
router.post("/createUser", userController.createUser);
router.post("/login", loginLimiter, userController.login);

// LOINC search routes (with caching)
router.get("/search",verifyAuth,searchLimiter, cacheMiddleware, userController.searchLoinc);
router.get("/loinc/:code",verifyAuth,searchLimiter, cacheMiddleware, userController.getLoincByCode);
router.get("/loinc-stats",verifyAuth,searchLimiter, cacheMiddleware, userController.getLoincStats);

export default router;

