export function renderChart(songs) {
document.querySelector('#app').innerHTML = `<canvas id="chart"></canvas>`

const ctx = document.getElementById('chart').getContext('2d')

 new Chart(ctx, {
    type: 'bar',
    data: {
      labels: songs.map(s => s.song.title),
      datasets: [{
        label: 'Total Streams',
        data: songs.map(s => s.song.totalStreams),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  })
}
