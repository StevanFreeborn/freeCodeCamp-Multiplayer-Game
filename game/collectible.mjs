import {
  COLLECTIBLE_HEIGHT,
  COLLECTIBLE_WIDTH,
} from '../shared/constants.mjs';

export default class Collectible {
  constructor(position) {
    this.id = Date.now();
    this.x = position.x;
    this.y = position.y;
    this.width = COLLECTIBLE_WIDTH;
    this.height = COLLECTIBLE_HEIGHT;
    this.value = 1;
  }
}
