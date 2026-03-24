const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/", eventRoutes);

//test route
app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});