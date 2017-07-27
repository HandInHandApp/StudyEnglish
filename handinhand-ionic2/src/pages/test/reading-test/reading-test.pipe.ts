import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'contains' })
export class ContainsPipe implements PipeTransform {
  transform(index: number, paraIndexes: number[]) {
    for (let i in paraIndexes) {
        if(paraIndexes[i] == index){
            return true;
        }
    }
    return false;
  }
}

@Pipe({ name: 'notcontains' })
export class NotContainsPipe implements PipeTransform {
  transform(index: number, paraIndexes: number[]) {
    for (let i in paraIndexes) {
        if (paraIndexes[i] == index){
            return false;
        }
    }
    return true;
  }
}