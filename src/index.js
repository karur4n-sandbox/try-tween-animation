import * as PIXI from "pixi.js";
import "pixi-tween";

const fireButtonEl = document.getElementById("fire");

fireButtonEl.addEventListener("click", e => {
  e.preventDefault();

  const rectangle = buildRectangle();
  app.stage.addChild(rectangle);

  const startTween = buildTween(rectangle);

  startTween(() => {
    app.stage.removeChild(rectangle);
  });
});

const app = new PIXI.Application();

document.body.appendChild(app.view);

function buildRectangle() {
  const rectangle = new PIXI.Graphics();
  rectangle.lineStyle(4, 0xff3300, 1);
  rectangle.beginFill(0x66ccff);
  rectangle.drawRect(0, 0, 64, 64);
  rectangle.endFill();

  return rectangle;
}

function buildTweenPath() {
  const path = new PIXI.tween.TweenPath();
  path.moveTo(0, 50);
  path.bezierCurveTo(10, 0, 40, 0, 100, 0);

  return path;
}

function buildTween(rectangle) {
  const path = buildTweenPath();
  const tween = PIXI.tweenManager.createTween(rectangle);
  tween.path = path;
  tween.time = 2000;
  tween.easing = PIXI.tween.Easing.inCubic();

  return endCallback => {
    if (endCallback) {
      tween.on("end", () => {
        endCallback();
      });
    }
    tween.start();
  };
}

function animate() {
  window.requestAnimationFrame(animate);
  PIXI.tweenManager.update();
}
animate();
