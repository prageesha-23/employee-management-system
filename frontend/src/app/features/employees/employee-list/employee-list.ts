import { CommonModule } from '@angular/common';
import { Component, signal, output, input, effect } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee';
import { Employee } from '../../../core/models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  employees = signal<Employee[]>([]);
  employeeSelected = output<Employee>();

  refreshTrigger = input<number>(0);

  constructor(private employeeService: EmployeeService) {
    effect(() => {
      this.refreshTrigger();
      this.loadEmployees();
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('Employees received:', data);
        this.employees.set(data);
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      },
    });
  }
  editEmployee(employee: Employee): void {
    console.log('Employee selected for editing:', employee);

    this.employeeSelected.emit(employee);
  }
  deactivateEmployee(employee: Employee): void {
    this.employeeService.deactivateEmployee(employee.EmpID).subscribe({
      next: (response) => {
        console.log('Employee deactivated:', response);

        this.loadEmployees();
      },
      error: (error) => {
        console.error('Error deactivating employee:', error);
      },
    });
  }
}
