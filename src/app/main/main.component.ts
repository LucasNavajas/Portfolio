import { Component, HostListener, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { SectionService } from '../section.service';
import { LanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  translatedText: string = '';
  contactMessage: any;
  contactForm: any;

  constructor(private sectionService: SectionService, private languageService: LanguageService, private translateService: TranslateService) { }

  sendEmail(event: Event): void {
    event.preventDefault();

    emailjs.sendForm('service_n89iscj', 'template_dsjeqet', '#contact-form', '6e_dH15zLHX49ek3B')
      .then((response: EmailJSResponseStatus) => {
        this.contactMessage.textContent = 'Message sent successfully ✅';
        setTimeout(() => {
          this.contactMessage = '';
        }, 5000);
        this.contactForm.reset();
      }, (error) => {
        this.contactMessage.textContent = 'Message not sent (service error) ❌';
      });
  }

  ngOnInit(): void {
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section[id]');

    // Filtrar solo los elementos que son instancias de HTMLElement
    const filteredSections: HTMLElement[] = Array.from(sections).filter((element): element is HTMLElement => {
      return element instanceof HTMLElement;
    });

    // Luego, asignar los elementos filtrados a la propiedad del servicio
    this.sectionService.setSections(filteredSections);
    this.contactMessage = document.getElementById('contact-message')
    this.contactForm = document.getElementById('contact-form');
    this.contactForm.addEventListener('submit', this.sendEmail.bind(this));

    this.languageService.languageChange$.subscribe(language => {
      // Cuando cambia el idioma, traduce el texto
      this.translateService.get('yourTranslationKey').subscribe((translatedText: string) => {
        // Asigna el texto traducido a la variable translatedText
        this.translatedText = translatedText;
      });
    });
  }
}
