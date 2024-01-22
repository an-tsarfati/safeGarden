// middleware/core.middleware.js

const allowAccessMiddleware = (req, res, next) => {
  // Set the allowed origins
  const allowedOrigins = [
    'http://safe-garden.vercel',
    'http://localhost:3000',
    'http://localhost:5071',
  ];

  // Get the origin header from the request
  const origin = req.headers.origin;

  // Check if the origin is in the allowed list
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    // Continue with the next middleware
    next();
  }
};

module.exports = allowAccessMiddleware;
