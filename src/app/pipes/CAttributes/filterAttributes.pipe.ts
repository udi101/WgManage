import { Pipe, PipeTransform } from '@angular/core';
import {ICustomAttribute} from './../../interfaces/customAttribute.interface';
@Pipe({
  name: 'filterAttributes'
})
export class FilterAttributesPipe implements PipeTransform {
    transform(_customAttributes: ICustomAttribute[],_searchString:string): ICustomAttribute[] {
        return _customAttributes.filter(x =>
            this.filterCaAttrKey(x,_searchString) ||
            this.filterCaHebName(x,_searchString) ||
            this.filterCaValue(x,_searchString));
        }

    // סינון לפי שם
    filterCaAttrKey(x:ICustomAttribute,_search:string):boolean{
        if(x.attrKey == null)
            return false; 
            return x.attrKey.indexOf(_search)!=(-1)?true:false;
    }

    // סינון לפי השם בעברית
    filterCaHebName(x:ICustomAttribute,_search:string):boolean{
        if(x.hebName == null)
            return false;
            return x.hebName.indexOf(_search)!=(-1)?true:false;
    }

    // סינון לפי ערך התכונה
    filterCaValue(x:ICustomAttribute, _search:string):boolean{
        if(x.attrValue == null)
        return false;
        return x.attrValue.indexOf(_search)!=(-1)?true:false;
    }
}