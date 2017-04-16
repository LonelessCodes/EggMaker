import * as CREATE from "./views/create";
CREATE.mapsPromise.then(() => {
  const create = CREATE.start();
  window.addEventListener("click", create.reload);

  // start animating
  animate();
  function animate() {
    requestAnimationFrame(animate);
    create.update();
  }
});