import Vertex from "../vertex/vertex.js";
import Edge from "../edge/edge.js";

export default class Model {
  constructor(app) {
    console.log("Constructing Model.");
    this.app = app;
    this.verticies = [];
    this.edges = [];
    this.smily = {
      img: undefined,
      pos: {
        x: 0,
        y: 0,
      },
    };
  }
  addEdge(x, y) {
    const fromVertex = this.getVertexByPosition(
      this.smily.pos.x,
      this.smily.pos.y
    );
    const toVertex = this.getVertexByPosition(x, y);
    const edge = new Edge(fromVertex, toVertex);
    this.edges.push(edge);
    fromVertex.edgesOut.push(edge);
    toVertex.edgesIn.push(edge);
  }
  addVertex(x, y) {
    for (let i = 0; i < this.verticies.length; i++) {}
    const vertex = new Vertex(x, y);
    this.verticies.push(vertex);
  }
  changeSmilyPos(changePosX, changePosY) {
    const vertex1 = this.getVertexByPosition(
      this.smily.pos.x,
      this.smily.pos.y
    );
    const vertex2 = this.getVertexByPosition(changePosX, changePosY);
    for (let i = 0; i < vertex1.edgesOut.length; i++) {
      if (vertex1.edgesOut[i].toVertex === vertex2) {
        this.smily.pos.x = vertex2.pos.x;
        this.smily.pos.y = vertex2.pos.y;
      }
    }
  }
  finalize() {
    console.log("Finalizing Model.");
  }
  getVertexByPosition(x, y) {
    /*   pt2
        /|
     c / |
      /  | b     Pythagorean Theorem: a^2 + b^2 = c^2
     /   |
    /____|
 pt1  a
    Use this to figure out distance from pt1 to pt2:
    We reason as follows:
    1. "c" is the distance from pt1 to pt2
    2. "c" can be found as c = sqrt( a^2 + b^2 )
    3. but "a" is just x2 - x1   ...   and "b" is just y2 - y1
    4. so:  c = sqrt( (x2 - x1)^2 + (y2 - y1)^2 )
    5. or: c = sqrt( (x2 - x1)(x2 - x1) + (y2 - y1)(y2 - y1) )
    6. or in terms of JS variables, we have
       const dx = vertex2.pos.x - vertex1.pos.x;
       const dy = vertex2.pos.y - vertex1.pos.y;
       const dist = Math.sqrt(dx * dx + dy * dy);
    */
    let closestVertex = this.verticies[0];
    for (let i = 1; i < this.verticies.length; i++) {
      const dx1 = closestVertex.pos.x - x;
      const dy1 = closestVertex.pos.y - y;
      const dx2 = this.verticies[i].pos.x - x;
      const dy2 = this.verticies[i].pos.y - y;
      if (Math.sqrt(dx1 * dx1 + dy1 * dy1) > Math.sqrt(dx2 * dx2 + dy2 * dy2)) {
        closestVertex = this.verticies[i];
      }
    }
    return closestVertex;
  }
  initialize() {
    +console.log("Initializing Model.");
    this.smily.img = document.getElementById("smily");
    for (let i = 0; i < 5; i++) {
      console.log("add Vertex");
      this.verticies.push(new Vertex(i * 100, i * 100));
      if (this.verticies.length > 1) {
        this.edges.push(new Edge(this.verticies[i - 1], this.verticies[i]));
        this.verticies[i - 1].edgesOut.push(this.edges[this.edges.length - 1]);
        this.verticies[i].edgesIn.push(this.edges[this.edges.length - 1]);
      }
    }
    this.verticies.push(new Vertex(350, 200));
  }
  run() {
    //console.log("Running Model.");
  }
}
