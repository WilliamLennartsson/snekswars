
export const removeDeadEntities = (entities) => {
  for (let i = entities.length - 1; i >= 0; i--) {
    if (entities[i].isDead) {
      entities.splice(i, 1);
    }
  }
  return entities;
};

export default class EntityManager {
  constructor(props) {
    this.entities = [];
    this.addQueue = [];
    this.removeQueue = [];
    this.props = props
  }

  add(entity) {
    this.addQueue.push(entity)
  }

  update(deltaTime) {
    
    if (this.addQueue.length > 0) {
      this.entities.push(...this.addQueue)
      this.addQueue.splice(0, this.addQueue.length)
    }
    // Remove dead entities
    removeDeadEntities(this.entities)
    
    this.entities.forEach((entity) => {
      entity.update(deltaTime);
    });

    console.log(this.entities.length)
  }
  
  draw(ctx) {
    this.entities.forEach((entity) => {
      entity.draw(ctx);
    });
  }
}
