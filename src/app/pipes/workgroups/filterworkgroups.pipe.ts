import { Pipe, PipeTransform } from '@angular/core';
import { IWorkgroup } from './../../interfaces/workgroup.interface';

@Pipe({
  name: 'filterWorkgroups'
})

export class FilterworkgroupsPipe implements PipeTransform {

  transform(workgroups: Array<IWorkgroup>, searchCriteria: string): Array<IWorkgroup> {
    if (workgroups.length == 0)
      return workgroups;
      return workgroups.filter(x => x.workgroupName==null?null:x.workgroupName.indexOf(searchCriteria)!=(-1));
  }
}
