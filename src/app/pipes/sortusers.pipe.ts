import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from './../interfaces/user.internface';

@Pipe({
  name: 'sortusers'
})  
export class SortusersPipe implements PipeTransform {
    sortBy = {
        displayName: "displayName",
        userId: "userId",
        isActive:"isActive"
    }
    
  transform(users:Array<IUser>, sortBy:string, isInverse:boolean ): IUser[] {
    return users.sort((a,b) => a[sortBy]-b[sortBy]?1:(-1));
  } 
}
