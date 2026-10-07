import { Routes } from '@angular/router';

import { EmployeesPage } from './pages/employees-page/employees-page';
import { SalaryPaymentsPage } from './pages/salary-payments-page/salary-payments-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: EmployeesPage,
  },
  {
    path: 'salary-payments',
    component: SalaryPaymentsPage,
  },
];
