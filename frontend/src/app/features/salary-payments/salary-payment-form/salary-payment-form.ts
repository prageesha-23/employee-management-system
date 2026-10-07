import { Component, signal, output, input, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../../../core/services/employee';
import { Employee } from '../../../core/models/employee';

import { SalaryPaymentService } from '../../../core/services/salary-payment';
import { SalaryPayment } from '../../../core/models/salary-payment';

@Component({
  selector: 'app-salary-payment-form',
  imports: [FormsModule],
  templateUrl: './salary-payment-form.html',
  styleUrl: './salary-payment-form.css',
})
export class SalaryPaymentForm {
  employees = signal<Employee[]>([]);
  paymentSaved = output<void>();
  selectedPayment = input<SalaryPayment | null>(null);
  editCancelled = output<void>();

  payment = {
    EmpID: 0,
    Year: new Date().getFullYear(),
    Month: 1,
    Amount: 0,
  };

  constructor(
    private employeeService: EmployeeService,
    private salaryPaymentService: SalaryPaymentService,
  ) {
    this.loadEmployees();

    effect(() => {
      const selected = this.selectedPayment();

      if (selected) {
        this.payment = {
          EmpID: selected.EmpID,
          Year: selected.Year,
          Month: selected.Month,
          Amount: selected.Amount,
        };
      }
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
  submitForm(): void {
    const selected = this.selectedPayment();

    if (selected) {
      this.salaryPaymentService
        .updateSalaryPayment(selected.EmpID, selected.Year, selected.Month, this.payment)
        .subscribe({
          next: (response) => {
            console.log('Salary payment updated:', response);
            this.paymentSaved.emit();
          },
          error: (error) => {
            console.error('Error updating salary payment:', error);
          },
        });
    } else {
      this.salaryPaymentService.createSalaryPayment(this.payment).subscribe({
        next: (response) => {
          console.log('Salary payment created:', response);

          this.resetForm();
          this.paymentSaved.emit();
        },
        error: (error) => {
          console.error('Error creating salary payment:', error);
        },
      });
    }
  }
  cancelEdit(): void {
    this.resetForm();
    this.editCancelled.emit();
  }
  resetForm(): void {
    this.payment = {
      EmpID: 0,
      Year: new Date().getFullYear(),
      Month: 1,
      Amount: 0,
    };
  }
}
