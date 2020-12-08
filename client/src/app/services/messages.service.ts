import { Injectable } from '@angular/core';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends HttpErrorHandler {

  private static readonly messagesUrl = 'http://localhost:5000/messages';

  constructor(private http: HttpClient) { 
    super();
  }

  public addMessage(user, chatRoom, messageText) {
    const msg = { sender: user, room: chatRoom, message: messageText };
    return this.http.post(`${MessagesService.messagesUrl}`, msg)
      .pipe(catchError(super.handleError()));
  }

  public getRoomMessages(room) {
    return this.http.get(`${MessagesService.messagesUrl}/${room}`)
      .pipe(catchError(super.handleError()));
  }
}
