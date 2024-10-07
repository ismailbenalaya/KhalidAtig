import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  private readonly arabicFontFamily = "'Vazirmatn', sans-serif";
  private readonly defaultFontFamily = "'Montserrat', sans-serif";
  private readonly titleFontFamily = "'Cairo'";
  private readonly paragraphFontFamily = "'Amiri', sans-serif";
  private readonly titleFontEnglishFamily = "'Overpass', sans-serif";
  private readonly titleFontSize = '40px';
  private readonly praghFontSize = "20px" ;// Set your desired font size here

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

    this.applyReviewStyles(true); // Apply Arabic styles for reviews
  }

  private removeArabicStyles(): void {
    this.renderer.setAttribute(document.documentElement, 'dir', 'ltr'); // Set LTR direction
    this.renderer.setStyle(document.body, 'font-family', this.defaultFontFamily); // Reset to default font

    this.applyReviewStyles(false); // Remove Arabic styles for reviews
  }

  private applyReviewStyles(isArabic: boolean): void {
    const reviewContainer = document.querySelector('.container_Review');
  
    if (reviewContainer) {
      // Align text based on language
      this.renderer.setStyle(reviewContainer, 'text-align', isArabic ? 'right' : 'left');
  
      const title = reviewContainer.querySelector('h1');
      const paragraphs = reviewContainer.querySelectorAll('p');
  
      if (title) {
        this.renderer.setStyle(title, 'font-family', isArabic ? this.titleFontFamily : this.titleFontEnglishFamily);
        this.renderer.setStyle(title, 'font-size', this.titleFontSize);
      }
  
      paragraphs.forEach((paragraph: HTMLElement) => {
        this.renderer.setStyle(paragraph, 'font-family', isArabic ? this.paragraphFontFamily : this.defaultFontFamily);
        
        // Set specific font size for paragraph with ID "test"
        if (paragraph.id === 'test') {
          this.renderer.setStyle(paragraph, 'font-size', this.praghFontSize);
        }
      });
    }
  }
}
