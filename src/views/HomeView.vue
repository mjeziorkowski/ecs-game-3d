<script setup lang="ts">
import { Game } from '@/game'
import { ActiveComponent } from '@/game/components/ActiveComponent'
import type { GameComponent } from '@/game/components/GameComponent'
import { PositionComponent } from '@/game/components/PositionComponent'
import { VelocityComponent } from '@/game/components/VelocityComponent'
import { GameEntity } from '@/game/entities/GameEntity'
import { getAllPossibleComponentsCombinations } from '@/game/utils'
import { onMounted } from 'vue'

const game = new Game()
game.addEntity(
  new GameEntity('Player1').addComponents([
    new ActiveComponent(),
    new PositionComponent(0, 0, 0),
    new VelocityComponent(0, 0, 0)
  ])
)

console.log(window._game.entities['VelocityComponent'])
let entity = game.entities['allEntities'][0]
onMounted(() => {
  entity.removeComponents([VelocityComponent])
  console.log(window._game.entities['VelocityComponent'])
})
</script>

<template>
  <main></main>
</template>
