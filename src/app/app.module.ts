import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { AlternativesViewerComponent } from './components/alternatives-viewer/alternatives-viewer.component';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AnswerCardComponent } from './components/answer-card/answer-card.component';
import { MapComponent } from './components/map/map.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlagComponent } from './components/flag/flag.component';
//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { AppLogoComponent } from './components/app-logo/app-logo.component';
import { HighscoresComponent } from './components/highscores/highscores.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    AlternativesViewerComponent,
    CardComponent,
    HeaderComponent,
    ScoreboardComponent,
    AnswerCardComponent,
    MapComponent,
    MainMenuComponent,
    FlagComponent,
    LanguageSelectorComponent,
    AppLogoComponent,
    HighscoresComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
