import { Pipe, PipeTransform } from '@angular/core';
import {IStrParameter} from './../../interfaces/strParameter.interface';

@Pipe({
  name: 'filterstrparameters'
})
export class FilterStrParametersPipe implements PipeTransform {

  transform(parameters: any, args?: any): any {
    return null;
  }

}
