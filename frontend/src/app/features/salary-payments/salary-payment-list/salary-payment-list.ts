import { Component, signal, input, effect, output } from '@angular/core';

import { SalaryPaymentService } from '../../../core/services/salary-payment';
import { SalaryPayment } from '../../../core/models/salary-payment';

import { EmployeeService } from '../../../core/services/employee';
import { Employee } from '../../../core/models/employee';

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-salary-payment-list',
  imports: [CurrencyPipe],
  templateUrl: './salary-payment-list.html',
  styleUrl: './salary-payment-list.css',
})
export class SalaryPaymentList {
  salaryPayments = signal<SalaryPayment[]>([]);
  refreshTrigger = input<number>(0);
  paymentSelected = output<SalaryPayment>();
  selectedPayment = input<SalaryPayment | null>(null);
  employees = signal<Employee[]>([]);

  constructor(
    private salaryPaymentService: SalaryPaymentService,
    private employeeService: EmployeeService,
  ) {
    this.loadEmployees();

    effect(() => {
      this.refreshTrigger();
      this.loadSalaryPayments();
    });
  }

  loadSalaryPayments(): void {
    this.salaryPaymentService.getSalaryPayments().subscribe({
      next: (data) => {
        console.log('Salary payments received:', data);
        this.salaryPayments.set(data);
      },
      error: (error) => {
        console.error('Error loading salary payments:', error);
      },
    });
  }
  editPayment(payment: SalaryPayment): void {
    this.paymentSelected.emit(payment);
  }
  deletePayment(payment: SalaryPayment): void {
    const confirmed = confirm(`Are you sure you want to delete this salary payment?`);

    if (!confirmed) {
      return;
    }

    this.salaryPaymentService
      .deleteSalaryPayment(payment.EmpID, payment.Year, payment.Month)
      .subscribe({
        next: () => {
          console.log('Salary payment deleted');

          this.loadSalaryPayments();
        },
        error: (error) => {
          console.error('Error deleting salary payment:', error);
        },
      });
  }
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees.set(data);
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      },
    });
  }
  getEmployeeName(empId: number): string {
    const employee = this.employees().find((employee) => employee.EmpID === empId);

    if (!employee) {
      return `Employee #${empId}`;
    }

    return `${employee.FirstName} ${employee.LastName}`;
  }
  getMonthName(month: number): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return months[month - 1] ?? 'Unknown';
}
}
