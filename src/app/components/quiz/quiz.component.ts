import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheService } from '../../services/cache.service';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  shuffledAnswers: string[] = [];
  currentQuestionIndex = 0;
  score = 0;

  constructor(private cacheService: CacheService , private authService: AuthService) {}

  ngOnInit() {
    this.cacheService.prefetchQuestions().subscribe(
      () => {
        this.cacheService.getCachedQuestions().subscribe((data) => {
          if (data.length > 0) {
            this.questions = data;
            this.shuffleAnswers();
          } else {
            console.error('No questions in cache');
          }
        });
      },
      (error) => {
        console.error('Error while calling API:', error);
      }
    );
  }

  shuffleAnswers() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion) {
      const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].filter(answer => answer !== undefined);
      this.shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    }
  }

  answerQuestion(selectedAnswer: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion.correct_answer === selectedAnswer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.shuffleAnswers();
    } else {
      this.saveScore();
    }
  }


  saveScore() {
    const username = localStorage.getItem('loggedInUser');
    if (!username) return;

    const scores = JSON.parse(localStorage.getItem('scores') || '[]');

    const existingUserScore = scores.find((s: { username: string; score: number }) => s.username === username);

    if (existingUserScore) {
      if (this.score > existingUserScore.score) {
        existingUserScore.score = this.score;
      }
    } else {
      scores.push({ username, score: this.score });
    }

    scores.sort((a: { score: number }, b: { score: number }) => b.score - a.score);

    localStorage.setItem('scores', JSON.stringify(scores));
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.shuffleAnswers();
    this.cacheService.prefetchQuestions().subscribe(
      () => {
        this.cacheService.getCachedQuestions().subscribe((data) => {
          if (data.length > 0) {
            this.questions = data;
            this.shuffleAnswers();
          } else {
            console.error('No questions in cache');
          }
        });
      },
      (error) => {
        console.error('Error while calling API:', error);
      }
    );
  }


  getScores() {
    const scores = JSON.parse(localStorage.getItem('scores') || '[]');
    return scores.map((score: any) => ({
      username: score.username.split(",")[0],
      score: score.score
    }));
  }

  logout() {
    this.authService.logout();
    alert('Logout succes!');
    location.reload();
  }

}
