import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likesSort'
})
export class LikesSortPipe implements PipeTransform {

  transform(posts): any{
    if(!posts) {
      return posts;
    }
    if(posts.length <= 1) {
      return posts;
    }
    else {
      return posts.sort((a, b) => b.likes.length - a.likes.length);
    }
  }

}
