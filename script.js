const date = document.querySelector('#date')
const time = document.querySelector("#time")

function updateTime() {
    const now = new Date()
    const hours = now.getHours() % 12 || 12 // Changes to PM after 13
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM' // Changes AM/PM
    time.textContent = `${hours}:${minutes} ${ampm}`

    const options = { month: 'short', day: 'numeric' }
    date.textContent = now.toLocaleDateString(undefined, options)
}

updateTime()
setInterval(updateTime, 1)