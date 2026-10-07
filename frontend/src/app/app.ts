import { Component, signal } from '@angular/core';
import { Employee } from './core/models/employee';
import { RouterOutlet } from '@angular/router';
import { EmployeeList } from './features/employees/employee-list/employee-list';
import { EmployeeForm } from './features/employees/employee-form/employee-form';
import { SalaryPaymentList } from './features/salary-payments/salary-payment-list/salary-payment-list';
import { SalaryPaymentForm } from './features/salary-payments/salary-payment-form/salary-payment-form';
import { SalaryPayment } from './core/models/salary-payment';

@Component({
  selector: 'app-root',
  imports: [EmployeeForm, EmployeeList, SalaryPaymentList, SalaryPaymentForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
  selectedEmployee = signal<Employee | null>(null);
  employeeRefreshTrigger = signal(0);
  selectedSalaryPayment = signal<SalaryPayment | null>(null);

  onEmployeeSelected(employee: Employee): void {
    this.selectedEmployee.set(employee);
    console.log('App received employee:', employee);
  }
  onEmployeeSaved(): void {
    this.employeeRefreshTrigger.update((value) => value + 1);
  }
  onEditCancelled(): void {
    this.selectedEmployee.set(null);
  }
  salaryRefreshTrigger = signal(0);

  onSalaryPaymentSaved(): void {
    this.salaryRefreshTrigger.update((value) => value + 1);
    this.selectedSalaryPayment.set(null);
  }
  onSalaryPaymentSelected(payment: SalaryPayment): void {
    this.selectedSalaryPayment.set(payment);
  }
  onSalaryEditCancelled(): void {
    this.selectedSalaryPayment.set(null);
  }
}
