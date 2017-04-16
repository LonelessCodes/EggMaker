import { Engine, World, Bodies } from "matter-js";
import { Container } from "pixi.js";

export const stage = new Container;

export function start() {
  // create a Matter.js engine
  const engine = Engine.create();

  const bodies = [
    // walls
    Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 60, { isStatic: true }),
    Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true }),
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, { isStatic: true }),
    Bodies.rectangle(0, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true })
  ];

  // add all of the bodies to the world
  World.add(engine.world, bodies);

  // run the engine
  Engine.run(engine);

  return {
    update() {

    }
  };
}