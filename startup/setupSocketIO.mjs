import { Server } from 'socket.io';
import { createServer } from 'http';
import Collectible from '../game/collectible.mjs';
import Player from '../game/player.mjs';
import { FRAME_RATE } from '../shared/constants.mjs';
import Game from '../game/game.mjs';
import SocketEvents from '../shared/socketEvents.mjs';
import keyMappings from '../shared/keyMappings.mjs';

export default function (app) {
  const server = createServer(app);
  const io = new Server(server);
  let gameState = null;

  io.on(SocketEvents.connection, socket => {
    socket.on(SocketEvents.joinGame, () => {
      if (gameState == null) {
        gameState = new Game();
      }

      const newPlayerPosition = gameState.generateRandomPlayerPosition();
      gameState.players.push(new Player(socket.id, newPlayerPosition));

      if (gameState.collectible == null) {
        const collectiblePosition =
          gameState.generateRandomCollectiblePosition();
        gameState.collectible = new Collectible(collectiblePosition);
      }

      if (gameState.interval == null) {
        gameState.interval = setInterval(() => {
          gameState.movePlayers();
          const gotCollectibleResult = gameState.hasPlayerGotCollectible();
          if (gotCollectibleResult.status == true) {
            gameState.updatePlayerScores(
              gotCollectibleResult.playerId,
              gameState.collectible.value
            );
            gameState.rankPlayers();
            const newCollectiblePostion =
              gameState.generateRandomCollectiblePosition();
            gameState.collectible = new Collectible(newCollectiblePostion);
          }
          io.emit(SocketEvents.gameState, gameState);
        }, 1000 / FRAME_RATE);
      }
    });

    socket.on(SocketEvents.keyDown, key => {
      const velocity = keyMappings[key];

      if (!velocity) {
        return;
      }

      gameState.players.forEach(player => {
        if (player.id == socket.id) {
          player.increaseVelocity(velocity);
        }
      });
    });

    socket.on(SocketEvents.keyUp, key => {
      const velocity = keyMappings[key];

      if (!velocity) {
        return;
      }

      gameState.players.forEach(player => {
        if (player.id == socket.id) {
          player.decreaseVelocity(velocity);
        }
      });
    });

    socket.on('disconnect', () => {
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
    });
  });

  return server;
}
