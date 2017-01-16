import { Pipe, PipeTransform } from '@angular/core';
import { IWorkgroup } from './../../interfaces/workgroup.interface';

@Pipe({
  name: 'sortWorkgroups'
})
export class SortworkgroupsPipe implements PipeTransform {

  transform(workgroups: Array<IWorkgroup>, sortCriteria: string, isInverse: boolean): Array<IWorkgroup> {
    let Result: Array<IWorkgroup> = [];
    let _inverse: number = isInverse ? (-1) : 1;
    switch (sortCriteria) {
      case 'workgroupName':
        Result = workgroups.sort((a, b) =>
          (a.workgroupName == null ? 0 : a.workgroupName.toLowerCase()) > (b.workgroupName == null ? 0 : b.workgroupName.toLowerCase()) ? _inverse : (-1) * _inverse);
        break;
      case 'acg':
        Result = workgroups.sort((a, b) =>
          (a.acg == null ? 0 : a.acg.toLowerCase()) > (b.acg == null ? 0 : b.acg.toLowerCase()) ? _inverse : (-1) * _inverse);
        break;
    }
    return Result;
  }
}
