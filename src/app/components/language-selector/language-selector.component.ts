import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/models/languages';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
})
export class LanguageSelectorComponent implements AfterViewInit {
  public activeLanguage = 'en';
  languages = new Languages().languages;
  dropdownVisible = false;
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(
    private translateService: TranslateService,
    private eRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.translateService.setDefaultLang(this.activeLanguage);
    this.changeLanguage(this.activeLanguage);
  }

  public changeLanguage(language: string) {
    this.activeLanguage = language;
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
