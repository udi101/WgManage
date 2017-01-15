import {IUser} from './../interfaces/user.internface'
import {WorkgroupService} from './../core/workgroup.service'

export class UserLoginModel implements IUser {
    userId:string;
    displayName:string;
    isActive:boolean;
    password:string;
    role:string;

    constructor(private _workgroupServie:WorkgroupService){}

    //פונקציה לרישום משתמש
    registerUser(){
        console.log(this.userId);
    }
}