import SocketEvents from '../shared/socketEvents.mjs';
import Collectible from './collectible.mjs';
import Player from './player.mjs';
import Game from './game.mjs'
import keyMappings from '../shared/keyMappings.mjs';
import { FRAME_RATE } from '../shared/constants.mjs';

export default class ServerEventHandler {
  static handleJoinGame = (io, socket, gameState) => {
    if (gameState == null) {
      gameState = new Game();
    }

    const newPlayerPosition = gameState.generateRandomPlayerPosition();
    gameState.players.push(new Player(socket.id, newPlayerPosition));

    if (gameState.collectible == null) {
      const collectiblePosition = gameState.generateRandomCollectiblePosition();
      gameState.collectible = new Collectible(collectiblePosition);
    }

    if (gameState.interval == null) {
      gameState.interval = setInterval(() => {
        gameState.runLoop();
        io.emit(SocketEvents.gameState, gameState);
      }, 1000 / FRAME_RATE);
    }
  };

  static handleKeyDown = (socket, key, gameState) => {
    const velocity = keyMappings[key];

    if (!velocity) {
      return;
    }

    gameState.players.forEach(player => {
      if (player.id == socket.id) {
        player.increaseVelocity(velocity);
      }
    });
  };

  static handleKeyUp = (socket, key, gameState) => {
    const velocity = keyMappings[key];

    if (!velocity) {
      return;
    }

    gameState.players.forEach(player => {
      if (player.id == socket.id) {
        player.decreaseVelocity(velocity);
      }
    });
  };

  static handleDisconnect = (socket, gameState) => {
    if (gameState == null) {
      return;
    }

    gameState.players = gameState.players.filter(
      player => player.id != socket.id
    );

    if (gameState.players.length == 0) {
      clearInterval(gameState.interval);
      gameState = null;
    }
  };
}
