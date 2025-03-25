import { Component } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { QuizComponent } from './components/quiz/quiz.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RegisterComponent, QuizComponent]
})
export class AppComponent {
  title = 'quiz-app';
}
