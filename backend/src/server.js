const express = require("express");

const db = require("./db");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(express.json());

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Employee Management System is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on on http://localhost:${PORT}`);
});
