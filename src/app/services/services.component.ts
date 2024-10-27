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

  const sections = document.querySelectorAll('.section-services, .header-section');

  sections.forEach(section => {
    if (section) {
      const title = section.querySelector('h2');
      const description = section.querySelector('p');

      if (title) {
        this.renderer.setStyle(title, 'font-family', this.titleFontFamily);
        this.renderer.setStyle(title, 'font-size', '2em');
      }

      if (description) {
        this.renderer.setStyle(description, 'font-family', this.paragraphFamily);
        this.renderer.setStyle(description, 'font-size', '1.2em'); // Adjusted from 5em to a more reasonable size
      }
    }
  });

  // Apply styles to all single service containers
  const containers = document.querySelectorAll('.single-service');
  containers.forEach(container => {
    const containerTitle = container.querySelector('h3');
    if (containerTitle) {
      this.renderer.setStyle(containerTitle, 'font-family', this.titleFontFamily);
    }
  });
}


private removeArabicStyles() {
  this.renderer.setAttribute(document.documentElement, 'dir', 'ltr'); // Reset to LTR
  this.renderer.setStyle(document.body, 'font-family', this.defaultFontFamily);

  const sections = document.querySelectorAll('.section-services, .header-section');

  sections.forEach(section => {
    if (section) {
      const title = section.querySelector('h2');
      const description = section.querySelector('p');

      if (title) {
        this.renderer.setStyle(title, 'font-family', this.defaultFontFamily);
        this.renderer.setStyle(title, 'font-size', '1.75em'); // Slightly smaller than Arabic
      }

      if (description) {
        this.renderer.setStyle(description, 'font-family', this.defaultFontFamily);
        this.renderer.setStyle(description, 'font-size', '1em'); // Default size
      }
    }
  });

  // Apply default styles to all single service containers
  const containers = document.querySelectorAll('.single-service');
  containers.forEach(container => {
    const containerTitle = container.querySelector('h3');
    if (containerTitle) {
      this.renderer.setStyle(containerTitle, 'font-family', this.defaultFontFamily);
    }
  });
}
}
