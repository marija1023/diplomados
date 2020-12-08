import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {

  transform(posts): any{
    if(!posts) {
      return posts;
    }
    if(posts.length <= 1) {
      return posts;
    }
    else {
      return posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  }

}
