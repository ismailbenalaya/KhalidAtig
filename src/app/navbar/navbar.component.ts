import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';  // Assuming you have a LanguageService to manage language

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  selectedLanguage!: string;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService  // Assuming you have a LanguageService to manage language
  ) {
    // Set supported languages and default language
    this.translate.addLangs(['en', 'ar', 'fr']);  // Add supported languages
    this.translate.setDefaultLang('ar');          // Set default language to Arabic
  }

  ngOnInit(): void {
    // Always set the current language to Arabic on refresh
    const currentLang = 'ar';  // Force language to Arabic
  
    console.log('Current Language set to Arabic on refresh:', currentLang);
  
    // Use the selected language for translation
    this.translate.use(currentLang);
    this.applyLanguageSettings(currentLang); // Ensure settings are applied
  
    // Optionally, you can still store this in localStorage if needed
    localStorage.setItem('selectedLanguage', currentLang);
  }
  
  

  ngOnDestroy(): void {
    // Remove scroll event listener when the component is destroyed to avoid memory leaks
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }

  onWindowScroll(): void {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  switchLanguage(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    console.log('Language changed to:', selectedLanguage);

    // Use the selected language
    this.translate.use(selectedLanguage);
    this.languageService.changeLanguage(selectedLanguage);  // Assuming this service handles language persistence
    localStorage.setItem('selectedLanguage', selectedLanguage);  // Save the selected language

    // Apply language settings (RTL/LTR, font family, etc.)
    this.applyLanguageSettings(selectedLanguage);
  }

  applyLanguageSettings(language: string): void {
    // Update text direction and font family based on language
    if (language === 'ar') {
      document.body.setAttribute('dir', 'rtl');
      document.body.style.fontFamily = "'Vazirmatn', sans-serif";
      document.documentElement.setAttribute('lang', 'ar');
      this.updateNavForRTL();
    } else {
      document.body.setAttribute('dir', 'ltr');
      document.body.style.fontFamily = "'Montserrat', sans-serif";
      document.documentElement.setAttribute('lang', language);
      this.updateNavForLTR();
    }

    // Force repaint/reflow to ensure layout fixes after language change
    setTimeout(() => {
      const body = document.body;
      body.style.display = 'none';
      body.offsetHeight;  // Trigger reflow
      body.style.display = '';
    }, 100);
  }

  updateNavForRTL(): void {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.add('rtl-nav');
      nav.classList.remove('ltr-nav');
    }
  }

  updateNavForLTR(): void {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.add('ltr-nav');
      nav.classList.remove('rtl-nav');
    }
  }

  public scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Section with ID ${sectionId} not found.`);
    }
  }
}
