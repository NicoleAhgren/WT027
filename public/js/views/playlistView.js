export function renderPlaylist(playlist) {
  const container = document.querySelector('#app')

  if (playlist.length === 0) {
    container.innerHTML = '<p>Your playlist is empty!</p>'
    return
  }

  container.innerHTML = `<div id="songs-container">` + playlist.map(song => `
    <div class="song" data-id="${song.id}">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <p>${song.totalStreams} streams</p>
      <div class="btn-row">
        <button class="favorite-btn" data-id="${song.id}">${song.favorite ? '❤️' : '🤍'}</button>
        <button class="delete-btn" data-id="${song.id}">🗑️</button>
      </div>
    </div>
  `).join('')
}