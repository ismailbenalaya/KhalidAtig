import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  private readonly titleFontFamily = "'Cairo'";
  private readonly defaultFontFamily = "'Montserrat', sans-serif";
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
    this.renderer.setAttribute(document.documentElement, 'dir', 'rtl'); // Set RTL
  
  
    const servicesSection = document.querySelector('.container-events');
   
   // Use class selector here
    if (servicesSection) {
      this.renderer.setStyle(servicesSection.querySelector('h2'), 'font-family', this.titleFontFamily);
    
  
      // Adjusting sizes specifically for Arabic
      this.renderer.setStyle(servicesSection.querySelector('h1'), 'font-size', '2em');

    } 
    
    // Apply styles to all single service containers
 
  }
  
  
    private removeArabicStyles() {
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr'); // Reset to LTR
      this.renderer.setStyle(document.body, 'font-family', this.defaultFontFamily);
  
      const servicesSection = document.querySelector('.container-events');
      if (servicesSection) {
        this.renderer.removeStyle(servicesSection.querySelector('h2'), 'font-family');
     
        // Resetting sizes back to default
    
       
      }
    }
}
