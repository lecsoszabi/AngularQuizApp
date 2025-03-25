import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'quiz', component: QuizComponent }
];
