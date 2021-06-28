import Model from "./model/model.js";
import View from "./view/view.js";
import Controller from "./controller/controller.js";

// Here is change # 1 -- a comment was added.
export default class App {
  constructor() {
    console.log("\nConstructing App.");
    this.controller = new Controller(this);
    this.model = new Model(this);
    this.view = new View(this);
    this.running = true;
    window.onload = () => {
      this.initialize();
      this.run();
      this.finalize();
    };
  }
  finalize() {
    console.log("\nFinalizing App.");
    this.controller.finalize();
    this.model.finalize();
    this.view.finalize();
  }
  initialize() {
    console.log("\nInitializing App.");
    this.controller.initialize();
    this.model.initialize();
    this.view.initialize();
  }
  run() { // here is change #2 -- a comment added to end of line
    console.log("\nRunning App.");
    //while (this.model.spider.pos.x !== 500) {
    this.model.run();
    this.controller.run();
    this.view.run();
    //}
  }
}
