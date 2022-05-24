import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomeComponent } from './home/home.component';
import { DIOverviewComponent } from './DI-Overview/DI-Overview.component';
import { SettingsComponent } from './settings/settings.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// imports the MatModule: a module which loads contains all necessary @angular/material/ imports
import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'

import { MatGridListModule } from "@angular/material/grid-list";

//module for DD/MM/YYYY date format
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SettingsComponent,
    DIOverviewComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule,
  ],
  bootstrap: [ AppComponent ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})

export class AppModule { }
