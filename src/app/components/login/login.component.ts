import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === this.username && u.password === this.password);

    if (user) {
      setTimeout(() => {
        localStorage.setItem('username', this.username);
        localStorage.setItem('loggedInUser', this.username+","+this.password);
        this.authService.login();
        this.isLoading = false;
        this.router.navigate(['/quiz']);
      }, 100);
    } else {
      setTimeout(() => {
        alert('Wrong username or password!');
        this.isLoading = false;
      }, 100);
    }
  }
}
