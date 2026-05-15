import { getSongs, getSongById, getTopChart } from '../api.js'

/**
 * Hämtar en paginerad lista med låtar.
 * @param {number} page - Sidnummer
 * @param {number} limit - Antal låtar per sida
 * @param {string} search - Sökterm
 * @returns {Promise<Object>} Objekt med songs, totalPages och currentPage
 */
export async function fetchSongs(page = 1, limit = 20, search = '') {
  return getSongs(page, limit, search)
}

/**
 * Hämtar en specifik låt med dess ID.
 * @param {string} id - Låtens ID
 * @returns {Promise<Object>} Låtobjekt
 */
export async function fetchSongById(id) {
  return getSongById(id)
}

/**
 * Hämtar topplistan.
 * @param {number} limit - Antal låtar att hämta
 * @returns {Promise<Array>} Lista med ChartEntry-objekt
 */
export async function fetchTopChart(limit = 20) {
  return getTopChart(limit)
}