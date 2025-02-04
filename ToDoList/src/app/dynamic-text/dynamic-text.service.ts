import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicTextService {
  private textMessages: string[] = [
    'Nezapomeň si odpočinout!',
    'Plánuj si úkoly efektivně!',
    'Dnešek je skvělý den na produktivitu!',
    'Neztrácej čas, pusť se do práce!',
    'Ujisti se, že si děláš pravidelné přestávky!'
  ];

  private textIndex = 0;
  private textSubject = new BehaviorSubject<string>(this.textMessages[0]);

  text$ = this.textSubject.asObservable();

  constructor() {
    setInterval(() => {
      this.updateText();
    }, 10000);
  }

  private updateText() {
    this.textIndex = (this.textIndex + 1) % this.textMessages.length;
    this.textSubject.next(this.textMessages[this.textIndex]);
  }
}
