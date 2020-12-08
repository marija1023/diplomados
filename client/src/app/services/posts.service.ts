import { Injectable } from '@angular/core';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends HttpErrorHandler {

  private static readonly postsUrl = 'http://localhost:5000/posts';

  constructor(private http: HttpClient) {
    super();
  }

  public getPosts(topicId) {
    return this.http.get(`${PostsService.postsUrl}/${topicId}`)
      .pipe(catchError(super.handleError()));
  }

  public addPost(username, topicId, content) {
    const post = { content, topicId, username };
    return this.http.post(PostsService.postsUrl, post)
      .pipe(catchError(super.handleError()));
  }

  public deletePost(postId) {
    return this.http.delete(`${PostsService.postsUrl}/${postId}`)
      .pipe(catchError(super.handleError()));
  }

  public likePost(postId, username) {
    return this.http.patch(`${PostsService.postsUrl}/${postId}`, { username, action: 'like' })
      .pipe(catchError(super.handleError()));
  }

  public unlikePost(postId, username) {
    return this.http.patch(`${PostsService.postsUrl}/${postId}`, { username, action: 'unlike' })
      .pipe(catchError(super.handleError()));
  }
}
