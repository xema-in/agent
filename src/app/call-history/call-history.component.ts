import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.component.html',
  styleUrls: ['./call-history.component.scss']
})
export class CallHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  bus: any;
  info: any;

  dataSource: any;

  displayedColumns = [
    'originNumber',
    'dialledNumber',
    'agentId',
    'phoneId',
    'startTimestamp',
    'totalTime',
    'agentTime',
  ];

  searchForm = this.fb.group({
    agentId: null,
    fromDate: [null],
  });

  constructor(private service: BackendService, private fb: FormBuilder) {
    this.bus = service.getServerConnection();
    let defaultFromDate = new Date();
    defaultFromDate.setHours(0, 0, 0);
    this.searchForm.controls['fromDate'].setValue(defaultFromDate);
  }

  ngOnInit(): void {
    this.bus.info.subscribe((info) => {
      this.info = info;
      this.searchForm.controls['agentId'].setValue(info?.agentInfo.userId);
    });

    this.fetchData();
  }

  fetchData() {
    this.bus.getCallHistory(this.searchForm.value).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: err.statusText });
      }
    );
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



