import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private readonly arabicFontFamily = "'Vazirmatn', sans-serif";
  private readonly defaultFontFamily = "'Montserrat', sans-serif";
  private readonly titleFontFamily = "'Reem Kufi', sans-serif";
  private readonly paragraphFontFamily = "'Amiri', sans-serif";
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
    // Set the initial styles based on the current language
    this.renderer.setAttribute(document.documentElement, 'dir', this.translate.currentLang === 'ar' ? 'rtl' : 'ltr');
    this.renderer.setStyle(document.body, 'font-family', this.translate.currentLang === 'ar' ? this.arabicFontFamily : this.defaultFontFamily);
  }

  private applyArabicStyles(): void {
    this.renderer.setAttribute(document.documentElement, 'dir', 'rtl'); // Set RTL direction
    this.renderer.setStyle(document.body, 'font-family', this.arabicFontFamily); // Apply Arabic font
  
    const footer = document.querySelector('.footer');
    if (footer) {
      // Align text to the right for RTL
      this.renderer.setStyle(footer, 'text-align', 'right');
  
      const titles = footer.querySelectorAll('h4'); // Footer titles
      const links = footer.querySelectorAll('a'); 
      const image = footer.querySelector('img'); // Footer image
  
      links.forEach((link) => {
        this.renderer.setStyle(link, 'font-family', this.paragraphFontFamily);
      });
  
      // Change the margin of the image for larger screens
      this.renderer.setStyle(image, 'margin-right', '110px');
    }
  

  }
  

  private removeArabicStyles(): void {
    this.renderer.setAttribute(document.documentElement, 'dir', 'ltr'); // Set LTR direction
    this.renderer.setStyle(document.body, 'font-family', this.defaultFontFamily); // Reset to default font

    const footer = document.querySelector('.footer');
    if (footer) {
      // Align text to the left for LTR
      this.renderer.setStyle(footer, 'text-align', 'left');
      
      const titles = footer.querySelectorAll('h4'); // Change to 'h4' for footer titles
      const links = footer.querySelectorAll('a'); // Change to 'a' for links

      titles.forEach((title) => {
        this.renderer.setStyle(title, 'font-family', this.defaultFontFamily);
      });

      links.forEach((link) => {
        this.renderer.setStyle(link, 'font-family', this.defaultFontFamily);
      });
    }
  }
}
