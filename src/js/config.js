import * as seedRandom from "seed-random";
import * as palettes from "./json/color-palettes.json";
import { randomRange, shuffleArray } from "./modules/utils";
import { PATTERN_HEIGHT } from "./constants";

const maps = new Image();
export class Config {
  constructor(seed = String(Math.floor(Math.random() * 1e6))) {
    console.log("Seed:", seed);

    const randomFunc = seedRandom(seed);
    const random = randomRange(randomFunc);

    const mapSrc = [];
    for (let i = 0; i < 5; i++) {
      mapSrc.push(Math.floor(random(maps.height / PATTERN_HEIGHT)));
    }

    return {
      // rendering options
      random,
      seed,
      pointilism: random(0, 0.1),
      noiseScalar: [random(0.000001, 0.000001), random(0.0002, 0.004)],
      globalAlpha: 0.7,
      maxRadius: random(20, 100),
      lineStyle: random(1) > 0.5 ? "round" : "square",
      interval: random(0.001, 0.01),
      count: Math.floor(random(50, 500)),
      steps: Math.floor(random(300, 2000)),
      endlessBrowser: false, // Whether to endlessly step in browser
      // endlessBrowser: true is pretty cool too

      // background image that drives the algorithm
      backgroundScale: 1,
      backgroundSrc: mapSrc,
      
      palette: getPalette(),
    };

    function getPalette() {
      const paletteColors = palettes[Math.floor(randomFunc() * palettes.length)];
      return shuffleArray(paletteColors, randomFunc);
    }
  }
}

Config.mapsPromise = new Promise(resolve => {
  maps.onload = () => resolve(maps);
  maps.src = "assets/maps.png";
});

Config.maps = maps;