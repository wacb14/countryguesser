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


@NgModule({
  declarations: [
    AppComponent,
    MapViewerComponent,
    AlternativesViewerComponent,
    CardComponent,
    HeaderComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
