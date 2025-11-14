import { Routes } from '@angular/router';
import { CompanyPortalComponent } from './components/company-portal/company-portal.component';
import { LoginComponent } from './logins/login/login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { DesignationComponent } from './components/designation/designation.component';


export const routes: Routes = [

  // 👇 Default path → Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 👇 Login page
  { path: 'login', component: LoginComponent },

  // 👇 Portal after login
  {
    path: 'portal',
    component: CompanyPortalComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(m => m.HomeComponent)
      },
      { path: 'employees', component: EmployeeComponent },
      { path: 'departments', component: DepartmentComponent },
      { path: 'designations', component: DesignationComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
