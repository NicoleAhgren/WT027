export function renderLogin() {
  document.querySelector('#app').innerHTML = `
    <div id="login-container">
      <h1>Welcome to Streamify</h1>
      <p>Login to save your playlist!</p>
      <a href="/auth/github" id="github-login-btn">Login with GitHub</a>
    </div>
  `
}