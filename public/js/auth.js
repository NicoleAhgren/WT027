/**
 * Kontrollerar om användaren är inloggad och uppdaterar navbaren.
 * Visar namn, avatar och logout-knapp om inloggad, annars login-knapp.
 */
async function checkAuth() {
  const response = await fetch('/auth/user')
  if (response.ok) {
    const user = await response.json()
    document.querySelector('#user-info').innerHTML = `
    <span>${user.name}</span>
      <img src="${user.avatar}" alt="Avatar" width="35" height="35">
      <a href="/auth/logout" id="logout-btn">Logout</a>
    `
  } else {
    document.querySelector('#user-info').innerHTML = `
      <a href="/auth/github" id="login-btn">Login</a>
    `
  }
}

checkAuth()