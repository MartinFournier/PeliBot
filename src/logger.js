const winston = require('winston');

const loggingStringFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        loggingStringFormat
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console());
}

module.exports = logger;
