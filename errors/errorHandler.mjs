import logger from '../logging/logger.mjs';
import SocketEvents from '../shared/socketEvents.mjs';

export default class ErrorHandler {
  static handleViewError = routeHandler => async (req, res, next) => {
    try {
      await routeHandler(req, res, next);
    } catch (err) {
      logger.error(err);

      if (res.headersSent) {
        return next(err);
      }

      res.status(500).sendFile(process.cwd() + '/views/error.html');
    }
  };

  static handleSocketError = (socket, socketEventHandler) => {
    try {
      socketEventHandler();
    } catch (err) {
      logger.error(err);
      socket.emit(SocketEvents.serverError, {
        message: "Sorry we've encountered an errror.",
      });
    }
  };
}
