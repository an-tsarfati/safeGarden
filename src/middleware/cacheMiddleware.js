const NodeCache = require('node-cache');

// Create a new instance of NodeCache
const cache = new NodeCache();

// Middleware function to cache responses
function cacheMiddleware(req, res, next) {
  const cacheKey = req.originalUrl;

  // Check if the data for the given cache key exists
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    // If the data exists in the cache, return the cached response
    return res.send(cachedData);
  }

  // If the data doesn't exist in the cache, override the `res.send` function
  // to intercept the response and cache it before sending it to the client
  const originalSend = res.send;

  res.send = (data) => {
    // Cache the response data with the cache key
    cache.set(cacheKey, data);

    originalSend.call(res, data);
  };

  next();
}

module.exports = {
  cacheMiddleware,
  cache,
};
