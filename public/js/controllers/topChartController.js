import { fetchTopChart} from '../models/songModel.js'
import { renderChart } from '../views/topChartView.js'
import { addSong, getPlaylist } from '../models/playlistModel.js'

/**
 * Initierar toppchart-sidan med stapeldiagram och lägg-till-funktion.
 */
export async function initChart() {
    document.querySelector('#app').innerHTML = '<div id="loading">Loading...</div>'
    const data = await fetchTopChart(20)
    renderChart(data, getPlaylist)

    document.addEventListener('click', async (e) => {
      if (e.target.id === 'detail-add-btn') {
        const res = await fetch('/auth/user')
        if (!res.ok) return window.location.hash = '#playlist'
        addSong({
          id: e.target.dataset.id,
          title: e.target.dataset.title,
          artist: e.target.dataset.artist,
          totalStreams: e.target.dataset.streams,
        })
        e.target.classList.add('added')
      }
    })
  }
