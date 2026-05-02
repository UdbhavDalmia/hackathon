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