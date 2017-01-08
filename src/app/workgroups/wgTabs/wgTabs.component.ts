import { Component, Input } from '@angular/core';
import { WorkgroupService } from './../../core/workgroup.service';

@Component({
    selector: 'wgTabs',
    templateUrl: 'wgTabs.component.html',
    styleUrls: ['wgTabs.component.css']
})
export class WgTabsComponent {
    currentWg: string = 'udi';               // הקבוצה הנוכחית
    @Input() activeAction: string;   // להדגשת הלחצן בעל האפשרות הפעילה

    constructor(private _workgroupService: WorkgroupService) { }

    getCurrentWg():string {
        return this._workgroupService.currentWorkgroup;
    }
    getCurrentAcg():string{
        return this._workgroupService.currentAcg;
    }
    
    isSelected(action: string): boolean {
        return action == this.activeAction;
    }
}