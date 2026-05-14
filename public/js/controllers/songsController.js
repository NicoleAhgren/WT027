import { fetchSongs } from '../models/songModel.js'
import { renderSongs } from '../views/songsView.js'

export function initSongs() {
  let currentPage = 1
  let currentSearch = ''

  async function load() {
    const data = await fetchSongs(currentPage, 20, currentSearch)
    renderSongs(data.songs, data.totalPages, data.currentPage)
    setupAddButtons()
  }

  function setupAddButtons() {
    document.querySelectorAll('.add-btn').forEach(button => {
      button.addEventListener('click', () => {
        const songId = button.getAttribute('data-id')
        const songTitle = button.getAttribute('data-title')
        const songArtist = button.getAttribute('data-artist')
        console.log('Add to playlist:', songTitle, songArtist, songId)
      })
    })
  }

  document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') {
      currentSearch = e.target.value
      currentPage = 1
      load()
    }
  })

  document.addEventListener('pageChange', (e) => {
    currentPage = e.detail.page
    load()
  })

  load()
}