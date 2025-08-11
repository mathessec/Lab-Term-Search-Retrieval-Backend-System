import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { globalLimiter } from './middleware/rateLimiter.js';
import appRoutes from './routes/index.js';

const app = express();

// Security headers
app.use(helmet());
app.set('trust proxy', 1); // if behind a proxy

// CORS + JSON parsing
app.use(cors());
app.use(express.json());

// Apply global limiter to all requests
app.use(globalLimiter);

// Main routes
app.use(appRoutes);

app.listen(process.env.PORT, () => {
  console.log("App listening on port:" + process.env.PORT);
});







// import express from 'express';
// const app = express();
// import appRoutes from './routes/user.js';
// import 'dotenv/config';
// import cors from 'cors';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';

// // Security headers
// app.use(helmet());

// // Trust proxy if deployed behind reverse proxy (Heroku, Render, etc.)
// app.set('trust proxy', 1);

// // Global CORS
// app.use(cors());
// app.use(express.json());

// // ------------------ Rate Limiters ------------------

// // Global limiter (applies to all routes)
// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 mins
//   max: 200, // max 200 requests per 15 mins per IP
//   message: { success: false, message: 'Too many requests, try again later.' }
// });
// app.use(globalLimiter);

// // Login-specific limiter (very strict)
// export const loginLimiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 mins
//   max: 5, // 5 attempts max
//   message: { success: false, message: 'Too many login attempts. Please wait 5 minutes.' }
// });

// // Search-specific limiter (moderate)
// export const searchLimiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 min
//   max: 50, // 50 searches max
//   message: { success: false, message: 'Too many search requests. Please wait a minute.' }
// });

// // ------------------ Routes ------------------
// app.use(appRoutes);

// // Start server
// app.listen(process.env.PORT, () =>
//   console.log("App listening port:" + process.env.PORT)
// );
