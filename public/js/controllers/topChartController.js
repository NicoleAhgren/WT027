import { fetchTopChart} from '../models/songModel.js'
import { renderChart } from '../views/topChartView.js'
import { addSong } from '../models/playlistModel.js'

export async function initChart() {
    const data = await fetchTopChart(20)
    renderChart(data)

    document.addEventListener('click', (e) => {
      if (e.target.id === 'detail-add-btn') {
        addSong({
          title: e.target.dataset.title,
          artist: e.target.dataset.artist,
          totalStreams: e.target.dataset.streams,
        })
      }
    })
}