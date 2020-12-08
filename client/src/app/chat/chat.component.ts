import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { RoomsService } from '../services/rooms.service';
import { faArrowRight, faArrowLeft, faPaperPlane, faCommentAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from '../services/messages.service';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  faPaperPlane = faPaperPlane;
  faCommentAlt = faCommentAlt;
  faPlus = faPlus;

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  showChat = false;
  showRooms = true;

  public user: string;
  public selectedRoom: string;
  public messageText: string;
  public messageArray:Array<{user:string,message:string}> = [];
  public messages: any = [];

  public rooms;
  public roomToAdd = '';

  openChat() {
    this.showChat = !this.showChat;
    this.showRooms = true;
  }

  constructor(
    private chatService: ChatService,
    public authService: AuthService,
    private roomsService: RoomsService,
    private messagesService: MessagesService
  ) { 
    this.chatService.newUserJoined()
    .subscribe(data=> this.messageArray.push(data));


    this.chatService.userLeftRoom()
    .subscribe(data=>this.messageArray.push(data));

    this.chatService.newMessageReceived()
    .subscribe(data=>this.messageArray.push(data));

    this.roomsService.getRooms().subscribe(
      (rooms) => {
        this.rooms = rooms;
      }, (error) => {
        console.log(error);
      }
    );

    this.user = this.authService.username;
  }

  ngOnInit(): void {
  }

  joinRoom(room){
    this.roomsService.addParticipant(room._id, this.user)
      .subscribe(
        () => {
          room.participants.push(this.user);
        }
      );
    this.selectedRoom = room.name;

    this.messagesService.getRoomMessages(this.selectedRoom)
      .subscribe(
        (messages) => {
          this.messages = messages;
        }, (error) => {
          console.log(error);
        }
      );

    this.chatService.joinRoom({user: this.user, room: this.selectedRoom});
    this.showRooms = false;
  }

  leaveRoom(room){
    this.roomsService.removeParticipant(room._id, this.user)
      .subscribe(
        () => {
          room.participants.push(this.user);
        }
      );
    this.selectedRoom = room.name;
    this.chatService.leaveRoom({user:this.user, room:this.selectedRoom});
    this.selectedRoom = null;
  }

  sendMessage()
  {
    this.messagesService.addMessage(this.user, this.selectedRoom, this.messageText)
      .subscribe(
        (message) => {
          this.messages.push(message);
        }
      );

    this.chatService.sendMessage({user:this.user, room:this.selectedRoom, message:this.messageText});
    this.messageText = "";
  }

  addRoom() {
    this.roomsService.addRoom(this.roomToAdd)
      .subscribe(room => {
        this.rooms.push(room);
      });
    this.roomToAdd = '';
  }

}
