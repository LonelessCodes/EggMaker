import { lerp, newArray } from "./modules/utils";
import * as clamp from "clamp";
import * as vec2 from "gl-vec2";
import * as SimplexNoise from "simplex-noise";
import { getLumaPixels } from "./modules/getLumaPixels";

// most of the code here is from DesLauriers
export function render(opt) {
  if (!opt) throw new TypeError("Argument 'opts' is not of type Object");
  const {
    ctx,
    random,
    count = 0,
    palette = ["#fff", "#000"],
    backgroundCtx,
    noiseScalar = [0.00001, 0.0001] } = opt;

  const maxRadius = typeof opt.maxRadius === "number" ? opt.maxRadius : 10;
  const globalAlpha = typeof opt.globalAlpha === "number" ? opt.globalAlpha : 1;
  
  const simplex = new SimplexNoise(random);
  const canvas = ctx.canvas;
  const width = canvas.width;
  const height = canvas.height;
  const pointilism = lerp(0.000001, 0.5, opt.pointilism);

  const heightMap = getLumaPixels(backgroundCtx, {
    scale: opt.backgroundScale
  }).data;
  let time = 0;
  const particles = newArray(count).map(() => resetParticle());

  return {
    clear,
    step
  };

  function clear() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = palette[0];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function step(dt) {
    time += dt;
    particles.forEach(p => {
      const x = p.position[0];
      const y = p.position[1];

      const fx = clamp(Math.round(x), 0, canvas.width - 1);
      const fy = clamp(Math.round(y), 0, canvas.height - 1);
      const heightIndex = fx + (fy * canvas.width);
      const heightValue = heightMap[heightIndex * 4] / 255;

      const pS = lerp(noiseScalar[0], noiseScalar[1], heightValue);
      const n = simplex.noise3D(fx * pS, fy * pS, p.duration + time);
      const angle = n * Math.PI * 2;
      const speed = p.speed + lerp(0.0, 2, 1 - heightValue);
      vec2.add(p.velocity, p.velocity, [Math.cos(angle), Math.sin(angle)]);
      vec2.normalize(p.velocity, p.velocity);
      const move = vec2.scale([], p.velocity, speed);
      vec2.add(p.position, p.position, move);

      const s2 = pointilism;
      let r = p.radius * simplex.noise3D(x * s2, y * s2, p.duration + time);
      r *= lerp(0.01, 1.0, heightValue);
      ctx.beginPath();
      ctx.lineTo(x, y);
      ctx.lineTo(p.position[0], p.position[1]);
      ctx.lineWidth = r * (p.time / p.duration);
      ctx.lineCap = opt.lineStyle || "square";
      ctx.lineJoin = opt.lineStyle || "square";
      ctx.strokeStyle = p.color;

      ctx.globalAlpha = globalAlpha;
      ctx.stroke();

      p.time += dt;
      if (p.time > p.duration) {
        resetParticle(p);
      }
    });
  }

  function resetParticle(p) {
    p = p || {};
    p.position = randomSphere([], random(0, height / 2));
    p.position[0] += width / 2;
    p.position[1] += height / 2;
    let hei = heightMap[(p.position[0] + p.position[1]*width)*4];
    while(random(0, hei / 255) < 0.1) {
      p.position = randomSphere([], random(0, height / 2));
      p.position[0] += width / 2;
      p.position[1] += height / 2;
      hei = heightMap[(p.position[0] + p.position[1]*width)*4];
    }
    p.radius = random(1, maxRadius);
    p.duration = random(1, 500);
    p.time = random(0, p.duration);
    p.velocity = [random(-1, 1), random(-1, 1)];
    p.speed = random(0.5, 2);

    // Note: We actually include the background color here.
    // This means some strokes may seem to "erase" the other
    // colours, which can add a nice effect.
    p.color = palette[Math.floor(random(palette.length))];
    return p;
  }

  function randomSphere(out, scale) {
    scale = scale || 1.0;
    const r = random() * 2.0 * Math.PI;
    out[0] = Math.round(Math.cos(r) * scale);
    out[1] = Math.round(Math.sin(r) * scale);
    return out;
  }
}
