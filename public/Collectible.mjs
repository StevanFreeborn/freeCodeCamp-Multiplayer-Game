class Collectible {
  constructor({x, y, value, id}) {
    this.xPos = x;
    this.yPos = y;
    this.value = value;
    this.id = id;
  }

}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch(e) {}

export default Collectible;
