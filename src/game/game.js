import DevTools from "./devtools/DevTools";
import { createEnemy, createShootingEnemy } from "./enemy";
import EntityManager from "./EntityManager";
import { createPlayer } from "./player";

export const useFakeLoader = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export const createGame = (props) => {
  console.log("Game props:", props);

  const { canvas } = props;
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;

  const entityManager = new EntityManager({});

  
  const player = createPlayer();
  entityManager.add(player);
  player.onShot = function (projectile) {
    entityManager.add(projectile);
  };

  // Devtools. For analyzing, devenv mobspawning, extra controls and stuff
  const devTools = new DevTools({ entityManager, canvas, player });

  let running = false;

  let animationFrame;
  let previousTime = 0;

  const start = () => {
    // BG
    drawBackground();
    console.log("Game Started");
    running = true;
    requestAnimationFrame(() => {
      update(0);
    });
  };

  const stop = () => {
    console.log("Game Stopped");
    running = false;
    cancelAnimationFrame(animationFrame);
  };

  const update = (elapsedTime) => {
    const deltaTime = elapsedTime - previousTime;
    if (!running) return;

    entityManager.update(deltaTime);

    draw();

    previousTime = elapsedTime;
    animationFrame = requestAnimationFrame(update);
  };

  const draw = () => {
    // BG
    drawBackground();

    entityManager.draw(ctx);
  };

  const drawBackground = () => {
    if (!ctx) return;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const inputEvent = (event) => {
    const code = event.code;
    
    devTools.handleInputEvent(event, code)
    player.handleEvent(event, code);
    // ui.handleEvent(event, code) // TODO
  };

  // Return [ props, api ]
  return [{ player }, { start, stop, inputEvent }];
};
