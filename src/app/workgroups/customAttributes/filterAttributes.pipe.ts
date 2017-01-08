import { Pipe, PipeTransform } from '@angular/core';
import {ICustomAttribute} from './customAttribute.interface';

@Pipe({
    name: 'filterAttributes'
})
export class FilterAttributesPipe implements PipeTransform {
    transform(_customAttributes: ICustomAttribute[],_searchString:string): ICustomAttribute[] {
        return _customAttributes.filter(x=>x.attrKey.toLowerCase().indexOf(_searchString.toLowerCase())!=(-1) || 
            x.hebName.toLowerCase().indexOf(_searchString.toLowerCase()) != (-1) ||
            x.attrValue.toLowerCase().indexOf(_searchString.toLowerCase()) != (-1));
    }
}