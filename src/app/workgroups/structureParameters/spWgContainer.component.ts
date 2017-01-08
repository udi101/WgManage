 
import { Component } from '@angular/core';

@Component({
    templateUrl: 'spWgContainer.component.html'
})

export class spWgContainerComponent {
    currentAcg: string;         // הנוכחי שנבחר  acg-ה 
    currentWorkgroup:string;    //  הקבוצה הנוכחית שנבחרה
    isWideDisplay:boolean = false;

    changeDisplay():void{
        this.isWideDisplay = !this.isWideDisplay;
    }    


    // Acg פונקציה המתבצעת כאשר המשתמש לוחץ על
    acgSelect(_acg: string): void {
        if(this.currentAcg != _acg){
        this.currentAcg = _acg;
        this.currentWorkgroup = null;   // שונה acg איפוס רשימת התהליכים ברגע שהמשתמש לחץ על  
        }
    }

    workgroupSelect(_workgroup: string): void {
        this.currentWorkgroup = _workgroup;
    }

}
