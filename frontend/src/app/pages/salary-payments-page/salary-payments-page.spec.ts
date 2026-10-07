import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPaymentsPage } from './salary-payments-page';

describe('SalaryPaymentsPage', () => {
  let component: SalaryPaymentsPage;
  let fixture: ComponentFixture<SalaryPaymentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryPaymentsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryPaymentsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
