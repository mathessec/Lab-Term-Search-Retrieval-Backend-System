import NodeCache from 'node-cache';

// Cache with default 60 seconds expiry
const cache = new NodeCache({ stdTTL: 60 });

// Middleware function
export function cacheMiddleware(req, res, next) {
  const key = req.originalUrl; // unique key for each request URL
  const cachedData = cache.get(key);

  if (cachedData) {
    console.log(`CACHE HIT: ${key}`); // log in terminal
    res.setHeader('X-Cache', 'HIT'); // label in response header
    return res.json(cachedData);
  }

  console.log(`CACHE MISS: ${key}`); // log in terminal
  res.setHeader('X-Cache', 'MISS');

  // Override res.json to store the data in cache
  res.sendResponse = res.json;
  res.json = (data) => {
    cache.set(key, data);
    res.sendResponse(data);
  };

  next();
}
