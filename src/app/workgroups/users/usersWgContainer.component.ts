import { Component,Output,EventEmitter } from '@angular/core';
import { WorkgroupService } from './../../core/workgroup.service';
@Component({
    templateUrl: 'usersWgContainer.component.html'
})

export class UsersWgContainerComponent {
    currentAcg: string;                      // הנוכחי שנבחר acg-ה
    currentWorkgroup: string;                //  הקבוצה הנוכחית שנבחרה
    isWideDisplay:boolean = false;          // האם התצוגה הראשונית היא רחבה

    changeDisplay():void{
        this.isWideDisplay = !this.isWideDisplay;
    }

    // Acg פונקציה המתבצעת כאשר המשתמש לוחץ על
    acgSelect(_acg: string): void {
        if(this.currentAcg != _acg)
            {
                this.currentAcg = _acg;
                this.currentWorkgroup = null;   // acg איפוס רשימת המשתמשים ברגע שנבחר 
            }
    }

    // workgroup פונקציה המתבצעת בעת לחיצה על 
    workgroupSelect(_workgroup: string): void {
        this.currentWorkgroup = _workgroup;
    }
}