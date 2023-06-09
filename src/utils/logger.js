const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info', // Set the log level (e.g., 'info', 'debug', 'error')
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamps to log entries
    winston.format.simple() // Use a simple log format
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }),
  ],
});

module.exports = logger;
