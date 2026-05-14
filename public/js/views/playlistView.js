export function renderPlaylist(playlist) {
  const container = document.querySelector('#app')

  if (playlist.length === 0) {
    container.innerHTML = '<p>Your playlist is empty!</p>'
    return
  }

  container.innerHTML = playlist.map(song => `
    <div class="song" data-id="${song.id}">
      <h3>${song.title} - ${song.artist}</h3>
      <p>Total Streams: ${song.totalStreams}</p>
      <button class="favorite-btn" data-id="${song.id}">${song.favorite ? '❤️' : '🤍'}</button>
      <button class="delete-btn" data-id="${song.id}">🗑️</button>
    </div>
  `).join('')
}