import SocketEvents from "../../shared/socketEvents.mjs";


export default class ClientEventErrorHandler {
  static handle = (socket, eventHandler) => {
    try {
      eventHandler();
    } catch (err) {
      console.error(err);
      socket.emit(SocketEvents.clientError, {
        message: err.message,
        stack: err.stack,
      });
    }
  };
}
