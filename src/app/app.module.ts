import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FwModule } from '../fw/fw.module';
import { appRoutes } from './routing/app.routing';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryMaintComponent } from './country-maint/country-maint.component';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';

import { UserService } from './services/user.service';
import { UserApi } from '../fw/users/user-api';
import { AuthGuardService } from './services/auth-guard.service';
import { CountryService } from './services/country.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    CountryDetailComponent,
    CountryListComponent,
    CountryMaintComponent,
    AuthenticatedUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FwModule,
    RouterModule.forRoot(appRoutes),
  ],
  // we provide the UserService
  // but the framework doesn't know anything about UserService, it does know about the UserApi
  // use the existing token UserService
  providers: [
    UserService,
    { provide: UserApi, useExisting: UserService },
    AuthGuardService,
    CountryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
