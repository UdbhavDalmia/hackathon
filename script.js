const date_element = document.querySelector('#date_element')
const time_element = document.querySelector("#time_element")

function updateTime() {
    const date = new Date()
    const hours = date.getHours() % 12 || 12 // Changes to PM after 13
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM' // Changes AM/PM
    time_element.textContent = `${hours}:${minutes} ${ampm}`

    const options = { month: 'short', day: 'numeric' }
    date_element.textContent = date.toLocaleDateString(undefined, options)
}

updateTime()
setInterval(updateTime, 1)

// --- Login form handling ---
const loginForm = document.querySelector('#login-form')
const loginDiv = document.querySelector('#login')
const homeDiv = document.querySelector('#home')
const togglePasswordBtn = document.querySelector('#togglePassword')
const passwordInput = document.querySelector('#password')
const emailInput = document.querySelector('#email')
const loginError = document.querySelector('#login-error')

if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
        passwordInput.setAttribute('type', type)
        togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide'
        togglePasswordBtn.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password')
    })
}

// Simple client-side "authentication": require non-empty values. Replace with real auth as needed.
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        loginError.textContent = ''

        const email = emailInput.value.trim()
        const password = passwordInput.value.trim()

        if (!email) {
            loginError.textContent = 'Please enter your email.'
            emailInput.focus()
            return
        }

        if (!password) {
            loginError.textContent = 'Please enter your password.'
            passwordInput.focus()
            return
        }

        // For this demo we'll accept any non-empty email/password as success.
        loginDiv.style.display = 'none'
        homeDiv.style.display = 'flex'
    })
}