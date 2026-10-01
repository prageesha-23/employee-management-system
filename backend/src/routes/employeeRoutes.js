const express = require("express");

const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  updateEmployeeStatus,
} = require("../controllers/employeeController");

router.get("/", getEmployees);

router.get("/:id", getEmployeeById);

router.post("/", createEmployee);

router.put("/:id", updateEmployee);

router.patch("/:id/status", updateEmployeeStatus);

module.exports = router;
