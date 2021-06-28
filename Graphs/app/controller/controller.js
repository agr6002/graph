export default class Controller {
  constructor(app) {
    console.log("Constructing Controller.");
    this.app = app;
    this.typeIsEdge = false;
  }
  finalize() {
    console.log("Finalizing Controller.");
  }
  handleClick(e) {
    console.log("click");
    e.preventDefault();
    this.app.model.changeSmilyPos(e.layerX, e.layerY);
    this.app.view.run();
  }
  handleCM(e) {
    console.log("cm");
    e.preventDefault();
    if (this.typeIsEdge == true) {
      this.app.model.addEdge(e.layerX, e.layerY);
      console.log("edge");
    } else {
      this.app.model.addVertex(e.layerX, e.layerY);
      console.log("vertex");
    }
    this.app.view.run();
  }
  handleKD(e) {
    console.log("kd");
    //console.log(e);
    if (e.key === "e") {
      this.typeIsEdge = true;
      console.log("e");
    }
    if (e.key === "v") {
      this.typeIsEdge = false;
      console.log("v");
    }
  }
  initialize() {
    console.log("Initializing Controller.");
    console.log(this.app);
    this.app.view.can.addEventListener("click", this.handleClick.bind(this));
    this.app.view.can.addEventListener("contextmenu", this.handleCM.bind(this));
    document.body.addEventListener("keydown", this.handleKD.bind(this));
  }
  run() {
    //console.log("Running View.");
  }
}
