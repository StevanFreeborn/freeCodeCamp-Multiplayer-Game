import morgan from "morgan";
import logger from "../logging/logger.mjs";

export default function (app) {
    morgan.token('reqId', (req, res) => req.id);
    
    const httpLogMessageFormat = ':reqId :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'
    
    app.use(
      morgan(httpLogMessageFormat, {
        stream: {
          write: message => logger.http(message),
        },
      })
    );
  }