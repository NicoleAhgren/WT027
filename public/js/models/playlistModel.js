export function getPlaylist() {
  return JSON.parse(localStorage.getItem('playlist') || '[]')
}

export function addSong(song) {
  const playlist = getPlaylist()
  if (!playlist.some(s => s.id === song.id)) {
    playlist.push(song)
    localStorage.setItem('playlist', JSON.stringify(playlist))
  }
}

export function updateSong(id, updatedSong) {
  const playlist = getPlaylist()
  const index = playlist.findIndex(s => s.id === id)
  if (index !== -1) {
    playlist[index] = { ...playlist[index], ...updatedSong }
    localStorage.setItem('playlist', JSON.stringify(playlist))
  }
}

export function deleteSong(id) {
  const playlist = getPlaylist()
  const updated = playlist.filter(s => s.id !== id)
  localStorage.setItem('playlist', JSON.stringify(updated))
}