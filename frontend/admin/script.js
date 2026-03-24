const BASE_URL = "http://localhost:5000";

//admin login form
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    };

    try {
      const res = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.success) {
        localStorage.setItem("adminId", result.admin.id);
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials");
      }

    } catch (err) {
      console.error(err);
    }
  });
}

//create event by admin
const createEventForm = document.getElementById("createEventForm");

if (createEventForm) {
  createEventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value
    };

    try {
      const res = await fetch(`${BASE_URL}/events`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });

      const result = await res.text();
      alert(result);
      window.location.href = "dashboard.html";

    } catch (err) {
      console.error(err);
    }
  });
}

//loading of event
async function loadEvents() {
  const container = document.getElementById("eventList");
  if (!container) return;

  try {
    const res = await fetch(`${BASE_URL}/events`);
    const events = await res.json();

    container.innerHTML = "";

    events.forEach(event => {
      const card = `
        <div class="card">
          <div class="card-body">
            <h5>${event.name}</h5>
            <p>${event.description}</p>
            <p><b>Date:</b> ${event.date}</p>
            <p><b>Status:</b> ${event.status}</p>

            <button class="btn btn-warning btn-sm" onclick="toggleStatus(${event.id}, '${event.status}')">
              Toggle Status
            </button>

            <button class="btn btn-info btn-sm" onclick="viewStudents(${event.id})">
              View Students
            </button>
          </div>
        </div>
      `;

      container.innerHTML += card;
    });

  } catch (err) {
    console.error(err);
  }
}

//status of event change
async function toggleStatus(eventId, currentStatus) {
  const newStatus = currentStatus === "open" ? "closed" : "open";

  try {
    const res = await fetch(`${BASE_URL}/events/${eventId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ status: newStatus })
    });

    const result = await res.text();
    alert(result);
    loadEvents();

  } catch (err) {
    console.error(err);
  }
}

//view student
async function viewStudents(eventId) {
  try {
    const res = await fetch(`${BASE_URL}/events/${eventId}/students`);
    const students = await res.json();

    let list = "Registered Students:\n\n";

    students.forEach(s => {
      list += `${s.name} (${s.email})\n`;
    });

    alert(list);

  } catch (err) {
    console.error(err);
  }
}

//load events on dashboard
loadEvents();