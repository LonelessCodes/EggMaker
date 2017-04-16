import * as PIXI from "pixi.js";
// import { Bodies } from "matter-js";

// export class MatterBody {
//   constructor(x, y, w, h, texture) {
//     this.sprite = new Sprite(texture);

//     // physics body
//     this.body = Bodies.rectangle(x, y, w, h);
//   }
// }

export class Sprite extends PIXI.Sprite {
  constructor(texture) {
    super(texture);
    // center the sprite's anchor point
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
  }
}