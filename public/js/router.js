import { initSongs } from './controllers/songsController.js'

const routes = {
  '#songs': initSongs,
}

function navigate() {
  const hash = window.location.hash || '#songs'
  const route = routes[hash]
  if (route) route()
}

window.addEventListener('hashchange', navigate)
window.addEventListener('load', navigate)