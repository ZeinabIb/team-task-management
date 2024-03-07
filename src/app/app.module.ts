import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { TeamComponent } from './team/team.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberService } from '../TeamServices/add-member-service.service';
import { MemberFormComponent } from './team/add-member/add-member.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ProjectDashboardComponent,
    HeaderComponent,
    TeamComponent,
    MemberFormComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
