const express = require("express");
const cors = require("cors");

const db = require("./db");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");
const salaryRoutes = require("./routes/salaryRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/employees", employeeRoutes);
app.use("/api/salary-payments", salaryRoutes);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Employee Management System is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
