import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-crms-list-card',
  templateUrl: './crms-list-card.component.html',
  styleUrls: ['./crms-list-card.component.scss']
})
export class CrmsListCardComponent implements OnInit {
  bus: ServerConnection;
  nodata = true;
  crms: any;

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {

    this.bus.task.subscribe((task) => {
      this.crms = [];
      this.nodata = true;
      if (
        task &&
        task.queue &&
        task.queue.crms &&
        task.queue.crms.length > 0
      ) {
        this.crms = task.queue.crms;
        this.nodata = false;
      }

    });

  }

}
