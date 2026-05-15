/**
 * Hämtar spellistan från localStorage.
 * @returns {Array} Lista med låtobjekt
 */
export function getPlaylist() {
  return JSON.parse(localStorage.getItem('playlist') || '[]')
}

/**
 * Lägger till en låt i spellistan om den inte redan finns.
 * @param {{id: string, title: string, artist: string, totalStreams: string}} song - Låten som ska läggas till
 */
export function addSong(song) {
  const playlist = getPlaylist()
  if (!playlist.some(s => s.id === song.id)) {
    playlist.push(song)
    localStorage.setItem('playlist', JSON.stringify(playlist))
  }
}

/**
 * Uppdaterar en låt i spellistan.
 * @param {string} id - ID på låten som ska uppdateras
 * @param {Object} updatedSong - Fälten som ska uppdateras
 */
export function updateSong(id, updatedSong) {
  const playlist = getPlaylist()
  const index = playlist.findIndex(s => s.id === id)
  if (index !== -1) {
    playlist[index] = { ...playlist[index], ...updatedSong }
    localStorage.setItem('playlist', JSON.stringify(playlist))
  }
}

/**
 * Tar bort en låt från spellistan.
 * @param {string} id - ID på låten som ska tas bort
 */
export function deleteSong(id) {
  const playlist = getPlaylist()
  const updated = playlist.filter(s => s.id !== id)
  localStorage.setItem('playlist', JSON.stringify(updated))
}