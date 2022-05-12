import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomeComponent } from './home/home.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';




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
    RegisterPageComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule { }
