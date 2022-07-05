import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CreateDIPageComponent } from './pages/DI/createDI-page/createDI-page.component';
import { HomeComponent } from './pages/home-page/home-page.component';
import { CreateSchemaPageComponent } from './pages/schema/create-schema-page/create-schema-page.component';

import { DIOverviewComponent } from './pages/DI/DIOverview-page/DIOverview-page.component';
import { SchemaOverviewComponent } from './pages/schema/schema-overview-page/schema-overview-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ChangePasswordComponent } from './pages/change-password-page/change-password-page.component';

import { CredDefOverviewPageComponent } from './pages/credential/credential-overview-page/credDef-overview-page.component';

import { ProofTemplateOverviewPageComponent } from './pages/proofTemplate/proofTemplate-overview-page/proofTemplate-overview-page.component';
import {CreateCredDefComponent} from "./pages/credential/create-credDef/create-cred-def.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'create-new-DI', component: CreateDIPageComponent },
  { path: 'DI-Overview', component: DIOverviewComponent },
  { path: 'create-schema', component: CreateSchemaPageComponent },
  { path: 'create-credDef', component: CreateCredDefComponent},
  // { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'password/change', component: ChangePasswordComponent },
  { path: 'schema-overview', component: SchemaOverviewComponent },
  { path: 'credDef-overview', component: CredDefOverviewPageComponent },
  {
    path: 'proofTemplate-overview',
    component: ProofTemplateOverviewPageComponent,
  },
  { path: 'error/:errorCode', component: ErrorPageComponent },
  // { path: '',   redirectTo: '/login', pathMatch: 'full' }
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
