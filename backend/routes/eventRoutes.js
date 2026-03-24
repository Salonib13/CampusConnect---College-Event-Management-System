const express = require("express");
const router = express.Router();
const db = require("../db");

//create event
router.post("/events", (req, res) => {
  const { name, description, date, time } = req.body;

  const sql = "INSERT INTO events (name, description, date, time, status) VALUES (?, ?, ?, ?, 'open')";
  db.query(sql, [name, description, date, time], (err, result) => {
    if (err) return res.send(err);
    res.send("Event Created Successfully");
  });
});

//get all event
router.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

//update event status
router.put("/events/:id", (req, res) => {
  const { status } = req.body;
  const eventId = req.params.id;

  const sql = "UPDATE events SET status=? WHERE id=?";
  db.query(sql, [status, eventId], (err, result) => {
    if (err) return res.send(err);
    res.send("Event Status Updated");
  });
});

// register for event
router.post("/register-event", (req, res) => {
  const { student_id, event_id } = req.body;

  const sql = "INSERT INTO registrations (student_id, event_id) VALUES (?, ?)";
  db.query(sql, [student_id, event_id], (err, result) => {
    if (err) return res.send(err);
    res.send("Registered Successfully");
  });
});

// view student
router.get("/events/:id/students", (req, res) => {
  const eventId = req.params.id;

  const sql = `
    SELECT students.name, students.email
    FROM registrations
    JOIN students ON registrations.student_id = students.id
    WHERE registrations.event_id = ?
  `;

  db.query(sql, [eventId], (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

module.exports = router;
