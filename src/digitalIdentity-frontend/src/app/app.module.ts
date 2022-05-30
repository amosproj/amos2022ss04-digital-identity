import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomeComponent } from './home/home.component';
import { DIOverviewComponent } from './DI-Overview/DI-Overview.component';
import { SettingsComponent } from './settings/settings.component';
import { InformationPopUpComponent } from './information-pop-up/information-pop-up.component';
import { EditWindowPopUpComponent } from './edit-window-pop-up/edit-window-pop-up.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SchemaOverviewComponent } from './schema-overview/schema-overview.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// imports the MatModule: a module which loads contains all necessary @angular/material/ imports
import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from "@angular/material/tabs";
import {MatMenuModule} from "@angular/material/menu";




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SettingsComponent,
    DIOverviewComponent,
    InformationPopUpComponent,
    EditWindowPopUpComponent,
    NavigationBarComponent,
    SchemaOverviewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule
  ],
  bootstrap: [ AppComponent ],
  providers: []
})

export class AppModule { }
