
import { Component, Input, OnChanges } from '@angular/core';
import { WorkgroupService } from './../../core/workgroup.service';
import {ICustomAttribute} from './../../interfaces/customAttribute.interface';

@Component({
    selector: 'ca-list',
    templateUrl: 'caList.component.html',
    styleUrls:['caList.component.css']
})

export class CAListComponent implements OnChanges {
    customAttributes: ICustomAttribute[] = [];  //  רשימת התכונות 
    isLoading: boolean = false;                  // דגל שקובע האם הטעינה תוצג 
    tempCustomattribute: string = '';            // משתנה המחזיק את התכונה שעורכים על מנת לאפשר ביטול
    currentCustomAttr: string = '';                // התכונה הנוכחית המוצגת
    inProccess: boolean = false;                 // משתנה להצגה או הסתקה של עיבוד נתונים

    // משתנים בשימוש של הפילטרים
    filterString: string = '';            // the filter expression
    sortCriteria: string = 'attrKey';               // המאפיין שלפיו יתבצע המיון
    isInverse: boolean;                           // האם החיפוש הוא  מא-ת או הפוך

    @Input() currentWorkgroup: string = '';   // this will change when choosing a workgroup and will cause refresh

    constructor(private _workgroupService: WorkgroupService) { }


    setSortCriteria(_sortCriteria: string): void {
        if (this.sortCriteria == _sortCriteria) {
            this.isInverse = !this.isInverse;
        }
        else {
            this.sortCriteria = _sortCriteria;
            this.isInverse = false;
        }
    }

    ngOnChanges(): void {
        if (this.currentWorkgroup) {
            this.customAttributes = [];
            this.isLoading = true;
            this.refreshCustomAttr(this.currentWorkgroup);
        }
        else
        {
            this.customAttributes = [];
        }
    }

    // מאפשר להציג עריכה עבור תכונה שבחרנו
    isCaEditable(_attrKey): boolean {
        return _attrKey == this.currentCustomAttr;
    }

    // ===  לשרת put עדכון של תכונה בודדת, שליחה של קריאת 
    updateCA(_ca: ICustomAttribute): void {
        this.inProccess = true;
        this.currentCustomAttr = null;  // הסתרת האייקון של אישור הנתונים
        if (_ca)
            this._workgroupService.updateCustomeAttribute(_ca, this.currentWorkgroup)
                .subscribe(data => {
                    console.log(JSON.stringify(data));
                    this.inProccess = false;
                });
    }

    // עדכון של רשימת התכונות לפי קבוצה
    refreshCustomAttr(_workgroup?: string): void {
        if (_workgroup == null) {
            console.log('workgroup is empty');
            this.isLoading = false;
        }
        else {
            this._workgroupService.getCustomAttr(_workgroup)
                .subscribe(data => {
                    this.customAttributes = data;
                    this.isLoading = false
                },
                error => {
                    console.log(error);
                    this.isLoading = false;
                });
        }
    }
}