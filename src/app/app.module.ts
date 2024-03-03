import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { TeamComponent } from './team/team.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberComponent } from './team/add-member/add-member.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectDashboardComponent,
    HeaderComponent,
    TeamComponent,
    AddMemberComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
