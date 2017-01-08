import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name:'filterWorkroup'
})
export class FilterWorkgroupPipe implements PipeTransform{
    transform(_workgroups:string[],_searchString?:string): string[] {
        return _workgroups.filter(x=>x.indexOf(_searchString)!= (-1));
    }
}