import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CreateDIPageComponent } from './pages/DI/createDI-page/createDI-page.component';
import { HomeComponent } from './pages/home-page/home-page.component';
import { DIOverviewComponent } from './pages/DI/DIOverview-page/DIOverview-page.component';
import { InformationPopUpComponent } from './shared/pop-up/information-pop-up/information-pop-up.component';
import { EditWindowPopUpComponent } from './shared/pop-up/edit-window-pop-up/edit-window-pop-up.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SchemaOverviewComponent } from './pages/schema/schema-overview-page/schema-overview-page.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// imports the MatModule: a module which loads contains all necessary @angular/material/ imports
import { MaterialModule } from './components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateSchemaPageComponent } from './pages/schema/create-schema-page/create-schema-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { FilteredTableComponent } from './shared/filtered-table/filtered-table.component';
import { ChangePasswordComponent } from './pages/change-password-page/change-password-page.component';
import { CredDefOverviewPageComponent } from './pages/credential/credential-overview-page/credDef-overview-page.component';
import { CreateCredentialComponent } from './pages/create-credential/create-credential.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    CreateDIPageComponent,
    DIOverviewComponent,
    InformationPopUpComponent,
    CreateSchemaPageComponent,
    EditWindowPopUpComponent,
    NavigationBarComponent,
    SchemaOverviewComponent,
    ErrorPageComponent,
    MenuItemComponent,
    FilteredTableComponent,
    ChangePasswordComponent,
    CredDefOverviewPageComponent,
    CreateCredentialComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
