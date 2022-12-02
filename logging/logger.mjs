import winston from 'winston';
import consoleTransport from './transports/consoleTransport.mjs';
import dotevn from 'dotenv';
dotevn.config()

const createLogger = () => {
  const logger = winston.createLogger({
    level: 'http' || process.env.LOG_LEVEL,
    format: winston.format.combine(
      winston.format.errors({
        stack: true,
      }),
      winston.format.timestamp(),
      winston.format.json()
    ),
    exceptionHandlers: [
      consoleTransport(),
    ],
  });

  switch (process.env.NODE_ENV) {
    case 'production':
      logger.add(consoleTransport());
      break;
    case 'test':
      break;
    case 'developement':
    default:
      logger.add(consoleTransport());
      break;
  }

  return logger;
};

const logger = createLogger();

export default logger;