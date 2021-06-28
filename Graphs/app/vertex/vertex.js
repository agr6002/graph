export default class Vertex {
  constructor(posX, posY, edgesOut = [], edgesIn = []) {
    this.pos = {
      x: posX,
      y: posY,
    };
    this.edgesOut = edgesOut;
    this.edgesIn = edgesIn;
  }
}
