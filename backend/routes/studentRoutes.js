const express = require("express");
const router = express.Router();   
const db = require("../db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

//register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO students (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err) => {
      if (err) return res.send(err);
      res.send("Registered Successfully");
    });

  } catch (error) {
    res.send(error);
  }
});

//login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM students WHERE email=?";
  db.query(sql, [email], async (err, result) => {

    if (err) return res.send(err);

    if (result.length === 0) {
      return res.json({ success: false });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ success: false });
    }

    const token = jwt.sign({ id: user.id }, SECRET);

    res.json({ success: true, token });
  });
});


module.exports = router;
