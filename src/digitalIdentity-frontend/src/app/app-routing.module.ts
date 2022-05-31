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
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'create-new-DI', component: CreateDIPageComponent },
  { path: 'DI-Overview', component: DIOverviewComponent },
  { path: 'create-schema', component: CreateSchemaPageComponent },
  // { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'schema-overview', component: SchemaOverviewComponent },
  // { path: '',   redirectTo: '/login', pathMatch: 'full' }
  // { path: '**', component: PageNotFoundComponent }
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
