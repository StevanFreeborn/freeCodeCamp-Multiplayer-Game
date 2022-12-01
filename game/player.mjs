import {
  PLAYER_HEIGHT,
  PLAYER_MAX_X,
  PLAYER_MAX_Y,
  PLAYER_WIDTH,
} from '../shared/constants.mjs';

export default class Player {
  constructor(id, position) {
    this.id = id;
    this.x = position.x
    this.y = position.y;
    this.score = 0;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.velocity = { x: 0, y: 0 };
  }

  decreaseVelocity = (newVelocity) => {
    if (newVelocity.x) {
      this.velocity.x = 0;
    }

    if (newVelocity.y) {
      this.velocity.y = 0;
    }
  }

  increaseVelocity = (newVelocity) => {
    if (newVelocity.x) {
      this.velocity.x = newVelocity.x;
    }

    if (newVelocity.y) {
      this.velocity.y = newVelocity.y;
    }
  }

  move() {
    if (this.velocity.x > 0) {
      if (this.x >= PLAYER_MAX_X) {
        return;
      }
      this.x += this.velocity.x;
    }

    if (this.velocity.x < 0) {
      if (this.x <= 0) {
        return;
      }
      this.x += this.velocity.x;
    }

    if (this.velocity.y > 0) {
      if (this.y >= PLAYER_MAX_Y) {
        return;
      }
      this.y += this.velocity.y;
    }

    if (this.velocity.y < 0) {
      if (this.y <= 0) {
        return;
      }
      this.y += this.velocity.y;
    }
  }
}
