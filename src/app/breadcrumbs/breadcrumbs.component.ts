

import {Component,Input} from '@angular/core';


@Component({
    selector: 'breadcrumbs',
    templateUrl: 'breadcrumbs.component.html',
    styleUrls:['breadcrumbs.component.css']
})
export class BreadcrumbsComponent{
@Input() navGroup:string;
@Input() operation:string;
@Input() element:string;
}