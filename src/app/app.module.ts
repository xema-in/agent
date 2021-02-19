import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TimeagoModule, TimeagoFormatter, TimeagoClock } from 'ngx-timeago';
import { QueueMonitorPanelModule } from '@xema/queue-monitor-panel';
import { TeamMonitorPanelModule } from '@xema/team-monitor-panel';

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
import { PhoneStatusComponent } from './phone-status/phone-status.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { AgentListComponent } from './_components/agent-list/agent-list.component';
import { AgentStatusComponent } from './_components/agent-status/agent-status.component';
import { MessengerComponent } from './_components/messenger/messenger.component';
import { RecentCallsComponent } from './_components/recent-calls/recent-calls.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { CustomClock } from './_code/custom-clock';
import { CustomFormatter } from './_code/custom-formatter';
import { AgentInfoComponent } from './_components/agent-info/agent-info.component';
import { BreakLogoutControlComponent } from './break-logout-control/break-logout-control.component';
import { LeftSidebarNavigatorComponent } from './left-sidebar-navigator/left-sidebar-navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneStatusComponent,
    LoginComponent,
    DashboardComponent,
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
    ServerSelectionComponent,
    ConnectComponent,
    AgentInfoComponent,
    BreakLogoutControlComponent,
    LeftSidebarNavigatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppMaterialComponentsModule,
    QueueMonitorPanelModule,
    TeamMonitorPanelModule,
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
