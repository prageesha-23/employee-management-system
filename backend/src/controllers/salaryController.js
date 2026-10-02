const db = require("../db");

const createSalaryPayment = (req, res) => {
  const { EmpID, Year, Month, Amount } = req.body;

  if (!EmpID || !Year || !Month || Amount === undefined) {
    return res.status(400).json({
      message: "EmpID, Year, Month, and Amount are required",
    });
  }

  if (Month < 1 || Month > 12) {
    return res.status(400).json({
      message: "Month must be between 1 and 12",
    });
  }

  if (Amount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0",
    });
  }

  const sql = `
    INSERT INTO salary_payments
    (EmpID, Year, Month, Amount)
    VALUES (?, ?, ?, ?)
  `;

  const values = [EmpID, Year, Month, Amount];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating salary payment:", err.message);

      return res.status(500).json({
        message: "Failed to create salary payment",
      });
    }

    res.status(201).json({
      message: "Salary payment created successfully",
    });
  });
};

const getSalaryPayments = (req, res) => {
  const sql = `
    SELECT *
    FROM salary_payments
    ORDER BY Year DESC, Month DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching salary payments:", err.message);

      return res.status(500).json({
        message: "Failed to fetch salary payments",
      });
    }

    res.status(200).json(results);
  });
};

const getSalaryPaymentsByEmployee = (req, res) => {
  const { id } = req.params;
  const sql = `
        SELECT *
        FROM salary_payments
        WHERE EmpID = ?
        ORDER BY Year DESC, Month DESC
    `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching employee salary payments:", err.message);

      return res.status(500).json({
        message: "Failed to fetch employee salary payments",
      });
    }

    res.status(200).json(results);
  });
};

const updateSalaryPayment = (req, res) => {
  const { empId, year, month } = req.params;
  const { Amount } = req.body;

  if (Amount === undefined) {
    return res.status(400).json({
      message: "Amount is required",
    });
  }

  const sql = `
    UPDATE salary_payments
    SET Amount = ?
    WHERE EmpID = ?
    AND Year = ?
    AND Month = ?
  `;

  db.query(sql, [Amount, empId, year, month], (err, result) => {
    if (err) {
      console.error("Error updating salary payment:", err.message);

      return res.status(500).json({
        message: "Failed to update salary payment",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Salary payment not found",
      });
    }

    res.status(200).json({
      message: "Salary payment updated successfully",
    });
  });
};
const deleteSalaryPayment = (req, res) => {
  const { empId, year, month } = req.params;

  const sql = `
    DELETE FROM salary_payments
    WHERE EmpID = ?
    AND Year = ?
    AND Month = ?
  `;

  db.query(sql, [empId, year, month], (err, result) => {
    if (err) {
      console.error("Error deleting salary payment:", err.message);

      return res.status(500).json({
        message: "Failed to delete salary payment",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Salary payment not found",
      });
    }

    res.status(200).json({
      message: "Salary payment deleted successfully",
    });
  });
};
module.exports = {
  createSalaryPayment,
  getSalaryPayments,
  getSalaryPaymentsByEmployee,
  updateSalaryPayment,
  deleteSalaryPayment,
};
