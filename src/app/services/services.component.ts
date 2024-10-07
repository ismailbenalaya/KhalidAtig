import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  private readonly arabicFontFamily = "'Vazirmatn', sans-serif";
  private readonly defaultFontFamily = "'Montserrat', sans-serif";
  private readonly titleFontFamily ="'Cairo'";
  private readonly paragraphFamily = "'Amiri', sans-serif";

  constructor(private translate: TranslateService, private renderer: Renderer2) {
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

private applyArabicStyles() {
  this.renderer.setAttribute(document.documentElement, 'dir', 'rtl'); // Set RTL
  this.renderer.setStyle(document.body, 'font-family', this.arabicFontFamily);


  const servicesSection = document.querySelector('.section-services');
  const containers = document.querySelectorAll('.single-service'); 

 // Use class selector here
  if (servicesSection) {
    this.renderer.setStyle(servicesSection.querySelector('h2'), 'font-family', this.titleFontFamily);
    this.renderer.setStyle(servicesSection.querySelector('p'), 'font-family', this.paragraphFamily);

    // Adjusting sizes specifically for Arabic
    this.renderer.setStyle(servicesSection.querySelector('h1'), 'font-size', '2em');
    this.renderer.setStyle(servicesSection.querySelector('p'), 'font-size', '5em');
  } 
  
  // Apply styles to all single service containers
  containers.forEach(container => {
    this.renderer.setStyle(container.querySelector('h3'), 'font-family', this.titleFontFamily);
  });
}


  private removeArabicStyles() {
    this.renderer.setAttribute(document.documentElement, 'dir', 'ltr'); // Reset to LTR
    this.renderer.setStyle(document.body, 'font-family', this.defaultFontFamily);

    const servicesSection = document.querySelector('.section-services');
    if (servicesSection) {
      this.renderer.removeStyle(servicesSection.querySelector('h2'), 'font-family');
      this.renderer.removeStyle(servicesSection.querySelector('p'), 'font-family');

      // Resetting sizes back to default
      this.renderer.removeStyle(servicesSection.querySelector('h1'), 'font-size');
      this.renderer.removeStyle(servicesSection.querySelector('p'), 'font-size');
    }
  }
}
