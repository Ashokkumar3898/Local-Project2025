import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../serv/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  hidePassword = true;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
  this.authService.login(this.username, this.password).subscribe({
    next: (res) => {
      // 🔥 Save JWT token
      localStorage.setItem('token', res.token);

      // 🔥 Redirect to portal
      this.router.navigate(['/portal/home']);
    },
    error: () => {
      this.error = 'Invalid credentials';
    }
  });
}
}
