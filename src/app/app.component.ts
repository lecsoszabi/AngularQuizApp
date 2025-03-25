import { Component } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    AsyncPipe,
    QuizComponent,
    LoginComponent,
    RegisterComponent,
    NgIf
  ],
  standalone: true
})
export class AppComponent {
  title = "quiz-app";
  constructor(public authService: AuthService) {}
}
