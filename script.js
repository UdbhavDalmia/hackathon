//date and time
const date_element = document.querySelector("#date_element");
const time_element = document.querySelector("#time_element");
function updateTime() {
  const date = new Date();
  const hours = date.getHours() % 12 || 12; // Changes to PM after 13
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM"; // Changes AM/PM
  time_element.textContent = `${hours}:${minutes} ${ampm}`;

  const options = { month: "short", day: "numeric" };
  date_element.textContent = date.toLocaleDateString(undefined, options);
}

updateTime();
setInterval(updateTime, 1);

//login
const form = document.querySelector("#login-form");
const login = document.querySelector("#login");
const home = document.querySelector("#home");
const toggle = document.querySelector("#togglePassword");
const loginpassword = document.querySelector("#password");
const loginemail = document.querySelector("#email");
const error = document.querySelector("#login-error");

if (toggle && loginpassword) {
  toggle.addEventListener("click", () => {
    const type =
      loginpassword.getAttribute("type") === "password" ? "text" : "password";
    loginpassword.setAttribute("type", type);
    toggle.textContent = type === "password" ? "Show" : "Hide";
    toggle.setAttribute(
      "aria-label",
      type === "password" ? "Show password" : "Hide password",
    );
  });
}
//login management
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    error.textContent = "";

    const email = loginemail.value.trim();
    const password = loginpassword.value.trim();

    if (!email) {
      error.textContent = "Please enter your email.";
      email.focus();
      return;
    }

    if (!password) {
      error.textContent = "Please enter your password.";
      password.focus();
      return;
    }

    //screen state management
    login.style.display = "none";
    home.style.display = "flex";
  });
}

//calculator
const input = document.getElementById("input");
const buttons = document.querySelectorAll("#calculator button");

if (input && (!input.value || input.value.trim() === "")) {
  input.value = "0";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const label = button.textContent.trim();

    switch (label) {
      case "CE":
        input.value = "0";
        break;
      case "DEL":
        input.value = input.value.length > 1 ? input.value.slice(0, -1) : "0";
        break;
      case "⌫":
        input.value = input.value.slice(0, -1);
        if (!input.value) input.value = "0";
        break;
      case "=": {
        const expr = input.value;
        if (/^[0-9+\-*/.()\s]+$/.test(expr)) {
          try {
            const result = Function('"use strict"; return (' + expr + ")")();
            input.value = String(result);
          } catch (_) {
            input.value = "Error";
          }
        } else {
          input.value = "Error";
        }
        break;
      }
      default:
        if (/^[0-9.]$/.test(label)) {
          if (input.value === "0" || input.value === "") {
            input.value = label;
          } else {
            input.value += label;
          }
        } else {
          // operators etc.
          if (input.value === "") input.value = "0";
          input.value += label;
        }
    }
  });
});

function toggleCalculator() {
  const calculator = document.querySelector("#calculator");
  if (calculator.style.display === "none") {
    calculator.style.display = "block";
    initDraggable();
  } else {
    calculator.style.display = "none";
  }
}

if (form) {
  form.addEventListener("submit", (e) => {
    if (input) input.value = "0";
  });
}

//gsapcalc
gsap.registerPlugin(Draggable);

function initDraggable() {
  Draggable.create("#calculator", {
    type: "x,y",
    edgeResistance: 0.65,
    bounds: "#desktop",
    inertia: true,
    handle: "#calc-header",
    onPress: function () {
      gsap.set(this.target, { zIndex: 100 });
      document.querySelectorAll("#desktop > div").forEach((el) => {
        if (el !== this.target) gsap.set(el, { zIndex: 10 });
      });
    },
  });
}

//kalendar
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const now = new Date();
let current = { month: now.getMonth(), year: now.getFullYear() };

function getcalendar() {
  const { month, year } = current;
  document.getElementById("month-name").textContent = months[month];
  document.getElementById("year").textContent = year;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const grid = document.getElementById("days-grid");
  grid.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    const isToday =
      d === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear();
    const isSunday = (firstDay + d - 1) % 7 === 0;

    cell.className = `day-cell flex items-center justify-center h-9 w-9 mx-auto text-sm cursor-pointer rounded-full
          ${isToday ? "today font-semibold" : isSunday ? "text-red-400 hover:bg-red-50" : "text-slate-700 hover:bg-slate-100"}`;
    cell.textContent = d;
    grid.appendChild(cell);
  }

  // Today label
  const todayStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  document.getElementById("today-label").textContent = todayStr;
}

document.getElementById("prev").addEventListener("click", () => {
  current.month--;
  if (current.month < 0) {
    current.month = 11;
    current.year--;
  }
  getcalendar();
});

document.getElementById("next").addEventListener("click", () => {
  current.month++;
  if (current.month > 11) {
    current.month = 0;
    current.year++;
  }
  getcalendar();
});

document.getElementById("today-btn").addEventListener("click", () => {
  current = { month: now.getMonth(), year: now.getFullYear() };
  getcalendar();
});

getcalendar();

function toggleCalendar() {
  const calendar = document.querySelector("#calendar");
  calendar.classList.toggle("hidden");
  if (!calendar.classList.contains("hidden")) {
    getcalendar();
    initCalendarDraggable();
  }
}

function initCalendarDraggable() {
  Draggable.create("#calendar", {
    type: "x,y",
    edgeResistance: 0.65,
    bounds: "#desktop",
    inertia: true,
    handle: "#calendar-header",
    onPress: function () {
      gsap.set(this.target, { zIndex: 100 });
      document.querySelectorAll("#desktop > div").forEach((el) => {
        if (el !== this.target) gsap.set(el, { zIndex: 10 });
      });
    },
  });
}

//start
function toggleStartMenu() {
  const startMenu = document.querySelector("#start-menu");
  startMenu.classList.toggle("opacity-0");
  startMenu.classList.toggle("translate-y-10");
  startMenu.classList.toggle("pointer-events-none")
}

document.addEventListener("click", (e) => {
  const startMenu = document.getElementById("start-menu");
  const startBtn = document.getElementById("start-menu-btn");

  if (startMenu && !startMenu.classList.contains("opacity-0")) {
    if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
      startMenu.classList.add("opacity-0");
    }
  }
});
