import keyMappings from '../../shared/keyMappings.mjs';
import {
  BG_COLOR,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from '../../shared/constants.mjs';
import SocketEvents from '../../shared/socketEvents.mjs';
import Drawer from './drawer.mjs';

const socket = io();

const clientState = {
  canvas: null,
  context: null,
  mainPlayerId: null,
  playerScore: document.getElementById('playerScore'),
  playerRank: document.getElementById('playerRank'),
};

const initialize = () => {
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

  document.addEventListener('keydown', e => {
    if (!keyMappings[e.key]) {
      return;
    }

    e.preventDefault();
    socket.emit(SocketEvents.keyDown, e.key);
  });

  document.addEventListener('keyup', e => {
    if (!keyMappings[e.key]) {
      return;
    }

    e.preventDefault();
    socket.emit(SocketEvents.keyUp, e.key);
  });
};

socket.on(SocketEvents.connect, () => {
  clientState.mainPlayerId = socket.id;
});

socket.on('gameState', gameState => {
  requestAnimationFrame(() => {
    Drawer.drawGame(clientState, gameState);
  });

  let playerScore;
  let playerRank;

  gameState.players.forEach((player, index) => {
    if (player.id == clientState.mainPlayerId) {
      playerScore = player.score;
      playerRank = index + 1;
    }
  });

  clientState.playerScore.innerText = playerScore;
  clientState.playerRank.innerText = playerRank;
});

socket.emit('joinGame');
initialize();
