import { Vector3 } from 'three'
import { GameComponent } from './GameComponent'

export class VelocityComponent extends GameComponent {
  public x: number
  public y: number
  public z: number
  constructor(velocityX?: number, velocityY?: number, velocityZ?: number) {
    super()
    this.x = velocityX || 0
    this.y = velocityY || 0
    this.z = velocityZ || 0
  }
  get velocity() {
    return new Vector3(this.x, this.y, this.z)
  }
}
