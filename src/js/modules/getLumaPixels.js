import * as smoothstep from "smoothstep";
import * as luminance from "color-luminance";

export function getLumaPixels(ctx, opt) {
  const canvas = ctx.canvas;
  const threshold = Array.isArray(opt.threshold) ? opt.threshold : null;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let rgba = imageData.data;

  for (let i = 0; i < canvas.width * canvas.height; i++) {
    const r = rgba[i * 4 + 0];
    const g = rgba[i * 4 + 1];
    const b = rgba[i * 4 + 2];

    // grayscale
    let L = luminance(r, g, b);

    // optional threshold
    if (threshold) {
      L = Math.floor(smoothstep(threshold[0], threshold[1], L / 255) * 255);
    }

    // replace RGBA
    rgba[i] = L;
  }

  // keep memory low, only return grayscale data. Delete rgba data from RAM
  const grayscale = rgba.slice(0, imageData.length / 4);
  rgba = null;
  delete imageData.data;
  return grayscale;
}
