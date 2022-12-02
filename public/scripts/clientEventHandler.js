import keyMappings from '../../shared/keyMappings.mjs';
import Drawer from './drawer.mjs';
import SocketEvents from '../../shared/socketEvents.mjs';

export default class ClientEventHandler {
  static handleKeyDown = (e, socket) => {
    if (!keyMappings[e.key]) {
      return;
    }

    e.preventDefault();
    socket.emit(SocketEvents.keyDown, e.key);
  };

  static handleKeyUp = (e, socket) => {
    if (!keyMappings[e.key]) {
      return;
    }

    e.preventDefault();
    socket.emit(SocketEvents.keyUp, e.key);
  };

  static handleConnect = (clientState, socket) => {
    clientState.mainPlayerId = socket.id;
  };

  static handleGameState = (clientState, gameState) => {
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
  };

  static handleServerError = data => {
    alert(data.message);
  }
}
