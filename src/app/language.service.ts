import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private directionSource = new BehaviorSubject<string>('ltr'); // Default direction
  currentDirection = this.directionSource.asObservable();

  constructor() { }

  changeLanguage(language: string): void {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    this.directionSource.next(direction);
    document.body.setAttribute('dir', direction);
  }
}
