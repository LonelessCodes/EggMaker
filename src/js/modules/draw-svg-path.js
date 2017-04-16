const abs = require("abs-svg-path");
const normalize = require("normalize-svg-path");

const methods = {
  "M": "moveTo",
  "C": "bezierCurveTo"
};

export function draw(context, segments) {
  context.beginPath();

  // Make path easy to reproduce.
  normalize(abs(segments)).forEach(
    function (segment) {
      const command = segment[0];
      const args = segment.slice(1);

      // Convert the path command to a context method.
      context[methods[command]].apply(context, args);
    }
  );

  context.closePath();
}
