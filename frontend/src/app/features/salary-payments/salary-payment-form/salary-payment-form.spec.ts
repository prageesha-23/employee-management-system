import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPaymentForm } from './salary-payment-form';

describe('SalaryPaymentForm', () => {
  let component: SalaryPaymentForm;
  let fixture: ComponentFixture<SalaryPaymentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryPaymentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryPaymentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
