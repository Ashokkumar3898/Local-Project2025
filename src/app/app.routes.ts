import { Routes } from '@angular/router';
import { CompanyPortalComponent } from './components/company-portal/company-portal';
import { LoginComponent } from './logins/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { DesignationComponent } from './components/designation/designation.component';

export const routes: Routes = [
    { path: 'login', component:LoginComponent},
  {
    path: '',
    component: CompanyPortalComponent,
    children: [
      { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
      { path: 'employees', component: EmployeeComponent },
      { path: 'departments', component: DepartmentComponent },
      { path: 'designations', component: DesignationComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
