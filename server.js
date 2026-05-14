import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import axios from 'axios'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(express.static(join(__dirname, 'public')))

app.get('/auth/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user`)
})

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query

  const tokenRes = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }, { headers: { Accept: 'application/json' } })

  const accessToken = tokenRes.data.access_token

  const userRes = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  req.session.user = {
    name: userRes.data.name || userRes.data.login,
    avatar: userRes.data.avatar_url
  }

  res.redirect('/#songs')
})

app.get('/auth/user', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.status(401).json(null)
  }
})

app.get('/auth/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/#songs')
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
