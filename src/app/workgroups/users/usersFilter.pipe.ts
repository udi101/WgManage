import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from './../../interfaces/user.internface';

@Pipe({
    name: 'filterUsers'
})

// סינון של המשתמשים לפי הטקסט שהוזן בתיבת החיפוש
export class UsersFilterPipe implements PipeTransform {
    transform(users: IUser[], searchCriteria: string): IUser[] {
        if (users.length > 0) {
            return users.filter(x => x.displayName.toLowerCase().indexOf(searchCriteria.toLowerCase()) != (-1) ||
                x.userId.toLowerCase().indexOf(searchCriteria.toLowerCase()) != (-1));
        }
        else
            return users;
    }
}