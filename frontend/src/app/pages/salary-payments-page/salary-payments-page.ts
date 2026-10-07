import { Component, signal } from '@angular/core';

import { SalaryPayment } from '../../core/models/salary-payment';
import { SalaryPaymentForm } from '../../features/salary-payments/salary-payment-form/salary-payment-form';
import { SalaryPaymentList } from '../../features/salary-payments/salary-payment-list/salary-payment-list';

@Component({
  selector: 'app-salary-payments-page',
  imports: [SalaryPaymentForm, SalaryPaymentList],
  templateUrl: './salary-payments-page.html',
  styleUrl: './salary-payments-page.css',
})
export class SalaryPaymentsPage {
  selectedSalaryPayment = signal<SalaryPayment | null>(null);
  salaryRefreshTrigger = signal(0);

  onSalaryPaymentSelected(payment: SalaryPayment): void {
    this.selectedSalaryPayment.set(payment);
  }

  onSalaryPaymentSaved(): void {
    this.salaryRefreshTrigger.update((value) => value + 1);
    this.selectedSalaryPayment.set(null);
  }

  onSalaryEditCancelled(): void {
    this.selectedSalaryPayment.set(null);
  }
}
