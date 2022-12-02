import {
  COLLECTIBLE_HEIGHT,
  COLLECTIBLE_MAX_X,
  COLLECTIBLE_MAX_Y,
  COLLECTIBLE_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_MAX_X,
  PLAYER_MAX_Y,
  PLAYER_WIDTH,
} from '../shared/constants.mjs';
import Collectible from './collectible.mjs';

export default class Game {
  constructor() {
    this.players = [];
    this.collectible = null;
    this.interval = null;
  }

  isCollisionDetected = (obj1, obj2, proximityModifier = 1) => {
    return (
      obj1.x < obj2.x + obj2.width / proximityModifier &&
      obj1.x + obj1.width / proximityModifier > obj2.x &&
      obj1.y < obj2.y + obj2.height / proximityModifier &&
      obj1.y + obj1.height / proximityModifier > obj2.y
    );
  };

  generateRandomPosition = max => {
    return Math.floor(Math.random() * max);
  };

  generateRandomPlayerPosition = () => {
    const position = {
      x: this.generateRandomPosition(PLAYER_MAX_X),
      y: this.generateRandomPosition(PLAYER_MAX_Y),
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    };

    let isPositionOccupied = false;

    // check if placing player here will cause collision with collectible.
    if (this.collectible) {
      if (this.isCollisionDetected(position, this.collectible)) {
        isPositionOccupied = true;
      }
    }

    // check if placing player here will cause collision with another player
    for (const player of this.players) {
      if (this.isCollisionDetected(position, player)) {
        isPositionOccupied = true;
        break;
      }
    }

    // if this position will cause a collision generate a new position
    if (isPositionOccupied) {
      return this.generateRandomPlayerPosition();
    }

    return position;
  };

  generateRandomCollectiblePosition = () => {
    const position = {
      x: this.generateRandomPosition(COLLECTIBLE_MAX_X),
      y: this.generateRandomPosition(COLLECTIBLE_MAX_Y),
      width: COLLECTIBLE_HEIGHT,
      height: COLLECTIBLE_WIDTH,
    };

    let isPositionOccupied = false;

    if (this.collectible) {
      if (this.isCollisionDetected(position, this.collectible)) {
        isPositionOccupied = true;
      }
    }

    // check if placing collectible here will cause collision with player
    for (const player of this.players) {
      if (this.isCollisionDetected(position, player)) {
        isPositionOccupied = true;
        break;
      }
    }

    // if this position will cause a collision generate a new position
    if (isPositionOccupied) {
      return this.generateRandomCollectiblePosition();
    }

    return position;
  };

  movePlayers = () => {
    this.players.forEach(player => player.move());
  };

  hasPlayerGotCollectible = () => {
    for (const player of this.players) {
      if (this.isCollisionDetected(player, this.collectible, 3)) {
        return { status: true, playerId: player.id };
      }
    }

    return { status: false, playerId: null };
  };

  updatePlayerScores = (playerId, collectibleValue) => {
    this.players.forEach(player => {
      if (player.id == playerId) {
        player.score += collectibleValue;
      }
    });
  };

  rankPlayers = () => {
    this.players.sort((a, b) => b.score - a.score);
  };

  runLoop = () => {
    this.movePlayers();
    const gotCollectibleResult = this.hasPlayerGotCollectible();
    
    if (gotCollectibleResult.status == true) {
      this.updatePlayerScores(
        gotCollectibleResult.playerId,
        this.collectible.value
      );

      this.rankPlayers();

      const newCollectiblePostion = this.generateRandomCollectiblePosition();
      this.collectible = new Collectible(newCollectiblePostion);
    }
  };
}
