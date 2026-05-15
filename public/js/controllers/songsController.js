import { fetchSongs } from '../models/songModel.js'
import { renderSongs } from '../views/songsView.js'
import { addSong, getPlaylist } from '../models/playlistModel.js'

export function initSongs() {
  let currentPage = 1
  let currentSearch = ''

  async function load() {
    const data = await fetchSongs(currentPage, 20, currentSearch)
    renderSongs(data.songs, data.totalPages, data.currentPage)
    setupAddButtons()
  }

  function setupAddButtons() {
    const playlist = getPlaylist()
    document.querySelectorAll('.add-btn').forEach(button => {
      const songId = button.getAttribute('data-id')
      if (playlist.some(s => s.id === songId)) {
        button.classList.add('added')
      }
      button.addEventListener('click', () => {
        const songTitle = button.getAttribute('data-title')
        const songArtist = button.getAttribute('data-artist')
        const songStreams = button.getAttribute('data-streams')
        addSong({ id: songId, title: songTitle, artist: songArtist, totalStreams: songStreams })
        button.classList.add('added')
      })
    })
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.id === 'search-input') {
      currentSearch = e.target.value
      currentPage = 1
      load()
    }
  })

  document.addEventListener('click', (e) => {
    if (e.target.id === 'search-btn') {
      currentSearch = document.querySelector('#search-input').value
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