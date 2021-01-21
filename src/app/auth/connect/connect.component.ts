import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  constructor(private service: BackendService) { }

  ngOnInit() {
    this.service.setupServerConnection();

    this.service.getServerConnection().connectionState.subscribe((state) => {
      this.service.setAppState({ state: 'Connected' });
    });

    this.service.connect();

  }

}
