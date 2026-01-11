// Simple login script: client-side validation + mock auth
const form = document.getElementById('loginForm')
const emailInput = document.getElementById('email')
const pwdInput = document.getElementById('password')
const toggleBtn = document.getElementById('togglePwd')
const rememberChk = document.getElementById('remember')
const messageEl = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')

// Demo credentials
const DEMO_EMAIL = 'user@example.com'
const DEMO_PWD = 'password123'

// Initialize from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('rememberedEmail')
  if (saved) {
    emailInput.value = saved
    rememberChk.checked = true
  }
})

// Toggle password visibility
toggleBtn.addEventListener('click', () => {
  const showing = pwdInput.type === 'text'
  pwdInput.type = showing ? 'password' : 'text'
  toggleBtn.textContent = showing ? 'Show' : 'Hide'
  toggleBtn.setAttribute('aria-pressed', String(!showing))
})

function validate(){
  if (!emailInput.value) return 'Email is required.'
  // very small email check
  if (!/\S+@\S+\.\S+/.test(emailInput.value)) return 'Enter a valid email.'
  if (!pwdInput.value) return 'Password is required.'
  if (pwdInput.value.length < 6) return 'Password must be at least 6 characters.'
  return ''
}

async function handleSubmit(e){
  e.preventDefault()
  messageEl.textContent = ''
  messageEl.classList.remove('success')

  const v = validate()
  if (v){ messageEl.textContent = v; return }

  // disable UI while "authenticating"
  submitBtn.disabled = true
  submitBtn.textContent = 'Signing in...'

  // mock network delay
  await new Promise(r => setTimeout(r, 700))

  // mock auth
  if (emailInput.value === DEMO_EMAIL && pwdInput.value === DEMO_PWD){
    messageEl.textContent = 'Login successful (mock)'
    messageEl.classList.add('success')

    if (rememberChk.checked) localStorage.setItem('rememberedEmail', emailInput.value)
    else localStorage.removeItem('rememberedEmail')

    // simulate redirect after a short delay
    setTimeout(() => {
      // for the demo we simply show a tiny dashboard replacement
      document.body.innerHTML = `\n        <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">\n          <div style=\"max-width:780px;padding:28px;text-align:center;\">\n            <h1>Welcome</h1>\n            <p>You are signed in as <strong>${escapeHtml(emailInput.value)}</strong>.</p>\n            <p><button id=\"signOut\" class=\"primary\">Sign out</button></p>\n          </div>\n        </main>\n      `
      // re-add styles for sign out button
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'simple-login.css'
      document.head.appendChild(link)
      document.getElementById('signOut').addEventListener('click', () => location.reload())
    }, 700)

  } else {
    messageEl.textContent = 'Invalid email or password.'
  }

  submitBtn.disabled = false
  submitBtn.textContent = 'Sign in'
}

form.addEventListener('submit', handleSubmit)

// small helper to escape text into HTML
function escapeHtml(str){
  return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]))
}