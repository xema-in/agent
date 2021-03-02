import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TimeagoModule, TimeagoFormatter, TimeagoClock } from 'ngx-timeago';
import { QueueMonitorPanelModule } from '@xema/queue-monitor-panel';
import { QueueMonitorTablePanelModule } from '@xema/queue-monitor-table-panel';
import { TeamMonitorTablePanelModule } from '@xema/team-monitor-table-panel';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialComponentsModule } from './app-material.module';

import { AppComponent } from './app.component';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { ConnectComponent } from './auth/connect/connect.component';
import { LoginComponent } from './auth/login/login.component';
import { PhoneSelectionComponent } from './auth/phone-selection/phone-selection.component';
import { ServerSelectionComponent } from './auth/server-selection/server-selection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DispositionToolsComponent } from './disposition-tools/disposition-tools.component';
import { CallManagementComponent } from './call-management/call-management.component';
import { PhoneStatusComponent } from './phone-status/phone-status.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { RecentCallsComponent } from './recent-calls/recent-calls.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { CustomClock } from './_code/custom-clock';
import { CustomFormatter } from './_code/custom-formatter';
import { BreakLogoutControlComponent } from './break-logout-control/break-logout-control.component';
import { LeftSidebarNavigatorComponent } from './left-sidebar-navigator/left-sidebar-navigator.component';
import { VariablesCardComponent } from './variables-card/variables-card.component';
import { TaskInfoCardComponent } from './task-info-card/task-info-card.component';
import { AgentInfoCardComponent } from './agent-info-card/agent-info-card.component';
import { CrmsListCardComponent } from './crms-list-card/crms-list-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneStatusComponent,
    LoginComponent,
    DashboardComponent,
    AppLayoutComponent,
    LoginLayoutComponent,
    PhoneSelectionComponent,
    DispositionToolsComponent,
    MatDialogComponent,
    TaskStatusComponent,
    CallManagementComponent,
    RecentCallsComponent,
    ServerSelectionComponent,
    ConnectComponent,
    BreakLogoutControlComponent,
    LeftSidebarNavigatorComponent,
    VariablesCardComponent,
    TaskInfoCardComponent,
    AgentInfoCardComponent,
    CrmsListCardComponent
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
    QueueMonitorTablePanelModule,
    TeamMonitorTablePanelModule,
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
