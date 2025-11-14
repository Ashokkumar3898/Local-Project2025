import { Component } from '@angular/core';
import { Router,RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-portal',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterLink, RouterOutlet],
  template: `
    <nav class="navbar">
      <h2>Company Portal</h2>
      <ul>
        <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
        <li><a routerLink="/employees" routerLinkActive="active">Employees</a></li>
        <li><a routerLink="/departments" routerLinkActive="active">Departments</a></li>
        <li><a routerLink="/designations" routerLinkActive="active">Designations</a></li>
        <li><a (click)="logout()">Logout</a></li>
      </ul>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar {
      background: #003366;
      color: white;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    ul {
      list-style: none;
      display: flex;
      gap: 20px;
    }
    a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
    a:hover {
      text-decoration: underline;
    }

    .container {
      padding: 20px;
    }
  `]
})
export class CompanyPortalComponent {
constructor(private router: Router)
{

}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}