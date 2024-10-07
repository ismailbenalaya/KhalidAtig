import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',   

  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit   
 {
  private readonly arabicFontFamily = "'Vazirmatn', sans-serif";
  private readonly defaultFontFamily = "'Montserrat', sans-serif";
  private readonly titleFontFamily = "'Cairo'";
  private readonly paragraphFontFamily = "'Amiri', sans-serif";
  private readonly titleFontEnglishFamily = "'Overpass', sans-serif";
  private readonly titleFontSize = '50px'; 
 // Set your desired font size here

  constructor(private translate: TranslateService, private renderer: Renderer2) {
    // Listen for language change events
    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'ar') {
        this.applyArabicStyles();
      } else {
        this.removeArabicStyles();
      }
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  private applyArabicStyles(): void {
    this.renderer.setAttribute(document.documentElement, 'dir', 'rtl'); // Set RTL direction
    this.renderer.setStyle(document.body, 'font-family', this.arabicFontFamily); // Apply Arabic font

    const home = document.querySelector('.hero');
    if (home) {
      const title = home.querySelector('h1');
      const paragraph = home.querySelector('p');
      const button = home.querySelector('a');

      // Align text to the right for RTL
      this.renderer.setStyle(home, 'text-align', 'right');
      if (title) {
        this.renderer.setStyle(title, 'font-family', this.titleFontFamily);
        this.renderer.setStyle(title, 'font-size', this.titleFontSize); // Set the font size
      }
      if (paragraph) {
        this.renderer.setStyle(paragraph, 'font-family', this.paragraphFontFamily);
      }
      if (button) {
        this.renderer.setStyle(button, 'font-family', this.paragraphFontFamily);
      }
    }
  }

  private removeArabicStyles(): void {
    this.renderer.setAttribute(document.documentElement, 'dir', 'ltr'); // Set LTR direction
    this.renderer.setStyle(document.body, 'font-family', this.defaultFontFamily); // Reset to default font

    const home = document.querySelector('.hero');
    if (home) {
      const title = home.querySelector('h1');
      const paragraph = home.querySelector('p');
      const button = home.querySelector('a');

      // Align text to the left for LTR
      this.renderer.setStyle(home, 'text-align', 'left');
      if (title) {
        this.renderer.setStyle(title, 'font-family', this.defaultFontFamily);
      
      }
      if (paragraph) {
        this.renderer.setStyle(paragraph, 'font-family', this.defaultFontFamily);
      }
      if (button) {
        this.renderer.setStyle(button, 'font-family', this.defaultFontFamily);
      }
    }
  }
}