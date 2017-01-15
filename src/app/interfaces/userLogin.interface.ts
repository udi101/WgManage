import {IUser} from './user.internface'
export interface IUserLogin extends IUser{
    role:string;
    password:string;
}