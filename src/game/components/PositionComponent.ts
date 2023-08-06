import { Vector3 } from 'three'
import { GameComponent } from './GameComponent'

export class PositionComponent extends GameComponent {
  public x: number
  public y: number
  public z: number
  constructor(positionX?: number, positionY?: number, positionZ?: number) {
    super()
    this.x = positionX || 0
    this.y = positionY || 0
    this.z = positionZ || 0
  }
  get position() {
    return new Vector3(this.x, this.y, this.z)
  }
}
