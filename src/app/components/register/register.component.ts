import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private storageService: StorageService) {}

  register() {
    if (this.username && this.password) {
      const users = JSON.parse(this.storageService.getItem('users') || '[]');
      const userExists = users.some((user: any) => user.username === this.username);

      if (userExists) {
        alert('This username already exists. Please choose another one!');
        return;
      }

      users.push({ username: this.username, password: this.password });
      this.storageService.setItem('users', JSON.stringify(users));
      alert('Registration successful! You can now log in.');
    } else {
      alert('Please fill in both fields!');
    }
  }
}
