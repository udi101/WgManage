import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy',
    pure: true
})

export class orderByPipe implements PipeTransform {
    transform(acgs: string[]): string[] {
        return acgs.sort((a:string,b:string)=> a>b?1:-1);
    }
}