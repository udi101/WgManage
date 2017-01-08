import { Component, OnInit, Input } from '@angular/core';
import { IProcess } from './../../../interfaces/process.interface';
import { IStrParameter } from './../../../interfaces/strParameter.interface';
import { WorkgroupService } from '../../../core/workgroup.service';

@Component({
  selector: 'sp-list',
  templateUrl: './spList.component.html',
  styleUrls: ['./spList.component.css']
})
export class SplistComponent implements OnInit {

  strParamtersList: IStrParameter[];              // רשימת הפרמטרים
  currentStrParameter: IStrParameter;              //  הפרמטר הנוכחי
  @Input() currentProcess: IProcess;
  tempStrParamaterValue:string;                   // שמירת הערך של הפרמטר לצורך החזרתו במידה ומבטלים את העריכה

  sortCriteria:string = 'parameterName';      // הערך שלפיו יתבצע מיון הפרמטרים
  isInverse:boolean=false   // מיון מהסוף להתחלה או מההתחלה לסוף

  setSortCriteria(_sortCriteria:string)
  {
    if(this.sortCriteria == _sortCriteria)
      this.isInverse = !this.isInverse;
      else{
        this.sortCriteria = _sortCriteria;
        this.isInverse = false;
      }
  }

  checkSortType(_sortCriteria:string){
    return this.sortCriteria == _sortCriteria; 
  }

  // דגלים עבור הצגת אנימציה בטעינת נתונים וביצוע עדכונים
  isLoadingStrParameters:boolean = false;
  isUpdatingStrParamter:boolean = false;


  constructor(private _workgroupService: WorkgroupService) { }

  ngOnInit() {
    if(this.currentProcess.processId)
      this.loadStrParameters(this.currentProcess.processId);
  }

  // כאשר המשתמש בוחר תהליך חדש יש לטעון את רשימת הפרמטרים שלו
  ngOnChanges() {
    this.isLoadingStrParameters = true;
    this.loadStrParameters(this.currentProcess.processId);
    this.isLoadingStrParameters = false;
  }

updateStrParameter(_strParameter:IStrParameter)
  {
    this.isUpdatingStrParamter = true;
    this._workgroupService.updateStrParameter(this.currentProcess, _strParameter).subscribe(
      data => {
      console.log("strParamter was Updated");
      this.loadStrParameters(this.currentProcess.processId);
      this.isUpdatingStrParamter = false;
  },
      error => {
        console.log("Error in update strParamter");
        this.isUpdatingStrParamter = false;
    });
  }

  //  קביעת הפקמטר הנוכחי לפרמטר שעליו המשתמש לחץ
  setCurrentStrParameter(_strParameter: IStrParameter): void {
    this.currentStrParameter = _strParameter;
    this.tempStrParamaterValue = _strParameter.parameterValue;
  }

  // בדיקה האם להציג את תיבת הטקסט או לא
  isCurrntParameter(_strParameter: IStrParameter): boolean {
    return this.currentStrParameter == _strParameter;
  }

  unselectStrParameter():void
  {
    this.currentStrParameter.parameterValue = this.tempStrParamaterValue;
    this.currentStrParameter = null;
  }

  loadStrParameters(_processName: string) {
    this._workgroupService.loadStrParameters(_processName).subscribe(
      data => this.strParamtersList = data,
      error => console.log(error));

  }
}
