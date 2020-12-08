import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from '../utils/http-error-handler.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpErrorHandler {
  private static readonly registerUrl = 'http://localhost:5000/auth/register/';
  private static readonly loginUrl = 'http://localhost:5000/auth/login/';

  username = '';
  loggedIn = false;

  constructor(private http: HttpClient) {
    super();
    const token = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');

    if (token && username) {
      this.loggedIn = true;
      this.username = username;
    }
  }

  public register(user) {
    return this.http.post(AuthService.registerUrl, user)
      .pipe(catchError(super.handleError()));
  }

  public login(user) {
    return this.http.post(AuthService.loginUrl, user)
      .pipe(catchError(super.handleError()));
  }

  public logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');

    this.username = '';
    this.loggedIn = false;
  }
}
