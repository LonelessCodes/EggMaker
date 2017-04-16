import * as PIXI from "pixi.js";
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

const ticker = new PIXI.ticker.Ticker;
ticker.stop();

import * as CREATE from "./views/create";
CREATE.mapsPromise.then(() => {
  const create = CREATE.start(renderer);

  // start animating
  ticker.add(() => {
    create.update();
    renderer.render(CREATE.stage);
  });
  ticker.start();
});