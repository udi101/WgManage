import { Component } from '@angular/core';

@Component({
    templateUrl: 'caContainer.component.html'
})

export class CAttrContainer {
    currentAcg: string = '';
    currentWorkgroup: string = '';
    isWideDisplay: boolean = false;

    refreshAttributes(_workgroup: string) {
        this.currentWorkgroup = _workgroup;
    }

    changeDisplay(): void {
        this.isWideDisplay = !this.isWideDisplay;
    }

    // acg הפונקציה הזו מתרחשת בשעת לחיצה על
    refreshWorkroupsByAcg(_acg: string): void {
        if (this.currentAcg != _acg) {
            this.currentAcg = _acg;
            this.currentWorkgroup = null;   // חדש אז מתאפסת רשימת התכונות acg ברגע שנבחר
        }
    }
}