import { Component } from '@angular/core';
import { userLogin } from './../models/userLogin.model'
import { WorkgroupService } from './../core/workgroup.service';
declare var $: any;

@Component({
    selector: 'navigation-bar',
    styleUrls: ['navbar.component.css'],
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent {
    passwordType: string = "password";
    localUser: userLogin = new userLogin();   // הגדרת משתמש מקומי
    localUserId: string = null;
    userLoginAnimation: boolean = false;

    constructor(private _workgroupService: WorkgroupService) { }



    // InIn-רישום של יוזר  מול מערכת ה
    // ===========================================
    loggingUser(): void {
        // this.localUserId = _userId;
        if(this.localUser.userId && this.localUser.userPassword){
        this.userLoginAnimation = true;                // הצגת אנימציה
        this._workgroupService.loggingUser(this.localUser.userId, this.localUser.userPassword).subscribe(
            data => {
                console.log(JSON.stringify(data));
                this._workgroupService.loggedUser = data;
                this.userLoginAnimation = false;
                if (this._workgroupService.loggedUser.userId != null)
                {
                    $("#loginModal").modal('hide');   //  סגירה של המודל במידה וחיבור בוצע
                    this.localUser.resetUser();             // null-איפוס הערכים של המשתמש המקומי ל
                }
                
            },
            error => {
                console.log(error);
                this.userLoginAnimation = false;
                this._workgroupService.loggedUser.statusMessage = error;
                // $("#loginModal").modal('hide');   // סגירה של המודל
            });
        }
    }

    logOut(): void {
        // this.localUserId = "null";
        this.userLoginAnimation = true;
        this._workgroupService.loggedUser = new userLogin();
         console.log(this._workgroupService.loggedUser);
         this.userLoginAnimation = false;
        $("#logoutModal").modal('hide');
        // InIn Logout
    }

    // החלפה בין סיסמא מוצפנת לסיסמא גלויה בתיבת הטקסט
    setToPasswordType(): void {
        this.passwordType = "password";
    }

    // הצגה של הסיסמא כאשר לוחצים על העין
    setToTextType(): void {
        this.passwordType = "text";
    }
}

