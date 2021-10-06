import spriteImage from "../assets/images/playerSprite.png";
import Entity from "./Entity";
import { removeDeadEntities } from "./EntityManager";

const defaultPlayerProps = {
  name: "Player",
  pos: { x: 0, y: 0 },
  size: { w: 15, h: 15 },
  dir: { x: 0, y: 0 },
  rotation: {}, // Not needed for now
  maxSpeed: 10,
  color: "#993399",
};

export const createPlayer = (incomingProps) => {
  const props = Object.assign(defaultPlayerProps, incomingProps);
  const player = new Entity(props);
  // Entity specific
  player.pos = { x: 0, y: 0 };
  player.size = { w: 30, h: 30 };
  player.dir = { x: 0, y: 0 };
  player.rotation = {}; // Not needed for now
  player.maxSpeed = 10;
  player.color = "#339933";
  // Player specific
  // player.projectiles = [];

  player.draw = function (ctx) {
    if (ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
      // ctx.drawImage(spriteImage, this.pos.x, this.pos.y)
      // this.projectiles.forEach((projectile) => {
      //   projectile.draw(ctx);
      // });
    }
  };

  player.update = function (deltaTime) {
    this.pos.x += this.dir.x * this.maxSpeed;
    this.pos.y += this.dir.y * this.maxSpeed;

    // removeDeadEntities(this.projectiles)

    // this.projectiles.forEach((projectile) => {
    //   projectile.update(deltaTime);
    // });

  };

  player.handleEvent = function (event, code) {
    // Start moving
    if (event.type === "keydown") {
      if (code === "KeyA") this.dir.x -= 1;
      if (code === "KeyS") this.dir.y += 1;
      if (code === "KeyD") this.dir.x += 1;
      if (code === "KeyW") this.dir.y -= 1;

      if (code === "Space") this.fireProjectile();
    }
    // Stop moving
    if (event.type === "keyup") {
      if (code === "KeyA") this.dir.x += 1;
      if (code === "KeyS") this.dir.y -= 1;
      if (code === "KeyD") this.dir.x -= 1;
      if (code === "KeyW") this.dir.y += 1;
    }
  };

  player.fireProjectile = function () {
    const projectile = createProjectile(this);
    // this.projectiles.push(projectile);
    if (this.onShot) this.onShot(projectile)
  };

  return player;
};

export const createProjectile = (entity) => {
  const projectile = new Entity({
    name: "projectile",
    pos: { x: entity.pos.x, y: entity.pos.y },
    dir: { x: 0, y: -1 },
    maxSpeed: 5,
    size: { w: 30, h: 30 },
    color: "#ffffff",
  });

  projectile.lifeSpan = 150;

  projectile.update = function (deltaTime) {
    if (this.isDead) return

    this.pos.x += this.dir.x * this.maxSpeed;
    this.pos.y += this.dir.y * this.maxSpeed;

    this.lifeSpan--;
    if (this.lifeSpan <= 0) {
      this.isDead = true;
    }
  };

  projectile.draw = function (ctx) {
    ctx.fillStyle = this.color;
    // console.log(`this.pos.x, this.pos.y, this.size.w, this.size.h`, this.pos.x, this.pos.y, this.size.w, this.size.h)
    ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
  };

  return projectile;
};
