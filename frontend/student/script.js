const BASE_URL = "http://localhost:5000";

//register
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    try {
      const res = await fetch(`${BASE_URL}/student/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.text();
      alert(result);
      window.location.href = "login.html";
    } catch (err) {
      console.error(err);
    }
  });
}

//login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    try {
      const res = await fetch(`${BASE_URL}/student/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.success) {
         localStorage.setItem("token", result.token);
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  });
}

//load events
async function loadEvents() {
  const eventContainer = document.getElementById("eventContainer");

  if (!eventContainer) return;

  try {
    const res = await fetch(`${BASE_URL}/events`);
    const events = await res.json();

    eventContainer.innerHTML = "";

    events.forEach(event => {
      const card = `
        <div class="col-md-4">
          <div class="card event-card">
            <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p>${event.description}</p>
              <p><strong>Date:</strong> ${event.date}</p>
              <p><strong>Time:</strong> ${event.time}</p>
              <button class="btn btn-primary" onclick="registerEvent(${event.id})">
                Register
              </button>
            </div>
          </div>
        </div>
      `;
      eventContainer.innerHTML += card;
    });

  } catch (err) {
    console.error(err);
  }
}

//register event
async function registerEvent(eventId) {
  const studentId = localStorage.getItem("studentId");

  if (!studentId) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/register-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ student_id: studentId, event_id: eventId })
    });

    const result = await res.text();
    alert(result);

  } catch (err) {
    console.error(err);
  }
}

//load events on dashboard
loadEvents();