
import { Component, Input } from '@angular/core';
import { WorkgroupService } from './../../../core/workgroup.service'; 
import { IWorkgroup } from './../../../interfaces/workgroup.interface';
import { IUser } from './../../../interfaces/user.internface';

@Component({
    selector: 'users-wg-list',
    templateUrl: 'usersWgList.component.html',
    styleUrls: ['usersWgList.component.css']
})
export class UsersWgListComponent {

    workgroupList: Array<IWorkgroup> = [];      // רשימת הקבוצות
    candidatesWg: Array<IWorkgroup> = [];      // קבוצות שבהן המשתמש אינו חבר
    @Input() currentUser: IUser = null;         // היוזר שהמשתמש בחר

    // ===== אנימציות של טעינה ועיבוד נתונים =====    
    isLoading: boolean = false;                 // האם אנימצית  הטעינה תוצג או לא
    inProcess: boolean = false;                 // האם להציג אנימציה כאשר המערכת מחשבת נתונים
    isCandidatesWgLoading: boolean = false;      //  האם יש טעינה של קבוצות מועמדות למשתמש

    sortCriteria: string = 'workgroupName';             // השדה שלפיו יתבצע מיון הקבוצות בטבלה 
    isInverse: boolean = false;                         //  שינוי כיוון החיפוש
    filterCriteria:string = "";                         // הערך לפיו יתבצע סינון של הנתונים 

    currentWorkgroup: IWorkgroup = <IWorkgroup>{ workgroupName: '' }
    constructor(private _workgroupService: WorkgroupService) { }

    ngOnInit() { }

    ngOnChanges(): void {
        this.workgroupList = [];
        if (this.currentUser.userId) {
            this.getWorkgroupsOfUser();
            console.log("userWgList ngOnChanges, the current user is: " + this.currentUser.displayName);
        }
    }

    addUserToWorkgroup(_workgroup: IWorkgroup) {
        this._workgroupService.addUserToWorkgroup(_workgroup.workgroupName, this.currentUser).subscribe(
            data => {
                console.log("Id added the user");
                this.getCandidatesWgForUser();
                this.getWorkgroupsOfUser();
            },
            error => { console.log("There was an error in adding user to workgroup"); }
        )
    }

    // שליפה של רשימת הקבוצות בהן המשתמש אינו חבר
    getCandidatesWgForUser(): void {
        this.isCandidatesWgLoading = true;
        this._workgroupService.getCandidatesWgForUser(this.currentUser.userId).subscribe(
            data => {
                this.candidatesWg = data;
                this.isCandidatesWgLoading = false;
            },
            error => {
                console.log(error);
                this.isCandidatesWgLoading = false;
            });
    }


    // לחיצה על לחצן המחיקה קובע מי היא הקבוצה הנוכחית
    setCurrentWorkgroup(_workgroup: IWorkgroup) {
        this.currentWorkgroup = _workgroup;
    }

    // קביעה של הקריטריון שלפיו יתבצע חיפוש
    setSortCriteria(criteria: string) {
        if (this.sortCriteria == criteria)
            this.isInverse = !this.isInverse;
        else {
            this.sortCriteria = criteria;
            this.isInverse = false;
        }
    }

    // שליפה רשימה של כל המשתמשים במערכת
    getWorkgroupsOfUser(): void {
        this.isLoading = true;
        this._workgroupService.getWorkgroupsOfUser(this.currentUser.userId).subscribe(
            data => {
                this.workgroupList = data;
                this.isLoading = false;
            },
            error => {
                // console.log(JSON.stringify(error));
                this.isLoading = false;
            });
    }

    // === הוספת קבוצה למשתמש
    addWgToUser(_workgroup: string): void {
        console.log("I am adding " + this.currentUser + " to " + _workgroup);
        // this._workgroupService.addUserToWorkgroup(this.currentWorkgroup.acg, this.currentUser).subscribe(
        //     data => {this.workgroupList = data;
        //         this.getWorkgroupsOfUser();
        //     },
        //     error => console.log("Error in userWgList:addWgToUser -> " + JSON.stringify(error));
        // )
    }

    // === הסרת משתמש מקבוצה
    removeUser(_workgroup: IWorkgroup) {
        this.inProcess = true;
        this._workgroupService.removeWorkgroupFromUser(this.currentUser.userId, _workgroup.workgroupName).subscribe(
            data => {
                this.getWorkgroupsOfUser();
                this.inProcess = false;
            },
            error => {
                console.log(error);
                this.inProcess = false;
            }
        );
        console.log(_workgroup.workgroupName + " " + this.currentUser);
    }

}

