import { draw } from "../modules/draw-svg-path";
import * as egg from "../json/egg-path.json";
import { PATTERN_HEIGHT, PATTERN_WIDTH } from "../constants";
import * as contrast from "wcag-contrast";

import { Config } from "../config";
export const mapsPromise = Config.mapsPromise;
export const maps = Config.maps;

// export const stage = new Container; // export an empty container

// create the canvas to draw on
// currently this is uploading the canvas to the GPU 60 times
// a second. Not really good. Maybe I don't even need PIXI at all
// so I could just flexbox this canvas in center in DOM
// eh
export const canvas = document.createElement("canvas");
canvas.width = 790;
canvas.height = 1000;
document.getElementById("create").appendChild(canvas); // append canvas to DOM
const ctx = canvas.getContext("2d");

import { seed } from "../modules/get-seed"; // get seed from url query at pageload
if (history.pushState) {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  window.history.pushState({ path: newurl }, "", newurl);
}

import { render } from "../render";

const heightMap = document.createElement("canvas");
heightMap.width = canvas.width;
heightMap.height = canvas.height;
const heightCtx = heightMap.getContext("2d");
const canvasPart = document.createElement("canvas");
canvasPart.width = canvas.width;
canvasPart.height = canvas.height;
const canvasPartCtx = canvasPart.getContext("2d");

export function start() {
  // this draws the egg shape
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.translate(-115, 0);
  ctx.scale(7.17, 7.17);
  draw(ctx, egg);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.restore();

  // "source-in" locks the alpha value, so that anything drawn after
  // will be contained in the egg shape doesn't drain outside
  ctx.globalCompositeOperation = "source-in";

  let methods = create(new Config(seed));

  // create a new egg
  function create(config) {
    heightCtx.fillStyle = "black";
    heightCtx.fillRect(0, 0, heightCtx.width, heightCtx.height);
    config.backgroundSrc.forEach((index, i) => {
      heightCtx.drawImage(maps,
        0, index * PATTERN_HEIGHT,
        PATTERN_WIDTH, PATTERN_HEIGHT,
        0, i * PATTERN_HEIGHT,
        PATTERN_WIDTH, PATTERN_HEIGHT);
    });

    config.ctx = canvasPartCtx;
    config.backgroundCtx = heightCtx;

    // PIXIrenderer.backgroundColor = hexToDec(getBestContrast(config.palette[0], config.palette.slice(1)));
    // seedText.textContent = config.seed;

    const renderer = render(config);

    renderer.clear();
    let stepCount = 0;
    return {
      update() {
        if (!config.endlessBrowser && stepCount > config.steps) {
          return;
        }
        stepCount++;
        console.log("Step", stepCount);
        renderer.step(config.interval);
        ctx.drawImage(canvasPart, 0, 0);
      }
    };
  }

  return {
    update() {
      methods.update();
    },
    reload() {
      methods = create(new Config());
    }
  };
}

function getBestContrast (background, colors) {
  var bestContrastIdx = 0;
  var bestContrast = 0;
  colors.forEach((p, i) => {
    var ratio = contrast.hex(background, p);
    if (ratio > bestContrast) {
      bestContrast = ratio;
      bestContrastIdx = i;
    }
  });
  return colors[bestContrastIdx];
}