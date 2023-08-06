import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import type { Game } from './game'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

declare global {
  interface Window {
    _game: Game
  }
}
