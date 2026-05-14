export function renderSongs(songs, totalPages, currentPage) {
  document.querySelector('#app').innerHTML = `
    <input type="text" id="search-input" placeholder="Search songs or artists...">
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
      <p>Top 10: ${song.top10}x</p>
      <button class="add-btn" data-id="${song.id}" data-title="${song.title}" data-artist="${song.artist}">+</button>
    `
    songsContainer.appendChild(songElement)
  })

  // Pagination
  const paginationContainer = document.getElementById('pagination-container')
  paginationContainer.innerHTML = ''
  for (let i = 1; i <= totalPages; i++) {
    const pageElement = document.createElement('button')
    pageElement.textContent = i
    if (i === currentPage) {
      pageElement.disabled = true
    }
    pageElement.addEventListener('click', () => {
      // Trigger a custom event to notify the controller about the page change
      const event = new CustomEvent('pageChange', { detail: { page: i } })
      document.dispatchEvent(event)
    })
    paginationContainer.appendChild(pageElement)
  }

}