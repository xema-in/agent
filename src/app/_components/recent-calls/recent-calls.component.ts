import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';
import { Router } from '@angular/router';
import { ServerConnection } from 'jema';
import { QueryParameters } from 'src/app/_interfaces/query-parameters';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-recent-calls',
  templateUrl: './recent-calls.component.html',
  styleUrls: ['./recent-calls.component.css'],
})
export class RecentCallsComponent implements OnInit {
  bus: ServerConnection;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;
  fileName: any;
  agent: any;

  displayedColumns = [
    'originNumber',
    'dialledNumber',
    'agentId',
    'phoneId',
    'startTimestamp',
    'totalTime',
  ];
  queryParameters: QueryParameters = {
    fromDate: null,
    originNumber: null,
    dialledNumber: null,
    agentId: null,
    phoneId: null,
  };

  constructor(private service: BackendService, private router: Router) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.bus.agentInfo.subscribe((res) => {
      this.agent = res;
    });

    this.queryParameters.fromDate = new Date();
    this.queryParameters.fromDate.setDate(
      this.queryParameters.fromDate.getDate() - 1
    );
    this.queryParameters.agentId = this.agent.agentInfo.userId;
    this.fetchData();
  }

  fetchData() {
    this.service.cdrslist(this.queryParameters).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
        Swal.fire({ icon: 'error', title: 'Oops...', text: err.statusText });
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    const hDisplay = h > 0 ? h + (h === 1 ? ' h ' : ' h ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' min ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' s' : ' s') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  GetCli(originNumber) {
    if (originNumber.startsWith('+91')) {
      originNumber = originNumber.substring(3);
    }
    return originNumber;
  }
}
