import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export abstract class HttpErrorHandler {
  constructor() {}

  protected handleError() {
    return (error: HttpErrorResponse): Observable<never> => {
      console.error('An error occurred:', error.statusText);
      return throwError(error);
    };
  }
}
