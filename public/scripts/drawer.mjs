import { BG_COLOR } from '../../shared/constants.mjs';
import ImageLoader from './imageLoader.mjs';

export default class Drawer {
  static drawPlayer = (context, player, mainPlayerId) => {
    const mainPlayerArt = ImageLoader.loadImage(
      './public/characters/main-player.png'
    );

    const otherPlayerArt = ImageLoader.loadImage(
      './public/characters/other-player.png'
    );

    const playerArt =
      player.id == mainPlayerId ? mainPlayerArt : otherPlayerArt;

    context.drawImage(
      playerArt,
      player.x,
      player.y,
      player.width,
      player.height
    );
  };

  static drawCollectible = (context, collectible) => {
    const collectibleArt = ImageLoader.loadImage(
      './public/collectibles/orc-collectible.png'
    );

    context.drawImage(
      collectibleArt,
      collectible.x,
      collectible.y,
      collectible.width,
      collectible.height
    );
  };

  static drawGame = (clientState, gameState) => {
    clientState.context.clearRect(
      0,
      0,
      clientState.canvas.width,
      clientState.canvas.height
    );

    clientState.context.fillStyle = BG_COLOR;
    clientState.context.fillRect(
      0,
      0,
      clientState.canvas.width,
      clientState.canvas.height
    );

    this.drawCollectible(clientState.context, gameState.collectible);

    gameState.players.forEach(player =>
      this.drawPlayer(clientState.context, player, clientState.mainPlayerId)
    );
  };
}
