import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapViewerComponent } from './components/map-viewer/map-viewer.component';
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


@NgModule({
  declarations: [
    AppComponent,
    MapViewerComponent,
    AlternativesViewerComponent,
    CardComponent,
    HeaderComponent,
    ScoreboardComponent,
    AnswerCardComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
