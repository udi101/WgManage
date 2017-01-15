
import { Component, Input, OnChanges } from '@angular/core';
import { WorkgroupService } from './../../core/workgroup.service';
import { IUser } from './../../interfaces/user.internface'; 


@Component({
    selector: 'user-list',
    templateUrl: 'wgUsersList.component.html',
    styles: [`.hand{cursor:pointer;}`]
})

export class wgUsersListComponent implements OnChanges {
    usersList: Array<IUser> = [];           // רשימה של המתשמשים השייכים לקבוצה
    candidatesList:Array<IUser> = [];           // רשימת משתמשים שאינם שייכים לקבוצה 
    currentUser:IUser = <IUser>{};
                     // המשתמש הנוכחי שנבחר
    orderCriteria: string = 'displayName';
    filterCriteria: string = '';
    isInverse: boolean = false;
    inProccess:boolean = false;
    // הערך של הקבוצה הנוכחית, מתעדכן בעת בחירה של קבוצה 
    @Input() currnetWorkgroup: string = '';

    constructor(private _workgroupService: WorkgroupService) { }

// הסרה של משתמש מקבוצה
    removeUserFromGroup(_user: IUser) {
        this.inProccess = true;
        this._workgroupService.removeUserFromworkgroup(this.currnetWorkgroup, _user)
            .subscribe(data => {
                console.log(data);
                this.usersList = data;
                this.inProccess= false;
            },
            error => {
                console.log(error);
                this.inProccess = false;
            });
    }

    // === הוספה של משתמש לקבוצה
    insertUserToWorkgroup(_candidate:IUser):void{
        this._workgroupService.addUserToWorkgroup(this.currnetWorkgroup,_candidate).subscribe(
            data => {
                this.loadCandidates();
                this.refreshUsers();
            },
            error => {
                console.log("error serToWorkgroup " + error);
            }
        )
        console.log("I am adding " + _candidate.displayName  + " to " + this.currnetWorkgroup)
    }


    // פונקציה לשינוי הסימון בהתאם לשם המאפיין שהמשתמש לחץ
    changeUsersSort(_criteria: string): void {
        if (this.orderCriteria != _criteria)
            this.isInverse = false;
        else
            this.isInverse = !this.isInverse;
        this.orderCriteria = _criteria;
    }


    // קביעת המשתמש שנבחר במשתנה
    setCurrentUser(_user:IUser):void{
        console.log("The selected user is: " + _user.displayName);
        this.currentUser = _user;
    }

    // שליפה של רשימת היוזרים שאינם חברים בקבוצה
    loadCandidates():void{
        this.inProccess = true;
        this._workgroupService.loadCandidates(this.currnetWorkgroup).subscribe( 
            data => {
                this.candidatesList = data;
                this.inProccess = false;    
            },
            error => {
                console.log("Error in loadCandidates: " + error);
                this.inProccess = false;
            }
        )
        console.log("udi mazor wants to load the users");
    }


    // שינוי הסטאטוס של היוזר (פעיל /לא פעיל) ועדכון הרשימה
    changeUserStatus(user: IUser): void {
        this._workgroupService.changeUserStatus(this.currnetWorkgroup, user)
            .subscribe(data => {
                console.log("The change status data is: " + data);
                let _index: any = this.usersList.findIndex(x => x.userId == user.userId);
                this.usersList[_index].isActive = !(this.usersList[_index].isActive);
            },
            error => console.log(error));
    }


    // בעת שינוי רשימת 
    ngOnChanges():void {
        this.refreshUsers();
    }


//  רענון של רשימת המשתמשים
    refreshUsers():void{
        if (this.currnetWorkgroup){
            this.usersList=[];
            this._workgroupService.getWorkgroupsUsers(this.currnetWorkgroup).subscribe(
                data => {
                    this.usersList = data;
                    console.log(JSON.stringify(data));
                },
                error => console.log("The ngOnChange in WgUserList error is: " + error)
            );
        }
            else
                this.usersList=[];
    }
}