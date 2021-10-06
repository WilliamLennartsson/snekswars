import { createEnemy, createShootingEnemy } from "../enemy";

const defaultProps = {
  entityManager: null,
  canvas: null,
  player: null,
};

export default class DevTools {
  constructor(incomingProps) {
    const props = Object.assign(defaultProps, incomingProps);
    this.entityManager = props.entityManager;
    this.canvas = props.canvas;
    this.player = props.player;
  }

  handleInputEvent(event, code) {
    if (this.entityManager && this.player) {
      if (event.type === "keydown") {
        // Handle mobspawning
        const enemy = enemyKeyBindingsMap(code, this.player, this.canvas.height, this.canvas.width);
        console.log(`enemy`, enemy)
        if (enemy) {
          this.entityManager.add(enemy);
        }
      }
    }
  }
}

const enemyKeyBindingsMap = (code, player, width, height) => {
  if (code == "Digit1") {
    // Spawn normal enemy
    return createEnemy(
      createEnemyConfig({ rndWidht: width, y: -10 })
    );
  }
  if (code == "Digit2") {
    // Spawn shooting enemy
    console.log(`player`, player)
    return createShootingEnemy(
      createEnemyConfig({ rndWidht: width, y: -10, maxSpeed: 0.5 }),
      player
    );
  }
  return null;
};

const createEnemyConfig = ({ x, y, rndWidht, rndHeight, maxSpeed }) => {
  const pos = {
    x: x || 0,
    y: y || 0
  }
  if (rndWidht) pos.x = pos.x + Math.random() * rndWidht
  if (rndHeight) pos.y = pos.y + Math.random() * rndHeight

  const conf = {
    pos,
    dir: { x: 0, y: 1 },
    maxSpeed: maxSpeed || 3,
  };
  console.log(`conf`, conf)
  return conf
};
