import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee, CreateEmployee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5001/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  createEmployee(employee: CreateEmployee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }
  updateEmployee(id: number, employee: CreateEmployee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }
  deactivateEmployee(id: number): Observable<Employee> {
    return this.http.patch<Employee>(`${this.apiUrl}/${id}/status`, { ActiveStatus: false });
  }
}
