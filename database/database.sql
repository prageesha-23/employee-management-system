CREATE DATABASE ems;

USE ems;

CREATE TABLE employee (
    EmpID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Phone VARCHAR(20),
    Department VARCHAR(100),
    Position VARCHAR(100),
    HireDate DATE,
    ActiveStatus BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE salary_payments (
    EmpID INT NOT NULL,
    Year INT NOT NULL,
    Month INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (EmpID, Year, Month),

    CONSTRAINT fk_salary_employee
        FOREIGN KEY (EmpID)
        REFERENCES employee(EmpID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);