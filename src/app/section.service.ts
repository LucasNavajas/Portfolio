import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  sections: HTMLElement[] = [];
  
  constructor() { }

  setSections(sections: HTMLElement[]): void {
    this.sections = sections;
  }
}
