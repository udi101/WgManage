import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from './../../interfaces/user.internface';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: Array<IUser>, searchCriteria: string): Array<IUser> {
    if (users.length == 0)
      return users;
    let Result:Array<IUser> = [];

    Result = users.filter(u =>  
        (u.displayName==null?null:u.displayName.indexOf(searchCriteria)!=(-1)) ||
        (u.userId==null?null:u.userId.toLowerCase().indexOf(searchCriteria.toLowerCase())!=(-1))
    );
      return Result;
  }
}
