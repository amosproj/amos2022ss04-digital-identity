import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CreateDIPageComponent } from './components/createDI-page/createDI-page.component';
import { HomeComponent } from './components/home/home.component';
import { CreateSchemaPageComponent } from './components/create-schema-page/create-schema-page.component';

import { SettingsComponent } from './components/settings/settings.component';
import { DIOverviewComponent } from './components/DI-Overview/DI-Overview.component';
import { SchemaOverviewComponent } from './components/schema-overview/schema-overview.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'create-new-DI', component: CreateDIPageComponent },
  { path: 'DI-Overview', component: DIOverviewComponent },
  { path: 'create-schema', component: CreateSchemaPageComponent },
  // { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
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
