const express = require("express");
const router = express.Router();
const db = require("../db");

//admin login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admins WHERE username=? AND password=?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.send(err);

    if (result.length > 0) {
      res.json({ success: true, admin: result[0] });
    } else {
      res.json({ success: false });
    }
  });
});

module.exports = router;