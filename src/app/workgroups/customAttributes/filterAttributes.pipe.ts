import { Pipe, PipeTransform } from '@angular/core';
import {ICustomAttribute} from './customAttribute.interface';

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

    filterCaAttrKey(x:ICustomAttribute,_search:string):boolean{
        if(x.attrKey == null)
            return false; 
            return x.attrKey.indexOf(_search)!=(-1)?true:false;
    }

    filterCaHebName(x:ICustomAttribute,_search:string):boolean{
        if(x.hebName == null)
            return false;
            return x.hebName.indexOf(_search)!=(-1)?true:false;
    }

    filterCaValue(x:ICustomAttribute, _search:string):boolean{
        if(x.attrValue == null)
        return false;
        return x.attrValue.indexOf(_search)!=(-1)?true:false;
    }
}