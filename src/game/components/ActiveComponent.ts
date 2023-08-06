import { GameComponent } from './GameComponent'

export class ActiveComponent extends GameComponent {
  public active: boolean
  constructor(active: boolean = true) {
    super()
    this.active = active
  }
}
