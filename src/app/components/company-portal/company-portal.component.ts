import { Component } from '@angular/core';
import { Router, RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-company-portal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,

    // Angular Material Modules
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  template: `
    <!-- 🌟 MAIN LAYOUT CONTAINER -->
    <mat-sidenav-container class="layout-container">

      <!-- 🌟 LEFT SIDEBAR -->
      <mat-sidenav #sidenav mode="side" opened class="sidebar">
        <mat-toolbar color="primary">Menu</mat-toolbar>

        <mat-nav-list>

          <a mat-list-item routerLink="/portal/home">
            <mat-icon>home</mat-icon>
            <span>Home</span>
          </a>

          <a mat-list-item routerLink="/portal/employees">
            <mat-icon>people</mat-icon>
            <span>Employees</span>
          </a>

          <a mat-list-item routerLink="/portal/departments">
            <mat-icon>apartment</mat-icon>
            <span>Departments</span>
          </a>

          <a mat-list-item routerLink="/portal/designations">
            <mat-icon>work</mat-icon>
            <span>Designations</span>
          </a>

          <a mat-list-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </a>

        </mat-nav-list>
      </mat-sidenav>

      <!-- 🌟 MAIN CONTENT AREA -->
      <mat-sidenav-content>

        <!-- 🌟 TOP TOOLBAR -->
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>

          <span class="ms-2">Company Portal</span>
        </mat-toolbar>

        <!-- 🌟 LOADED PAGE CONTENT -->
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>

      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
  styles: [`
    .layout-container {
      height: 100vh;
    }

    .sidebar {
      width: 250px;
    }

    .content-area {
      padding: 20px;
    }

    mat-toolbar span {
      font-size: 20px;
      font-weight: bold;
    }
  `]
})
export class CompanyPortalComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
