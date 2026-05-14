const API_URL = 'https://api-027.onrender.com/'

export async function query(queryString, variables = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryString,
      variables: variables,
    }),
  })
  const { data, errors } = await response.json()
  if (errors) throw new Error(errors[0].message)
    return data
}

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

export async function getTopChart(limit = 20) {
  const data = await query(`
    query($limit: Int) {
      topChart(limit: $limit) {
        position
        song {
          title
          artist
          totalStreams
        }
      }
    }
  `, { limit })
  return data.topChart
}