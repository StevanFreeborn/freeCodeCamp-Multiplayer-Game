import { Server } from 'socket.io';
import { createServer } from 'http';
import SocketEvents from '../shared/socketEvents.mjs';
import ServerEventHandler from '../game/serverEventHandler.mjs';
import Game from '../game/game.mjs';
import ErrorHandler from '../errors/errorHandler.mjs';

export default function (app) {
  const server = createServer(app);
  const io = new Server(server);
  let gameState = new Game();

  io.on(SocketEvents.connection, socket => {
    socket.on(SocketEvents.joinGame, () =>
      ErrorHandler.handleSocketError(socket, () =>
        ServerEventHandler.handleJoinGame(io, socket, gameState)
      )
    );

    socket.on(SocketEvents.keyDown, key =>
      ErrorHandler.handleSocketError(socket, () =>
        ServerEventHandler.handleKeyDown(socket, key, gameState)
      )
    );

    socket.on(SocketEvents.keyUp, key =>
      ErrorHandler.handleSocketError(socket, () =>
        ServerEventHandler.handleKeyUp(socket, key, gameState)
      )
    );

    socket.on(SocketEvents.disconnect, () =>
      ErrorHandler.handleSocketError(socket, () =>
        ServerEventHandler.handleDisconnect(socket, gameState)
      )
    );

    socket.on(SocketEvents.clientError, error =>
      ErrorHandler.handleSocketError(socket, () =>
        ServerEventHandler.handleClientError(socket, clientToGameMap, error)
      )
    );
  });

  return server;
}
