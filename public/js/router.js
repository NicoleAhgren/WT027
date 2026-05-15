import { initSongs } from './controllers/songsController.js'
import { initPlaylist } from './controllers/playlistController.js'
import { initChart } from './controllers/topChartController.js'

const routes = {
  '#songs': initSongs,
  '#playlist': initPlaylist,
  '#topChart': initChart,
}

/**
 * Navigerar till rätt vy baserat på URL-hashens värde.
 */
function navigate() {
  const hash = window.location.hash || '#songs'
  const route = routes[hash]
  if (route) route()
}

window.addEventListener('hashchange', navigate)
window.addEventListener('load', navigate)