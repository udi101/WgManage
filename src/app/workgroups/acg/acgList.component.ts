
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {WorkgroupService} from './../../core/workgroup.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'acg-list',
    templateUrl: 'acgList.component.html',
    styles: ['.selectedAcg{background-color:#2050b0;font-weight:bold;color:#ffffff}']
})

export class AcgListComponent implements OnInit {
    private errorMassage: string;
    currentAcg: string;
    @Output() acgSelect: EventEmitter<string> = new EventEmitter<string>();
    acgList: string[] = [];
    isLoading: boolean = true;
    constructor(
                private _workgroupservice:WorkgroupService,
                private _activatedRoute: ActivatedRoute) { }


    changeAcg(_acg: string): void {
        if(this.currentAcg != _acg){
        this.currentAcg = _acg;                 // שינוי המשתמה המקומי של הקלאס
        this._workgroupservice.currentAcg = _acg;     // Service-שמירה של המשתנה ב
        this._workgroupservice.currentWorkgroup = '';
        this.acgSelect.emit(_acg);              // שיגור של הפונקציה לקומפוננט ההורה
        }
    }

    // הנבחר בהדגשה acg-סימון ה
    checkSelectedAcg(_acg: string): boolean {
        if (_acg)
            return _acg == this.currentAcg;
        return false;
    }   


    ngOnInit(): void {
        this.getAcgList();
        this.currentAcg = this._activatedRoute.snapshot.params['acg'];  // מהזכרון במידה והתבצע ניווט דרך לחצני הניווט acg-העלאת ה-
        this._workgroupservice.currentAcg = this.currentAcg;            // שנבחר בסינגלטון acg-שמירת ה
        this.acgSelect.emit(this.currentAcg);                           // acg הדמיית לחיצה של המשתמש על קבוצת
    }

    // Acg שליפת הרשימה של
    getAcgList():void{
        this._workgroupservice.getAcg().subscribe(data => { this.acgList = data; this.isLoading = false; },
            error => this.errorMassage = error);  // acg-טעינה ראשונית של רשימת ה
    }
}