import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateDIPageComponent } from './createDI-page/createDI-page.component';
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
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateSchemaPageComponent } from './create-schema-page/create-schema-page.component';
import { ShowSchemaPopUpComponent } from './show-schema-pop-up/show-schema-pop-up.component';
import { ErrorPageComponent } from './error-pages/error-page/error-page.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    CreateDIPageComponent,
    SettingsComponent,
    DIOverviewComponent,
    InformationPopUpComponent,
    CreateSchemaPageComponent,
    EditWindowPopUpComponent,
    NavigationBarComponent,
    SchemaOverviewComponent,
    ShowSchemaPopUpComponent,
    ErrorPageComponent,
    MenuItemComponent,
    ChangePasswordComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
