export default class View {
  constructor(app) {
    console.log("Constructing View.");
    this.app = app;
    this.model = this.app.model;
    this.can = document.createElement("canvas");
    this.con = this.can.getContext("2d");
  }
  finalize() {
    console.log("Finalizing View.");
  }
  initialize() {
    console.log("Initializing View.");
    document.getElementsByTagName("html")[0].style = "width:100%; height:100%;";
    document.body.style = "width:100%; height:100%; margin:0; overflow:hidden;";
    document.body.appendChild(this.can);
    window.onresize = this.resize.bind(this);
    this.resize();
  }
  resize() {
    this.can.width = window.innerWidth;
    this.can.height = window.innerHeight;
    this.run();
  }
  run() {
    console.log("run");
    this.con.clearRect(0, 0, this.can.width, this.can.height);
    let edge;
    for (let i = 0; i < this.model.edges.length; i++) {
      this.con.strokeStyle = "black";
      edge = this.model.edges[i];
      for (let a = 0; a < this.model.edges.length; a++) {
        if (
          this.model.edges[a].fromVertex === edge.toVertex &&
          this.model.edges[a].toVertex === edge.fromVertex
        ) {
          this.con.strokeStyle = "green";
        }
      }
      this.con.beginPath();
      this.con.moveTo(edge.fromVertex.pos.x, edge.fromVertex.pos.y);
      this.con.lineTo(edge.toVertex.pos.x, edge.toVertex.pos.y);
      this.con.stroke();
    }
    this.con.fillStyle = "black";
    let vertex;
    for (let i = 0; i < this.model.verticies.length; i++) {
      vertex = this.model.verticies[i];
      this.con.beginPath();
      this.con.arc(vertex.pos.x, vertex.pos.y, 10, 0, 2 * Math.PI);
      this.con.fill();
    }
    this.con.drawImage(
      document.getElementById("smily"),
      this.model.smily.pos.x - 20,
      this.model.smily.pos.y - 20,
      40,
      40
    );
  }
}
