import { Component, Renderer2 } from '@angular/core';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private readonly arabicFontFamily = "'Vazirmatn', sans-serif";
  private readonly defaultFontFamily = "'Montserrat', sans-serif";
  private readonly titleFontFamily = "'Cairo'";
  private readonly paragraphFontFamily = "'Amiri', sans-serif";
  private readonly titleFontEnglishFamily = "'Overpass', sans-serif";
  private readonly titleFontSize = '40px';
  private readonly SERVICE_ID = 'service_ctpj32f';
  private readonly TEMPLATE_ID = 'template_wfcon3k';
  private readonly PUBLIC_KEY = 'TFZ_T7nDltMbbd6KG';

  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(
   
    private toastr: ToastrService,
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'ar') {
        this.applyArabicStyles();
      } else {
        this.removeArabicStyles();
      }
    });
  }


  private applyArabicStyles(): void {
    this.renderer.setAttribute(document.documentElement, 'dir', 'rtl'); // Set RTL direction
    this.renderer.setStyle(document.body, 'font-family', this.arabicFontFamily); // Apply Arabic font

    const home = document.querySelector('.contact');
    if (home) {
      const title = home.querySelector('h2');
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

    const home = document.querySelector('.contact');
    if (home) {
      const title = home.querySelector('h2');
      const paragraph = home.querySelector('p');
      const button = home.querySelector('a');

      // Align text to the left for LTR
      this.renderer.setStyle(home, 'text-align', 'left');
      if (title) {
        this.renderer.setStyle(title, 'font-family', this.titleFontEnglishFamily);
        this.renderer.setStyle(title, 'font-size', this.titleFontSize); // Set the font size
      }
      if (paragraph) {
        this.renderer.setStyle(paragraph, 'font-family', this.defaultFontFamily);
      }
      if (button) {
        this.renderer.setStyle(button, 'font-family', this.defaultFontFamily);
      }
    }
  }

  onSubmit() {
    const templateParams = {
      name: this.contactData.name,
      email: this.contactData.email,
      subject: this.contactData.subject,
      message: this.contactData.message
    };
    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, this.contactData, this.PUBLIC_KEY)
      .then((response) => {
        console.log('Email sent successfully', response);
        const successMessage = this.translate.instant('MSG.SUCCESS_MESSAGE');
        this.toastr.success(successMessage, 'Success');
        this.resetForm();
      }, (error) => {
        console.error('Error sending email', error);
        const errorMessage = this.translate.instant('MSG.ERROR_MESSAGE');
        this.toastr.error(errorMessage, 'Error');
      });
  }

  resetForm() {
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
