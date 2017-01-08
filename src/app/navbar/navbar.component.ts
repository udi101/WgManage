import { Component } from '@angular/core';
import { WorkgroupService } from './../core/workgroup.service';
declare var $: any;

@Component({
    selector: 'navigation-bar',
    styleUrls: ['navbar.component.css'],
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent {
    passwordType: string = "password";
    localUserId:string = null;
    
    constructor(private _workgroupService: WorkgroupService) { }

    

    // InIn-רישום של יוזר  מול מערכת ה
    registerUser(_userId: string): void {
        this.localUserId = _userId;
        // console.log("the user Id is: " + _userId);
        setTimeout(function () { $("#loginModal").modal('hide') },3000);    //  לאחר 3 שניות jQuery סגירה של המודל בעזרת 
        this._workgroupService.userId = this.localUserId;
    }

    logOut():void{
        this.localUserId = null;
        this._workgroupService.userId = null;
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

