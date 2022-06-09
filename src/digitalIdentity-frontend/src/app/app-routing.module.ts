import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateDIPageComponent } from './createDI-page/createDI-page.component';
import { HomeComponent } from './home/home.component';
import { CreateSchemaPageComponent } from './create-schema-page/create-schema-page.component';

import { SettingsComponent } from './settings/settings.component';
import { DIOverviewComponent } from './DI-Overview/DI-Overview.component';
import { SchemaOverviewComponent } from './schema-overview/schema-overview.component';
import { ErrorPageComponent } from './error-pages/error-page/error-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'create-new-DI', component: CreateDIPageComponent },
  { path: 'DI-Overview', component: DIOverviewComponent },
  { path: 'create-schema', component: CreateSchemaPageComponent },
  // { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'password/change', component: ChangePasswordComponent },
  { path: 'schema-overview', component: SchemaOverviewComponent },
  { path: 'error/:errorCode', component: ErrorPageComponent },
  // { path: '',   redirectTo: '/login', pathMatch: 'full' }
  { path: '**', redirectTo: 'error/404' }
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
