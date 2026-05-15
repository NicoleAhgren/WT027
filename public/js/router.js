import { initSongs } from './controllers/songsController.js'
import { initPlaylist } from './controllers/playlistController.js'
import { initChart } from './controllers/topChartController.js'
import { initLogin } from './controllers/authController.js'

const routes = {
  '#songs': initSongs,
  '#playlist': initPlaylist,
  '#topChart': initChart,
  '#login': initLogin
}

function navigate() {
  const hash = window.location.hash || '#songs'
  const route = routes[hash]
  if (route) route()
}

window.addEventListener('hashchange', navigate)
window.addEventListener('load', navigate)