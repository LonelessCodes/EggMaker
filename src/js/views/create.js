import { draw } from "../modules/draw-svg-path";
import * as egg from "../json/egg-path.json";
import { PATTERN_HEIGHT, PATTERN_WIDTH } from "../constants";
import * as contrast from "wcag-contrast";

import { seed } from "../modules/get-seed"; // get seed from url query at pageload
if (history.pushState) {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  window.history.pushState({ path: newurl }, "", newurl);
}

import { Config } from "../config";
export const mapsPromise = Config.mapsPromise;
export const maps = Config.maps;

import { render } from "../render";

// the canvas with mask. canvasPart is drawn on here
const canvas = document.createElement("canvas");
canvas.width = 790;
canvas.height = 1000;
document.getElementById("create").appendChild(canvas); // append canvas to DOM

const seedElem = document.createElement("div");
seedElem.className = "seed";
const holder = document.createElement("div");
holder.className = "holder";
holder.innerHTML = "<div class=\"header\">Egg Maker</div>";  
holder.appendChild(seedElem);
document.getElementById("create").appendChild(holder);

resize();
function resize() {
  const ratio = window.innerWidth / window.innerHeight;
  canvas.style.height = "80vh";
  canvas.style.width = "initial";

  if (ratio > 1.1) {
    holder.style.display = "block";
  } else {
    holder.style.display = "none";

    if (ratio < 0.8) {
      canvas.style.height = "initial";
      canvas.style.width = "80vw";
    }
  }
}
window.addEventListener("resize", resize);

const ctx = canvas.getContext("2d");

// the heightmap canvas
const heightMap = document.createElement("canvas");
heightMap.width = canvas.width;
heightMap.height = canvas.height;
const heightCtx = heightMap.getContext("2d");

// the canvas to paint on
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

    document.body.style.background = getBestContrast(config.palette[0], config.palette.slice(1));
    document.body.style.color = config.palette[0];
    seedElem.textContent = "Seed " + config.seed;

    const renderer = render(config);

    renderer.clear();
    let stepCount = 0;
    return {
      update() {
        if (!config.endlessBrowser && stepCount > config.steps) {
          return;
        }
        stepCount++;
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