import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../utils/http-error-handler.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends HttpErrorHandler {

  private static readonly roomsUrl = 'http://localhost:5000/rooms';

  constructor(private http: HttpClient) { 
    super();
  }

  public getRooms() {
    return this.http.get(RoomsService.roomsUrl)
      .pipe(catchError(super.handleError()));
  }

  public addRoom(name) {
    const room = { name };
    return this.http.post(RoomsService.roomsUrl, room)
      .pipe(catchError(super.handleError()));
  }

  public addParticipant(roomId, user) {
    const participant = { action: 'join', user: user };
    return this.http.patch(`${RoomsService.roomsUrl}/${roomId}`, participant);
  }

  public removeParticipant(roomId, user) {
    const participant = { action: 'leave', user: user };
    return this.http.patch(`${RoomsService.roomsUrl}/${roomId}`, participant);
  }
}
