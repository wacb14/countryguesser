import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { languages } from 'src/app/models/languages';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-language-selector',
  imports: [NgClass, TranslatePipe],
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent implements OnInit {
  public activeLanguage = 'en';
  languages = languages;
  dropdownVisible = false;
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(
    private translateService: TranslateService,
    private eRef: ElementRef,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.activeLanguage = this.localStorageService.get('language');
    this.changeLanguage(this.activeLanguage);
  }

  public changeLanguage(language: string) {
    this.activeLanguage = language;
    this.localStorageService.set('language', language);
    this.translateService.setFallbackLang('en');
    this.translateService.use(language);
  }

  showActiveLanguage() {
    const index = this.languages
      .map((e) => e.code)
      .indexOf(this.activeLanguage);
    return {
      emoji: this.languages[index].emoji,
      name: this.languages[index].name,
    };
  }
  onSelectionChanged(language: string) {
    this.changeLanguage(language);
    this.closeDropdown();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  closeDropdown() {
    this.dropdownVisible = false;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (
      !this.eRef.nativeElement.contains(event.target) &&
      this.dropdownVisible
    ) {
      this.closeDropdown();
    }
  }
}
