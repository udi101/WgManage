import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkgroupService } from './../../core/workgroup.service'
import { NewWg } from './../../models/newWg.model';

@Component({
  templateUrl: './createnewwg.component.html',
  styleUrls: ['./createnewwg.component.css']
})
export class CreateNewWgComponent implements OnInit {
  acgList: Array<string> = [];
  isWgTypeInvalid: boolean = false;      // האם המשתמש אכן בחר  סוג של קבוצה

  isCreatingWg: boolean = false;          // דגל עבור תצוגת האנימציה בשעת יצירת קבוצה
  newWorkgroup:NewWg = new NewWg();          // יצירה קבוצה חדשה

  constructor(private _workgroupService: WorkgroupService,
              private _router:Router) { }

  ngOnInit() { }

  createNewWorkgroup(): void {
    this.isCreatingWg = true;
    this._workgroupService.createNewWorkgroup(this.newWorkgroup).subscribe(
      data => {
        this.isCreatingWg = false;
        this._router.navigate(['/CustomAttributes','Root',this.newWorkgroup.wgName]);
      },
      error => {
        console.log(error);
        this.isCreatingWg = false;
      }
    );
    
    // setTimeout(() => this.isCreatingWg = false, 1000);  // השהיה לפני העלמה

  }
  // === בדיקת תקינות של תיבת הבחירה והצבת התוצאה במשתנה === 
  setValidationForWgType(groupType: string): void {
    this.isWgTypeInvalid = groupType === 'default' ? true : false;
  }
}