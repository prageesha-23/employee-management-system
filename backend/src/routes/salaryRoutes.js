const express = require("express");

const router = express.Router();

const {
  createSalaryPayment,
  getSalaryPayments,
  getSalaryPaymentsByEmployee,
  updateSalaryPayment,
  deleteSalaryPayment,
} = require("../controllers/salaryController");

router.post("/", createSalaryPayment);

router.get("/", getSalaryPayments);

router.get("/employee/:id", getSalaryPaymentsByEmployee);

router.put("/:empId/:year/:month", updateSalaryPayment);

router.delete("/:empId/:year/:month", deleteSalaryPayment);

module.exports = router;
