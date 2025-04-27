import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private apiUrl = environment.apiUrl;
  private cachedQuestions = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  prefetchQuestions(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap((data) => {
        this.cachedQuestions.next(data.results);
      })
    );
  }

  getCachedQuestions(): Observable<any[]> {
    return this.cachedQuestions.asObservable();
  }
}
