import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { WorkgroupService } from './workgroup.service'

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private _workgroupService: WorkgroupService) { }

    canActivate(): boolean {
        return this._workgroupService.loggedUser.userId != null;
    }
}
