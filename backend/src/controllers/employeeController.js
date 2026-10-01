const db = require("../db");

const getEmployees = (req, res) => {
  const sql = `
       SELECT *
       FROM employee
       WHERE ActiveStatus = TRUE
    `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err.message);

      return res.status(500).json({
        message: "Failed to fetch employees",
      });
    }
    res.status(200).json(results);
  });
};

const getEmployeeById = (req, res) => {
  const { id } = req.params;
  const sql = `
        SELECT *
        FROM employee
        WHERE EmpID = ?
        AND ActiveStatus = TRUE
    `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching employee:", err.message);

      return res.status(500).json({
        message: "Failed to fetch employee",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(results[0]);
  });
};

const createEmployee = (req, res) => {
  const { FirstName, LastName, Email, Phone, Department, Position, HireDate } =
    req.body;

  if (!FirstName || !LastName || !Email) {
    return res.status(400).json({
      message: "FirstName, LastName, and Email are required",
    });
  }

  const sql = `
    INSERT INTO employee
    (FirstName, LastName, Email, Phone, Department, Position, HireDate)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    FirstName,
    LastName,
    Email,
    Phone,
    Department,
    Position,
    HireDate,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating employee:", err.message);

      return res.status(500).json({
        message: "Failed to create employee",
      });
    }

    res.status(201).json({
      message: "Employee created successfully",
      EmpID: result.insertId,
    });
  });
};

const updateEmployee = (req, res) => {
  const { id } = req.params;

  const { FirstName, LastName, Email, Phone, Department, Position, HireDate } =
    req.body;

  if (!FirstName || !LastName || !Email) {
    return res.status(400).json({
      message: "FirstName, LastName, and Email are required",
    });
  } //Validation for mandatory FirstName, LastName and Email

  const sql = `
    UPDATE employee
    SET
      FirstName = ?,
      LastName = ?,
      Email = ?,
      Phone = ?,
      Department = ?,
      Position = ?,
      HireDate = ?
    WHERE EmpID = ?
    AND ActiveStatus = TRUE
  `;

  const values = [
    FirstName,
    LastName,
    Email,
    Phone,
    Department,
    Position,
    HireDate,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating employee:", err.message);

      return res.status(500).json({
        message: "Failed to update employee",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
    });
  });
};

const updateEmployeeStatus = (req, res) => {
  const { id } = req.params;
  const { ActiveStatus } = req.body;

  if (typeof ActiveStatus !== "boolean") {
    return res.status(400).json({
      message: "ActiveStatus must be TRUE or FALSE",
    });
  }

  const sql = `
    UPDATE employee
    SET ActiveStatus = ?
    WHERE EmpID = ?
  `;

  db.query(sql, [ActiveStatus, id], (err, result) => {
    if (err) {
      console.error("Error updating employee status:", err.message);

      return res.status(500).json({
        message: "Failed to update employee status",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee status updated successfully",
    });
  });
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  updateEmployeeStatus,
};
