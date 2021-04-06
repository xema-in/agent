import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { BackendService } from '../_shared/backend.service';
import * as XLSX from 'xlsx';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-missed-calls',
  templateUrl: './missed-calls.component.html',
  styleUrls: ['./missed-calls.component.scss']
})
export class MissedCallsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  bus: any;

  dataSource: any;

  displayedColumns = [
    // 'date',
    'agentId',
    'phoneId',
    'originNumber',
    'dialledNumber',
    'queueName',
    'callId',
    'channel',
    'timestamp',
  ];

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.bus.getAgentMissedCalls().subscribe(
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

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'Missed Calls-' + new Date().valueOf() + '.xlsx');
  }

}
