
import { Component } from '@angular/core';
import {IUser} from './../../interfaces/user.internface';
@Component({
    templateUrl: 'usersContainer.component.html'
})
export class UsersContainerComponent {
    currentUser:IUser = <IUser>{}    // המשתמש הנבחר במערכת
    
    // קביעת המשתמש הנבחר ברגע שהמשתמש בוחר משתמש חדש
    setCurrentUser(_user:IUser): void {
        this.currentUser=_user;
    }
}