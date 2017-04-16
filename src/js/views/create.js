import * as PIXI from "pixi.js";
import { Sprite } from "./../@components";
import { draw } from "./../modules/draw-svg-path";
import * as egg from "../json/egg-path.json";

import * as colorPalettes from "../json/color-palettes.json";
import { shuffleArray } from "../modules/utils";

import { seed } from "../modules/get-seed";

const shuffled = shuffleArray(
  colorPalettes.map(p =>
    shuffleArray(p))
);

export const stage = new PIXI.Container();

// create the canvas to draw on
// currently this is uploading the canvas to the GPU 60 times
// a second. Not really good. Maybe I don't even need PIXI at all
// so I could just flexbox this canvas in center in DOM
// eh
const canvas = document.createElement("canvas");
canvas.width = 790;
canvas.height = 1000;
const ctx = canvas.getContext("2d");

ctx.save();
ctx.translate(-115, 0);
ctx.scale(7.17, 7.17);
draw(ctx, egg);
ctx.fillStyle = "white";
ctx.fill();
ctx.restore();

ctx.globalCompositeOperation = "source-in";

ctx.fillStyle = shuffled[0][0];
ctx.fillRect(0, 0, canvas.width, canvas.height);

const texture = PIXI.Texture.fromCanvas(canvas);
const sprite = new Sprite(texture);
stage.addChild(sprite);

export function update() {
  sprite.position.x = window.innerWidth / 2;
  sprite.position.y = window.innerHeight / 2;
  sprite.scale.set(window.innerHeight / 1300);
}