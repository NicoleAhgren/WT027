export function renderSongs(songs, totalPages, currentPage) {
  document.querySelector('#app').innerHTML = `
    <div id="search-bar">
      <input type="text" id="search-input" placeholder="Search songs or artists...">
      <button id="search-btn"><img src="images/search-icon.png" alt="🔍" class="search-icon" onerror="this.style.display='none';this.parentElement.textContent='🔍'"></button>
    </div>
    <div id="songs-container"></div>
    <div id="pagination-container"></div>
  `

  const songsContainer = document.querySelector('#songs-container')
  songs.forEach(song => {
    const songElement = document.createElement('div')
    songElement.classList.add('song')
    songElement.innerHTML = `
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <p>${song.totalStreams} streams</p>
      <p>Top 10: ${song.top10 ?? 0}x</p>
      <button class="add-btn" data-id="${song.id}" data-title="${song.title}" data-artist="${song.artist}" data-streams="${song.totalStreams}">+</button>
    `
    songsContainer.appendChild(songElement)
  })

  // Pagination
  const paginationContainer = document.getElementById('pagination-container')
  paginationContainer.innerHTML = ''

  const pages = new Set([1, totalPages])
  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
    pages.add(i)
  }
  const sorted = [...pages].sort((a, b) => a - b)
  const pageList = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) pageList.push('...')
    pageList.push(sorted[i])
  }

  pageList.forEach(page => {
    if (page === '...') {
      const dots = document.createElement('span')
      dots.textContent = '...'
      paginationContainer.appendChild(dots)
    } else {
      const btn = document.createElement('button')
      btn.textContent = page
      btn.disabled = page === currentPage
      btn.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('pageChange', { detail: { page } }))
      })
      paginationContainer.appendChild(btn)
    }
  })

}