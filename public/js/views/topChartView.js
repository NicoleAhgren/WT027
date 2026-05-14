export function renderChart(songs) {
document.querySelector('#app').innerHTML = `
  <div style="display: flex; gap: 20px;">
    <div id="chart-container">
      <canvas id="chart"></canvas>
    </div>
    <div id="song-detail" style="display: none;">
      <h2 id="detail-title"></h2>
      <p id="detail-artist"></p>
      <p id="detail-streams"></p>
      <p id="detail-top10"></p>
      <p id="detail-peak"></p>
      <button id="detail-add-btn">+ Add to playlist</button>
    </div>
  </div>
`

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
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.2)',
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index
          const song = songs[index].song
          showDetail(song)
        }
      }
    }
  })

  function showDetail(song) {
    const panel = document.getElementById('song-detail')
    const btn = document.getElementById('detail-add-btn')
    
    panel.style.display = 'block'
    document.getElementById('detail-title').textContent = song.title
    document.getElementById('detail-artist').textContent = song.artist
    document.getElementById('detail-streams').textContent = `Streams: ${song.totalStreams}`
    document.getElementById('detail-top10').textContent = `Top 10: ${song.top10 ?? 0}x`
    document.getElementById('detail-peak').textContent = `Peak position: ${song.peakPosition ?? '-'}`

    btn.dataset.title = song.title
    btn.dataset.artist = song.artist
    btn.dataset.streams = song.totalStreams
  }
}
