import { Component, HostBinding, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  private readonly arabicFontFamily = "'Vazirmatn', sans-serif";
  private readonly defaultFontFamily = "'Montserrat', sans-serif";
  private readonly titleFontFamily ="'Reem Kufi', sans-serif";
  private readonly paraghrapheFamily = "'Amiri' , sans-serif";
  private readonly titleFontEnglishFamily ="'Overpass', sans-serif"
 
  constructor(private translate: TranslateService, private renderer: Renderer2) {
    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'ar') {
        this.applyArabicStyles();
      } else {
        this.removeArabicStyles();
      }
    });
  }

  private applyArabicStyles() {
    // Apply font family to body
    this.renderer.setStyle(document.body, 'font-family', this.arabicFontFamily);

    // Apply specific styles to elements
    const home = document.querySelector('#home');
   
    if (home) {
      this.renderer.setStyle(home.querySelector('h1'), 'font-family', this.paraghrapheFamily);
      this.renderer.setStyle(home.querySelector('h2'), 'font-family', this.titleFontFamily);
      this.renderer.setStyle(home.querySelector('p'), 'font-family', this.paraghrapheFamily);
      this.renderer.setStyle(home.querySelector('a'),'font-family', this.paraghrapheFamily)

      this.renderer.setStyle(home.querySelector('h1'), 'font-size', '2em');
      this.renderer.setStyle(home.querySelector('h2'), 'font-size', '6em');
      this.renderer.setStyle(home.querySelector('p'), 'font-size', '3em');
    }
  }

  private removeArabicStyles() {
    // Reset font family to default
    this.renderer.setStyle(document.body, 'font-family', this.defaultFontFamily);

    // Reset specific styles on elements
    const home = document.querySelector('#home');
    if (home) {
      this.renderer.removeStyle(home.querySelector('h1'), 'font-family');
      this.renderer.removeStyle(home.querySelector('h2'), 'font-family');
      this.renderer.removeStyle(home.querySelector('p'), 'font-family');
      this.renderer.removeStyle(home.querySelector('a'), 'font-family');

      this.renderer.removeStyle(home.querySelector('h1'), 'font-size');
      this.renderer.removeStyle(home.querySelector('h2'), 'font-size');
      this.renderer.removeStyle(home.querySelector('p'), 'font-size');
      this.renderer.removeStyle(home.querySelector('a'), 'font-size');

    }
  }
  public scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
