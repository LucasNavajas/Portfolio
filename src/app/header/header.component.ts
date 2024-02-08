import { Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import ScrollReveal from 'scrollreveal';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('navMenu') navMenu!: ElementRef;
  @ViewChild('navToggle') navToggle!: ElementRef;
  @ViewChild('navClose') navClose!: ElementRef;
  constructor(private elementRef: ElementRef, private languageService: LanguageService) {}

  changeLanguage(language: string) {
    this.languageService.setLanguage(language);
  }
  
  ngOnInit() {
    const navLinks: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.nav__link');
    const linkAction = () => {
      const navMenu = this.elementRef.nativeElement.querySelector('#nav-menu');
      // Cuando hacemos clic en cada nav__link, quitamos la clase show-menu
      navMenu.classList.remove('show-menu');
    };

    navLinks.forEach((link: HTMLElement) => link.addEventListener('click', linkAction));

    const shadowHeader = () => {
      const header = document.getElementById('header');
      // When the scroll is greater than 50 viewport height, add the shadow-header class to the header tag
      window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
          header?.classList.add('shadow-header');
        } else {
          header?.classList.remove('shadow-header');
        }
      });
    };
    shadowHeader();
  
  }

  ngAfterViewInit() {
    const navMenu = this.navMenu.nativeElement;
    const navToggle = this.navToggle.nativeElement;
    const navClose = this.navClose.nativeElement;
  
    /* Menu show */
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
      });
    }
  
    /* Menu hidden */
    if (navClose) {
      navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
      });
    }

    const sr = ScrollReveal( {
      delay: 400,
      duration: 2500,
      origin: 'top',
      distance: '60px',

  });

  sr.reveal('.home__perfil, .about__image, .contact__mail', {origin:'right'});
  sr.reveal('.home__name, .home__info, .about__container, .section__title-1, .about__info, .contact__social, .contact__data', {origin: 'left'});
  sr.reveal('.projects__card', {interval:100})
  }

  
}

