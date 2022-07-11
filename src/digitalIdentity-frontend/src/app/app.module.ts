import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CreateDIPageComponent } from './pages/DI/createDI-page/createDI-page.component';
import { HomeComponent } from './pages/home-page/home-page.component';
import { DIOverviewComponent } from './pages/DI/DIOverview-page/DIOverview-page.component';
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
import { ChangePasswordComponent } from './pages/change-password-page/change-password-page.component';
import { CredDefOverviewPageComponent } from './pages/credential/credential-overview-page/credDef-overview-page.component';

import { AddDIToCredentialPopUpComponent } from './shared/pop-up/add-dito-credential-pop-up/add-dito-credential-pop-up.component';
import { AddDIToProofTemplatePopUpComponent } from './shared/pop-up/add-di-to-proof-template-pop-up/add-di-to-proof-template-pop-up.component';
import { DeleteDialogComponent } from './shared/filtered-table/delete-dialog/delete-dialog.component';
import { ForgotPasswordPopUpComponent } from './shared/pop-up/forgot-password-pop-up/forgot-password-pop-up.component';

import { CredDefDetailPopUpComponent } from './components/cred-def-detail/cred-def-detail-pop-up/cred-def-detail-pop-up.component';
import { CredentialStatusComponent } from './shared/status-icon/credential-status/credential-status.component';
import { CredDefActivitiesComponent } from './components/cred-def-detail/cred-def-activities/cred-def-activities.component';
import { CreateCredDefComponent } from './pages/credential/create-credDef/create-cred-def.component';
import { SharedModule } from './shared/shared.module';
import { ProofTemplateOverviewPageComponent } from './pages/proof-templ/proofTemplate-overview-page/proofTemplate-overview-page.component';
import { CreateProofTemplateModule } from './pages/proof-templ/create-proof-template/create-proof-template.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    CreateDIPageComponent,
    DIOverviewComponent,
    CreateSchemaPageComponent,
    NavigationBarComponent,
    SchemaOverviewComponent,
    ErrorPageComponent,
    MenuItemComponent,
    ChangePasswordComponent,
    CredDefOverviewPageComponent,
    ProofTemplateOverviewPageComponent,
    DeleteDialogComponent,
    ForgotPasswordPopUpComponent,
    AddDIToCredentialPopUpComponent,
    CredDefDetailPopUpComponent,
    CredentialStatusComponent,
    CredDefActivitiesComponent,
    AddDIToProofTemplatePopUpComponent,
    CreateCredDefComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CreateProofTemplateModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
