import { fetchTopChart} from '../models/songModel.js'
import { renderChart } from '../views/topChartView.js'

export async function initChart() {
    const data = await fetchTopChart(20)
    renderChart(data)
}