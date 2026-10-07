import { Component, signal } from '@angular/core';

import { Employee } from '../../core/models/employee';
import { EmployeeForm } from '../../features/employees/employee-form/employee-form';
import { EmployeeList } from '../../features/employees/employee-list/employee-list';

@Component({
  selector: 'app-employees-page',
  imports: [EmployeeForm, EmployeeList],
  templateUrl: './employees-page.html',
  styleUrl: './employees-page.css',
})
export class EmployeesPage {

  selectedEmployee = signal<Employee | null>(null);
  employeeRefreshTrigger = signal(0);

  onEmployeeSelected(employee: Employee): void {
    this.selectedEmployee.set(employee);
  }

  onEmployeeSaved(): void {
    this.employeeRefreshTrigger.update((value) => value + 1);
    this.selectedEmployee.set(null);
  }

  onEditCancelled(): void {
    this.selectedEmployee.set(null);
  }
}