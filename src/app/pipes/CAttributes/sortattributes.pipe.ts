import { Pipe, PipeTransform } from '@angular/core';
import { ICustomAttribute } from './../../interfaces/customAttribute.interface';
@Pipe({
  name: 'sortattributes'
})
export class SortattributesPipe implements PipeTransform {
  transform(attributes: Array<ICustomAttribute>, sortCriteria: string, isInverse: boolean): Array<ICustomAttribute> {
    if (attributes.length == 0)
      return attributes;
    let _inverse: number = isInverse ? 1 : (-1);
    let Result: Array<ICustomAttribute> = [];
    switch (sortCriteria) {
      case 'attrKey':
        Result = attributes.sort(
          (a, b) =>
        (a.attrKey == null ? 0 : a.attrKey.toLowerCase()) > (b.attrKey == null ? 0 : b.attrKey.toLowerCase()) ? _inverse  : (-1)*_inverse );
        break;
      case 'hebName':
        Result = attributes.sort(
          (a, b) =>
        (a.hebName == null ? 0 : a.hebName) > (b.hebName == null ? 0 : b.hebName) ? _inverse  : (-1)*_inverse );
        break;
      case 'attrValue':
       Result = attributes.sort(
          (a, b) =>
        (a.attrValue == null ? 0 : a.attrValue.toLowerCase()) > (b.attrValue == null ? 0 : b.attrValue.toLowerCase()) ? _inverse  : (-1)*_inverse );
        break; 
    }
    return Result;
  }
}
