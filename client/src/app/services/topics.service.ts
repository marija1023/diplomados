import { Injectable } from '@angular/core';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicsService extends HttpErrorHandler {

  private static readonly topicsUrl = 'http://localhost:5000/topics';

  constructor(private http: HttpClient) {
    super();
  }

  public getTopics() {
    return this.http.get(TopicsService.topicsUrl)
      .pipe(catchError(super.handleError()));
  }
}
