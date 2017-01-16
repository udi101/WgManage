import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from './../../interfaces/user.internface';

@Pipe({
  name: 'sortUsers'
})
export class SortUsersPipe implements PipeTransform {

  transform(users: Array<IUser>, searchCriteia: string, isInverse: boolean): IUser[] {
    if (users.length == 0)
      return users;
    let _isInverse: number = isInverse ? (-1) : 1;
    let Result:Array<IUser> = [];
    switch (searchCriteia) { 
      case 'userId':
        Result =  users.sort((a,b)=>
          (a.userId==null?0:a.userId.toLowerCase())>(b.userId==null?0:b.userId.toLowerCase())?_isInverse:((-1)*_isInverse));
      break;
      case 'displayName':
        Result =  users.sort((a,b)=>
          (a.displayName==null?0:a.displayName)>(b.displayName==null?0:b.displayName)?_isInverse:((-1)*_isInverse));
      break;
      case 'isActive':
        Result =  users.sort((a,b)=>
          (a.isActive==null?0:a.isActive)>(b.isActive==null?0:b.isActive)?_isInverse:((-1)*_isInverse));
      break;
    }
    return Result;
  }
}
