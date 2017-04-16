export function shuffleArray(arr, randFunc) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected Array, got " + typeof arr);
  }

  let rand, tmp, len = arr.length;
  const ret = arr.slice();

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

export function hexToDec(input) {
  const m = input.match(/^#([0-9a-f]{6})$/i)[1];
  if (m) {
    return parseInt(m.substr(0, 6), 16);
  }
}

export function newArray (n, value) {
  n = n || 0;
  var array = new Array(n);
  for (var i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}