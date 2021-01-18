import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TimeagoModule, TimeagoFormatter, TimeagoClock } from 'ngx-timeago';
import { NgxTimerModule } from 'ngx-timer';

import { QueueMonitorPanelModule } from '@xema/queue-monitor-panel';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppMaterialComponentsModule } from './app.material';

import { TokenInterceptor } from './_3pc/token.interceptor';

import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { LoginLayoutComponent } from './_layout/login-layout/login-layout.component';
import { NavTopbarComponent } from './_navigation/nav-topbar/nav-topbar.component';
import { NavSidebarComponent } from './_navigation/nav-sidebar/nav-sidebar.component';

import { SharedDataService } from './_shared/shared-data.service';

import { PhoneStatusComponent } from './_call/phone-status/phone-status.component';
import { DispositionToolsComponent } from './_call/disposition-tools/disposition-tools.component';

import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhoneSelectionComponent } from './auth/phone-selection/phone-selection.component';
import { AgentListComponent } from './_components/agent-list/agent-list.component';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { TaskStatusComponent } from './_call/task-status/task-status.component';
import { OngoingStatusComponent } from './_call/ongoing-status/ongoing-status.component';
import { AgentStatusComponent } from './_components/agent-status/agent-status.component';
import { MessengerComponent } from './_components/messenger/messenger.component';
import { RecentCallsComponent } from './_components/recent-calls/recent-calls.component';
import { TeamStatusComponent } from './_components/team-status/team-status.component';
import { ServerSelectionComponent } from './auth/server-selection/server-selection.component';
import { CustomFormatter } from './_code/custom-formatter';
import { CustomClock } from './_code/custom-clock';
import { ConnectComponent } from './auth/connect/connect.component';

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
    AppRoutingModule,
    AppMaterialComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxTimerModule,
    QueueMonitorPanelModule,
    TimeagoModule.forRoot({
      formatter: { provide: TimeagoFormatter, useClass: CustomFormatter },
      clock: { provide: TimeagoClock, useClass: CustomClock },
    })
  ],

  entryComponents: [MatDialogComponent],
  exports: [],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, SharedDataService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
