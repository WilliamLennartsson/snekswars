import { attachBoxCollider } from "./components";
import Entity from "./Entity";
import { dist } from './utils'

const defaultEnemyProps = {
  name: "Enemy",
  pos: { x: 0, y: 0 },
  size: { w: 15, h: 15 },
  dir: { x: 0, y: 0 },
  rotation: {}, // Not needed for now
  maxSpeed: 10,
  color: "#993399",
};

export const createEnemy = (incomingProps) => {
  const props = Object.assign(defaultEnemyProps, incomingProps)
  
  const enemy = new Entity(props);

  attachBoxCollider(enemy)

  enemy.onDraw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(enemy.pos.x, enemy.pos.y, enemy.size.w, enemy.size.h);
    // ctx.drawImage(spriteImage, enemy.pos.x, enemy.pos.y)
  };

  enemy.onUpdate = function (deltaTime) {
    this.pos.y += this.dir.y * this.maxSpeed;
  };

  return enemy;
};

export const createShootingEnemy = (incomingProps, target) => {
  
  const enemy = createEnemy(incomingProps)
  console.log(`target`, target)
  enemy.target = target
  enemy.onUpdate = function (deltaTime) {
    if (this.target) {
      if (dist(this.target.pos, this.pos) > 59) {
        this.pos.y += this.dir.y * this.maxSpeed;
      }
    }
  }

  return enemy
}
