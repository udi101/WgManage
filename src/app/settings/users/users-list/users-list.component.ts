import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { WorkgroupService } from './../../../core/workgroup.service';
import { IUser } from '../../../workgroups/users/user.interface';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList: IUser[] = [];   // רשימת המשתמשים במערכת 
  currentUser: IUser;       // שם המשתמש הנבחר ע"י המשתמש
  @Output() selectUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  usersFilterString:string = '';           //  הביטוח שלפיו יתבצע סינון נתונים
  sortCriteria: string = 'userId';    // המאפיין שלפיו מהנתונים ימוינו
  sortInverse: boolean = false;       // האם סדר המיון מההתחלה לסוף או מהסוף להתחלה

  isLoading:boolean = false;           // האם להציג אנימציה של טעינת נתונים
  
  constructor(private _workgroupService: WorkgroupService,
              private _activatedRoute:ActivatedRoute) { }

  // פונקציה המתבצעת כשהמשתמש מבק לשנות את מיון הנתונים
  setSortValue(sortCriteria: string) {
    if (this.sortCriteria == sortCriteria)
      this.sortInverse = !this.sortInverse;
    else {
      this.sortCriteria = sortCriteria;
      this.sortInverse = false;
    }
  }



  ngOnInit() {
    this.getUsersList();
    this.setCurrentUser(<IUser>{userId: this._activatedRoute.snapshot.params["id"]});
}

  ngOnChanges(){
  }

  setCurrentUser(_user: IUser): void {
    this.currentUser = _user;
    this.selectUser.emit(_user);
  }


  isCurrentUser(_user: IUser): boolean {
    return this.currentUser.userId == _user.userId;
  }

  // שליפה של כל המשתמשים של המערכת
  getUsersList(): void {
    this.isLoading = true;
    this._workgroupService.getUsers().subscribe(data => {
      this.userList = data;
      this.isLoading = false;
    },
      error => 
      {console.log(error);
      this.isLoading = false;  
      });
  }
}
