import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  standalone: true
})
export class ResultComponent {
  @Input() score!: number;

  getResultMessage(): string {
    return this.score >= 5 ? 'You passed the test!' : 'Sorry you failed the test!.';
  }
}
