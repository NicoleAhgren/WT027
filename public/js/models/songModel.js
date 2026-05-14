import { getSongs, getSongById, getTopChart } from '../api.js'

export async function fetchSongs(page = 1, limit = 20, search = '') {
  return getSongs(page, limit, search)
}

export async function fetchSongById(id) {
  return getSongById(id)
}

export async function fetchTopChart(limit = 20) {
  return getTopChart(limit)
}