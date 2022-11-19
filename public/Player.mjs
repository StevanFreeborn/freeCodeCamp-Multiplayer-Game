class Player {
  constructor({x, y, w, h, score, id, isMain}) {
    this.xPos = x;
    this.yPos = y;
    this.score = score;
    this.id = id;
    this.width = w;
    this.height = h;
    this.isMain = isMain;
  }

  draw(context, coin, imgObj, currPlayers) {
    if (this.isMain) {
      context.drawImage(imgObj.mainPlayerArt, this.xPos, this.yPos);
    }
    else {
      context.drawImage(imgObj.otherPlayerArt, this.x, this.y);
    }
  }

  movePlayer(dir, speed) {

  }

  collision(item) {

  }

  calculateRank(arr) {

  }
}

export default Player;
