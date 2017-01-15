import { Pipe, PipeTransform } from '@angular/core';
import { ICustomAttribute } from './../../interfaces/customAttribute.interface';

@Pipe({
    name: 'sortCa'
})

export class CustomAttributesSortPipe implements PipeTransform {
    transform(customattributes: ICustomAttribute[], searchCriteria: string, isInverse:boolean = false): ICustomAttribute[] {
        let Result: ICustomAttribute[] = null;
        let _isInverse:number = isInverse?1:(-1);
        switch (searchCriteria) {
            case 'attrKey':
                Result = customattributes.sort((a, b) => a.attrKey > b.attrKey ? _isInverse : (-_isInverse));
                break;
            case 'attrValue':
                Result = customattributes.sort((a, b) => a.attrValue > b.attrKey ? _isInverse : (-_isInverse))
                break;
            case 'hebName':
                Result = customattributes.sort((a, b) => a.hebName > b.hebName ? _isInverse : (-_isInverse));
                break;
        }
        return Result;
    }
}