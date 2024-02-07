import { Component, HostListener, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SectionService } from './section.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AngularPortfolioWeb';
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private sectionService: SectionService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollUp = this.elementRef.nativeElement.querySelector('#scroll-up');
    if (scrollUp) {
      window.scrollY >= 350 ? this.renderer.addClass(scrollUp, 'show-scroll') : this.renderer.removeClass(scrollUp, 'show-scroll');
    }
    this.setupScrollActive();
  }


  private setupScrollActive() {
    const scrollDown = window.scrollY;
    let sections = this.sectionService.sections;

    if (!sections) {
      sections = this.elementRef.nativeElement.querySelectorAll('section[id]');
      return;
    }

    sections.forEach((current: HTMLElement) => {
      console.log("se activo")
      const sectionHeight: number = current.offsetHeight;
      const sectionTop: number = current.offsetTop - 58;
      const sectionId: string | null = current.getAttribute('id');
      const sectionsClass: Element | null = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
  
      if (sectionId && sectionsClass) {
          if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
              sectionsClass.classList.add('active-link');
          } else {
              sectionsClass.classList.remove('active-link');
          }
      }
  });
  
  }
}

