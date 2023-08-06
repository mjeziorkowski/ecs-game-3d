import { MathUtils } from 'three'
import type { GameComponent } from '../components/GameComponent'
import { Debugger, DebuggerSource } from '../debugger'
import { getAllPossibleComponentsCombinations } from '../utils'

export class GameEntity {
  public uuid: string
  public name: string
  public components: GameComponent[] = []
  constructor(name?: string) {
    this.uuid = MathUtils.generateUUID()
    this.name = name || 'GameEntity'
    return this
  }
  addComponent(component: GameComponent, addEntityToSubgroups: boolean = true) {
    Debugger.log(
      DebuggerSource.Entities,
      `Adding component ${component.constructor.name} to entity ${this.name} (${this.uuid}))`
    )
    let beforeAddPossibleCombinations: string[] = []
    if (addEntityToSubgroups) {
      beforeAddPossibleCombinations = getAllPossibleComponentsCombinations(
        this.components
      )
    }
    this.components.push(component)
    let afterAddPossibleCombinations = []
    if (addEntityToSubgroups) {
      afterAddPossibleCombinations = getAllPossibleComponentsCombinations(
        this.components
      )

      const newCombinations = afterAddPossibleCombinations.filter(
        (combination) => !beforeAddPossibleCombinations.includes(combination)
      )

      window._game.addEntityToSubgroups(this, newCombinations)
    }

    return this
  }
  addComponents(components: GameComponent[]) {
    Debugger.log(
      DebuggerSource.Entities,
      `Adding following components to entity ${this.name} (${
        this.uuid
      }): ${components
        .map((component) => component.constructor.name)
        .join(', ')}`
    )
    const beforeAddPossibleCombinations = getAllPossibleComponentsCombinations(
      this.components
    )
    components.forEach((component) => {
      this.addComponent(component, false)
    })
    const afterAddPossibleCombinations = getAllPossibleComponentsCombinations(
      this.components
    )

    const newCombinations = afterAddPossibleCombinations.filter(
      (combination) => !beforeAddPossibleCombinations.includes(combination)
    )

    window._game.addEntityToSubgroups(this, newCombinations)
    return this
  }

  //use entity.removeComponent(ActiveComponent) to remove ActiveComponent from entity
  public removeComponent<T extends GameComponent>(
    component: new () => T,
    removeEntityFromSubgroups: boolean = true
  ) {
    Debugger.log(
      DebuggerSource.Entities,
      `Removing component ${component.constructor.name} from entity ${this.name} (${this.uuid}))`
    )

    let beforeRemovePossibleCombinations: string[] = []
    if (removeEntityFromSubgroups) {
      beforeRemovePossibleCombinations = getAllPossibleComponentsCombinations(
        this.components
      )
    }
    this.components = this.components.filter(
      (_component) => component instanceof _component.constructor
    )
    let afterRemovePossibleCombinations: string[] = []
    if (removeEntityFromSubgroups) {
      afterRemovePossibleCombinations = getAllPossibleComponentsCombinations(
        this.components
      )

      const removedCombinations = beforeRemovePossibleCombinations.filter(
        (combination) => !afterRemovePossibleCombinations.includes(combination)
      )

      window._game.removeEntityFromSubgroups(this, removedCombinations)
    }

    return this
  }

  public removeComponents<T extends GameComponent>(
    components: (new () => T)[]
  ) {
    Debugger.log(
      DebuggerSource.Entities,
      `Removing following components from entity ${this.name} (${
        this.uuid
      }): ${components.map((component) => component.name).join(', ')}`
    )
    const beforeRemovePossibleCombinations =
      getAllPossibleComponentsCombinations(this.components)
    components.forEach((component) => {
      this.removeComponent(component, false)
    })
    const afterRemovePossibleCombinations =
      getAllPossibleComponentsCombinations(this.components)
    const removedCombinations = beforeRemovePossibleCombinations.filter(
      (combination) => !afterRemovePossibleCombinations.includes(combination)
    )
    window._game.removeEntityFromSubgroups(this, removedCombinations)
    return this
  }
}
