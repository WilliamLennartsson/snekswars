const defaultProps = {
  name: "Entity",
  pos: { x: 0, y: 0 },
  size: { w: 15, h: 15 },
  dir: { x: 0, y: 0 },
  rotation: {}, // Not needed for now
  maxSpeed: 10,
  color: "#993399",
  sprite: null,
  onUpdate: undefined, // (deltaTime) => void
  onDraw: undefined, // (ctx) => void
};

export default class Entity {
  constructor(incomingProps) {
    const props = Object.assign(defaultProps, incomingProps);
    this.name = props.name;
    this.pos = props.pos;
    this.size = props.size;
    this.dir = props.dir;
    this.rotation = props.rotation;
    this.maxSpeed = props.maxSpeed;
    this.color = props.color;
    this.sprite = props.sprite;
    this.renderMode = "box";
    this.components = [];

    // -- Hooks --
    // Callback to add custom rendering and updates
    this.onUpdate = props.onUpdate;
    this.onDraw = props.onDraw;
  }

  draw(ctx) {
    if (this.sprite && this.renderMode == "sprite") {
      // TODO: Draw sprite
      // ctx.drawImage(spriteImage, enemy.pos.x, enemy.pos.y)
    } else if (this.renderMode === "box") {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    }
    if (this.onDraw) {
      this.onDraw(ctx);
    }
  }

  update(deltaTime, entities) {
    if (this.onUpdate) {
      this.onUpdate(deltaTime, entities);
    }
    this._updateComponents(deltaTime, entities);
  }

  handleEvent(event) {}
  _updateComponents(deltaTime, entities) {
    this.components.forEach(({ name, component }) => {
      // console.log("Vaa i helvete?!", component);
      if (component) component.update(deltaTime, entities);
    });
  }

  // TODO: Move to queue instead
  addComponent(name, component) {
    this.components.push({ name, component });
  }
  hasComponent(name) {
    return this.components.indexOf(e => e.name === name) >= 0
  }
  removeComponent(name) {
    const index = this.components.indexOf(
      (component) => component.name == name
    );
    if (index >= 0) this.components.splice(index, 1);
  }
}

export class Component {
  constructor(props, entity) {
    this.props = props;
    this.onUpdate = props.onUpdate;
  }

  update(deltaTime, entities) {
    if (this.onUpdate) this.onUpdate(deltaTime, entities);
  }
}
