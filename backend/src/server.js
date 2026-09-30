const express = require("express");

const db = require("./db");
require("dotenv").config();

const app = express();

app.use(express.json());

const PORT = process.env.DB_PORT || 5001;

app.get("/", (req, res) => {
  res.send("Employee Management System is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on on http://localhost:${PORT}`);
});
