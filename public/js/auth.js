async function checkAuth() {
  const response = await fetch('/auth/user')
  if (response.ok) {
    const user = await response.json()
    document.querySelector('#user-info').innerHTML = `
      <img src="${user.avatar}" alt="Avatar" width="30" height="30">
      <span>${user.name}</span>
      <a href="/auth/logout" id="logout-btn">Logout</a>
    `
  } else {
    document.querySelector('#user-info').innerHTML = `
      <a href="/auth/github" id="login-btn">Login</a>
    `
  }
}

checkAuth()