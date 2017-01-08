import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WorkgroupService } from './../../../core/workgroup.service';
import { IProcess } from './../../../interfaces/process.interface';

@Component({
  selector: 'process-list',
  templateUrl: 'processList.component.html',
  styleUrls: ['processList.component.css']
})
export class ProcessListComponent implements OnInit {

  processesList: Array<IProcess> = [];
  currentProcess: IProcess;            // משתנה המחזיק את התהליך שהמשתמש בחר
  
  @Output() selectCurrentProcess:EventEmitter<IProcess> = new EventEmitter<IProcess>();

  constructor(private _workgroupService: WorkgroupService) { }

  ngOnInit() {
    this.loadProcesses();
  }

  // currentProcess הצבת התהליך שהמשתמש בחר במשתנה 
  setCurrentProcess(_process: IProcess) {
    this.currentProcess = _process;
    this.selectCurrentProcess.emit(_process);
  }


  // טעינה של רשימת התהליכים
  loadProcesses(): void {
    this._workgroupService.loadProcesses().subscribe(
      data => this.processesList = data,
      error => console.log(error)
    );
  }

}
