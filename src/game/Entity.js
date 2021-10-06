const defaultProps = {
  name: 'Entity',
  pos: { x: 0, y: 0 },
  size: { w: 15, h: 15 },
  dir: { x: 0, y: 0 },
  rotation: {}, // Not needed for now
  maxSpeed: 10,
  color: "#993399",
  sprite: null
};

export default class Entity {
  constructor(incomingProps) {
    const props = Object.assign(defaultProps, incomingProps)
    // console.log(`incomingProps`, incomingProps)
    // console.log(`defaultProps`, defaultProps) 
    // console.log(`Entity props`, props)

    this.name = props.name;
    this.pos = props.pos
    this.size = props.size
    this.dir = props.dir
    this.rotation = props.rotation
    this.maxSpeed = props.maxSpeed
    this.color = props.color
    this.sprite = props.sprite
    this.renderMode = 'box'
  }

  draw(ctx) {
    if (this.sprite && this.renderMode == 'sprite') {
      // TODO: Draw sprite
      // ctx.drawImage(spriteImage, enemy.pos.x, enemy.pos.y)
    } else if (this.renderMode === 'box') {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    } 
  }
  update(deltaTime) {}
  handleEvent(event) {}
}
