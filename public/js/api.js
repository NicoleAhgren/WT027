const API_URL = 'https://api-027.onrender.com/'

let cachedToken = null

/**
 * Hämtar JWT från servern och cachar den för efterföljande anrop.
 * @returns {Promise<string|null>} JWT-token eller null om ej inloggad
 */
async function getToken() {
  if (cachedToken) return cachedToken
  const res = await fetch('/auth/token')
  if (res.ok) {
    const data = await res.json()
    cachedToken = data.token
  }
  return cachedToken
}

/**
 * Skickar en GraphQL-förfrågan till API:et.
 * @param {string} queryString - GraphQL-frågan
 * @param {Object} variables - Variabler till frågan
 * @returns {Promise<Object>} Svarsdatan från API:et
 */
export async function query(queryString, variables = {}) {
  const token = await getToken()
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: queryString,
      variables: variables,
    }),
  })
  const { data, errors } = await response.json()
  if (errors) throw new Error(errors[0].message)
  return data
}

/**
 * Hämtar en paginerad lista med låtar.
 * @param {number} page - Sidnummer
 * @param {number} limit - Antal låtar per sida
 * @param {string} search - Sökterm för filtrering
 * @returns {Promise<Object>} Objekt med songs, totalPages och currentPage
 */
export async function getSongs(page = 1, limit = 20, search = "") {
  const data = await query(`
    query($page: Int, $limit: Int, $search: String) {
      songs(page: $page, limit: $limit, search: $search) {
        songs {
          id
          title
          artist
          totalStreams
          top10
          }
          totalPages
          currentPage
          }
  }  `,
    { page, limit, search },)
  return data.songs
}

/**
 * Hämtar en specifik låt med dess ID.
 * @param {string} id - Låtens ID
 * @returns {Promise<Object>} Låtobjekt
 */
export async function getSongById(id) {
  const data = await query(`
    query($id: ID!) {
      song(id: $id) {
        id
        title
        artist
        totalStreams
        }
  }  `,
    { id },)
  return data.song
}

/**
 * Hämtar en paginerad lista med artister.
 * @param {number} page - Sidnummer
 * @param {number} limit - Antal artister per sida
 * @returns {Promise<Array>} Lista med artistobjekt
 */
export async function getArtists(page = 1, limit = 20 ) {
  const data = await query(`
    query($page: Int, $limit: Int) {
      artists(page: $page, limit: $limit) {
        name
        totalStreams
      }
    }
  `, { page, limit})
  return data.artists
}

/**
 * Hämtar en specifik artist med dess namn.
 * @param {string} name - Artistens namn
 * @returns {Promise<Object>} Artistobjekt med låtar och statistik
 */
export async function getArtistByName(name) {
  const data = await query(`
    query($name: String!) {
      artist(name: $name) {
        name
        numberOfSongs
        totalStreams
        songs {
          id
          title
          totalStreams
        }
      }
    }
  `, { name })
  return data.artist
}

/**
 * Hämtar topplistan med de mest streamade låtarna.
 * @param {number} limit - Antal låtar att hämta
 * @returns {Promise<Array>} Lista med ChartEntry-objekt (position + song)
 */
export async function getTopChart(limit = 20) {
  const data = await query(`
    query($limit: Int) {
      topChart(limit: $limit) {
        position
        song {
          id
          title
          artist
          totalStreams
          peakPosition
          top10
          daysReleased
        }
      }
    }
  `, { limit })
  return data.topChart
}