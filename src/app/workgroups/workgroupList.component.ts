
import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { WorkgroupService } from './../core/workgroup.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'workgroup-list',
    templateUrl: 'workgroupList.component.html',
    styles: ['.selectedWg{background-color:#2050b0;font-weight:bold;color:#fff}']
})

export class WorkgroupListComponent implements OnChanges {
    workgroupList: string[] = [];
    currentWorkgroup: string;                    // קבוצת העבודה הנוכחית
    currentAcg: string;                          // הנוכחי acg-משתנה המחזיק את הערך של ה         
    isLoading: boolean = false;                 // הצגה של אנימציית הטעינה
    @Input() isWideDisplay: boolean = true;     // האם התצוגה היא רחבה או רגילה
    @Input() newAcg: string = '';               // שהמשתמש רוצה להציג acg-משתנה המקבל את הערך של ה
    @Output() toggleDisplay: EventEmitter<void> = new EventEmitter<void>();      //  מעבר בין תצוגה רחבה לתצוגה רגילה
    @Output() workgroupSelect: EventEmitter<string> = new EventEmitter<string>();   // send the selected  workgroup to the container

    workgroupSearchString: string = '';  // זהו ערך שמיועד לתיבת הסינון ולשימוש של הפייפ

    constructor(private _workgroupService: WorkgroupService,
                private _activatedRoute:ActivatedRoute) { }


    toggleAcgDisplayRun(): void {           // מעבר בין תצוגה רחבה לתצוגה רגילה
        this.toggleDisplay.emit();
    }

    // הדגשה של הקבוצה הנבחרת
    checkSelectedWg(_workgroup: string): boolean {
        if (_workgroup)
            return this.currentWorkgroup == _workgroup;
        return false;
    }
    
    // פונקציה המתבצעת בעת לחיצה על קבוצה
    refreshAttributes(_workgroup: string): void {
        this.currentWorkgroup = _workgroup;
        this._workgroupService.currentWorkgroup = _workgroup;
        this.workgroupSelect.emit(_workgroup);
    }

    // שינוי של קבוצת הרשאה
    // מתבצעת בדיקה האם נבחרה קבוצה אחרת או לא
    ngOnChanges(): void {
        console.log('I am inside the WorkgroupList ngOnChanges.. ');
        if (this.newAcg && this.currentAcg != this.newAcg) {
            this.workgroupList = [];
            this.currentWorkgroup = null;   // איפוס הקבוצה הבחורה
            this.currentAcg = this.newAcg;  // currentAcg עדכון המשתנה המקומי של 
            this.isLoading = true;          // הצגת אנימציה לפני ביצוע הקריאה 
            this.refreshWorkgroups(this.newAcg);    // החדש שנבחר acg-רענון הקבוצות בהתאם ל
            }
    }


    ngOnInit(){
        // if(this._workgroupService.currentWorkgroup){
             this.currentWorkgroup = this._activatedRoute.snapshot.params['currentWorkgroup'];
             this.currentAcg = this._activatedRoute.snapshot.params['currentAcg'];
             this._workgroupService.currentWorkgroup = this.currentWorkgroup; // שמירה לשירות
        // }
        this.workgroupSelect.emit(this.currentWorkgroup);
    }


    // Refresh the workgroup list after choosing acg
    refreshWorkgroups(_acg: string): void {
        this._workgroupService.getWorkgroups(_acg).subscribe(
            data =>
                this.workgroupList = data,
            error => console.log(error),
            () => this.isLoading = false)
    }
}