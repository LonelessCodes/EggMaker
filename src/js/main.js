import * as PIXI from "pixi.js";
// import { Engine, World, Bodies } from "matter-js";
// import * as database from "./database";

const renderer = PIXI.autoDetectRenderer(
  window.innerWidth,
  window.innerHeight,
  { backgroundColor: 0xFFFFFF }
);
document.getElementById("stage").appendChild(renderer.view);

// handle resize
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.resize(w, h);
});

import * as CREATE from "./views/create";

// create a Matter.js engine
// const engine = Engine.create();

// const bodies = [
//   // walls
//   Bodies.rectangle(renderer.width / 2, 0, renderer.width, 60, { isStatic: true }),
//   Bodies.rectangle(renderer.width, renderer.height / 2, 60, renderer.height, { isStatic: true }),
//   Bodies.rectangle(renderer.width / 2, renderer.height, renderer.width, 60, { isStatic: true }),
//   Bodies.rectangle(0, renderer.height / 2, 60, renderer.height, { isStatic: true })
// ];

// start animating
animate();
function animate() {
  requestAnimationFrame(animate);

  CREATE.update();

  renderer.render(CREATE.stage);
}

// // add all of the bodies to the world
// World.add(engine.world, bodies);

// // run the engine
// Engine.run(engine);