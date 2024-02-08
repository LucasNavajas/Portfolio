import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageChangeSubject = new Subject<string>();
  languageChange$: Observable<string> = this.languageChangeSubject.asObservable();

  constructor(private translate: TranslateService) { }

  setLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language); // Opcional: Guarda el idioma en el almacenamiento local
    this.languageChangeSubject.next(language); // Emite el evento de cambio de idioma
  }
}

