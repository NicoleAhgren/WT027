import { getPlaylist, deleteSong, updateSong } from '../models/playlistModel.js'
import { renderPlaylist } from '../views/playlistView.js'

/**
 * Initierar spellistan. Visar inloggningsuppmaning om användaren inte är inloggad.
 */
export async function initPlaylist() {

  const res = await fetch('/auth/user')

  if (!res.ok) {
    document.querySelector('#app').innerHTML = `
      <div id="login-container">
        <p>You need to log in to create and manage your playlist.</p>
        <a href="/auth/github" id="github-login-btn">Login with GitHub</a>
      </div>
    `
    return
  }

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