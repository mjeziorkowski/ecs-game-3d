import type { GameEntity } from './entities/GameEntity'

export type GameEntities = {
  allEntities: GameEntity[]
  [key: string]: GameEntity[]
}
