import { Component, OnInit } from '@angular/core';
import { FrameworkConfigService } from '../services/framework-config.service';

@Component({
  selector: 'fw-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  // use service
  constructor(public frameworkConfigService: FrameworkConfigService) { }

  ngOnInit() {
  }

}
