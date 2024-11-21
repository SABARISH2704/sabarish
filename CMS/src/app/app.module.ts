import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabinComponentComponent } from './cabin-component/cabin-component.component';
import { VideoRequestComponent } from './video-request/video-request.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { IconsPageComponent } from './icons-page/icons-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CabinComponentComponent,
    VideoRequestComponent,
    HistoryPageComponent,
    IconsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
