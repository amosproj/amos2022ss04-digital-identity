import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomeComponent } from './home/home.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// imports the MatModule: a module which loads contains all necessary @angular/material/ imports
import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';

//module for DD/MM/YYYY date format
import { MAT_DATE_LOCALE } from '@angular/material/core';

// const appRoutes: Routes = [
//   { path: 'login', component: LoginPageComponent },
//   { path: 'register', component: RegisterPageComponent },
//   { path: '', component: HomeComponent },
//   // { path: '',   redirectTo: '/login', pathMatch: 'full' }
//   // { path: '**', component: PageNotFoundComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  bootstrap: [ AppComponent ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})

export class AppModule { }
