import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends HttpErrorHandler {

  private static readonly categoriesUrl = 'http://localhost:5000/categories';
  private static readonly topicsUrl = 'http://localhost:5000/topics';

  constructor(private http: HttpClient) {
    super();
  }

  public getCategories() {
    return this.http.get(CategoriesService.categoriesUrl)
      .pipe(catchError(super.handleError()));
  }

  public addCategorie(categoryName: string) {
    const category = { name: categoryName};
    return this.http.post(CategoriesService.categoriesUrl, category)
      .pipe(catchError(super.handleError()));
  }

  public addTopic(topicName: string, categoryId: string) {
    const topic = { name: topicName, categoryId: categoryId};
    return this.http.post(CategoriesService.topicsUrl, topic)
      .pipe(catchError(super.handleError()));
  }
}
