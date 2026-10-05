import { Component, signal } from '@angular/core';
import { Employee } from './core/models/employee';
import { RouterOutlet } from '@angular/router';
import { EmployeeList } from './features/employees/employee-list/employee-list';
import { EmployeeForm } from './features/employees/employee-form/employee-form';

@Component({
  selector: 'app-root',
  imports: [EmployeeForm, EmployeeList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
  selectedEmployee = signal<Employee | null>(null);
  employeeRefreshTrigger = signal(0);

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
}
