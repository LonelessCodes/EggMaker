export function shuffleArray(arr, randFunc) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected Array, got " + typeof arr);
  }

  var rand;
  var tmp;
  var len = arr.length;
  var ret = arr.slice();

  while (len) {
    rand = Math.floor(randFunc() * len--);
    tmp = ret[len];
    ret[len] = ret[rand];
    ret[rand] = tmp;
  }

  return ret;
}

export function lerp(v0, v1, a) {
  return a * (v1 - v0) + v0;
}

export function randomRange(randFunc) {
  return function random (min, max) {
    if (min === void 0) {
      min = 1;
    }
    if (max  === void 0) {
      max = min;
      min = 0;
    }
    return lerp(min, max, randFunc());
  };
}