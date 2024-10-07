import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kahlid-services',
  templateUrl: './kahlid-services.component.html',
  styleUrls: ['./kahlid-services.component.scss']
})
export class KahlidServicesComponent {
  private readonly arabicFontFamily = "'Vazirmatn', sans-serif";
  private readonly defaultFontFamily = "'Montserrat', sans-serif";
  private readonly titleFontFamily = "'Cairo'";
  private readonly paragraphFontFamily = "'Amiri', sans-serif";
  private readonly titleFontEnglishFamily = "'Overpass', sans-serif";
  private readonly titleFontSize = '50px'; // Set your desired font size here
  
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
  
    const section = document.querySelector('.py-5');
    if (section) {
      const title = section.querySelector('h2');
      const description = section.querySelector('p');
      const cards = section.querySelectorAll('.col-11');
  
      // Align text to the right for RTL
      this.renderer.setStyle(section, 'text-align', 'right');
  
      // Apply styles to the title
      if (title) {
        this.renderer.setStyle(title, 'font-family', this.titleFontFamily);
        this.renderer.setStyle(title, 'font-size', this.titleFontSize); // Set the font size
      }
  
      // Apply styles to the description
      if (description) {
        this.renderer.setStyle(description, 'font-family', this.paragraphFontFamily);
      }
  
      // Loop through the service cards and apply styles
      cards.forEach((card) => {
        const cardTitle = card.querySelector('h4');
        const cardDescription = card.querySelector('p');
        if (cardTitle) {
          this.renderer.setStyle(cardTitle, 'font-family', this.arabicFontFamily);
        }
        if (cardDescription) {
          this.renderer.setStyle(cardDescription, 'font-family', this.paragraphFontFamily);
        }
      });
    }
  }
  
  private removeArabicStyles(): void {
    this.renderer.setAttribute(document.documentElement, 'dir', 'ltr'); // Set LTR direction
    this.renderer.setStyle(document.body, 'font-family', this.defaultFontFamily); // Apply Montserrat font
  
    const section = document.querySelector('.py-5');
    if (section) {
      const title = section.querySelector('h2');
      const description = section.querySelector('p');
      const cards = section.querySelectorAll('.col-11');
  
      // Align text to the left for LTR
      this.renderer.setStyle(section, 'text-align', 'left');
  
      // Apply Montserrat font to the title
      if (title) {
        this.renderer.setStyle(title, 'font-family', this.titleFontEnglishFamily); // 'Overpass', sans-serif for title
        this.renderer.setStyle(title, 'font-size', this.titleFontSize); // Keep the font size consistent
      }
  
      // Apply Montserrat font to the description
      if (description) {
        this.renderer.setStyle(description, 'font-family', this.defaultFontFamily); // 'Montserrat', sans-serif
      }
  
      // Loop through the service cards and apply Montserrat font
      cards.forEach((card) => {
        const cardTitle = card.querySelector('h4');
        const cardDescription = card.querySelector('p');
        if (cardTitle) {
          this.renderer.setStyle(cardTitle, 'font-family', this.defaultFontFamily); // 'Montserrat', sans-serif
        }
        if (cardDescription) {
          this.renderer.setStyle(cardDescription, 'font-family', this.defaultFontFamily); // 'Montserrat', sans-serif
        }
      });
    }
  }
  
  
}
