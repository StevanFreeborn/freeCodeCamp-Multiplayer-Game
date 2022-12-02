import {
  BG_COLOR,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from '../../shared/constants.mjs';
import SocketEvents from '../../shared/socketEvents.mjs';
import ClientEventErrorHandler from './clientEventErrorHandler.js';
import ClientEventHandler from './clientEventHandler.js';

const socket = io();

const clientState = {
  canvas: null,
  context: null,
  mainPlayerId: null,
  playerScore: document.getElementById('playerScore'),
  playerRank: document.getElementById('playerRank'),
};

socket.on(SocketEvents.connect, () =>
  ClientEventErrorHandler.handle(socket, () =>
    ClientEventHandler.handleConnect(clientState, socket)
  )
);

socket.on(SocketEvents.gameState, gameState =>
  ClientEventErrorHandler.handle(socket, () =>
    ClientEventHandler.handleGameState(clientState, gameState)
  )
);

socket.on(SocketEvents.serverError, data =>
  ClientEventErrorHandler.handle(socket, () =>
    ClientEventHandler.handleServerError(data)
  )
);

socket.emit(SocketEvents.joinGame);

clientState.canvas = document.getElementById('game-window');
clientState.canvas.height = CANVAS_HEIGHT;
clientState.canvas.width = CANVAS_WIDTH;

clientState.context = clientState.canvas.getContext('2d', { alpha: true });
clientState.context.fillStyle = BG_COLOR;
clientState.context.fillRect(
  0,
  0,
  clientState.canvas.width,
  clientState.canvas.height
);

document.addEventListener('keydown', e =>
  ClientEventErrorHandler.handle(socket, () =>
    ClientEventHandler.handleKeyDown(e, socket)
  )
);

document.addEventListener('keyup', e =>
  ClientEventErrorHandler.handle(socket, () =>
    ClientEventHandler.handleKeyUp(e, socket)
  )
);
