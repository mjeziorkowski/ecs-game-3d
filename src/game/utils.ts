import type { GameComponent } from './components/GameComponent'

export function getAllPossibleComponentsCombinations(
  components: GameComponent[]
): string[] {
  const result: GameComponent[][] = []
  const f = (prefix: GameComponent[], components: GameComponent[]) => {
    for (let i = 0; i < components.length; i++) {
      result.push([...prefix, components[i]])
      f([...prefix, components[i]], components.slice(i + 1))
    }
  }
  f([], components)
  return result
    .map((components) => {
      return components
        .map((component) => component.constructor.name)
        .sort((a, b) => a.localeCompare(b))
        .join('-')
    })
    .sort((a, b) => a.localeCompare(b))
}
