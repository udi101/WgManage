import { Pipe, PipeTransform } from '@angular/core';
import {IStrParameter} from './../../interfaces/strParameter.interface';

@Pipe({
  name: 'sortStrParameters'
})
export class SortStrParametersPipe implements PipeTransform {
  transform(parameters:IStrParameter[], sortCriteria:string="parameterName", isInverse:number = 1): IStrParameter[] {
    if(parameters)
    {
      let result:Array<IStrParameter>;
      switch(sortCriteria){
        case "hebName":
           result = parameters.sort((a,b)=> a.hebName > b.hebName ? isInverse : -isInverse );
        break;
      case "parameterName":
      result =  parameters.sort((a,b)=> a.parameterName > b.parameterName ? isInverse : -isInverse );
      break;
      case "parameterValue":
        result =  parameters.sort((a,b)=> a.parameterValue > b.parameterValue ? isInverse : -isInverse );
      break;
    }
    return  result; }
    else
    return null;
  }
}
