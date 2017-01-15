import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from './../../interfaces/user.internface';
@Pipe({
    name: 'sortUsers'
})

export class sortUsersPipe implements PipeTransform {
    transform(users: IUser[], searchCriteia: string, isInverse:boolean = false): IUser[] {
        if( users.length == 0 )
            return users;
        let _isInverse:number = isInverse?(-1):1
        let Result: Array<IUser>;  
        switch (searchCriteia) { 
            case "displayName":
                Result = users.sort((a, b) => a.displayName.toLowerCase() > b.displayName.toLowerCase() ? _isInverse : -_isInverse);
                break;
            case "userId":
                Result = users.sort((a, b) => a.userId.toLowerCase() > b.userId.toLocaleLowerCase() ? _isInverse : -_isInverse);
                break;
            case "isActive":
                Result = users.sort((a, b) => a.isActive > b.isActive ?  _isInverse : -_isInverse);
                break;
        }
        return Result;
    }
}