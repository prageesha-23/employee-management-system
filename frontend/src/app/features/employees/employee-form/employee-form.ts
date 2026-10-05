import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../core/models/employee';

import { EmployeeService } from '../../../core/services/employee';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  employee = {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Department: '',
    Position: '',
    HireDate: '',
  };
  selectedEmployee = input<Employee | null>(null);
  employeeSaved = output<void>();
  editCancelled = output<void>();

  cancelEdit(): void {
    this.employee = {
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      Department: '',
      Position: '',
      HireDate: '',
    };

    this.editCancelled.emit();
  }

  constructor(private employeeService: EmployeeService) {
    effect(() => {
      const selected = this.selectedEmployee();

      if (selected) {
        this.employee = {
          FirstName: selected.FirstName,
          LastName: selected.LastName,
          Email: selected.Email,
          Phone: selected.Phone ?? '',
          Department: selected.Department ?? '',
          Position: selected.Position ?? '',
          HireDate: selected.HireDate ? selected.HireDate.substring(0, 10) : '',
        };
      }
    });
  }

  submitForm(): void {
    const selected = this.selectedEmployee();

    if (selected) {
      // EDIT MODE
      this.employeeService.updateEmployee(selected.EmpID, this.employee).subscribe({
        next: (response) => {
          console.log('Employee updated:', response);
          this.employeeSaved.emit();
        },
        error: (error) => {
          console.error('Error updating employee:', error);
        },
      });
    } else {
      // ADD MODE
      this.employeeService.createEmployee(this.employee).subscribe({
        next: (response) => {
          console.log('Employee created:', response);
          this.employeeSaved.emit();
        },
        error: (error) => {
          console.error('Error creating employee:', error);
        },
      });
    }
  }
}
