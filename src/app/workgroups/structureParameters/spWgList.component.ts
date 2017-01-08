
import { Component, Input, OnInit } from '@angular/core';
import {IProcess} from './../../interfaces/process.interface';
import { WorkgroupService } from './../../core/workgroup.service';

@Component({
    selector: 'spWg-list',
    templateUrl: 'spWgList.component.html'
})
export class SpWgListComponent {
    structureParameters: IProcess[] = [];    // רשימת הפרוססים 
    inProccess: boolean = false;                        // דגל של תצוגת טעינה
    @Input() currnetWorkgroup: string = null;         // משתנה ששומר את הקבוצה הנוכחית

    constructor(private _workgroupService: WorkgroupService) { }

    // טעינה של רשימת התהלידים עבור קבוצה שנבחרה
    ngOnChanges() {
        if (this.currnetWorkgroup) {
            this.inProccess = true;
            this._workgroupService.getStructureParametersByWorkgroup(this.currnetWorkgroup).subscribe(
                data => {
                this.structureParameters = data;
                    this.inProccess = false;
                },
                error => {
                    console.log(error);
                    this.inProccess = false;
                });
        }
    }
}