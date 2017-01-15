import { Component, OnInit } from '@angular/core';
import { IDnis } from './../../interfaces/dnis.interface';

@Component({
  selector: 'process-dnis',
  templateUrl: './processdnis.component.html',
  styleUrls: ['./processdnis.component.css']
})
export class ProcessDnisComponent implements OnInit {

  processDnis: Array<IDnis> =
  [
    { dnis: '3557', mokedId: 5, mokedName: 'דקלה_שרות', processId: 5, processName: 'בדיקה', category: 5 },
    { dnis: '3600', mokedId: 5, mokedName: 'תביעות', processId: 3, processName: 'תביעות', category: 3 },
    { dnis: '3603', mokedId: 5, mokedName: 'דקלה', processId: 5, processName: 'הראל_שרות', category: 1 }
  ]
  constructor() { }

  ngOnInit() {
  }

}
