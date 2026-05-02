//date and time
const date_element = document.querySelector('#date_element')
const time_element = document.querySelector("#time_element")
function updateTime() {
    const date = new Date()
    const hours = date.getHours() % 12 || 12 // Changes to PM after 13
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM' // Changes AM/PM
    time_element.textContent = `${hours}:${minutes} ${ampm}`

    const options = { month: 'short', day: 'numeric' }
    date_element.textContent = date.toLocaleDateString(undefined, options)
}

updateTime()
setInterval(updateTime, 1)



//login
const form = document.querySelector('#login-form')
const login = document.querySelector('#login')
const home = document.querySelector('#home')
const toggle = document.querySelector('#togglePassword')
const loginpassword = document.querySelector('#password')
const loginemail = document.querySelector('#email')
const error = document.querySelector('#login-error')

if (toggle && password) {
    toggle.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
        password.setAttribute('type', type)
        toggle.textContent = type === 'password' ? 'Show' : 'Hide'
        toggle.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password')
    })
}
//login management
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        error.textContent = ''

        const email = loginemail.value.trim()
        const password = loginpassword.value.trim()

        if (!email) {
            error.textContent = 'Please enter your email.'
            email.focus()
            return
        }

        if (!password) {
            error.textContent = 'Please enter your password.'
            password.focus()
            return
        }

        //screen state management
        login.style.display = 'none'
        home.style.display = 'flex'
    })
}