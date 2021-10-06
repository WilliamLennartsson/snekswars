import { Component } from "./Entity";

const MORTAL_TIMED_NAME = "MORTAL_TIMED";
const MORTAL_LIFEBASED_NAME = "MORTAL_LIFEBASED"
const BOX_COLLIDER_NAME = "BOX_COLLIDER";

export const attachTimedMortalComponent = (entity, lifeSpan = 150) => {
  const component = new Component({ isDead: true });

  if (!entity.hasOwnProperty("isDead")) entity.isDead = false;

  component.lifeSpan = lifeSpan;

  component.onUpdate = function (deltaTime) {
    if (entity.isDead) return;
    this.lifeSpan--;
    if (this.lifeSpan <= 0) {
      entity.isDead = true;
    }
  };

  entity.addComponent(MORTAL_TIMED_NAME, component);

  return component;
};

export const attachBoxCollider = (targetEntity) => {
  const component = new Component({ isDead: true });

  if (!targetEntity.hasOwnProperty("isDead")) targetEntity.isDead = false;

  component.onUpdate = function (deltaTime, entities) {
    if (entities) {
      const collidable = entities.filter(entity => entity.hasComponent(BOX_COLLIDER_NAME))
      console.log(`collidable.length`, collidable.length)
      collidable.forEach(entity => {
        const isColliding = checkCollision(targetEntity, entity)
        if (isColliding) {
          // TODO:
          console.log("Colliding: ", targetEntity.name, entity.name)
        }
      })
    }
    this.lifeSpan--;
    if (this.lifeSpan <= 0) {
      targetEntity.isDead = true;
    }
  };

  targetEntity.addComponent(BOX_COLLIDER_NAME, component);

  return component;
};
