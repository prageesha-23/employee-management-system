import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPaymentList } from './salary-payment-list';

describe('SalaryPaymentList', () => {
  let component: SalaryPaymentList;
  let fixture: ComponentFixture<SalaryPaymentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryPaymentList],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryPaymentList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
