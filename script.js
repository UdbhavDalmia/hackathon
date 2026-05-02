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

//gsap
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
