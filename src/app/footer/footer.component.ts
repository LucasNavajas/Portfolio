import { Component } from '@angular/core';
import { LanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  translatedText: string = '';
  constructor(private languageService: LanguageService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.languageService.languageChange$.subscribe(language => {
      // Cuando cambia el idioma, traduce el texto
      this.translateService.get('yourTranslationKey').subscribe((translatedText: string) => {
        // Asigna el texto traducido a la variable translatedText
        this.translatedText = translatedText;
      });
    });
  }
}
