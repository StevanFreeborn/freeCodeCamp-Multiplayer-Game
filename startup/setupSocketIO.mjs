import { Server } from 'socket.io';
import { createServer } from 'http';
import SocketEvents from '../shared/socketEvents.mjs';
import ServerEventHandler from '../game/serverEventHandler.mjs';
import Game from '../game/game.mjs';

export default function (app) {
  const server = createServer(app);
  const io = new Server(server);
  let gameState = new Game();

  io.on(SocketEvents.connection, socket => {
    socket.on(SocketEvents.joinGame, () => {
      ServerEventHandler.handleJoinGame(io, socket, gameState);
    });

    socket.on(SocketEvents.keyDown, key => {
      ServerEventHandler.handleKeyDown(socket, key, gameState);
    });

    socket.on(SocketEvents.keyUp, key => {
      ServerEventHandler.handleKeyUp(socket, key, gameState);
    });

    socket.on(SocketEvents.disconnect, () => {
      ServerEventHandler.handleDisconnect(socket, gameState);
    });
  });

  return server;
}
