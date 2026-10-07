import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SalaryPayment } from '../models/salary-payment';

@Injectable({
  providedIn: 'root',
})
export class SalaryPaymentService {
  private apiUrl = 'http://localhost:5001/api/salary-payments';

  constructor(private http: HttpClient) {}

  getSalaryPayments(): Observable<SalaryPayment[]> {
    return this.http.get<SalaryPayment[]>(this.apiUrl);
  }
  createSalaryPayment(payment: SalaryPayment): Observable<SalaryPayment> {
    return this.http.post<SalaryPayment>(this.apiUrl, payment);
  }
  updateSalaryPayment(
    empId: number,
    year: number,
    month: number,
    payment: SalaryPayment,
  ): Observable<SalaryPayment> {
    return this.http.put<SalaryPayment>(`${this.apiUrl}/${empId}/${year}/${month}`, payment);
  }
  deleteSalaryPayment(empId: number, year: number, month: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${empId}/${year}/${month}`);
  }
}
