import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { WikipediaService } from './services/wikipedia.service';
import { HistoryService } from './services/history.service';
import { AuthService } from './services/auth.service';
import { TranslateService } from './services/translate.service';
import { WikicardComponent } from './wikicard/wikicard.component';
import { WordComponent } from './word/word.component';
import { NavbarComponent } from './navbar/navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    SearchHistoryComponent,
    AuthComponent,
    DashboardComponent,
    WikicardComponent,
    WordComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [
    WikipediaService,
    HistoryService,
    AuthService,
    TranslateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
