import { Pipe, PipeTransform } from '@angular/core';
import { IWorkgroup } from './workgroup.interface';
@Pipe({
    name: 'orderworkgroups'
})

export class OrderWorkgroupsPipe implements PipeTransform {
    transform(workgroups: IWorkgroup[], searchBy: string): IWorkgroup[] {
        let Result: IWorkgroup[];
        switch (searchBy) {
            case 'workgroupName':
                Result = workgroups.sort((a, b) => a.workgroupName > b.workgroupName ? 1 : -1);
                break;
            case 'acg':
            Result = workgroups.sort((a,b)=> a.acg > b.acg?1:-1);
            break;
        }
        return workgroups;
    }
}