import { getPlaylist, deleteSong, updateSong } from '../models/playlistModel.js'
import { renderPlaylist } from '../views/playlistView.js'

export function initPlaylist() {
  const playlist = getPlaylist()
  renderPlaylist(playlist)


  document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', () => {
      const playlist = getPlaylist()
      const songId = button.getAttribute('data-id')
      const song = playlist.find(s => s.id === songId)

      updateSong(songId, { favorite: !song.favorite })
      initPlaylist()
    })
  })

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
      const songId = button.getAttribute('data-id')
      deleteSong(songId)
      initPlaylist()
    })
  })

}