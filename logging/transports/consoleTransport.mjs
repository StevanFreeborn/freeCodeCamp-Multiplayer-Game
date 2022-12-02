import winston from "winston";

const consoleTransport = () => new winston.transports.Console({
  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.timestamp(),
    winston.format.colorize({
      all: true,
    }),
  ),
});

export default consoleTransport;