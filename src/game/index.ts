import type { GameEntity } from './entities/GameEntity'
import type { GameEntities } from './types'

export class Game {
  //DOCS: Debugging
  private _debug: boolean = false
  get debug() {
    return this._debug
  }
  //
  private _entities: GameEntities = {
    allEntities: []
  }
  get entities() {
    return this._entities
  }
  constructor() {
    window._game = this
    return this
  }
  public addEntity(entity: GameEntity) {
    this._entities.allEntities.push(entity)
    return this
  }
  public addEntities(entities: GameEntity[]) {
    entities.forEach((entity) => {
      this.addEntity(entity)
    })
    return this
  }
  public addEntityToSubgroup(entity: GameEntity, group: string) {
    if (!this._entities[group]) {
      this._entities[group] = []
    }
    this._entities[group].push(entity)
    return this
  }

  public addEntityToSubgroups(entity: GameEntity, subgroups: string[]) {
    subgroups.forEach((subgroup) => {
      this.addEntityToSubgroup(entity, subgroup)
    })
    return this
  }

  public removeEntityFromSubgroup(entity: GameEntity, group: string) {
    if (this._entities[group]) {
      this._entities[group] = this._entities[group].filter(
        (e) => e.uuid !== entity.uuid
      )
    }

    if (this._entities[group].length === 0) {
      delete this._entities[group]
    }
    return this
  }

  public removeEntityFromSubgroups(entity: GameEntity, subgroups: string[]) {
    subgroups.forEach((subgroup) => {
      this.removeEntityFromSubgroup(entity, subgroup)
    })
    return this
  }
}
