import { TestBed } from '@angular/core/testing';

import { SalaryPayment } from './salary-payment';

describe('SalaryPayment', () => {
  let service: SalaryPayment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryPayment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
