import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

const SOCKET_ENDPOINT = 'localhost:5000';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io(SOCKET_ENDPOINT);
  users = [];
  currentUser = '';

  constructor() { }

  joinRoom(data)
  {
    this.socket.emit('join',data);
  }

  newUserJoined()
  {
    let observable = new Observable<{user:string, message:string}>(observer=>{
        this.socket.on('new user joined', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }

  sendMessage(data)
  {
    this.socket.emit('message',data);
  }

  newMessageReceived(){
    let observable = new Observable<{user:string, message:string}>(observer=>{
        this.socket.on('new message', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }

  leaveRoom(data){
    this.socket.emit('leave',data);
  }

  userLeftRoom(){
    let observable = new Observable<{user:string, message:string}>(observer=>{
        this.socket.on('left room', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }

}
