import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimeagoModule, TimeagoFormatter, TimeagoClock } from 'ngx-timeago';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialComponentsModule } from './app-material.module';
import { AppComponent } from './app.component';

import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { ConnectComponent } from './auth/connect/connect.component';
import { LoginComponent } from './auth/login/login.component';
import { PhoneSelectionComponent } from './auth/phone-selection/phone-selection.component';
import { ServerSelectionComponent } from './auth/server-selection/server-selection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DispositionToolsComponent } from './_call/disposition-tools/disposition-tools.component';
import { OngoingStatusComponent } from './_call/ongoing-status/ongoing-status.component';
import { PhoneStatusComponent } from './_call/phone-status/phone-status.component';
import { TaskStatusComponent } from './_call/task-status/task-status.component';
import { AgentListComponent } from './_components/agent-list/agent-list.component';
import { AgentStatusComponent } from './_components/agent-status/agent-status.component';
import { MessengerComponent } from './_components/messenger/messenger.component';
import { RecentCallsComponent } from './_components/recent-calls/recent-calls.component';
import { TeamStatusComponent } from './_components/team-status/team-status.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { LoginLayoutComponent } from './_layout/login-layout/login-layout.component';
import { NavSidebarComponent } from './_navigation/nav-sidebar/nav-sidebar.component';
import { NavTopbarComponent } from './_navigation/nav-topbar/nav-topbar.component';
import { CustomClock } from './_code/custom-clock';
import { CustomFormatter } from './_code/custom-formatter';

@NgModule({
  declarations: [
    AppComponent,
    PhoneStatusComponent,
    LoginComponent,
    DashboardComponent,
    NavTopbarComponent,
    NavSidebarComponent,
    AppLayoutComponent,
    LoginLayoutComponent,
    PhoneSelectionComponent,
    AgentListComponent,
    DispositionToolsComponent,
    MatDialogComponent,
    TaskStatusComponent,
    OngoingStatusComponent,
    AgentStatusComponent,
    MessengerComponent,
    RecentCallsComponent,
    TeamStatusComponent,
    ServerSelectionComponent,
    ConnectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialComponentsModule,
    TimeagoModule.forRoot({
      formatter: { provide: TimeagoFormatter, useClass: CustomFormatter },
      clock: { provide: TimeagoClock, useClass: CustomClock },
    })
  ],
  entryComponents: [
    MatDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
