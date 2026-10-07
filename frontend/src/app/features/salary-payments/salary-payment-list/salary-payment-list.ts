import { Component, signal, input, effect, output } from '@angular/core';

import { SalaryPaymentService } from '../../../core/services/salary-payment';
import { SalaryPayment } from '../../../core/models/salary-payment';

@Component({
  selector: 'app-salary-payment-list',
  imports: [],
  templateUrl: './salary-payment-list.html',
  styleUrl: './salary-payment-list.css',
})
export class SalaryPaymentList {
  salaryPayments = signal<SalaryPayment[]>([]);
  refreshTrigger = input<number>(0);
  paymentSelected = output<SalaryPayment>();
  selectedPayment = input<SalaryPayment | null>(null);

  constructor(private salaryPaymentService: SalaryPaymentService) {
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
}
