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

  const lockscreentime = document.getElementById("lockscreentime");
  lockscreentime.textContent = `${hours}:${minutes}`;

  const options = { month: "short", day: "numeric" };
  date_element.textContent = date.toLocaleDateString(undefined, options);
}

updateTime();
setInterval(updateTime, 1);

//login screen change
function unlockScreen() {
  document
    .getElementById("lockscreen")
    .classList.add("opacity-0", "translate-y-10", "pointer-events-none");
  document
    .getElementById("bluroverlay")
    .classList.replace("bg-black/0", "bg-black/40");
  document
    .getElementById("bluroverlay")
    .classList.replace("backdrop-blur-none", "backdrop-blur-xl");
  document
    .getElementById("logincontainer")
    .classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
}

function lockScreen() {
  document
    .getElementById("lockscreen")
    .classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
  document
    .getElementById("bluroverlay")
    .classList.replace("bg-black/40", "bg-black/0");
  document
    .getElementById("bluroverlay")
    .classList.replace("backdrop-blur-xl", "backdrop-blur-none");
  document
    .getElementById("logincontainer")
    .classList.add("opacity-0", "translate-y-10", "pointer-events-none");
  document.getElementById("home").style.display = "none";
  const loginSection = document.getElementById("login");
  loginSection.style.display = "block";
  loginSection.classList.remove("hidden");
  document.querySelector("#password").value = "";
  document.querySelector("#email").value = "";
}

//login setup
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
  calculator.classList.toggle("opacity-0");
  calculator.classList.toggle("pointer-events-none");
  calculator.classList.toggle("scale-95");
  if (!calculator.classList.contains("opacity-0")) {
    initDraggable();
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
    dragClickables: false,
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

  const grid = document.getElementById("daygrid");
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

    cell.className = `calendercells flex items-center justify-center h-9 w-9 mx-auto text-sm cursor-pointer rounded-full
          ${isToday ? "today font-semibold" : isSunday ? "text-red-400 hover:bg-red-50" : "text-slate-700 hover:bg-slate-100"}`;
    cell.textContent = d;
    grid.appendChild(cell);
  }

  const todayStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  document.getElementById("today-label").textContent = todayStr;
}

// calendeer nav buttons
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

//calender gsap and visibility
function toggleCalendar() {
  const calendar = document.querySelector("#calendar");
  calendar.classList.toggle("opacity-0");
  calendar.classList.toggle("pointer-events-none");
  calendar.classList.toggle("scale-95");
  if (!calendar.classList.contains("opacity-0")) {
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
    dragClickables: false,
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
  startMenu.classList.toggle("pointer-events-none");
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

//notepad

let activeId = null;
let isDirty = false;

const editor = document.getElementById("editor");
const titleBar = document.getElementById("titleBar");
const wordCount = document.getElementById("wordCount");

window.onload = () => {
  const notes = getNotes();
  if (notes.length > 0) loadNote(notes[0]);
};

function getNotes() {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("note:"))
    .map((key) => JSON.parse(localStorage.getItem(key)))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

function saveNote() {
  const text = editor.value.trim();
  if (!text) return showToast("Nothing to save!");

  activeId = activeId || `note:${Date.now()}`;
  const note = {
    id: activeId,
    title: text.split("\n")[0].substring(0, 20) || "Untitled",
    body: editor.value,
    updatedAt: Date.now(),
  };

  localStorage.setItem(activeId, JSON.stringify(note));
  isDirty = false;
  updateUI();
  showToast("Saved successfully.");
}

function loadNote(note) {
  activeId = note.id;
  editor.value = note.body;
  isDirty = false;
  toggleModal("notesModal", false);
  updateUI();
}

function deleteNote() {
  if (!activeId) return;
  localStorage.removeItem(activeId);
  activeId = null;
  editor.value = "";
  updateUI();
  showToast("Note deleted.");
}

function updateUI() {
  const note = getNotes().find((n) => n.id === activeId);
  titleBar.innerText = `${isDirty ? "* " : ""}${note ? note.title : "Untitled"} — Notepad`;

  const words = editor.value.trim()
    ? editor.value.trim().split(/\s+/).length
    : 0;
  wordCount.innerText = `${words} word${words !== 1 ? "s" : ""}`;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2500);
}

function toggleModal(modalId, show) {
  if (modalId === "notesModal" && show) renderNotesList();
  document.getElementById(modalId).classList.toggle("hidden", !show);
}

function renderNotesList() {
  const list = document.getElementById("notesList");
  const notes = getNotes();

  if (notes.length === 0) {
    list.innerHTML = `<p class="text-xs text-slate-400 p-4">No saved notes.</p>`;
    return;
  }

  list.innerHTML = notes
    .map(
      (note) => `
                <div class="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50" onclick='loadNoteById("${note.id}")'>
                    <p class="text-sm text-slate-700 font-medium">${note.title}</p>
                    <p class="text-xs text-slate-400">${new Date(note.updatedAt).toLocaleDateString("en-IN")}</p>
                </div>
            `,
    )
    .join("");
}

function loadNoteById(id) {
  const note = JSON.parse(localStorage.getItem(id));
  if (note) loadNote(note);
}

editor.addEventListener("input", () => {
  isDirty = true;
  updateUI();
});

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    saveNote();
  }
});

//notes gsap and toggle
function toggleNotes() {
  const note = document.querySelector("#notepad");
  note.classList.toggle("opacity-0");
  note.classList.toggle("pointer-events-none");
  note.classList.toggle("scale-95");
  if (!note.classList.contains("opacity-0")) {
    renderNotesList();
    initNotesDraggable();
  }
}

function initNotesDraggable() {
  Draggable.create("#notepad", {
    type: "x,y",
    edgeResistance: 0.65,
    bounds: "#desktop",
    inertia: true,
    handle: "#notes-header",
    dragClickables: false,
    onPress: function () {
      gsap.set(this.target, { zIndex: 100 });
      document.querySelectorAll("#desktop > div").forEach((el) => {
        if (el !== this.target) gsap.set(el, { zIndex: 10 });
      });
    },
  });
}

//settings
function showTab(tab) {
  const sections = document.querySelectorAll(".tab-content");
  sections.forEach((sec) => (sec.style.display = "none"));

  document.getElementById(tab + "-section").style.display = "block";

  const buttons = document.querySelectorAll(".side-menu button");
  buttons.forEach((btn) => btn.classList.remove("active-tab"));

  event.target.classList.add("active-tab");
}

function changeBg(imgurl) {
  const home = document.getElementById("home");
  home.style.backgroundImage = `url('${imgurl}')`;
  home.style.backgroundSize = "cover";
  home.style.backgroundPosition = "center";
}

showTab("about");

//setting gsap and toggle
function togglesettings() {
  const settings = document.querySelector("#settings");
  settings.classList.toggle("opacity-0");
  settings.classList.toggle("pointer-events-none");
  settings.classList.toggle("scale-95");
  if (!settings.classList.contains("opacity-0")) {
    initsettingsDraggable();
  }
}

function initsettingsDraggable() {
  Draggable.create("#settings", {
    type: "x,y",
    edgeResistance: 0.65,
    bounds: "#desktop",
    inertia: true,
    handle: "#settings-header",
    dragClickables: false,
    onPress: function () {
      gsap.set(this.target, { zIndex: 100 });
      document.querySelectorAll("#desktop > div").forEach((el) => {
        if (el !== this.target) gsap.set(el, { zIndex: 10 });
      });
    },
  });
}

//status tray
function toggleStatusTray() {
  const tray = document.querySelector("#statustray");
  const soundTray = document.querySelector("#soundtray");

  tray.classList.toggle("opacity-0");
  tray.classList.toggle("pointer-events-none");
  tray.classList.toggle("scale-95");

  if (tray.classList.contains("opacity-0")) {
    soundTray.classList.add("opacity-0", "pointer-events-none", "scale-90");
  }
}

function toggleSoundTray() {
  const soundTray = document.querySelector("#soundtray");
  const soundtraybutton = document.querySelector("#soundtraybutton");
  soundTray.classList.toggle("opacity-0");
  soundTray.classList.toggle("pointer-events-none");
  soundTray.classList.toggle("scale-90");
  soundtraybutton.classList.toggle("fa-chevron-up");
  soundtraybutton.classList.toggle("fa-chevron-down");
}
