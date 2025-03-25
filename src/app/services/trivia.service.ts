import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
  private cachedQuestions: any[] | null = null;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    if (this.cachedQuestions) {
      return of(this.cachedQuestions);
    }
    return this.http.get<any>(this.apiUrl).pipe(
      tap((data) => {
        this.cachedQuestions = data.results;
      }),
      catchError((error) => {
        console.error('API hiba:', error);
        return of({ results: [] });
      })
    );
  }

  getQuestionsWithDelay(): Observable<any> {
    return new Observable((observer) => {
      setTimeout(() => {
        this.http.get<any>(this.apiUrl).subscribe(
          (data) => observer.next(data),
          (error) => observer.error(error)
        );
      }, 5000); // 5 másodperc késleltetés
    });
  }

  getQuestionsWithRetry(): Observable<any> {
    let retryDelay = 1000;

    return new Observable((observer) => {
      const tryRequest = () => {
        this.http.get<any>(this.apiUrl).subscribe(
          (data) => observer.next(data),
          (error) => {
            if (error.status === 429) {
              console.warn('Rate limit elérve, újrapróbálkozás...');
              retryDelay *= 2;
              setTimeout(tryRequest, retryDelay);
            } else {
              observer.error(error);
            }
          }
        );
      };
      tryRequest();
    });
  }



}
